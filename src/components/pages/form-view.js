import React from 'react'
import { Form, PageHeader } from '../UI-components/directual-design'

export function FormView() {
    return (
        <React.Fragment>
            <PageHeader icon="edit">Form</PageHeader>
            <Form
                structure='input'
                endpoint='postInput'
                includeUserId
                submitButton='Submit form'
                resetButton='Submit more'
                width='400px'
                fields={
                    [
                        { label: 'Simple text field', type: 'text', fieldSysName: 'payload', placeholder:'placeholder'},
                        { section: true, subheader: 'Section name'},
                        { label: 'One more simple text field', type: 'text', fieldSysName: 'oppa', placeholder:'placeholder'},
                        { label: 'And one more', type: 'text', fieldSysName: 'oppa1', placeholder:'email'},
                        { label: 'Fucking checkbox', type: 'checkbox', fieldSysName: 'cb'}
                    ]
                }
            />
        </React.Fragment>
    )
}