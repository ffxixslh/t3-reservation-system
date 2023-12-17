import { toast } from "react-hot-toast";
import { z } from "zod";

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast.error(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast.error(err.message);
  } else {
    return toast.error("发生未知错误，请稍后再试。");
  }
}
