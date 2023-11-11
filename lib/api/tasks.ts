import { createId } from "@paralleldrive/cuid2";
import { useTasksStore } from "@/store";
import { tasks } from "@prisma/client";

export const getTasks = async () => {
  const res = await fetch("/api/tasks");

  if (res.ok) {
    const tasks = await res.json();
    return tasks;
  }
};

export const createTask = async (listId: string, content?: string) => {
  const { addTask } = useTasksStore.getState().taskActions;

  const newTask = {
    id: createId(),
    listId,
    content: content || "",
    title: "Nueva lista",
    createdAt: new Date(),
    completed: false
  } as unknown as tasks;

  addTask(listId, newTask);

  const res = await fetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const newTask = await res.json();
    return newTask;
  }
};
