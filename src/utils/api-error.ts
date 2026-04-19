// utils/ApiError.ts
export class ApiError extends Error {
  status: number
  data?: any
  response?: Response

  constructor(
    message: string,
    status: number,
    data?: any,
    response?: Response
  ) {
    super(message)
    this.status = status
    this.data = data
    this.response = response

    Error.captureStackTrace(this, this.constructor)
  }
}
