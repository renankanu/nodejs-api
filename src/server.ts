import { app } from './app'

const startApplication = async () => {
  try {
    await app.listen({
      port: 3333,
    })
    console.log(`🪄 Server listening on http://localhost:3333`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

startApplication()
