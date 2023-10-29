import { app } from './app'

const startApplication = async () => {
  try {
    await app.listen({
      port: 3333,
    })
    app.log.info(`🪄 Server listening on http://localhost:3333`)
  } catch (error) {
    app.log.error(`🔥 Error starting application`)
    app.log.error(error)
    // Implements datadog error logging
    process.exit(1)
  }
}

startApplication()
