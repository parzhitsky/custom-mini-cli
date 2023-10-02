import { Command } from '@/commander/command.type.js'
import { getExistingTaskById, deleteTask as deleteTaskFromCollection } from './tasks-collection.js'

export const deleteTask: Command<null, string> = {
  description: 'Delete a task',

  parseInput(argsRaw) {
    return argsRaw[0]
  },

  executor(id) {
    const getTaskResult = getExistingTaskById(id)

    if (!getTaskResult.success) {
      return getTaskResult
    }

    const result = deleteTaskFromCollection(getTaskResult.payload)

    return result
  }
}
