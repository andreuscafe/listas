import { createId } from "@paralleldrive/cuid2";
import { useTasksStore } from "@/store";
import { task } from "@prisma/client";

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
  } as unknown as task;

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

export const completeTask = async (id: string) => {
  const { toggleCompleted } = useTasksStore.getState().taskActions;

  const completed = toggleCompleted(id);

  const res = await fetch("/api/tasks", {
    method: "PUT",
    body: JSON.stringify({ id, completed }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const updatedTask = await res.json();
    return updatedTask;
  }
};

export const updateTask = async (id: string, content: string) => {
  const { updateTask } = useTasksStore.getState().taskActions;

  updateTask(id, content);

  const res = await fetch("/api/tasks", {
    method: "PUT",
    body: JSON.stringify({ id, content }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const updatedTask = await res.json();
    return updatedTask;
  }
};

export const deleteTask = async (id: string) => {
  const { removeTask } = useTasksStore.getState().taskActions;

  removeTask(id);

  const res = await fetch("/api/tasks", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const deletedTask = await res.json();
    return deletedTask;
  }
};
