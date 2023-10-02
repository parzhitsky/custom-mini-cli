import { type Command } from '@/commander/command.type.js'
import { iterateTasks } from './tasks-collection.js'

/** @private */
interface Progress {
  readonly finishedCount: number
  readonly requiredCount: number
  readonly totalCount: number
}

export const getProgress: Command<Progress> = {
  description: 'Get progress on finished tasks',
  executor() {
    let finishedCount = 0
    let requiredCount = 0
    let totalCount = 0

    for (const task of iterateTasks()) {
      if (task.finishedAt != null) {
        finishedCount += 1
      }

      if (task.isRequired) {
        requiredCount += 1
      }

      totalCount += 1
    }

    return {
      finishedCount,
      requiredCount,
      totalCount,
    }
  },
}
