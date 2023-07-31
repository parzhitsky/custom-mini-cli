import { Command } from '@/commander/command.type.js'
import * as Tasks from './tasks-collection.js'

export const deleteTask: Command<null, string> = {
  description: 'Delete a task',

  parseInput(argsRaw) {
    return argsRaw[0]
  },

  executor(id) {
    const getTaskResult = Tasks.getExistingTaskById(id)

    if (!getTaskResult.success) {
      return getTaskResult
    }

    const result = Tasks.deleteTask(getTaskResult.payload)

    return result
  }
}
