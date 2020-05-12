import React, { useEffect, useState } from 'react'
import { Table, PageHeader } from '../directualdesign/directual-design'


export function TableView() {
    return (
        <Table 
          structure='Books'
          endpoint='getBooks'
          header="Marvellous books"
        />
    )
}