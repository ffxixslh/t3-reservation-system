import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
} from "../trpc";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
import SimplePeer from "simple-peer";
import { z } from "zod";

type TSignalData = {
  signal: SimplePeer.SignalData;
  from: string;
  to: string;
};

const SignalDataSchema = z.object({
  signal: z.custom<SimplePeer.SignalData>(),
  from: z.string(),
  to: z.string(),
});

interface MyEvents {
  onLocalCall: (data: TSignalData) => void;
  onLocalAnswer: (data: TSignalData) => void;
  onRemoteAnswer: (data: TSignalData) => void;
  onRemoteAccepted: (data: TSignalData) => void;
}

declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(
    event: TEv,
    listener: MyEvents[TEv],
  ): this;
  off<TEv extends keyof MyEvents>(
    event: TEv,
    listener: MyEvents[TEv],
  ): this;
  once<TEv extends keyof MyEvents>(
    event: TEv,
    listener: MyEvents[TEv],
  ): this;
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean;
}

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

process.on("SIGTERM", () => {});

export const chatRouter = createTRPCRouter({
  localCall: protectedProcedure
    .input(SignalDataSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.from === ctx.session.user.id) {
        ee.emit("onLocalCall", input);
        return;
      }
      if (input.to === ctx.session.user.id) {
        ee.emit("onLocalAnswer", input);
        return;
      }
      return new TRPCError({
        code: "BAD_REQUEST",
        message: "无效的用户",
      });
    }),
  onLocalCall: protectedProcedure.subscription(() => {
    return observable<TSignalData>((emit) => {
      const onLocalCall = (data: TSignalData) => {
        emit.next(data);
      };
      ee.on("onLocalCall", onLocalCall);
      return () => {
        ee.off("onLocalCall", onLocalCall);
      };
    });
  }),
  localAnswer: protectedProcedure
    .input(SignalDataSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.from === ctx.session.user.id) {
        ee.emit("onLocalAnswer", input);
        return;
      }
      if (input.to === ctx.session.user.id) {
        ee.emit("onRemoteAnswer", input);
        return;
      }
      return new TRPCError({
        code: "BAD_REQUEST",
        message: "无效的用户",
      });
    }),
  onLocalAnswer: protectedProcedure.subscription(() => {
    return observable<TSignalData>((emit) => {
      const onLocalAnswer = (data: TSignalData) => {
        emit.next(data);
      };
      ee.on("onLocalAnswer", onLocalAnswer);
      return () => {
        ee.off("onLocalAnswer", onLocalAnswer);
      };
    });
  }),
  remoteAnswer: protectedProcedure
    .input(SignalDataSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.from === ctx.session.user.id) {
        ee.emit("onRemoteAnswer", input);
        return;
      }
      if (input.to === ctx.session.user.id) {
        ee.emit("onRemoteAccepted", input);
        return;
      }
      return new TRPCError({
        code: "BAD_REQUEST",
        message: "无效的用户",
      });
    }),
  onRemoteAnswer: protectedProcedure.subscription(() => {
    return observable<TSignalData>((emit) => {
      const onRemoteAnswer = (data: TSignalData) => {
        emit.next(data);
      };
      ee.on("onRemoteAnswer", onRemoteAnswer);
      return () => {
        ee.off("onRemoteAnswer", onRemoteAnswer);
      };
    });
  }),
  remoteAccepted: protectedProcedure
    .input(SignalDataSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.from === ctx.session.user.id) {
        ee.emit("onRemoteAccepted", input);
        return;
      }
      if (input.to === ctx.session.user.id) {
        ee.emit("onRemoteAnswer", input);
        return;
      }
      return new TRPCError({
        code: "BAD_REQUEST",
        message: "无效的用户",
      });
    }),
  onRemoteAccepted: protectedProcedure.subscription(() => {
    return observable<TSignalData>((emit) => {
      const onRemoteAccepted = (data: TSignalData) => {
        emit.next(data);
      };
      ee.on("onRemoteAccepted", onRemoteAccepted);
      return () => {
        ee.on("onRemoteAccepted", onRemoteAccepted);
      };
    });
  }),
});
