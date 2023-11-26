import { List } from "@/components/List";
import { useListActions, useLists, useTaskActions } from "@/store";
import { list, task } from "@prisma/client";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import prisma from "@/lib/prisma";
import { createList } from "@/lib/api/lists";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

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

type AppProps = {
  listsData: (list & { tasks: task[] })[];
};

export default function App({ listsData }: AppProps) {
  const lists = useLists();
  const { setLists } = useListActions();
  const { setTasks } = useTaskActions();
  const [clientPhrase, setClientPhrase] = useState(phrases[0]);

  useEffect(() => {
    setLists(
      listsData
        .map((l) => ({
          id: l.id,
          title: l.title,
          createdAt: new Date(l.createdAt),
          folded: l.folded
        }))
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()) as list[]
    );

    setTasks(
      listsData
        .map(
          (l) =>
            l.tasks
              .map((t) => ({
                ...t,
                createdAt: new Date(t.createdAt) // convert to Date object
              }))
              .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()) // use getTime() to compare dates
        )
        .flat()
    );
  }, [listsData, setLists, setTasks]);

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

        <LayoutGroup>
          <AnimatePresence mode="sync">
            {lists?.map((list) => (
              <List key={list.id} listData={list} />
            ))}
          </AnimatePresence>

          <motion.button
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-6 opacity-40 hover:opacity-100 transition-opacity rounded-2xl border-[2px] border-white border-opacity-20"
            onClick={handleCreateList}
          >
            Agregar lista
          </motion.button>
        </LayoutGroup>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const listsData: list[] = await prisma.list.findMany({
    include: {
      tasks: true
    }
  });

  return {
    props: {
      listsData: JSON.parse(JSON.stringify(listsData))
    }
  };
};
