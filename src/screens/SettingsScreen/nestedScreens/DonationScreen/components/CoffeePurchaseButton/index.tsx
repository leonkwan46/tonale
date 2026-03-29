import { useDevice } from '@/hooks'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

import {
  ButtonDescription,
  CoffeeIcon,
  PriceText,
  PurchaseButtonContainer
} from './CoffeePurchaseButton.styles'

interface CoffeePurchaseButtonProps {
  iconSource: ImageSourcePropType
  description: string
  price: string
  onPress: () => void
}

export const CoffeePurchaseButton = ({
  iconSource,
  description,
  price,
  onPress
}: CoffeePurchaseButtonProps) => {
  const { isTablet } = useDevice()
  return (
    <PurchaseButtonContainer onPress={onPress}>
      <CoffeeIcon source={iconSource} />
      <ButtonDescription size={isTablet ? 'sm' : 'md'}>
        {description}
      </ButtonDescription>
      <PriceText size={isTablet ? 'md' : 'lg'} weight="bold">
        {price}
      </PriceText>
    </PurchaseButtonContainer>
  )
}
