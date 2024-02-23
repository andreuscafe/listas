import {
  completeTask,
  createTask,
  deleteTask,
  updateTask
} from "@/lib/api/tasks";
import { useTaskActions } from "@/store";
import { task } from "@prisma/client";
import { FC, memo, useCallback, useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import ReactTextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion";
import { SpringTransition } from "@/lib/animations";

type BoardTaskProps = {
  taskData: Omit<task, "userId">;
};

export const BoardTask: FC<BoardTaskProps> = memo(({ taskData }) => {
  const contentTimer = useRef<NodeJS.Timeout>();
  const priorityTimer = useRef<NodeJS.Timeout>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { getTaskById } = useTaskActions();

  const [completed, setCompleted] = useState(taskData.completed);
  const [priority, setPriority] = useState(taskData.priority);

  const [editable, setEditable] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if there isn't a value and key is delete, delete the task
    if (!e.currentTarget.value && e.key === "Backspace") {
      handleDeleteButton(null);
      return;
    }

    if (e.key === "Enter" || e.key === "NumpadEnter") {
      // if cmd + enter or ctrl + enter, mark task as completed
      if (e.metaKey || e.ctrlKey) {
        handleComplete(taskData.id);
      } else {
        e.stopPropagation();
        e.preventDefault();

        await createTask(taskData.listId);
      }
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.currentTarget.value;

      if (contentTimer.current) clearTimeout(contentTimer.current);

      contentTimer.current = setTimeout(async () => {
        if (newValue === taskData.content || !getTaskById(taskData.id)) {
          return;
        }

        await updateTask(taskData.id, newValue).then(() => {
          taskData.content = newValue;
        });
      }, 500);
    },
    [getTaskById, taskData]
  );

  const handleComplete = async (id: task["id"]) => {
    setCompleted(!completed);
    await completeTask(id, taskData.listId);
  };

  const handleDeleteButton = useCallback(
    async (e: React.MouseEvent | null) => {
      if (e) e.stopPropagation();

      if (
        (confirmDelete || !textareaRef.current?.value) &&
        !!getTaskById(taskData.id)
      ) {
        await deleteTask(taskData.id, taskData.listId);
      } else {
        setConfirmDelete(true);
      }
    },
    [confirmDelete, taskData.id, taskData.listId, getTaskById]
  );

  return (
    <motion.div
      layout
      draggable={!editable}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={SpringTransition}
      className={`group/item rounded-lg bg-background transition-colors duration-200 overflow-hidden border border-neutral-700 ${
        priority === 3
          ? "order-1"
          : priority === 2
          ? "order-2"
          : priority === 1
          ? "order-3"
          : "order-last"
      } ${completed ? "!order-[10000]" : ""}`}
    >
      {/* Main task */}
      <div
        onClick={() => {
          setEditable(true);
          setTimeout(() => {
            textareaRef.current?.focus();
          }, 0);
        }}
        className={`relative flex gap-1 items-start leading-6 transition-opacity ${
          completed ? "opacity-40" : ""
        } ${editable ? "" : "cursor-pointer"}`}
      >
        {/* Task content */}
        <ReactTextareaAutosize
          ref={textareaRef}
          placeholder="Escribí algo..."
          className={`text-base text-neutral-400 focus:bg-[#111] placeholder:text-[#333] bg-transparent w-full h-auto resize-none outline-none transition-colors p-2 rounded  ${
            completed ? "line-through" : ""
          } ${editable ? "cursor-text" : "pointer-events-none"}`}
          rows={1}
          defaultValue={taskData.content}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          disabled={!editable}
          onBlur={() => setEditable(false)}
          data-taskid={taskData.id}
          maxLength={480}
          autoComplete="off"
          spellCheck="false"
        />

        {/* Delete button */}
        {/* {!editable && ( */}
        <button
          type="button"
          className={`group/delete bg-background w-10 h-[calc(100%-1rem)] rounded-md self-stretch flex items-center justify-center cursor-pointer outline-none transition-all duration-300 z-20 absolute top-2 right-2 ${
            confirmDelete ? "!bg-red-900" : ""
          } ${
            editable
              ? "!opacity-0 pointer-events-none"
              : "opacity-0 group-hover/item:opacity-80 hover:bg-[#111] hover:!opacity-100"
          }`}
          onClick={handleDeleteButton}
          onBlur={() => {
            setConfirmDelete(false);
          }}
          tabIndex={-1}
        >
          <BiX
            size={18}
            className="group-hover/delete:!opacity-100 group-focus-within/delete:!opacity-100 transition-opacity"
          />
        </button>
        {/* )} */}
      </div>
    </motion.div>
  );
});

BoardTask.displayName = "Task";
