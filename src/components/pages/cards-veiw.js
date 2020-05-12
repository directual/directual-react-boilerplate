import React, { useEffect, useState } from 'react'
import { Cards, PageHeader } from '../directualdesign/directual-design'


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
      photoHeigh='250px'
    />
  )
}