import { ScriptModel } from '../../models'

export default function reorderScripts(scripts: ScriptModel[]): ScriptModel[] {
  return scripts.map((script, index) => ({ ...script, id: index }))
}
