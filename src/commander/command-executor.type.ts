import { Result } from '@/result.type.js'

/** @private */
type InputGiven = {}

/** @private */
type ParamsGiven = object

/** @private */
type InputEmpty = undefined | null

/** @private */
type ParamsEmpty = undefined

export type ParamsConstraint = ParamsGiven | ParamsEmpty

/** @private */
type InputAndParams<
  Input,
  Params extends ParamsConstraint,
> =
  [Input, Params] extends [InputGiven, ParamsEmpty] ?
    [input: Input, params?: ParamsEmpty]
  :
  [Input, Params] extends [InputEmpty, ParamsGiven] ?
    [input: InputEmpty, params: Params]
  :
  [Input, Params] extends [InputGiven, ParamsGiven] ?
    [input: Input, params: Params]
  :
    [input?: Input, params?: Params]

export interface CommandExecutor<
  ResultValue,
  Input = InputEmpty,
  Params extends ParamsConstraint = ParamsEmpty,
> {
  (this: unknown, ...inputAndParams: InputAndParams<Input, Params>): Result<ResultValue>
}

export interface Execution<
  ResultValue,
  Input = InputEmpty,
  Params extends ParamsConstraint = ParamsEmpty,
> {
  readonly input: Input
  readonly params: Params
  readonly executor: CommandExecutor<ResultValue, Input, Params>
}

export type ExecutionUnknown = Execution<unknown, unknown, Record<string, unknown>>

/** @private */
interface WithParseInput<Input> {
  readonly parseInput: (this: unknown, argsRaw: string[]) => Input // TODO: Result<Input>
}

/** @private */
interface WithParseParams<Params extends ParamsConstraint> {
  readonly parseParams: (this: unknown, argsRaw: string[]) => Params // TODO: Result<Params>
}

export type WithArgsRawParsers<Input, Params extends ParamsConstraint> = {} & (
  Input extends InputGiven ? WithParseInput<Input> : Partial<WithParseInput<Input>>
) & (
  Params extends ParamsGiven ? WithParseParams<Params> : Partial<WithParseParams<Params>>
)
