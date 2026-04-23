import styled from '@emotion/native'
import { Typography } from '@/compLib/Typography'

export const RevisionEmptyMessage = styled(Typography)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  textAlignVertical: 'center',
  color: theme.colors.icon,
  paddingHorizontal: theme.spacing.xl
}))
