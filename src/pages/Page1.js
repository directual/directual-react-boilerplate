import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
import { Loader } from '../components/loader/loader';

const api = new Directual({ apiHost: '/' })

export default function Page1() {

  const auth = useAuth();
  const [payload, setPayload] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [badRequest, setBadRequest] = useState();
  const [pageLoading, setPageLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(2);

  const dataStructure = '' // todo: write here sysname of your data structure
  const endpoint = '' // todo: write here sysname of your API-endpoint

  // Paging:
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

  // GET-request:
  function getData() {
    api
      // Data structure
      .structure(dataStructure)
      // GET request + query params:
      .getData(endpoint, { sessionID: auth.sessionID, page: pageNum, pageSize: pageSize })
      .then((response) => {
        setPayload(response.payload)
        setPageInfo(response.pageInfo)
        setLoading(false)
        setPageLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        setPageLoading(false)
        console.log(e.response)
        setBadRequest(e.response.status + ', ' + e.response.data.msg)
        if (!e.response) {
          //todo: check you API endpoint, you must enable CORS header in settings

        }
        if (e.response && e.response.status === 403) {
          //todo: api endpoint required authorisation

        }
      })
  }

  return (
    <div className="content">
      <h1>Example of getting data</h1>

      {loading && <Loader text='Loading...' />}
      {payload && !loading &&
        <div>
          <div className="request-info">
            <span>Data structure: <b>{dataStructure}</b></span>
            <span>API-endpoint: <b>{endpoint}</b></span>
            <span>Payload: <b>{JSON.stringify(payload)}</b></span>
            <span>Payload info: <b>{JSON.stringify(pageInfo)}</b></span>
            {badRequest && <span className="error">Error: <b>{badRequest}</b></span>}
          </div>

          {pageLoading && <Loader text='Loading...' />}
          {!pageLoading &&
            <div>
              <button disabled={(pageNum <= 0) && "disabled"} onClick={prevPage}>prev</button>
              <button disabled={pageInfo && !badRequest && ((pageNum == pageInfo.totalPage - 1) && "disabled")} onClick={nextPage}>next</button>
            </div>
          }
        </div>}
    </div>
  )
}