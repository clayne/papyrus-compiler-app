/*
 * Copyright (c) 2020 Kiyozz.
 *
 * All rights reserved.
 */

import { CompilerPath, Flag, Game, GamePath, OutputPath } from '../game'
import { Group } from './group.interface'

interface ConfigMo2 {
  use: boolean
  instance?: string
  output: OutputPath
  mods: string
}

interface Tutorials {
  settings: boolean
}

export interface Config {
  mo2: ConfigMo2
  gameType: Game
  gamePath: GamePath
  flag: Flag
  output: OutputPath
  compilerPath: CompilerPath
  groups: Group[]
  tutorials: Tutorials
  __internal__: any
}
