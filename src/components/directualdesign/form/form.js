import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../../../auth'
import { Loading, Button } from '../primitive/primitiveComponents'
import { Hint } from '../hint/hint'

import './form.css'

const api = new Directual({ apiHost: '/' })

// FORMS

export function Input(props) {
    return (
        <React.Fragment>
            {((props.type == 'text') || (props.type === 'password')) &&
                <div className="field-wrapper">
                    <label>{props.label}</label>
                    <input
                        className="dd-field"
                        placeholder={props.placeholder}
                        type={props.type}
                        onChange={props.onChange} />
                </div>
            }
            {(props.type == 'radio') &&
                <div className="field-wrapper">
                    <label>{props.label}</label>
                    <Radio
                        options={props.options}
                        onChange={props.onChange}
                    />
                </div>
            }
        </React.Fragment>
    )
}


export function Radio(props) {
    const [selectedOption, setSelectedOption] = useState(props.defaultValue);
    return (
        <div className="dd-radio">
            {props.options && props.options.map(option =>
                <label>
                    <input
                        type="radio"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={e => {
                            props.onChange && props.onChange(e)
                            setSelectedOption(option.value)
                        }}
                    />
                    {option.label}
                </label>
            )}
        </div>
    )
}

export function FormSection(props) {
    return (
        <div className="field-wrapper">
            <div className="section"><span>{props.subheader}</span></div>
        </div>
    )
}


export function Form(props) {
    const [response, setResponse] = useState();
    const [status, setStatus] = useState();
    const [badRequest, setBadRequest] = useState();
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const auth = useAuth();

    const [formPayload, setFormPayload] = useState(props.includeUserId ? ({ user_id: auth.user }) : ({}));

    const resetForm = () => {
        setResponse()
        setStatus()
        setBadRequest()
        setShowForm(true)
        setFormPayload(props.includeUserId && { user_id: auth.user })
    }

    function post() {
        setLoading(true)
        setShowForm(false)
        api
            // Data structure
            .structure(props.structure)
            // POST request + payload + query params:
            .setData(props.endpoint, formPayload,
                { sessionID: auth.sessionID })
            .then((response) => {
                setResponse(response.result)
                setStatus(response.status)
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                console.log(e.response)
                setBadRequest({
                    httpCode: e.response.status,
                    msg: e.response.data.msg
                })
            })
    }
    return (
        <React.Fragment>
            {loading && <Loading>Loading...</Loading>}
            {showForm &&
                <form className="dd-form" style={{ maxWidth: props.width }}>
                    {props.fields.map((field) =>
                        <React.Fragment>
                            {field.section ? (
                                <FormSection subheader={field.subheader} />) : (
                                    <Input
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                        options={field.options}
                                        onChange={(e) => {
                                            setFormPayload({ ...formPayload, [field.fieldSysName]: e.target.value })
                                        }}
                                    />)}
                        </React.Fragment>)
                    }
                    <Button
                        disabled={false}
                        accent
                        onClick={post}
                        icon='forward'>
                        {props.submitButton ? (`${props.submitButton}`) : ('Submit')}
                    </Button>
                </form>}
            {response && <Hint ok title="Submitted successfully">
                <p>ID: <code>{JSON.stringify(response)}</code></p>
                {status && <p>Status: <code>{JSON.stringify(status)}</code></p>}
            </Hint>}

            {badRequest && <Hint error title={`${badRequest.httpCode} error`}>
                {(badRequest.httpCode == '400') &&
                    <p>API-endpoint is not configured properly.</p>}
                {(badRequest.httpCode == '403') &&
                    <p>You have to be logged in to submit this form.</p>}
                <p><code>{badRequest.msg}</code></p>
            </Hint>}
            {!showForm && !loading &&
                <Button onClick={resetForm} icon='refresh'>
                    {props.resetButton ? (`${props.resetButton}`) : ('Submit again')}
                </Button>}
        </React.Fragment>
    )
}

