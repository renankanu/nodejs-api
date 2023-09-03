import { prisma } from '../../lib/prisma'

export async function getInfoUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}
