import prisma from "../lib/prisma";

async function main() {
  const response = await Promise.all([
    await prisma.list.upsert({
      where: { id: "test1" },
      update: {},
      create: {
        id: "test1",
        title: "Lista de seed"
      }
    }),
    prisma.task.upsert({
      where: { id: "test1" },
      update: {},
      create: {
        id: "test1",
        content: "Tarea de seed",
        list: {
          connect: {
            id: "test1"
          }
        }
      }
    }),
    await prisma.task.upsert({
      where: { id: "test2" },
      update: {},
      create: {
        id: "test2",
        content: "Segunda tarea de seed",
        list: {
          connect: {
            id: "test1"
          }
        }
      }
    })
  ]);
  console.log(response);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
