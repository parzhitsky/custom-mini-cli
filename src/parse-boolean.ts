export function parseBoolean(input: unknown): boolean | undefined {
  if (typeof input === 'boolean') {
    return input
  }

  if (input instanceof Array) {
    input = input[0]
  }

  if (input === 'true') {
    return true
  }

  if (input === 'false') {
    return false
  }
}
