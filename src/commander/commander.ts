import { type Result } from '@/result.type.js'
import { objectFromEntries } from '@/object-from-entries.js'
import { type CommandAny, type Command, type ParamsConstraint, type CommandRaw } from './command.type.js'
import { type ExecutionUnknown } from './command-executor.type.js'

/** @private */
interface CommandHelpResult extends Record<string, Pick<CommandAny, 'description'>> {}

export class Commander {
  protected static readonly commanderToHelpCommandMap = new Map<Commander, CommandAny>()

  protected static createHelpCommand(commander: Commander): Command<CommandHelpResult> {
    return {
      description: 'Show names and descriptions of all commands',
      executor() {
        const entries = Object
          .entries(commander.commandsMap)
          .map(([name, { description }]) => [name, { description }] as const)

        const result = objectFromEntries(entries)

        return {
          success: true,
          payload: result,
        }
      },
    }
  }

  protected readonly commandsMap = Object.create(null) as Record<string, CommandAny>

  constructor() {
    const helpCommand = new.target.createHelpCommand(this)

    this.addCommand('help', helpCommand)
  }

  addCommand<
    ResultValue,
    Input,
    Params extends ParamsConstraint,
  >(
    name: string,
    command: Command<ResultValue, Input, Params>,
  ): this {
    if (name in this.commandsMap) {
      throw new Error(`Could not add command "${name}": a command with this name already exists`)
    }

    this.commandsMap[name] = command as CommandAny

    return this
  }

  protected createExecution({ name, argsRaw }: CommandRaw): ExecutionUnknown {
    if (name in this.commandsMap === false) {
      throw new Error(`Command "${name}" does not exist`)
    }

    const command = this.commandsMap[name]
    const input = command.parseInput?.(argsRaw)
    const params = command.parseParams?.(argsRaw)
    const executor = command.executor

    return {
      input,
      params,
      executor,
    }
  }

  runCommandRaw<ResultValue = unknown>(commandRaw: CommandRaw): Result<ResultValue> {
    try {
      const { input, params, executor: execute } = this.createExecution(commandRaw)

      const result = execute(input, params)

      return result as Result<ResultValue>
    } catch (caught) {
      if (caught instanceof Error) {
        return {
          success: false,
          message: `${caught.name}: ${caught.message}`
        }
      }

      return {
        success: false,
        message: `Unexpected error while running "${commandRaw.name}": ${caught}`,
      }
    }
  }
}
