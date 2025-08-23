import { AppTheme } from '@/constants/Colors'
import styled from '@emotion/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)<{ colorScheme: 'light' | 'dark' }>`
  flex: 1;
  background-color: ${(props) => AppTheme.backgroundColor(props.colorScheme)};
  padding: 20px;
`

export const TitleContainer = styled.View`
  margin-bottom: 30px;
`

export const Title = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => AppTheme.textColor(props.colorScheme)};
  text-align: center;
`

export const Card = styled.View<{ colorScheme: 'light' | 'dark' }>`
  background-color: ${(props) => AppTheme.inputBackgroundColor(props.colorScheme)};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`

export const SectionTitle = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => AppTheme.textColor(props.colorScheme)};
  margin-bottom: 15px;
`

export const AccountInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const AccountDetails = styled.View`
  margin-left: 15px;
  flex: 1;
`

export const AccountName = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => AppTheme.textColor(props.colorScheme)};
  margin-bottom: 4px;
`

export const AccountEmail = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 14px;
  color: ${(props) => AppTheme.textColor(props.colorScheme)};
  opacity: 0.7;
`

export const SettingItemContainer = styled.TouchableOpacity<{ 
  colorScheme: 'light' | 'dark'
  destructive?: boolean 
}>`
  flex-direction: row;
  align-items: center;
  padding: 15px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => AppTheme.borderColor(props.colorScheme)};
`

export const SettingItemIcon = styled.View`
  margin-right: 15px;
`

export const SettingItemContent = styled.View`
  flex: 1;
`

export const SettingItemLabel = styled.Text<{ 
  colorScheme: 'light' | 'dark'
  destructive?: boolean 
}>`
  font-size: 16px;
  color: ${(props) => props.destructive ? AppTheme.error : AppTheme.textColor(props.colorScheme)};
  font-weight: 500;
`

