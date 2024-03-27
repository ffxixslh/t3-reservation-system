import { NextRequest, NextResponse } from "next/server";
import { sendPasswordResetEmail } from "~/lib/mail";
import { v4 as uuidv4 } from "uuid";
import { api } from "~/trpc/server";

export const POST = async (request: NextRequest) => {
  const { phone, email } =
    (await request.json()) as unknown as {
      phone: string;
      email: string;
    };

  const user = await api.user.getOneByPhone.query({
    phone,
  });
  if (user) {
    // Generate a unique token for password reset
    const passwordResetToken = uuidv4();

    // Set the token to emailResetPassword field in the user document
    // user.emailResetPassword = passwordResetToken;
    await api.user.updateEmailResetPassword.mutate({
      phone,
      emailResetPassword: passwordResetToken,
    });

    // Send the password reset email with the token, phone, and email
    await sendPasswordResetEmail(
      email,
      phone,
      passwordResetToken,
    );

    return NextResponse.json(
      JSON.stringify({
        message: "密码重置链接已发送到您的电子邮件中。",
      }),
    );
  } else {
    // Respond with a generic message whether or not the email was found
    // This is a security measure to prevent email enumeration
    return NextResponse.json(
      JSON.stringify({
        message:
          "如果电子邮件与帐户关联，则将发送密码重置链接。",
      }),
    );
  }
};
