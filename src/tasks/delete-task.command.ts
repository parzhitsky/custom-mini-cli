import { Command } from '@/commander/command.type.js'
import { getExistingTaskById, deleteTask as deleteTaskFromCollection } from './tasks-collection.js'

export const deleteTask: Command<void, string> = {
  description: 'Delete a task',

  parseInput(argsRaw) {
    return argsRaw[0]
  },

  executor(id) {
    deleteTaskFromCollection(getExistingTaskById(id))
  }
}
