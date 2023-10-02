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
    const input = await lines.question('command > ')
    const commandRaw = convertInputLineToCommandRaw(input)

    console.log() // pad response block with empty lines

    try {
      const output = await commander.runCommandRaw(commandRaw)

      if (output != null) {
        console.table(output)
      }
    } catch (caught) {
      if (caught instanceof Error) {
        console.error(`${caught.name}: ${caught.message}`)
      } else {
        console.error(`Error: ${caught}`)
      }
    }

    console.log() // pad response block with empty lines
  }
}
