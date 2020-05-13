import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../../../auth'
import { Loading, PageHeader, Button } from '../primitive/primitiveComponents'

import './table.css'

const api = new Directual({ apiHost: '/' })

// TABLES

export function Table(props) {
    const [payload, setPayload] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [lazyLoading, setLazyLoading] = useState(false);
    const auth = useAuth();
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(props.pageSize || 10);

    useEffect(() => {
        reload()
    }, [pageNum])

    const nextPage = () => {
        setLazyLoading(true)
        setPageNum(pageNum + 1)
    }
    const prevPage = () => {
        setLazyLoading(true)
        setPageNum(pageNum - 1)
    }

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
                setLazyLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                setLazyLoading(false)
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
                <React.Fragment>
                    <div className="dd-table">
                        <table>
                            <thead>
                                <tr>
                                    {props.tableStructure.header && props.tableStructure.header.map(column =>
                                        <td>{column.title}</td>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {payload.map(row =>
                                    <tr>
                                        {props.tableStructure.rows && props.tableStructure.rows.map(column =>
                                            <td>
                                                {(column.type == 'text') && row[column.field]}
                                                {(column.type == 'link') && <a href={row[column.field]}>
                                                    {column.linkText}</a>}
                                            </td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {pageNum * pageSize + 1} – {(pageNum + 1 < pageInfo.totalPage) && ((pageNum + 1) * pageSize)}
                    {(pageNum + 1 >= pageInfo.totalPage) && pageInfo.tableSize}
                    {lazyLoading && <span className="lazyLoading"><Loading>Loading...</Loading></span>}
                    {!lazyLoading && (pageNum + 1 < pageInfo.totalPage) && <Button icon="forward" onClick={nextPage}>Next page</Button>}
                    {!lazyLoading && (pageNum > 0) && <Button icon="back" onClick={prevPage}>Prev page</Button>}
                </React.Fragment>
            }

        </React.Fragment>
    )
}