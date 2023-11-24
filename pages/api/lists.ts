import prisma from "@/lib/prisma";
import { list } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<list[] | list | { error: string }>
) {
  if (req.method === "GET") {
    const response = await prisma.list.findMany();

    res.status(200).json(response);
  }

  if (req.method === "POST") {
    const list = req.body as list;

    const response = await prisma.list.upsert({
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
    const list = req.body as list;

    const response = await prisma.list.update({
      where: { id: list.id },
      data: {
        title: list.title !== undefined ? list.title : undefined,
        folded: list.folded !== undefined ? list.folded : undefined
      }
    });
    return res.status(200).json(response);
  }

  if (req.method === "DELETE") {
    const { id } = req.body as { id: string };

    const response = await prisma.list.delete({
      where: { id }
    });
    return res.status(200).json(response);
  }

  res.status(400).json({ error: "Method not allowed" });
}
