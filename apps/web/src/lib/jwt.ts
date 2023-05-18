import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export function createToken(userId: string, userEmail: string, options = {}) {
  return jwt.sign({ id: userId }, process.env.NEXTAUTH_SECRET + userEmail, options);
}

export async function verifyToken(token: string, userEmail: string = "") {
  if (!userEmail) {
    const { id } = jwt.decode(token) as {
      id: string
    };

    const foundUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!foundUser || !foundUser.email) {
      return null;
    }

    userEmail = foundUser.email;
  }

  return jwt.verify(token, process.env.NEXTAUTH_SECRET + userEmail);
}