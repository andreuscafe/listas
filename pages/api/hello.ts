import prisma from "@/lib/prisma";
import { users } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<users[]>
) {
  const users = await prisma.users.findMany();

  res.status(200).json(users);
}
