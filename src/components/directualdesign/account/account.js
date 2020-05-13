import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../../../auth'
import { PageHeader, Loading } from '../primitive/primitiveComponents'

import './account.css'

const api = new Directual({ apiHost: '/' })

export function Account(props) {
    const [payload, setPayload] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [loading, setLoading] = useState(true);
    
    const auth = useAuth();

    useEffect(() => {
        getUserInfo()
    }, [])

    function getUserInfo() {
        api
            // Data structure
            .structure('WebUser')
            // GET request + query params:
            .getData(props.endpoint, { sessionID: auth.sessionID, page: 0, pageSize: 1 })
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
            <PageHeader icon="user">{props.header || 'My account'}</PageHeader>
            {loading && <span className="loading"><Loading>Loading...</Loading></span>}
            {payload && !loading &&
                <div>
                    Hello, <strong>{payload[0].id}</strong>. Your role is <strong>{payload[0].role}</strong>
                </div>
            }
        </React.Fragment>
    )
}