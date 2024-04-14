import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      // uuid
      id: "9e1f4b7b-6b3b-4b3b-8b1b-3b3b3b3b3b3b",
      title: "My first event",
      details: "This is my first event",
      slug: "my-first-event",
      maximumAttendees: 100,
    },
  });
}

seed().then(() => {
  console.log("Seed completed");
  prisma.$disconnect();
});
