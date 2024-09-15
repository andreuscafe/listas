import { list, task } from "@prisma/client";
import { FC } from "react";
import { BoardList } from "./BoardList";
import { LayoutGroup, motion } from "framer-motion";
import { SpringTransition } from "@/lib/animations";

type TasksBoardProps = {
  listData: Omit<list, "userId">;
  tasks: Omit<task, "userId">[];
  standalone?: boolean;
};

export const TasksBoard: FC<TasksBoardProps> = ({
  listData,
  standalone,
  tasks
}) => {
  return (
    <motion.div
      layout="preserve-aspect"
      initial={{
        height: listData.folded && !standalone ? 0 : "auto",
        x: 30,
        opacity: 0
      }}
      animate={{
        height: listData.folded && !standalone ? 0 : "auto",
        x: 0,
        opacity: 1
      }}
      exit={{
        x: -30,
        opacity: 0
      }}
      transition={SpringTransition}
    >
      <motion.div layout="position" className="flex p-6 pt-8 gap-6">
        <LayoutGroup>
          <BoardList
            key={`${listData.id}-1`}
            title="Por hacer"
            listData={listData}
            tasks={tasks.filter((task) => task.status === 1)}
            standalone={standalone}
            status={1}
            color="text-[#F5F5F5]"
          />
          <BoardList
            key={`${listData.id}-2`}
            title="En curso"
            listData={listData}
            tasks={tasks.filter((task) => task.status === 2)}
            standalone={standalone}
            status={2}
            color="text-[#8DA6E8]"
          />
          <BoardList
            key={`${listData.id}-3`}
            title="Hecho"
            listData={listData}
            tasks={tasks.filter((task) => task.status === 3)}
            standalone={standalone}
            status={3}
            color="text-[#8FCE91]"
          />
        </LayoutGroup>
      </motion.div>
    </motion.div>
  );
};

TasksBoard.displayName = "TasksBoard";
