import prisma from "@/lib/prisma";
import { task } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<task[] | task | { error: string }>
) {
  try {
    if (req.method === "GET") {
      const response = await prisma.task.findMany();

      res.status(200).json(response);
    }

    if (req.method === "POST") {
      const task = req.body as task;

      const response = await prisma.task.upsert({
        where: { id: task.id || "" },
        update: {},
        create: {
          id: task.id,
          listId: task.listId,
          content: task.content,
          completed: task.completed
        }
      });
      return res.status(200).json(response);
    }

    if (req.method === "PUT") {
      const task = req.body as task;

      const response = await prisma.task.update({
        where: { id: task.id },
        data: {
          ...task
        }
      });
      return res.status(200).json(response);
    }

    if (req.method === "DELETE") {
      const { id } = req.body as { id: string };

      const response = await prisma.task.delete({
        where: { id }
      });
      return res.status(200).json(response);
    }

    res.status(400).json({ error: "Method not allowed" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
