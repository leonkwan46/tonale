import { ReactNode } from 'react'

type ModalEntry = { id: string; element: ReactNode }
type Listener = () => void

let modals: ModalEntry[] = []
const listeners = new Set<Listener>()

const notify = () => listeners.forEach(l => l())

export const modalStore = {
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: () => modals,
  register: (id: string, element: ReactNode) => {
    const idx = modals.findIndex(m => m.id === id)
    modals = idx === -1
      ? [...modals, { id, element }]
      : modals.map((m, i) => (i === idx ? { id, element } : m))
    notify()
  },
  unregister: (id: string) => {
    modals = modals.filter(m => m.id !== id)
    notify()
  }
}
