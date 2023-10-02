import { parse as parseQuery } from 'querystring'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { type Command } from '@/commander/command.type.js'
import { parseBoolean } from '@/parse-boolean.js'
import { iterateTasks } from './tasks-collection.js'

/** @private */
interface ExportTasksParams {
  readonly inProgressOnly: boolean
}

/** @private */
interface ExportTasksResultValue {
  readonly exportFilePath: string
}

/** @private */
function generateExportFileName(): string {
  const timestamp = Date.now()
  const filename = `tasks-${timestamp}.json`

  return filename
}

export const exportTasks: Command<ExportTasksResultValue, string, ExportTasksParams> = {
  description: 'Export tasks in a file',

  parseInput(argsRaw) {
    return argsRaw[0]
  },

  parseParams(argsRaw) {
    const paramsArgRaw = argsRaw.slice(1).join('&')
    const paramsRaw = parseQuery(paramsArgRaw)
    const inProgressOnly = parseBoolean(paramsRaw.inProgressOnly) ?? false

    return {
      inProgressOnly,
    }
  },

  executor(targetDirRaw, params) {
    const targetDirCooked = targetDirRaw?.trim()

    if (!targetDirCooked) {
      return {
        success: false,
        message: 'Target directory path for the export file is required; paths are resolved relative to the current process working directory',
      }
    }

    const tasks = Array.from(iterateTasks())
    const tasksJson = JSON.stringify(tasks, null, 2)
    const exportFileDir = resolve(process.cwd(), targetDirCooked)
    const exportFileName = generateExportFileName()
    const exportFilePath = resolve(exportFileDir, exportFileName)

    if (!existsSync(exportFileDir)) {
      mkdirSync(exportFileDir, { recursive: true })
    }

    writeFileSync(exportFilePath, tasksJson, 'utf8')

    return {
      success: true,
      payload: {
        exportFilePath,
      },
    }
  },
}
