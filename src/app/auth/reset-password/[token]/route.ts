import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { sendNewPasswordEmail } from "~/lib/mail";
import { api } from "~/trpc/server";

export const GET = async (request: NextRequest) => {
  const token = request.nextUrl.pathname.split("/").pop();
  const phone = request.nextUrl.searchParams.get("phone");
  const email = request.nextUrl.searchParams.get("email");

  if (!token || !phone || !email) {
    return new Response("无效的令牌、电话或邮箱", {
      status: 400,
    });
  }

  // Find the user by the emailResetPassword token and check if the token has not expired
  const user =
    await api.user.getOneByEmailResetPassword.query({
      phone: phone,
      emailResetPassword: token,
    });
  console.log(`Token: ${token}`);
  console.log(`Current Time: ${new Date()}`);

  if (user) {
    // If the user is found, generate a new secure password
    const newPassword = generateSecurePassword();

    // Hash the new password before saving it to the database
    // const hashedPassword = await bcrypt.hash(
    //   newPassword,
    //   10,
    // );

    // Update the user's password and clear the reset token
    await api.user.updatePassword.mutate({
      phone,
      password: newPassword,
    });

    await api.user.updateEmailResetPassword.mutate({
      phone,
      emailResetPassword: "",
    });

    // Send the new password to the user's email
    await sendNewPasswordEmail(email, newPassword);

    // Return a response indicating the new password has been sent
    return NextResponse.json(
      "您的新密码已发送到您的电子邮件中。",
      {
        status: 200,
      },
    );
  } else {
    // If no user is found or the token is expired, return an error response
    return NextResponse.json("密码重置令牌无效或已过期。", {
      status: 400,
    });
  }
};

// Helper function to generate a secure password
function generateSecurePassword() {
  return randomBytes(12).toString("hex"); // Generates a random hex string of length 24
}
