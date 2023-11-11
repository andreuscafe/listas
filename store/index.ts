import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskType = {
  id: string;
  content: string;
  completed: boolean;
  listId: ListType["id"];
  createdAt?: Date;
};

export type ListType = {
  id: string;
  title: string;
  folded?: boolean;
  createdAt?: Date;
};

export type TasksStore = {
  lists: ListType[];
  listActions: {
    setLists: (lists: ListType[]) => void;
    addList: (list?: ListType) => void;
    updateListTitle: (id: ListType["id"], title: ListType["title"]) => void;
    deleteList: (id: ListType["id"]) => void;
    setFoldedList: (id: ListType["id"], folded: ListType["folded"]) => void;
  };

  tasks: TaskType[];
  taskActions: {
    setTasks: (tasks: TaskType[]) => void;
    addTask: (listId: ListType["id"], task?: TaskType) => TaskType;
    removeTask: (id: TaskType["id"]) => void;
    toggleCompleted: (id: TaskType["id"]) => void;
    updateTask: (id: TaskType["id"], content: TaskType["content"]) => void;
    getListTasks: (listId: ListType["id"]) => TaskType[];
    getTaskById: (id: TaskType["id"]) => TaskType;
  };
};

const generateEmptyTask = (listId: ListType["id"]) => {
  return {
    id: createId(),
    content: ``,
    completed: false,
    listId
  } as TaskType;
};

export const useTasksStore = create<TasksStore>((set, get) => ({
  lists: [],
  listActions: {
    setLists: (lists) => set({ lists }),
    addList: (list) => {
      set((state) => ({
        lists: [
          ...state.lists,
          list || {
            id: Math.random().toString(36).substr(2, 9),
            title: `Nueva lista`,
            folded: false
          }
        ]
      }));
    },
    updateListTitle: (id: ListType["id"], title: ListType["title"]) =>
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
    deleteList: (id: ListType["id"]) =>
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== id)
      })),
    setFoldedList: (id: ListType["id"], folded: ListType["folded"]) =>
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
      }))
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
      return tasks.find((task) => task.id === id) as TaskType;
    }
  }
}));

export const useLists = () => useTasksStore((state) => state.lists);
export const useListActions = () => useTasksStore((state) => state.listActions);

export const useTasks = (listId: ListType["id"]) =>
  useTasksStore((state) => ({
    tasks: state.tasks.filter((task) => task.listId === listId)
  }));
export const useTaskActions = () => useTasksStore((state) => state.taskActions);
