import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../../../auth'
import { Labels, HideTextBlock, Loading, PageHeader, Button } from '../primitive/primitiveComponents'

import './cards.css'

const api = new Directual({ apiHost: '/' })

// CARDS

export function Card(props) {
    const photoHeigh = props.photoHeigh || '150px'
    return (
        <div className="dd-card" style={{ maxWidth: props.width }}>
            {props.photo &&
                <div className="card-photo"
                    style={
                        {
                            backgroundImage: `url(${props.photo})`,
                            height: photoHeigh
                        }}>
                </div>}
            <div className="card-content">
                <h3 className="card-title">{props.title}</h3>
                <div className="card-title-description">{props.titleDescription}</div>
                <div className="card-description">
                    <HideTextBlock textLength={props.descLength}>
                        {props.description}
                    </HideTextBlock>
                </div>

                <Labels labels={props.labels} />
            </div>
        </div>
    )
}

export function Cards(props) {
    const [payload, setPayload] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [crardsDisplay, setCrardsDisplay] = useState([])
    const [pageNum, setPageNum] = useState(0);
    const [loading, setLoading] = useState(true);
    const [badRequest, setBadRequest] = useState();
    const [lazyLoading, setLazyLoading] = useState(false)

    const auth = useAuth();

    let step = props.cardsNumber || 20

    useEffect(() => {
        console.log(pageNum)
        getData()
    }, [pageNum])

    let Arr

    useEffect(() => {
        setCrardsDisplay(crardsDisplay.concat(payload))

    }, [payload])

    function getData() {
        api
            // Data structure
            .structure(props.structure)
            // GET request + query params:
            .getData(props.endpoint, { sessionID: auth.sessionID, page: pageNum, pageSize: step })
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

    const loadMore = () => {
        setLazyLoading(true)
        setPageNum(pageNum + 1)
    }

    let loaded = (pageNum + 1) * step;
    (loaded > pageInfo.tableSize) && (loaded = pageInfo.tableSize)

    return (
        <React.Fragment>
            <PageHeader icon="cards">{props.header || 'Cards view'}</PageHeader>
            {loading && <span className="loading"><Loading>Loading...</Loading></span>}
            {crardsDisplay && !loading &&
                <div className="dd-cards-list">
                    {crardsDisplay.map(card =>
                        <Card
                            title={card[props.title]}
                            titleDescription={card[props.titleDescription]}
                            description={card[props.description]}
                            descLength={props.descLength}
                            width={props.width}
                            labels={card.labels}
                            photo={card[props.photo]}
                            photoHeigh={props.photoHeigh}
                        />
                    )}
                    <div className="dd-cards-load-more">
                        {!lazyLoading && <div className="dd-cards-load-num">Loaded {loaded} cards from {pageInfo.tableSize}</div>}
                        {!lazyLoading && (pageNum + 1 < pageInfo.totalPage) && <Button icon="plus" onClick={loadMore}>Load more</Button>}
                        {lazyLoading && <Loading>Loading...</Loading>}
                    </div>
                </div>
            }

        </React.Fragment>
    )
}
