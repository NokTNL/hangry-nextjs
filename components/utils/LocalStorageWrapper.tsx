import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { PropsWithChildren, useEffect } from 'react'
import { cartSlice } from 'store/cartSlice'
import { LOCAL_STORAGE_KEY } from 'store/constants'

export function LocalStorageWrapper({
  children,
  store,
}: PropsWithChildren & { store: ToolkitStore }) {
  // Sync with local storage; must be in useEffect because window object only exists after render
  useEffect(() => {
    if (!window?.localStorage) return
    const storedStateString = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedStateString === null) return
    const storedState = JSON.parse(storedStateString)

    store.dispatch(cartSlice.actions.initialSync(storedState))
  }, [])
  return <>{children}</>
}
