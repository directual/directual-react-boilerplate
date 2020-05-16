import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
import { Loader } from '../components/loader/loader';

// Example of posting data to Directual

// Connect to Directual api
const api = new Directual({ apiHost: '/' })

export default function Page2() {

  // API-endpoint details
  const dataStructure = '' // todo: write here sysname of your data structure
  const endpoint = '' // todo: write here Method name of your API-endpoint

  // Connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [response, setResponse] = useState(); // API response
  const [status, setStatus] = useState(); // Request status
  const [badRequest, setBadRequest] = useState(); // API error message
  const [loading, setLoading] = useState(false); // Loader
  const [showForm, setShowForm] = useState(true); // Show/hide the form
  const [formPayload, setFormPayload] = useState({}); // Data to send. Here we can add userID: auth.user by default

  // Reset the form
  const resetForm = () => {
    setResponse()
    setStatus()
    setBadRequest()
    setShowForm(true)
    setFormPayload({}) // Don't forget to include userID: auth.user, if needed
  }

  // POST-request
  function postData() {
    setLoading(true)
    setShowForm(false)
    api
      // Data structure
      .structure(dataStructure)
      // POST request + payload + query params:
      .setData(endpoint, formPayload,
        { sessionID: auth.sessionID })
      .then((response) => {
        setResponse(response.result)
        setStatus(response.status)
        setLoading(false)
      })
      .catch((e) => {
        // handling errors
        setLoading(false)
        console.log(e.response)
        setBadRequest({
          httpCode: e.response.status,
          msg: e.response.data.msg
        })
      })
  }

  return (
    <div className="content">
      <h1>Example of posting data</h1>
      {loading && <Loader />}
      {showForm &&
        <form onSubmit={postData}>
          <input type="text" onChange={(e) => {
            // insert here your FIELD_SYSNAME
            setFormPayload({ ...formPayload, 'FIELD_SYSNAME': e.target.value })
          }} />
          <button type="submit">Submit</button>
        </form>
      }

      {/* Everything is OK */}
      {response && <div>
        <b>Submitted successfully</b>
        <p>Response: <code>{JSON.stringify(response)}</code></p>
        {status && <p>Status: <code>{JSON.stringify(status)}</code></p>}
      </div>}

      {/* Something went wrong */}
      {badRequest && <div class="error">
        <b>{badRequest.httpCode} error</b>
        {(badRequest.httpCode == '400') &&
          <p>API-endpoint is not configured properly.</p>}
        {(badRequest.httpCode == '403') &&
          <p>You have to be logged in to submit this form.</p>}
        <p><code>{badRequest.msg}</code></p>
      </div>}

      {/* Reset the form */}
      {!showForm && !loading &&
        <button onClick={resetForm}>
          Submit again
        </button>}

    </div>
  )
}