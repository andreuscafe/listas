import { ListType, useTaskActions, useTasksStore } from "@/store";
import { dispatchEvent } from "@/lib/utils";
import { FC, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { createId } from "@paralleldrive/cuid2";

type NewItemInputProps = {
  listId: ListType["id"];
  completed?: boolean;
};

export const NewItemInput: FC<NewItemInputProps> = ({
  listId,
  completed = false
}) => {
  const { addTask } = useTaskActions();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!e.currentTarget.value) {
        return;
      }

      const newTask = addTask(listId, {
        id: createId(),
        content: e.currentTarget.value,
        completed: false,
        listId
      });

      dispatchEvent("newtask", {
        listId: newTask.listId,
        taskId: newTask.id
      });

      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <li className={`relative flex gap-1 items-start leading-6 group/item`}>
      {/* <BiCircle size={36} className="flex-shrink-0 opacity-20" /> */}
      <TextareaAutosize
        ref={textAreaRef}
        placeholder="Escribí algo..."
        className="text-base placeholder:text-[#666] text-neutral-400 bg-transparent w-full resize-none outline-none focus:bg-white focus:bg-opacity-5 py-1 px-2 rounded"
        rows={1}
        onKeyDown={handleKeyDown}
        id="new-task-input"
      />
    </li>
  );
};
