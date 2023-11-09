import { List } from "@/components/List";
import { ListType, useTasksStore } from "@/store";
import prisma from "@/lib/prisma";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { lists } = useTasksStore((state) => ({
    lists: state.lists
  }));
  const addList = useTasksStore.getState().addList;
  const [clientPhrase, setClientPhrase] = useState(phrases[0]);
  const [clientLists, setClientLists] = useState<ListType[]>([]);

  useEffect(() => {
    setClientLists(lists);
  }, [lists]);

  useEffect(() => {
    setClientPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetch("/api/hello").then((res) => res.json());

      console.log({ users });
    };

    if (!loaded) {
      fetchData();
    }

    return () => {
      setLoaded(false);
    };
  }, [loaded]);

  return (
    <>
      <Head>
        <title>Mis listas</title>
      </Head>

      <main className="w-full max-w-screen-sm mx-auto px-5 min-h-screen pb-20 font-inter flex flex-col justify-start">
        <section className="max-w-screen-lg mx-auto py-10 block w-full text-center">
          <p className="text-neutral-600">{clientPhrase}</p>
        </section>

        {clientLists?.map((list) => (
          <List key={list.id} listData={list} />
        ))}

        <button
          className="w-full py-6 opacity-40 hover:opacity-100 transition-opacity rounded-2xl border-[2px] border-white border-opacity-20"
          onClick={() => addList()}
        >
          Agregar lista
        </button>
      </main>
    </>
  );
}
