import {
  completeTask,
  createTask,
  deleteTask,
  updateTask,
  updateTaskPriority
} from "@/lib/api/tasks";
import { useTaskActions } from "@/store";
import { task } from "@prisma/client";
import { FC, memo, useCallback, useRef, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import ReactTextareaAutosize from "react-textarea-autosize";

type TaskProps = {
  taskData: task;
};

export const Task: FC<TaskProps> = memo(({ taskData }) => {
  const contentTimer = useRef<NodeJS.Timeout>();
  const priorityTimer = useRef<NodeJS.Timeout>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { getTaskById } = useTaskActions();

  const [completed, setCompleted] = useState(taskData.completed);
  const [priority, setPriority] = useState(taskData.priority);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if there isn't a value and key is delete, delete the task
    if (!e.currentTarget.value && e.key === "Backspace") {
      handleDeleteButton();
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
    await completeTask(id);
  };

  const handleDeleteButton = useCallback(async () => {
    if (confirmDelete || !textareaRef.current?.value) {
      await deleteTask(taskData.id, taskData.listId);
    } else {
      setConfirmDelete(true);
    }
  }, [confirmDelete, taskData.id, taskData.listId]);

  const handlePriorityChange = useCallback(() => {
    const newPriority = priority === 3 ? 0 : priority + 1;
    setPriority(newPriority);
    taskData.priority = newPriority;

    if (priorityTimer.current) clearTimeout(priorityTimer.current);

    priorityTimer.current = setTimeout(async () => {
      if (!getTaskById(taskData.id)) {
        return;
      }
      console.log("priority changed for task", newPriority);
      await updateTaskPriority(taskData.id, taskData.priority);
    }, 500);
  }, [priority, taskData, getTaskById]);

  return (
    <div
      className={`group/item focus-within:bg-[#111] p-2 rounded-lg transition-colors duration-200 ${
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
        className={`relative flex gap-1 items-start leading-6 transition-opacity ${
          completed ? "opacity-40" : ""
        }`}
      >
        {/* Priority order */}
        <button
          onClick={handlePriorityChange}
          tabIndex={-1}
          className={
            "absolute right-[calc(100%+4px)] top-0 z-10 w-6 h-6 flex items-center justify-center rounded-lg cursor-pointer bg-opacity-0 hover:bg-opacity-40 transition-all duration-300" +
            (priority === 1
              ? " bg-yellow-500"
              : priority === 2
              ? " bg-yellow-700"
              : priority === 3
              ? " bg-red-800"
              : " bg-neutral-50")
          }
        >
          <span
            className={
              "select-none transition-all duration-300" +
              (priority === 0
                ? " text-neutral-50 opacity-0 group-hover/item:opacity-50"
                : priority === 1
                ? " text-yellow-500"
                : priority === 2
                ? " text-yellow-700"
                : " text-red-800")
            }
          >
            {priority === 0 ? "!" : priority}
          </span>
        </button>

        {/* Checkbox */}
        <button
          className="flex-shrink-0 relative"
          tabIndex={-1}
          role={"button"}
          onClick={() => {
            handleComplete(taskData.id);
          }}
        >
          {/* <BiCircle size={36} /> */}
          <div className="w-6 h-6 border-[2px] border-neutral-700 rounded-lg overflow-hidden">
            {completed && (
              <BiCheck
                size={16}
                className="absolute w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </button>

        {/* Task content */}
        <ReactTextareaAutosize
          ref={textareaRef}
          placeholder="Escribí algo..."
          className={`text-base text-neutral-400 placeholder:text-[#333] bg-transparent w-full resize-none outline-none transition-colors py-0 px-2 rounded  ${
            completed ? "line-through" : ""
          }`}
          rows={1}
          defaultValue={taskData.content}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          data-taskid={taskData.id}
          autoComplete="off"
          spellCheck="false"
        />

        {/* Delete button */}
        <button
          type="button"
          className={`group/delete w-10 rounded-md self-stretch flex items-center justify-center cursor-pointer outline-none transition-colors duration-300 ${
            confirmDelete ? "bg-red-900" : ""
          }`}
          onClick={handleDeleteButton}
          onBlur={() => {
            setConfirmDelete(false);
          }}
          tabIndex={-1}
        >
          <BiX
            size={18}
            className="opacity-0 group-hover/item:opacity-30 group-focus-within/item:opacity-30 group-hover/delete:!opacity-100 group-focus-within/delete:!opacity-100 transition-opacity"
          />
        </button>
      </div>
    </div>
  );
});

Task.displayName = "Task";
