import { SpringTransition } from "@/lib/animations";
import { list, task } from "@prisma/client";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FC, memo } from "react";
import { NewItemInput } from "../NewItemInput";
import { BoardTask } from "./BoardTask";

type BoardListProps = {
  listData: Omit<list, "userId">;
  tasks: Omit<task, "userId">[];
  standalone?: boolean;
  title?: string;
  color?: string;
};

export const BoardList: FC<BoardListProps> = memo(
  ({ listData, standalone, tasks, title = "Lista", color = "text-white" }) => {
    return (
      <motion.div
        className="flex-1 flex flex-col gap-2 overflow-hidden relative"
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
      >
        <h2 className={`font-bold ${color}`}>{title}</h2>

        <motion.ul
          className={`box-content flex flex-col justify-start gap-2 overflow-hidden relative`}
        >
          <AnimatePresence mode="sync">
            {tasks.map((task) => (
              <BoardTask key={task.id} taskData={task} />
            ))}
          </AnimatePresence>

          <NewItemInput listId={listData.id} className="order-last" />
        </motion.ul>
      </motion.div>
    );
  }
);

BoardList.displayName = "BoardList";
