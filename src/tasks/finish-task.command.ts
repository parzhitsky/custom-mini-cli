import { Command } from '@/commander/command.type.js'
import { type Task, getExistingTaskById } from './tasks-collection.js'

export const finishTask: Command<Task, string> = {
  description: 'Finish a task',

  parseInput(argsRaw) {
    return argsRaw[0]
  },

  executor(id) {
    const task = getExistingTaskById(id)

    task.finishedAt ??= new Date()

    return task
  }
}
