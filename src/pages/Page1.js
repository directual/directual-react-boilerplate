import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
import { Loader } from '../components/loader/loader';

// Example of getting data from Directual

// Connect to Directual api
const api = new Directual({ apiHost: '/' })

export default function Page1() {

  // API-endpoint details
  const dataStructure = '' // todo: write here sysname of your data structure
  const endpoint = '' // todo: write here Method name of your API-endpoint

  // connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [payload, setPayload] = useState([]); // API response
  const [pageInfo, setPageInfo] = useState({}); // API response metadata, e.g. number of objects
  const [loading, setLoading] = useState(true); // initial loader
  const [badRequest, setBadRequest] = useState(); // API error message
  const [pageLoading, setPageLoading] = useState(false); // paging loader
  const [pageNum, setPageNum] = useState(0); // Page number, by default = 0
  const [pageSize, setPageSize] = useState(10); // Page size, bu default = 10

  // Paging
  useEffect(() => {
    setPageLoading(true)
    getData()
  }, [pageNum])

  const nextPage = () => {
    setPageLoading(true)
    setPageNum(pageNum + 1)
  }
  const prevPage = () => {
    setPageLoading(true)
    setPageNum(pageNum - 1)
  }

  // GET-request
  function getData() {
    api
      // Data structure
      .structure(dataStructure)
      // GET request + query params (sessionID, page, pageSize by default)
      .getData(endpoint, { sessionID: auth.sessionID, page: pageNum, pageSize: pageSize })
      // other possible query params:
      // {{HttpRequest}} — any param for Filtering
      // sort=FIELD_SYSNAME_1,desc,FIELD_SYSNAME_2,asc — sorting with multiple params
      .then((response) => {
        setPayload(response.payload)
        setPageInfo(response.pageInfo)
        setLoading(false)
        setPageLoading(false)
      })
      .catch((e) => {
        // handling errors
        setLoading(false)
        setPageLoading(false)
        console.log(e.response)
        setBadRequest(e.response.status + ', ' + e.response.data.msg)
      })
  }

  return (
    <div className="content">
      <h1>Example of getting data</h1>

      {loading && <Loader />}
      {payload && !loading &&
        <div>

          {/* API response */}
          <div className="request-info">
            <span>Data structure: <b>{dataStructure ? dataStructure : <span className="error">not provided</span>}</b></span>
            <span>API-endpoint: <b>{endpoint ? endpoint : <span className="error">not provided</span>}</b></span>
            <span>Payload: <code>{JSON.stringify(payload)}</code></span>
            <span>Payload info: <code>{JSON.stringify(pageInfo)}</code></span>
            {badRequest && <code className="error">Error: <b>{badRequest}</b></code>}
          </div>

          {/* Paging */}
          {pageLoading && <Loader />}
          {!pageLoading &&
            <div>
              <button disabled={(pageNum <= 0) && "disabled"} onClick={prevPage}>prev</button>
              <button disabled={(badRequest || (pageNum >= pageInfo.totalPage - 1)) && "disabled"} onClick={nextPage}>next</button>
            </div>
          }

        </div>}
    </div>
  )
}