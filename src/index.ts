import { startCli } from './cli/start-cli.js'
import { tasks } from './tasks/tasks.commander.js'

async function main(): Promise<void> {
  startCli(tasks)
}

main().catch(console.error)
