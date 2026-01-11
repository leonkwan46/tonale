import { BackArrowIcon } from '@/screens/LessonScreen/components/LessonHeader/BackArrowIcon'
import { useRouter } from 'expo-router'
import { BackButton, Header, Title } from './SettingItemHeader.styles'

interface SettingItemHeaderProps {
  title: string
}

export function SettingItemHeader({ title }: SettingItemHeaderProps) {
  const router = useRouter()

  return (
    <Header>
      <BackButton testID="back-button" onPress={() => router.back()}>
        <BackArrowIcon size={16} />
      </BackButton>
      <Title>{title}</Title>
    </Header>
  )
}

