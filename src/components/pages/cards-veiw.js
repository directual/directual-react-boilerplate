import React, { useEffect, useState } from 'react'
import { Cards, PageHeader } from '../UI-components/directual-design'


export function CardsView() {
    return (
      <div>
        <PageHeader icon="cards">Cards view</PageHeader>
        <Cards 
          structure='Books'
          endpoint='getBooks'

        />
      </div>
    )
}