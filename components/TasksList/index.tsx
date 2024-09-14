import { SpringTransition } from "@/lib/animations";
import { list, task } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo } from "react";
import { ListTask } from "./ListTask";
import { NewItemInput } from "../NewItemInput";

type TasksListProps = {
  listData: Omit<list, "userId">;
  tasks: Omit<task, "userId">[];
  standalone?: boolean;
};

export const TasksList: FC<TasksListProps> = memo(
  ({ listData, standalone, tasks }) => {
    return (
      <motion.ul
        className="!origin-top"
        initial={{
          height: listData.folded && !standalone ? 0 : "auto",
          // paddingBottom: listData.folded && !standalone ? 0 : "1.5rem",
          // paddingTop: listData.folded && !standalone ? 0 : "1.5rem",

          x: 30,
          y: 0,
          opacity: 0,
          originX: 0,
          originY: 0
        }}
        animate={{
          height: listData.folded && !standalone ? 0 : "auto",
          // paddingBottom: listData.folded && !standalone ? 0 : "1.5rem",
          // paddingTop: listData.folded && !standalone ? 0 : "1.5rem",

          x: 0,
          y: 0,
          top: 0,
          opacity: 1,
          originX: 0,
          originY: 0
        }}
        exit={{
          x: -30,
          opacity: 0
        }}
        transition={SpringTransition}
      >
        <div className="p-6 box-content flex flex-col justify-start gap-2 overflow-hidden relative">
          <AnimatePresence mode="sync">
            {tasks.map((task) => (
              <ListTask key={task.id} taskData={task} />
            ))}
            {!tasks.length && <NewItemInput listId={listData.id} />}
          </AnimatePresence>
        </div>
      </motion.ul>
    );
  }
);

TasksList.displayName = "TasksList";
