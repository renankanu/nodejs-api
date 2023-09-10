export interface CustomResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  message: string
  statusCode: number
  errors?: string[]
}
