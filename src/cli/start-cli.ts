import { createInterface } from 'readline/promises'
import { Commander } from '@/commander/commander.js'
import { convertInputLineToCommandRaw } from './convert-input-line-to-command-raw.js'

export async function startCli(commander: Commander): Promise<void> {
  console.log('Press ⌃D to stop') // this only works in macOS, but I don't care
  console.log('Type "help" to get the list of available commands')
  console.log() // explicit empty line

  const lines = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  while (true) {
    const line = await lines.question('command > ')
    const commandRaw = convertInputLineToCommandRaw(line)
    const result = commander.runCommandRaw(commandRaw)

    console.log() // pad response block with empty lines

    if (!result.success) {
      console.error(`Error: ${result.message}`)
    } else if (result.payload != null) {
      console.table(result.payload)
    }

    console.log() // pad response block with empty lines
  }
}
