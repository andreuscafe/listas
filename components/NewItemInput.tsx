import { FC, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { createTask } from "@/lib/api/tasks";
import { list } from "@prisma/client";

type NewItemInputProps = {
  listId: list["id"];
  className?: string;
};

export const NewItemInput: FC<NewItemInputProps> = ({ listId, className }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!e.currentTarget.value) {
        return;
      }

      const newTask = await createTask(listId, e.currentTarget.value);

      if (!newTask) {
        return;
      }

      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <li
      className={`relative flex gap-1 items-start leading-6 group/item ${className}`}
    >
      <TextareaAutosize
        ref={textAreaRef}
        placeholder="Escribí algo..."
        className="text-base placeholder:text-[#666] text-neutral-400 bg-transparent w-full resize-none outline-none focus:bg-white focus:bg-opacity-5 py-1 px-2 rounded"
        rows={1}
        onKeyDown={handleKeyDown}
        maxLength={480}
        id="new-task-input"
      />
    </li>
  );
};
