import { SpringTransition } from "@/lib/animations";
import { list, task } from "@prisma/client";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FC, memo } from "react";
import { Task } from "../TasksList/ListTask";
import { NewItemInput } from "../NewItemInput";

type BoardProps = {
  listData: Omit<list, "userId">;
  tasks: Omit<task, "userId">[];
  standalone?: boolean;
};

export const Board: FC<BoardProps> = memo(({ listData, standalone, tasks }) => {
  return (
    <motion.ul
      initial={{
        height: listData.folded && !standalone ? 0 : "auto",
        paddingBottom: listData.folded && !standalone ? 0 : "1.5rem",
        paddingTop: listData.folded && !standalone ? 0 : "1.5rem"
      }}
      animate={{
        height: listData.folded && !standalone ? 0 : "auto",
        paddingBottom: listData.folded && !standalone ? 0 : "1.5rem",
        paddingTop: listData.folded && !standalone ? 0 : "1.5rem"
      }}
      transition={SpringTransition}
      className={`px-6 box-content flex flex-col justify-start gap-2 overflow-hidden relative`}
    >
      <AnimatePresence mode="sync">
        {tasks.map((task) => (
          <Task key={task.id} taskData={task} />
        ))}
      </AnimatePresence>

      {!tasks.length && <NewItemInput listId={listData.id} />}
    </motion.ul>
  );
});

Board.displayName = "Board";
