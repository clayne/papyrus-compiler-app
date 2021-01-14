/*
 * Copyright (c) 2020 Kiyozz.
 *
 * All rights reserved.
 */

import cx from 'classnames'
import React from 'react'

interface Props {
  className?: string
  children: any
}

export function Page({ children, className }: React.PropsWithChildren<Props>) {
  return (
    <div className={cx('container mx-auto p-6 h-full', className)}>
      {children}
    </div>
  )
}