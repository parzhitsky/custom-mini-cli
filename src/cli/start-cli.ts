import { createInterface } from 'readline'
import { Commander } from '@/commander/commander.js'
import { convertInputLineToCommandRaw } from './convert-input-line-to-command-raw.js'

/** @private */
const lines = createInterface({
  input: process.stdin,
  output: process.stdout,
})

/** @private */
function askCommand(commander: Commander): void {
  lines.question('command > ', (line) => {
    const commandRaw = convertInputLineToCommandRaw(line)
    const result = commander.run(commandRaw)

    console.log() // pad response block with empty lines

    if (!result.success) {
      console.error(`Error: ${result.message}`)
    } else if (result.payload != null) {
      console.table(result.payload)
    }

    console.log() // pad response block with empty lines

    askCommand(commander)
  })
}

export function startCli(commander: Commander): void {
  console.log('Press ⌃D to stop') // this only works in macOS, but I don't care
  console.log('Type "help" to get the list of available commands')
  console.log() // explicit empty line

  askCommand(commander)
}
