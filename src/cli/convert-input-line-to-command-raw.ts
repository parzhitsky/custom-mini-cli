import { execSync } from 'child_process'
import { type CommandRaw } from '@/commander/command.type.js'

export function convertInputLineToCommandRaw(line: string): CommandRaw {
  const json = execSync(`node -pe "JSON.stringify(process.argv.slice(1))" ${line}`, {
    encoding: 'utf8',
    env: {
      PATH: process.env.PATH,
    },
  })

  const [commandName, ...commandArgsRaw] = JSON.parse(json) as string[]

  return {
    name: commandName,
    argsRaw: commandArgsRaw,
  }
}
