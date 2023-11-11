import {
  ListType,
  useListActions,
  useTaskActions,
  useTasksStore
} from "@/store";
import { FC, useCallback, useEffect, useState } from "react";
import { BiChevronDown, BiX } from "react-icons/bi";
import { Task } from "./Task";
import { NewItemInput } from "./NewItemInput";
import { deleteListById } from "@/lib/api/lists";

type ListProps = {
  listData: ListType;
};

export const List: FC<ListProps> = ({ listData }) => {
  const { updateListTitle, setFoldedList } = useListActions();
  const { getListTasks } = useTaskActions();

  const [tasks, setTasks] = useState(getListTasks(listData.id));

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteList = useCallback(() => {
    if (confirmDelete) {
      deleteListById(listData.id);
    } else {
      setConfirmDelete(true);
    }
  }, [confirmDelete, listData.id]);

  const refreshTasks = useCallback(
    (e: CustomEvent) => {
      if (e.detail.listId === listData.id) {
        setTasks(getListTasks(listData.id));

        setTimeout(() => {
          // Focus textarea
          if (e.type === "newtask") {
            const textarea = document.querySelector(
              `textarea[data-taskid="${e.detail.taskId}"]`
            ) as HTMLTextAreaElement;

            if (textarea) {
              textarea.focus();
            }
          } else if (e.type === "removedtask") {
            console.log(
              "removedtask, intentando pegarle a:",
              tasks.indexOf(e.detail.taskId)
            );

            const textarea = document.querySelector(
              `textarea[data-taskid="${tasks[tasks.length - 2].id}"]`
            ) as HTMLTextAreaElement;

            if (textarea) {
              textarea.focus();
            }
          }
        }, 10);
      }
    },
    [getListTasks, listData.id, tasks]
  );

  useEffect(() => {
    if (window) {
      window.removeEventListener("newtask", refreshTasks as EventListener);
      window.removeEventListener("removedtask", refreshTasks as EventListener);

      window.addEventListener("newtask", refreshTasks as EventListener);
      window.addEventListener("removedtask", refreshTasks as EventListener);
    }

    return () => {
      if (window) {
        window.removeEventListener("newtask", refreshTasks as EventListener);
        window.removeEventListener(
          "removedtask",
          refreshTasks as EventListener
        );
      }
    };
  }, [refreshTasks]);

  return (
    <section className="p-6 mb-10 rounded-2xl backdrop-blur-xl border-[2px] border-neutral-700 relative">
      <div className="block absolute top-0 left-4 -translate-y-1/2 bg-[#0A0A0A]">
        <span className="p-4 whitespace-pre opacity-0">{listData.title}</span>
        <input
          onChange={(e) => {
            updateListTitle(listData.id, e.currentTarget.value || "");
          }}
          className="p-0 text-center bg-transparent absolute top-0 left-0 w-full h-full outline-none"
          defaultValue={listData.title}
          autoComplete="off"
          spellCheck="false"
          id={`list-title-${listData.id}`}
        />
      </div>

      <div className="absolute top-0 right-4 -translate-y-1/2 flex">
        <button
          className={`p-2 bg-[#0A0A0A] rounded-lg transition-colors duration-300 group ${
            confirmDelete ? "bg-red-900" : ""
          }`}
          onClick={handleDeleteList}
          onBlur={() => {
            setConfirmDelete(false);
          }}
        >
          <BiX
            size={24}
            className="opacity-40 group-hover:opacity-100 transition-opacity"
          />
        </button>
        <button
          className="p-2 bg-[#0A0A0A] rounded-lg transition-colors duration-300 group"
          onClick={() => setFoldedList(listData.id, !listData.folded)}
        >
          <BiChevronDown
            size={24}
            className={`opacity-40 group-hover:opacity-100 transition-all duration-300 ${
              !listData.folded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Tasks list */}
      <ul
        className={`flex flex-col justify-start gap-2 transition-all duration-300 overflow-auto ${
          listData.folded ? "max-h-0 overflow-hidden" : "max-h-[500px]"
        }`}
      >
        {tasks.map((task) => (
          <Task key={task.id} taskData={task} />
        ))}

        {!tasks.length && <NewItemInput listId={listData.id} />}
      </ul>
    </section>
  );
};
