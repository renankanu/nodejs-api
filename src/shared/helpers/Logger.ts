import { createLogger, transports, format } from 'winston'

export const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`
    }),
  ),
})
