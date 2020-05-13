import React from 'react'
import { Table } from '../components/directualdesign/table/table'


export function TableView() {
    return (
        <Table 
          structure='Books'
          endpoint='getBooks'
          header="Marvellous books"
          tableStructure = {{
            header: [
              {title:'Title'},
              {title:'Author'},
              {title:'Country'},
              {title:'Year'},
              {title:'Link'}
            ],
            rows: [
              {field:'title', type:'text'},
              {field:'Author', type:'text'},
              {field:'Country', type:'text'},
              {field:'Year', type:'text'},
              {field:'Link_wiki', type:'link', linkText:'Wiki'}
            ]
          }}
          pageSize={4}
        />
    )
}