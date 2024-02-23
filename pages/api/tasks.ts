import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { task } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<task[] | task | { error: string }>
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "GET") {
      const response = await prisma.task.findMany({
        where: { userId }
      });

      res.status(200).json(response);
    }

    if (req.method === "POST") {
      const task = req.body as task;

      if (!task.id) {
        return res.status(400).json({ error: "Task ID is required" });
      } else if (task.content && task.content.length > 480) {
        return res
          .status(400)
          .json({ error: "Task content is too long (Max: 480 characters)" });
      }

      const response = await prisma.task.upsert({
        where: { id: task.id || "" },
        update: {},
        create: {
          userId,
          id: task.id,
          listId: task.listId,
          content: task.content,
          completed: task.completed,
          status: task.status
        }
      });
      return res.status(200).json(response);
    }

    if (req.method === "PUT") {
      const task = req.body as task;

      if (!task.id) {
        return res.status(400).json({ error: "Task ID is required" });
      } else if (task.content && task.content.length > 480) {
        return res
          .status(400)
          .json({ error: "Task content is too long (Max: 480 characters)" });
      }

      const response = await prisma.task.update({
        where: { id: task.id, userId },
        data: {
          ...task
        }
      });
      return res.status(200).json(response);
    }

    if (req.method === "DELETE") {
      const { id } = req.body as { id: string };

      if (!id) {
        return res.status(400).json({ error: "Task ID is required" });
      }

      const response = await prisma.task.delete({
        where: { id, userId }
      });
      return res.status(200).json(response);
    }

    res.status(400).json({ error: "Method not allowed" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
