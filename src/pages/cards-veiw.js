import React from 'react'
import { Cards } from '../components/directualdesign/cards/cards'


export function CardsView() {
  return (
    <Cards
      header='Great minds'
      structure='Authors'
      endpoint='getAuthors'
      title='name'
      titleDescription='country'
      description='description'
      descLength={80}
      width='330px'
      photo='photo'
      photoHeigh='220px'
      cardsNumber={9}
    />
  )
}