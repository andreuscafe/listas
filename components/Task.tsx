import {
  completeTask,
  createTask,
  deleteTask,
  updateTask
} from "@/lib/api/tasks";
import { dispatchEvent } from "@/lib/utils";
import { TaskType, useTaskActions, useTasksStore } from "@/store";
import { tasks } from "@prisma/client";
import { FC, useCallback, useRef, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import ReactTextareaAutosize from "react-textarea-autosize";

type TaskProps = {
  taskData: TaskType;
};

export const Task: FC<TaskProps> = ({ taskData }) => {
  const { removeTask, getTaskById } = useTaskActions();

  const timer = useRef<NodeJS.Timeout>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [completed, setCompleted] = useState(taskData.completed);

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

        const newTask = await createTask(taskData.listId);

        dispatchEvent("newtask", {
          listId: taskData.listId,
          taskId: newTask.id
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;

    if (!e.currentTarget.value) {
      return;
    }

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      console.log("updating task", newValue);
      await updateTask(taskData.id, newValue);
    }, 500);
  };

  const handleComplete = async (id: tasks["id"]) => {
    await completeTask(id);
    setCompleted(getTaskById(id).completed);
  };

  const handleDeleteButton = useCallback(async () => {
    if (confirmDelete || !taskData.content) {
      await deleteTask(taskData.id);

      dispatchEvent("removedtask", {
        listId: taskData.listId,
        taskId: taskData.id
      });
    } else {
      setConfirmDelete(true);
    }
  }, [confirmDelete, taskData.id, taskData.listId, taskData.content]);

  return (
    <div
      className={`focus-within:bg-[#111] p-2 rounded-lg transition-colors duration-200 ${
        completed ? "order-last" : ""
      }`}
    >
      {/* Main task */}
      <div
        className={`group/item relative flex gap-1 items-start leading-6 transition-opacity ${
          completed ? "opacity-40" : ""
        }`}
      >
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
};
