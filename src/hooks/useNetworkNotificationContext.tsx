import {
  addEventListener,
  fetch as fetchNetInfo,
  type NetInfoState,
  NetInfoStateType
} from '@react-native-community/netinfo'
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { AppState, type AppStateStatus } from 'react-native'

const DEFAULT_NET_INFO_STATE: NetInfoState = {
  type: NetInfoStateType.unknown,
  isConnected: null,
  isInternetReachable: null,
  details: null
}

export interface NetworkNotificationContextType {
  netInfoState: NetInfoState
}

export const NetworkNotificationContext =
  createContext<NetworkNotificationContextType | undefined>(undefined)

export const NetworkNotificationProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [netInfoState, setNetInfoState] = useState<NetInfoState>(DEFAULT_NET_INFO_STATE)

  useEffect(() => {
    let cancelled = false
    const applyState = (state: NetInfoState) => {
      if (!cancelled) setNetInfoState(state)
    }
    fetchNetInfo().then(applyState)
    const unsubscribeNetInfo = addEventListener(applyState)
    const appStateSubscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active') fetchNetInfo().then(applyState)
      }
    )
    return () => {
      cancelled = true
      unsubscribeNetInfo()
      appStateSubscription.remove()
    }
  }, [])

  const value = useMemo(() => ({ netInfoState }), [netInfoState])

  return (
    <NetworkNotificationContext.Provider value={value}>
      {children}
    </NetworkNotificationContext.Provider>
  )
}

export const useNetworkNotification = (): NetworkNotificationContextType => {
  const context = useContext(NetworkNotificationContext)
  if (context === undefined) {
    throw new Error(
      'useNetworkNotification must be used within a NetworkNotificationProvider'
    )
  }
  return context
}
