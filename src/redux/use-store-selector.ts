import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionFunctionAny } from 'redux-actions'
import { RootStore } from './stores/root.store'

export function useStoreSelector<R>(selector: (state: RootStore) => R) {
  return useSelector<RootStore, R>(selector)
}

export function useAction<R extends ActionFunctionAny<any>>(action: R): (...parameters: Parameters<R>) => void {
  const dispatch = useDispatch()

  return useMemo(() => {
    return bindActionCreators(action, dispatch)
  }, [action, dispatch])
}

export function useActions<Actions = any>(actions: Actions): Actions {
  const dispatch = useDispatch()

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(a => bindActionCreators(a, dispatch))
    }

    return bindActionCreators(actions as any, dispatch)
  }, [dispatch, actions])
}
