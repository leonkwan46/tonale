import React from 'react'
import { ImageSourcePropType, TouchableOpacity } from 'react-native'

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
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <PurchaseButtonContainer>
        <CoffeeIcon source={iconSource} />
        <ButtonDescription>{description}</ButtonDescription>
        <PriceText>{price}</PriceText>
      </PurchaseButtonContainer>
    </TouchableOpacity>
  )
}
