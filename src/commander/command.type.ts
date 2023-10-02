import { WithArgsRawParsers, type CommandExecutor, type ParamsConstraint } from './command-executor.type.js'

export { type ParamsConstraint } from './command-executor.type.js'

/** @private */
type ArgsRaw = string[]

export interface CommandRaw {
  readonly name: string
  readonly argsRaw: ArgsRaw
}

export type Command<
  ResultValue,
  Input = undefined,
  Params extends ParamsConstraint = undefined,
> = {
  readonly description: string
  readonly executor: CommandExecutor<ResultValue, Input, Params>
} & WithArgsRawParsers<Input, Params>

export type CommandAny = Command<unknown, unknown, Record<string, unknown>>
