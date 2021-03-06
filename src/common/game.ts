/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

export type GamePath = string
export type CompilerPath = string
export type OutputPath = string
export type Flag = 'TESV_Papyrus_Flags.flg' | 'Institute_Papyrus_Flags.flg'
export type CompilerSourceFile = 'Actor.psc' | 'Base/Actor.psc'

export enum GameSource {
  scriptsFirst = 'Scripts/Source',
  sourceFirst = 'Source/Scripts',
}

export enum Executable {
  se = 'SkyrimSE.exe',
  le = 'TESV.exe',
  vr = 'SkyrimVR.exe',
  fo4 = 'Fallout4.exe',
}

export enum GameType {
  le = 'Skyrim LE',
  se = 'Skyrim SE',
  vr = 'Skyrim VR',
  fo4 = 'Fallout 4',
}

export function toSource(game: GameType): GameSource {
  switch (game) {
    case GameType.le:
    case GameType.fo4:
      return GameSource.scriptsFirst
    case GameType.se:
    case GameType.vr:
      return GameSource.sourceFirst
    default:
      throw new Error('RuntimeError: unsupported GameType')
  }
}

export function toOtherSource(game: GameType): GameSource {
  switch (game) {
    case GameType.le:
    case GameType.fo4:
      return GameSource.sourceFirst
    case GameType.se:
    case GameType.vr:
      return GameSource.scriptsFirst
    default:
      throw new Error('RuntimeError: unsupported GameType')
  }
}

export function toExecutable(game: GameType): Executable {
  switch (game) {
    case GameType.le:
      return Executable.le
    case GameType.se:
      return Executable.se
    case GameType.vr:
      return Executable.vr
    case GameType.fo4:
      return Executable.fo4
    default:
      return Executable.se
  }
}

export function toCompilerSourceFile(game: GameType): CompilerSourceFile {
  switch (game) {
    case GameType.fo4:
      return 'Base/Actor.psc'
    default:
      return 'Actor.psc'
  }
}
