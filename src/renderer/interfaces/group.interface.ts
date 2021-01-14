/*
 * Copyright (c) 2020 Kiyozz.
 *
 * All rights reserved.
 */

import { ScriptInterface } from './script.interface'

export interface GroupInterface {
  name: string
  scripts: ScriptInterface[]
}

export class Group {
  constructor(public name: string, public scripts: ScriptInterface[]) {}

  isEmpty() {
    return this.scripts.length === 0
  }
}