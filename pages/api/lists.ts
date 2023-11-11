import prisma from "@/lib/prisma";
import { lists } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<lists[] | lists | { error: string }>
) {
  if (req.method === "GET") {
    const response = await prisma.lists.findMany();

    res.status(200).json(response);
  }

  if (req.method === "POST") {
    const list = req.body as lists;

    const response = await prisma.lists.upsert({
      where: { id: list.id || "" },
      update: {},
      create: {
        id: list.id,
        title: list.title
      }
    });
    return res.status(200).json(response);
  }

  if (req.method === "PUT") {
    const list = req.body as lists;

    const response = await prisma.lists.update({
      where: { id: list.id },
      data: {
        title: list.title
      }
    });
    return res.status(200).json(response);
  }

  if (req.method === "DELETE") {
    const { id } = req.body as { id: string };

    const response = await prisma.lists.delete({
      where: { id }
    });
    return res.status(200).json(response);
  }

  res.status(400).json({ error: "Method not allowed" });
}
