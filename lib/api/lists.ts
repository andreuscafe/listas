import { lists } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";
import { useTasksStore } from "@/store";

export const getLists = async () => {
  const res = await fetch("/api/lists");

  if (res.ok) {
    const lists = await res.json();
    return lists;
  }
};

export const createList = async () => {
  const { addList } = useTasksStore.getState().listActions;

  const newList = {
    id: createId(),
    title: "Nueva lista",
    createdAt: new Date()
  } as lists;

  addList(newList);

  const res = await fetch("/api/lists", {
    method: "POST",
    body: JSON.stringify(newList),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const newList = await res.json();
    return newList;
  }
};

export const deleteListById = async (id: string) => {
  const { deleteList } = useTasksStore.getState().listActions;

  deleteList(id);

  const res = await fetch("/api/lists", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const newList = await res.json();
    return newList;
  }
};
