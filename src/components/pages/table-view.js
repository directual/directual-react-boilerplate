import React, { useEffect, useState } from 'react'
import { Table, PageHeader } from '../UI-components/directual-design'


export function TableView() {
    return (
      <div>
        <PageHeader icon="database">Table view</PageHeader>
        <Table 
          structure='Books'
          endpoint='getBooks'

        />
      </div>
    )
}