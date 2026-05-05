import { Fragment, ReactNode, useSyncExternalStore } from 'react'
import { modalStore } from './store'

export const ModalRoot = ({ children }: { children: ReactNode }) => {
  const modals = useSyncExternalStore(modalStore.subscribe, modalStore.getSnapshot)

  return (
    <>
      {children}
      {modals.map(m => (
        <Fragment key={m.id}>{m.element}</Fragment>
      ))}
    </>
  )
}
