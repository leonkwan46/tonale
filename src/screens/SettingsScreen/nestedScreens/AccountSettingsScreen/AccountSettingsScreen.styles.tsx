import styled from '@emotion/native'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Container = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background
}))

export const FullScreenScrollView = styled(ScrollView)({
  flex: 1
})

export const Card = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  paddingHorizontal: scale(10)
}))

export const UserDataCard = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: scale(12),
  padding: scale(16),
  gap: scale(12)
}))

export const UserDataTitle = styled.Text(({ theme }) => ({
  fontSize: scale(14),
  fontFamily: getSourGummyFontFamily('600'),
  color: theme.colors.text,
  marginBottom: scale(8)
}))

export const UserDataRow = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingVertical: scale(8),
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(128, 128, 128, 0.2)'
})

export const UserDataLabel = styled.Text(({ theme }) => ({
  fontSize: scale(12),
  fontFamily: getSourGummyFontFamily('600'),
  color: theme.colors.text,
  flex: 1,
  marginRight: scale(12)
}))

export const UserDataValue = styled.Text(({ theme }) => ({
  fontSize: scale(12),
  fontFamily: getSourGummyFontFamily('400'),
  color: theme.colors.text,
  flex: 2,
  textAlign: 'right'
}))

