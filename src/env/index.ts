import { logger } from '@/shared/helpers/logger'
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  logger.error(`❌ Error loading environment variables: ${_env.error.message}`)
  throw new Error(_env.error.message)
}

export const env = _env.data
