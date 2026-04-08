import { STORAGE_KEYS } from './keys'
import { createTypedStorage } from './typedStorage'
import type { StorageValueMap } from './valueMap'

export const storage = createTypedStorage<StorageValueMap>()

export { STORAGE_KEYS }

