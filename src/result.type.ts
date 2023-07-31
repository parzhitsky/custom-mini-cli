export type Result<Value> = {
  success: true
  payload: Value
} | {
  success: false
  message: string
}
