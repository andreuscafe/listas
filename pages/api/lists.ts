import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { list } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<list[] | list | { error: string }>
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const response = await prisma.list.findMany({
      where: { userId }
    });

    res.status(200).json(response);
  }

  if (req.method === "POST") {
    const list = req.body as list;

    if (!list.id) {
      return res.status(400).json({ error: "List ID is required" });
    } else if (list.title && list.title.length > 50) {
      return res
        .status(400)
        .json({ error: "List title is too long (Max: 50 characters)" });
    }

    const response = await prisma.list.upsert({
      where: { id: list.id || "" },
      update: {},
      create: {
        id: list.id,
        userId,
        title: list.title
      }
    });
    return res.status(200).json(response);
  }

  if (req.method === "PUT") {
    const list = req.body as list;

    if (!list.id) {
      return res.status(400).json({ error: "List ID is required" });
    } else if (list.title && list.title.length > 50) {
      return res
        .status(400)
        .json({ error: "List title is too long (Max: 50 characters)" });
    }

    const response = await prisma.list.update({
      where: { id: list.id, userId },
      data: {
        title: list.title !== undefined ? list.title : undefined,
        folded: list.folded !== undefined ? list.folded : undefined
      }
    });
    return res.status(200).json(response);
  }

  if (req.method === "DELETE") {
    const { id } = req.body as { id: string };

    if (!id) {
      return res.status(400).json({ error: "List ID is required" });
    }

    const response = await prisma.list.delete({
      where: { id, userId }
    });
    return res.status(200).json(response);
  }

  res.status(400).json({ error: "Method not allowed" });
}
