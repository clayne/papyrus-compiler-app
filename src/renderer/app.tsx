/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MemoryRouter as Router } from 'react-router-dom'

import { TelemetryEvents } from '../common/telemetry-events'
import { DialogChangelog } from './components/dialog/dialog-changelog'
import { PageDrawer } from './components/page-drawer'
import { TutorialSettings } from './components/tutorials/tutorial-settings'
import { TutorialTelemetry } from './components/tutorials/tutorial-telemetry'
import { useApp } from './hooks/use-app'
import { useInitialization } from './hooks/use-initialization'
import { useSyncHtmlTheme } from './hooks/use-sync-html-theme'
import { useTelemetry } from './hooks/use-telemetry'
import { useVersion } from './hooks/use-version'
import { Routes } from './routes'

export function App(): JSX.Element {
  const { t } = useTranslation()
  const { done } = useInitialization()
  const { send } = useTelemetry()
  const [version] = useVersion()
  const {
    config: { tutorials },
  } = useApp()

  useSyncHtmlTheme()

  useEffect(() => {
    if (done) {
      send(TelemetryEvents.appLoaded, { version })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, version])

  return (
    <>
      {!done && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-light-400 dark:bg-darker z-20">
          <div className="text-center text-4xl">{t('loading')}</div>
        </div>
      )}

      <div className={`${!done ? 'opacity-0' : ''}`}>
        <DialogChangelog />
        <Router>
          <PageDrawer />

          {done && (
            <>
              {tutorials?.settings === true && <TutorialSettings />}
              {tutorials?.telemetry === true &&
                tutorials?.settings === false && <TutorialTelemetry />}
              <Routes />
            </>
          )}
        </Router>
      </div>
    </>
  )
}
