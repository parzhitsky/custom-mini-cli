import { parse as parseQuery } from 'querystring'
import { type Command } from '@/commander/command.type.js'
import { parseBoolean } from '@/parse-boolean.js'
import { type Task } from './task.type.js'
import { iterateTasks } from './tasks-collection.js'

/** @private */
interface Params {
  readonly inProgressOnly?: boolean
}

/** @private */
type Excerpt = Record<string, Task>

export const listTasks: Command<Excerpt, undefined, Params> = {
  description: 'List all tasks',

  parseParams(argsRaw) {
    const paramsArgRaw = argsRaw.slice(1).join('&')
    const paramsRaw = parseQuery(paramsArgRaw)
    const inProgressOnly = parseBoolean(paramsRaw.inProgressOnly) ?? false

    return {
      inProgressOnly,
    }
  },

  executor(_input, params) {
    const excerpt = Object.create(null) as Excerpt

    for (const task of iterateTasks()) {
      if (!params.inProgressOnly || task.finishedAt == null) {
        excerpt[task.id] = task
      }
    }

    return {
      success: true,
      payload: excerpt,
    }
  },
}
