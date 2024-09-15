import { list, task } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { FC, memo } from "react";
import { NewItemInput } from "../NewItemInput";
import { BoardTask } from "./BoardTask";
import { updateTaskStatus } from "@/lib/api/tasks";
import { useTaskActions } from "@/store/useTasksStore";

type BoardListProps = {
  listData: Omit<list, "userId">;
  tasks: Omit<task, "userId">[];
  standalone?: boolean;
  title?: string;
  color?: string;
  status: 1 | 2 | 3;
};

export const BoardList: FC<BoardListProps> = memo(
  ({
    listData,
    standalone,
    tasks,
    title = "Lista",
    color = "text-[#F5F5F5]",
    status
  }) => {
    const { getTaskById } = useTaskActions();

    const handleDrop = (e: any) => {
      e.preventDefault();
      const task = getTaskById(e.dataTransfer.getData("text"));

      if (task.status !== status) {
        updateTaskStatus(e.dataTransfer.getData("text"), listData.id, status);
      }
    };

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDropCapture={handleDrop}
        className="flex-1 flex flex-col gap-3 relative"
      >
        <h2 className={`font-normal ${color}`}>{title}</h2>

        <ul className={`flex flex-col justify-start gap-2 relative`}>
          <AnimatePresence mode="sync">
            {tasks.map((task) => (
              <BoardTask key={task.id} taskData={task} />
            ))}

            <NewItemInput
              listId={listData.id}
              className="!order-[10001] rounded-lg overflow-hidden flex-none"
              status={status}
              outlined
            />
          </AnimatePresence>
        </ul>
      </div>
    );
  }
);

BoardList.displayName = "BoardList";
