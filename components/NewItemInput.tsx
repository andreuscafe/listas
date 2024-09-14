import { FC, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { createTask } from "@/lib/api/tasks";
import { list } from "@prisma/client";
import { motion } from "framer-motion";

type NewItemInputProps = {
  listId: list["id"];
  className?: string;
  status?: 1 | 2 | 3;
  outlined?: boolean;
};

export const NewItemInput: FC<NewItemInputProps> = ({
  listId,
  className,
  status,
  outlined = false
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!e.currentTarget.value) {
        return;
      }

      const newTask = await createTask(listId, e.currentTarget.value, status);

      if (!newTask) {
        return;
      }

      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <motion.li
      key={`new-task-${listId}`}
      layout="preserve-aspect"
      className={`relative flex gap-1 items-start leading-6 group/item ${className} ${
        outlined ? "border border-neutral-800" : ""
      }`}
    >
      <TextareaAutosize
        ref={textAreaRef}
        placeholder="Escribí algo..."
        className={`text-base placeholder:text-neutral-700 text-neutral-400 bg-transparent w-full resize-none outline-none py-1 px-2 rounded ${
          !outlined ? "focus:bg-white focus:bg-opacity-5" : "py-2"
        }`}
        rows={1}
        onKeyDown={handleKeyDown}
        maxLength={480}
        id={status ? `new-task-${listId}-${status}` : `new-task-${listId}`}
      />
    </motion.li>
  );
};
