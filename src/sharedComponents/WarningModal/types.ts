export interface WarningModalProps {
  isVisible: boolean
  onContinue: () => void
  onCancel: () => void
  title?: string
  description?: string
}
