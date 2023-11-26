import { useTaskActions } from "@/store";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { BiChevronDown, BiRightTopArrowCircle, BiX } from "react-icons/bi";
import { Task } from "./Task";
import { NewItemInput } from "./NewItemInput";
import { deleteListById, foldList, updateList } from "@/lib/api/lists";
import { useRouter } from "next/router";
import { list } from "@prisma/client";

type ListProps = {
  listData: list;
  standalone?: boolean;
};

export const List: FC<ListProps> = memo(({ listData, standalone = false }) => {
  const router = useRouter();

  const [listTitle, setListTitle] = useState(listData.title);

  const { getListTasks } = useTaskActions();

  const [tasks, setTasks] = useState(getListTasks(listData.id));

  const [confirmDelete, setConfirmDelete] = useState(false);

  const timer = useRef<NodeJS.Timeout>();

  const handleDeleteList = useCallback(async () => {
    if (confirmDelete) {
      await deleteListById(listData.id);
      if (standalone) router.push("/app");
    } else {
      setConfirmDelete(true);
    }
  }, [confirmDelete, listData.id, router, standalone]);

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
          } else if (e.type === "removedtask" && tasks.length) {
            const textarea = document.querySelector(
              `textarea[data-taskid="${tasks[tasks.length - 1].id}"]`
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    if (!e.currentTarget.value) {
      return;
    }

    setListTitle(newValue);
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      if (newValue === listData.title) {
        return;
      }

      await updateList(listData.id, newValue).then(() => {
        listData.title = newValue;
      });
    }, 500);
  };

  const handleFoldList = useCallback(async () => {
    foldList(listData.id, !listData.folded)
      .then(() => {
        listData.folded = !listData.folded;
      })
      .catch(() => {
        console.error("Error folding list");
      });
  }, [listData]);

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
    <section className="relative">
      {/* Header */}
      <nav className="absolute z-10 top-0 -translate-y-1/2 w-full flex justify-between px-4">
        <div className="block relative bg-[#0A0A0A]">
          <h4 className="text-base inline p-4 whitespace-pre opacity-0">
            {listTitle}
          </h4>
          <input
            onChange={handleTitleChange}
            className="p-0 text-center bg-transparent absolute top-0 left-0 w-full h-full outline-none"
            defaultValue={listData.title}
            autoComplete="off"
            spellCheck="false"
            id={`list-title-${listData.id}`}
          />
        </div>

        <div className="flex">
          {!standalone && (
            <button
              className={`p-2 bg-[#0A0A0A] rounded-lg transition-colors duration-300 group`}
              onClick={() => {
                router.push(`/app/list/${listData.id}`);
              }}
            >
              <BiRightTopArrowCircle
                size={24}
                className="opacity-40 group-hover:opacity-100 transition-opacity"
              />
            </button>
          )}

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

          {!standalone && (
            <button
              className="p-2 bg-[#0A0A0A] rounded-lg transition-colors duration-300 group"
              onClick={handleFoldList}
            >
              <BiChevronDown
                size={24}
                className={`opacity-40 group-hover:opacity-100 transition-all duration-300 ${
                  !listData.folded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </nav>

      {/* Wrapper */}
      <div
        className={`mb-10 rounded-2xl backdrop-blur-xl border-[2px] border-neutral-700 relative overflow-hidden ${
          tasks.length
            ? "after:absolute after:top-0 after:left-0 after:w-full after:h-8 after:bg-gradient-to-b after:from-[#0A0A0A] after:via-60% after:via-[#0A0A0A] after:to-transparent after:z-10"
            : ""
        }`}
      >
        {/* Tasks list */}
        <ul
          className={`px-6 py-6 flex flex-col justify-start gap-2 transition-all duration-300 overflow-y-auto overflow-x-hidden relative ${
            listData.folded && !standalone
              ? "max-h-0 pb-0 overflow-hidden"
              : standalone
              ? "max-h-max"
              : "max-h-[500px]"
          }`}
        >
          {tasks.map((task) => (
            <Task key={task.id} taskData={task} />
          ))}

          {!tasks.length && <NewItemInput listId={listData.id} />}
        </ul>
      </div>
    </section>
  );
});

List.displayName = "List";
