import { List } from "@/components/List";
import prisma from "@/lib/prisma";
import { useList, useListActions, useTaskActions } from "@/store";
import { list, task } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";

type ListPageProps = {
  listData: (list & { tasks: task[] }) | null;
};

export default function ListPage({ listData }: ListPageProps) {
  const list = useList(listData?.id as list["id"]);

  const { setTasks } = useTaskActions();
  const { setLists } = useListActions();

  useEffect(() => {
    if (listData) {
      setLists([
        {
          id: listData.id,
          title: listData.title,
          createdAt: new Date(listData.createdAt),
          folded: listData.folded
        }
      ] as list[]);

      setTasks(
        listData.tasks
          .map((t) => ({
            ...t,
            createdAt: new Date(t.createdAt) // convert to Date object
          }))
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()) // use getTime() to compare dates
      );
    }
  }, [setLists, setTasks, listData]);

  return (
    <main className="w-full max-w-screen-sm mx-auto px-5 min-h-screen py-10 pb-20 font-inter flex flex-col justify-start">
      <header className="pb-8">
        <Link
          href={"/app"}
          className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
        >
          <BiArrowBack />
          Volver
        </Link>
      </header>
      {list ? (
        <List listData={list} standalone />
      ) : (
        <div>No se encontró esta lista.</div>
      )}
    </main>
  );
}

export const getServerSideProps = (async (context) => {
  if (!context.params?.id) {
    return {
      props: {
        listData: null
      }
    };
  }

  const listData: list | null = await prisma.list.findFirst({
    where: {
      id: context.params?.id as string
    },
    include: {
      tasks: true
    }
  });

  return {
    props: {
      listData: JSON.parse(JSON.stringify(listData))
    }
  };
}) satisfies GetServerSideProps<{ listData: list }>;
