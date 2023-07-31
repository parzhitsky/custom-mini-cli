import { Commander } from '@/commander/commander.js'
import { createTask } from './create-task.command.js'
import { deleteTask } from './delete-task.command.js'
import { finishTask } from './finish-task.command.js'
import { getProgress } from './get-progress.command.js'
import { listTasks } from './list-tasks.command.js'

export const tasks = new Commander()
  .addCommand('tasks:create', createTask)
  .addCommand('tasks:delete', deleteTask)
  .addCommand('tasks:finish', finishTask)
  .addCommand('tasks:list', listTasks)
  .addCommand('tasks:get-progress', getProgress)
