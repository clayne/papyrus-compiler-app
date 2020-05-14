import { all, call, fork, takeLatest } from 'redux-saga/effects'
import { CONSTANTS } from '../actions'
import changelogSaga from './changelog.saga'
import compilationSaga from './compilation.saga'
import groupsSaga from './groups.saga'
import initializationSaga from './initialization.saga'
import settingsSaga from './settings.saga'

function* openLogFile() {
  const { shell } = window.require('electron')
  const log = window.require('electron-log')

  yield takeLatest(CONSTANTS.APP_LOG_OPEN, function* () {
    yield call(() => shell.openExternal(log.transports.file.findLogPath()))
  })
}

export default function* rootSaga() {
  yield fork(openLogFile)
  yield all([
    fork(initializationSaga),
    fork(compilationSaga),
    fork(changelogSaga),
    fork(groupsSaga),
    fork(settingsSaga)
  ])
}
