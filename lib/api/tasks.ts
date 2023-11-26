import { createId } from "@paralleldrive/cuid2";
import { useTasksStore } from "@/store";
import { task } from "@prisma/client";
import { dispatchEvent } from "../utils";

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
    createdAt: new Date(),
    completed: false,
    priority: 0
  } as unknown as task;

  addTask(listId, newTask);

  dispatchEvent("newtask", {
    listId: newTask.listId,
    taskId: newTask.id
  });

  const res = await fetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const newTask = await res.json();

    return newTask as task;
  } else {
    alert("Error al crear la tarea, actualiza la página.");
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
  } else {
    alert("Error al completar la tarea, actualiza la página.");
  }
};

export const updateTask = async (id: string, content: string) => {
  const { updateTask } = useTasksStore.getState().taskActions;

  const res = await fetch("/api/tasks", {
    method: "PUT",
    body: JSON.stringify({ id, content }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    updateTask(id, content);

    const updatedTask = await res.json();
    return updatedTask;
  } else {
    alert("Error al actualizar la tarea, actualiza la página.");
  }
};

export const deleteTask = async (id: string, listId: string) => {
  const { removeTask } = useTasksStore.getState().taskActions;

  removeTask(id);

  dispatchEvent("removedtask", {
    taskId: id,
    listId: listId
  });

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
  } else {
    alert("Error al eliminar la tarea, actualiza la página.");
  }
};

export const updateTaskPriority = async (id: string, priority: number) => {
  const { setPriority } = useTasksStore.getState().taskActions;

  const res = await fetch("/api/tasks", {
    method: "PUT",
    body: JSON.stringify({ id, priority }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    setPriority(id, priority);

    const updatedTask = await res.json();
    return updatedTask;
  } else {
    alert("Error al actualizar la tarea, actualiza la página.");
  }
};
