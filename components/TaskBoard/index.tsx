import { list, task } from "@prisma/client";
import { FC, memo } from "react";
import { BoardList } from "./BoardList";

type TasksBoardProps = {
  listData: Omit<list, "userId">;
  tasks: Omit<task, "userId">[];
  standalone?: boolean;
};

export const TasksBoard: FC<TasksBoardProps> = memo(
  ({ listData, standalone, tasks }) => {
    return (
      <div className="flex px-6 gap-6">
        <BoardList
          title="Por hacer"
          listData={listData}
          tasks={tasks}
          standalone={standalone}
        />
        <BoardList
          title="En curso"
          listData={listData}
          tasks={[]}
          standalone={standalone}
        />
        <BoardList
          title="Hecho"
          listData={listData}
          tasks={[]}
          standalone={standalone}
        />
      </div>
    );
  }
);

TasksBoard.displayName = "TasksBoard";
