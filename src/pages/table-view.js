import React, { useEffect, useState } from 'react'
import { Table } from '../components/directualdesign/table/table'


export function TableView() {
    return (
        <Table 
          structure='Books'
          endpoint='getBooks'
          header="Marvellous books"
        />
    )
}