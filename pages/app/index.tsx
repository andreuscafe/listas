import { List } from "@/components/List";
import {
  ListType,
  useListActions,
  useLists,
  useTaskActions,
  useTasksStore
} from "@/store";
import { lists, tasks } from "@prisma/client";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import prisma from "@/lib/prisma";
import { createList } from "@/lib/api/lists";

const phrases = [
  "La vida es una colección de momentos, asegúrate de vivir cada uno.",
  "La felicidad no es un destino, es un camino que eliges caminar.",
  "La verdadera riqueza está en las relaciones y experiencias, no en posesiones.",
  "La gratitud transforma lo que tienes en suficiente.",
  "Aprende a aceptar lo que no puedes cambiar y a cambiar lo que no puedes aceptar.",
  "La mejor inversión que puedes hacer es en ti mismo.",
  "Cada día es una página en blanco, escribe una gran historia.",
  "La paz interior comienza cuando te aceptas a ti mismo.",
  "No mires atrás con arrepentimiento, mira adelante con esperanza.",
  "La vida es frágil, valora cada momento y a las personas que amas."
];

export default function App({
  listsData,
  tasksData
}: {
  listsData: lists[];
  tasksData: tasks[];
}) {
  const lists = useLists();
  const { setLists } = useListActions();
  const { setTasks } = useTaskActions();
  const [clientPhrase, setClientPhrase] = useState(phrases[0]);

  useEffect(() => {
    setLists(
      listsData.map((l) => ({
        id: l.id,
        title: l.title,
        createdAt: l.createdAt,
        folded: false
      })) as ListType[]
    );

    setTasks(
      tasksData.map((t) => ({
        id: t.id,
        content: t.content,
        listId: t.listId,
        createdAt: t.createdAt,
        completed: t.completed
      }))
    );
  }, [listsData, tasksData, setLists, setTasks]);

  useEffect(() => {
    setClientPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  const handleCreateList = useCallback(() => {
    createList();
  }, []);

  return (
    <>
      <Head>
        <title>Mis listas</title>
      </Head>

      <main className="w-full max-w-screen-sm mx-auto px-5 min-h-screen pb-20 font-inter flex flex-col justify-start">
        <section className="max-w-screen-lg mx-auto py-10 block w-full text-center">
          <p className="text-neutral-600">{clientPhrase}</p>
        </section>

        {lists?.map((list) => (
          <List key={list.id} listData={list} />
        ))}

        <button
          className="w-full py-6 opacity-40 hover:opacity-100 transition-opacity rounded-2xl border-[2px] border-white border-opacity-20"
          onClick={handleCreateList}
        >
          Agregar lista
        </button>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const listsData: lists[] = await prisma.lists.findMany();
  const tasksData: tasks[] = await prisma.tasks.findMany();

  return {
    props: {
      listsData: JSON.parse(JSON.stringify(listsData)),
      tasksData: JSON.parse(JSON.stringify(tasksData))
    }
  };
};
