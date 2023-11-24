import { createId } from "@paralleldrive/cuid2";
import { list, task } from "@prisma/client";
import { create } from "zustand";

export type TasksStore = {
  lists: list[];
  listActions: {
    setLists: (lists: list[]) => void;
    addList: (list?: list) => void;
    updateListTitle: (id: list["id"], title: list["title"]) => void;
    deleteList: (id: list["id"]) => void;
    setFoldedList: (id: list["id"], folded: list["folded"]) => void;
    getListById: (id: list["id"]) => list;
  };

  tasks: task[];
  taskActions: {
    setTasks: (tasks: task[]) => void;
    addTask: (listId: list["id"], task?: task) => task;
    removeTask: (id: task["id"]) => void;
    toggleCompleted: (id: task["id"]) => void;
    updateTask: (id: task["id"], content: task["content"]) => void;
    getListTasks: (listId: list["id"]) => task[];
    getTaskById: (id: task["id"]) => task;
  };
};

const generateEmptyTask = (listId: list["id"]) => {
  return {
    id: createId(),
    content: ``,
    completed: false,
    listId
  } as task;
};

export const useTasksStore = create<TasksStore>((set, get) => ({
  lists: [],
  listActions: {
    setLists: (lists) => set({ lists }),
    addList: (list) =>
      set((state) => ({
        lists: [
          ...state.lists,
          list || {
            id: createId(),
            title: "",
            createdAt: new Date(),
            folded: false
          }
        ]
      })),
    updateListTitle: (id: list["id"], title: list["title"]) =>
      set((state) => ({
        lists: state.lists.map((list) => {
          if (list.id === id) {
            return {
              ...list,
              title
            };
          }
          return list;
        })
      })),
    deleteList: (id: list["id"]) =>
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== id)
      })),
    setFoldedList: (id: list["id"], folded: list["folded"]) =>
      set((state) => ({
        lists: state.lists.map((list) => {
          if (list.id === id) {
            return {
              ...list,
              folded
            };
          }
          return list;
        })
      })),
    getListById: (id: list["id"]) => {
      const lists = get().lists;
      return lists.find((list) => list.id === id) as list;
    }
  },

  tasks: [],
  taskActions: {
    setTasks: (tasks) => set({ tasks }),
    addTask: (listId, task) => {
      const newTask = task ? task : generateEmptyTask(listId);

      set((state) => ({
        tasks: [...state.tasks, newTask]
      }));

      return newTask;
    },
    removeTask: (id) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      })),
    toggleCompleted: (id) => {
      let completed;
      set((state) => {
        return {
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              completed = !task.completed;
              return {
                ...task,
                completed: completed
              };
            }
            return task;
          })
        };
      });
      return completed;
    },
    updateTask: (id, content) =>
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              content
            };
          }
          return task;
        })
      })),
    getListTasks: (listId) => {
      const tasks = get().tasks;
      return tasks.filter((task) => task.listId === listId);
    },
    getTaskById: (id) => {
      const tasks = get().tasks;
      return tasks.find((task) => task.id === id) as task;
    }
  }
}));

export const useLists = () => useTasksStore((state) => state.lists);
export const useList = (listId: list["id"]) =>
  useTasksStore(
    (state) => state.lists.find((list) => list.id === listId) as list
  );
export const useListActions = () => useTasksStore((state) => state.listActions);

export const useTasks = (listId: list["id"]) =>
  useTasksStore((state) => ({
    tasks: state.tasks.filter((task) => task.listId === listId)
  }));
export const useTaskActions = () => useTasksStore((state) => state.taskActions);
