import { list } from "@prisma/client";
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
    createdAt: new Date(),
    folded: false
  } as list;

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

export const updateList = async (id: string, title: string) => {
  const { updateListTitle } = useTasksStore.getState().listActions;

  const res = await fetch("/api/lists", {
    method: "PUT",
    body: JSON.stringify({ id, title }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    updateListTitle(id, title);

    const newList = await res.json();
    return newList;
  } else {
    alert("Error al actualizar la lista, actualiza la página.");
  }
};

export const foldList = async (id: string, folded: boolean) => {
  const { setFoldedList } = useTasksStore.getState().listActions;
  setFoldedList(id, folded);

  const res = await fetch("/api/lists", {
    method: "PUT",
    body: JSON.stringify({ id, folded }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const newList = await res.json();
    return newList;
  } else {
    alert("Error al actualizar la lista, actualiza la página.");
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
  } else {
    alert("Error al eliminar la lista, actualiza la página.");
  }
};
