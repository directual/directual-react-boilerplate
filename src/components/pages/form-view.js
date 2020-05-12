import React from 'react'
import { Form, PageHeader } from '../directualdesign/directual-design'

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
                        { label: 'One more simple text field', type: 'text', fieldSysName: 'oppa1', placeholder:'placeholder'},
                        { type: 'radio', fieldSysName: 'some_type', label: 'Radio station', 
                            options:[
                                {value:'option1', label: 'Option 1'},
                                {value:'option2', label: 'Option 2'},
                                {value:'option3', label: 'Option 3'}
                            ]},
                        { label: 'And one more', type: 'text', fieldSysName: 'oppa1', placeholder:'email'},
                        { label: 'Checkbox', type: 'checkbox', fieldSysName: 'cb'}
                    ]
                }
            />
        </React.Fragment>
    )
}