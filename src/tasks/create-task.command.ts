import { parse as parseQuery } from 'querystring'
import { type Command } from '@/commander/command.type.js'
import { parseBoolean } from '@/parse-boolean.js'
import { createTaskId } from './create-task-id.js'
import { type Task, addTask } from './tasks-collection.js'

/** @private */
interface Params extends Pick<Task, 'isRequired'> {}

export const createTask: Command<Task, string, Params> = {
  description: 'Create a task',

  parseInput(argsRaw) {
    return argsRaw[0]
  },

  parseParams(argsRaw): Params {
    const paramsArgRaw = argsRaw.slice(1).join('&')
    const paramsRaw = parseQuery(paramsArgRaw)
    const isRequired = parseBoolean(paramsRaw.isRequired) ?? true

    return {
      isRequired,
    }
  },

  executor(definition: string, params: Params): Task {
    if (!definition) {
      throw new Error('Cannot create an empty task')
    }

    const task: Task = {
      id: createTaskId(),
      definition,
      isRequired: params.isRequired,
      createdAt: new Date(),
      finishedAt: null,
    }

    addTask(task)

    return task
  },
}
