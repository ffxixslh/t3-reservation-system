import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";

import { db } from "~/server/db";
import { api } from "~/trpc/server";
import { type TUserOrigin } from "~/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: User["id"];
      role: User["role"];
      hospitalId: User["hospitalId"];
      doctorId: User["doctorId"];
    } & DefaultSession["user"];
  }

  interface User {
    id: TUserOrigin["id"];
    role: TUserOrigin["role"];
    hospitalId: TUserOrigin["hospitalId"];
    doctorId: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: (params) => {
      // The 'user' only exist for the first time
      const { token, user } = params;

      if (user) {
        token.role = user.role;
        token.hospitalId = user.hospitalId;
        if (user.role === "DOCTOR") {
          token.doctorId = user.doctorId;
        }
      }
      return token;
    },
    session: (params) => {
      const { session, token } = params;

      const result = {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          hospitalId: token.hospitalId,
        },
      };
      if (token.role === "DOCTOR") {
        result.user.doctorId = token.doctorId as string;
      }
      return result;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  providers: [
    /**
     * Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "电话",
          type: "text",
          placeholder: "请输入11位电话号码",
        },
        password: {
          label: "密码",
          type: "password",
          placeholder: "请输入个人密码",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }
          const user =
            await api.user.getByCredentials.query({
              phone: credentials.phone,
              password: credentials.password,
            });
          if (
            !user
            // ||
            // !(await compare(
            //   user.password,
            //   credentials.password,
            // ))
          ) {
            return null;
          }
          const result: User = {
            ...user,
            doctorId: "",
          };
          if (user.role === "DOCTOR") {
            const doctor =
              await api.doctor.getOneByUserId.query({
                userId: user.id,
              });
            if (doctor) {
              result.doctorId = doctor.id;
            }
          }
          return result;
        } catch (error) {
          console.error("authorize error", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () =>
  getServerSession(authOptions);
