import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../../../auth'
import { Labels, HideTextBlock, Loading, PageHeader, Button } from '../primitive/primitiveComponents'

import './table.css'

const api = new Directual({ apiHost: '/' })

// TABLES

export function Table(props) {
    const [payload, setPayload] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        reload()
    }, [])

    function reload() {
        api
            // Data structure
            .structure(props.structure)
            // GET request + query params:
            .getData(props.endpoint, { sessionID: auth.sessionID, page: pageNum, pageSize: pageSize })
            .then((response) => {
                setPayload(response.payload)
                setPageInfo(response.pageInfo)
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                if (!e.response) {
                    //check you API endpoint, you must enable CORS header in settings
                    console.log('check you API endpoint, you must enable CORS header in settings')
                }
                if (e.response && e.response.status === 403) {
                    //todo: api endpoint required authorisation
                    console.log('API-endpoint required authentication')
                }
            })
    }

    return (
        <React.Fragment>
            <PageHeader icon="database">{props.header || 'Table view'}</PageHeader>
            {loading && <span className="loading"><Loading>Loading...</Loading></span>}
            {payload && !loading &&
                <div>
                    {JSON.stringify(payload)}
                </div>
            }

        </React.Fragment>
    )
}