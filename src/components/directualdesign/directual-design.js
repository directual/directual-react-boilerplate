import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { ProvideAuth, useAuth, authContext } from '../../auth'
import {
    NavLink, Link, useHistory, useLocation,
    BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom'

import './table.css'
import './form.css'
import './article.css'
import './hint.css'
import './loader.css'
import './button.css'
import './icons.css'
import './pageContent.css'
import './MainMenu.css'
import './backdrop.css'
import './login.css'
import './Theme.css'
import './fonts.css'
import './cards.css'

const api = new Directual({ apiHost: '/' })

// TABLES AND CARDS

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
            {loading && <span className="loading"><Loading>Loading...</Loading></span>}
            {payload && !loading &&
                <div>
                    {JSON.stringify(payload)}
                </div>
            }

        </React.Fragment>
    )
}

export function HideTextBlock(props) {
    const [expandText, setExpandText] = useState(false);
    const [textLength, setTextLength] = useState(props.textLength || 120);

    const expand = () => {
        setExpandText(true);
        setTextLength(3000);
    }

    const hide = () => {
        setExpandText(false);
        setTextLength(props.textLength || 120);
    }

    return (
        <div className="dd-hide-text">
            {(props.children.length <= textLength) && props.children}
            {(props.children.length > textLength) && props.children.substr(0, textLength) + '...'}
            {(props.children.length > textLength) && !expandText &&
                <div className="expand-text icon icon-down" onClick={expand}>
                    Expand</div>
            }
            {expandText &&
                <div className="expand-text icon icon-up" onClick={hide}>
                    Hide</div>
            }
        </div>
    )
}

export function Labels(props) {
    return (
        <ul className="dd-labels">
            {props.labels[0].length > 0 && props.labels.map(label =>
                <li className="dd-label">{label}</li>
            )}
        </ul>
    )
}

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

    let step = 2

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
                    {!lazyLoading && (pageNum + 1 < pageInfo.totalPage) && <Button icon="plus" onClick={loadMore}>Load more</Button>}
                    {lazyLoading && <Loading>Loading...</Loading>}
                </div>
            }

        </React.Fragment>
    )
}



// RBAC

export function AccessDenied() {
    return <div className="access-denied">Access Denied</div>
}

export function LoginRegister(props) {
    let history = useHistory()
    let location = useLocation()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let { from } = location.state || { from: { pathname: '/' } }
    const auth = useAuth();

    let login = () => {
        auth.login(username, password).then(() => {
            history.replace(from);
        }).catch(e => {
            setError("You login or password is incorrect")
        })
    }

    useEffect(() => {
        if (auth.isAutorised()) {
            history.replace(from);
        }
    })

    return (
        <React.Fragment>
            <h1>Log in</h1>
            <div className="login-page dd-form">
                {(from.pathname !== '/') && <div className="alert">You must log in to view the page <strong>{from.pathname}</strong></div>}
                <Input
                    label="Login"
                    type="text"
                    placeholder="enter your login"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <Input
                    label="Login"
                    type="password"
                    placeholder="enter your login"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <div className="error">{error}</div>
                <Button onClick={login} accent icon="permission">
                    Log in</Button>
            </div>
        </React.Fragment>
    )
}

export function LogInLogOutButton(props) {
    let history = useHistory()
    const auth = useAuth();
    return <div className="login-logout"> {auth.user ? (
        <Button icon="logout"
            onClick={() => {
                auth.signout(() => history.push('/'))
                props.onClick()
            }}
        >
            Log out
        </Button>
    ) : (
            <Link to="/login" onClick={props.onClick}>
                <Button icon="permission">Login</Button></Link>
        )}
    </div>
}

// MAIN MENU

export class MainMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMobileMenu: false,
        };
    }
    render() {
        const authContext = this.context;

        const handleCloseMobileMenu = () => {
            this.setState({ showMobileMenu: false })

        }
        const handleShowMobileMenu = () => {
            this.setState({ showMobileMenu: true })
        }

        return (
            <React.Fragment>
                {this.state.showMobileMenu && <Backdrop onClick={handleCloseMobileMenu} />}
                <div className="show-mm-button" onClick={handleShowMobileMenu}></div>
                <div className={`main-menu ${this.state.showMobileMenu && `show`}`}>
                    <div className="hide-mobile-menu" onClick={handleCloseMobileMenu}></div>

                    <ul className="main-menu-list">
                        {this.props.menu.map(item =>
                            <React.Fragment>
                                {!item.isAutorised && !item.hasRole &&
                                    <React.Fragment>
                                        {(item.type === 'subheader') && <li className="mm-subheader">{item.title}</li>}
                                        {(item.type === 'link') &&
                                            <li><NavLink
                                                onClick={handleCloseMobileMenu}
                                                exact to={item.path}
                                                className={`main-nav ${item.icon && `icon icon-${item.icon}`}`}>
                                                {item.title}
                                            </NavLink>
                                            </li>
                                        }
                                    </React.Fragment>
                                }
                                {item.isAutorised && authContext.isAutorised() && !item.hasRole &&
                                    <React.Fragment>
                                        {(item.type === 'subheader') && <li className="mm-subheader">{item.title}</li>}
                                        {(item.type === 'link') &&
                                            <li><NavLink
                                                onClick={handleCloseMobileMenu}
                                                exact to={item.path}
                                                className={`main-nav ${item.icon && `icon icon-${item.icon}`}`}>
                                                {item.title}
                                            </NavLink>
                                            </li>
                                        }
                                    </React.Fragment>
                                }
                                {item.hasRole && authContext.hasRole(item.hasRole) &&
                                    <React.Fragment>
                                        {(item.type === 'subheader') && <li className="mm-subheader">{item.title}</li>}
                                        {(item.type === 'link') &&
                                            <li><NavLink
                                                onClick={handleCloseMobileMenu}
                                                exact to={item.path}
                                                className={`main-nav ${item.icon && `icon icon-${item.icon}`}`}>
                                                {item.title}
                                            </NavLink>
                                            </li>
                                        }
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        )}
                    </ul>
                    <LogInLogOutButton onClick={handleCloseMobileMenu} />
                </div>
            </React.Fragment>
        )
    }
}
MainMenu.contextType = authContext


// 

export function Loading(props) {
    return (
        <div className="loader-wrapper">
            <div className="loader"><div></div><div></div><div></div><div></div></div>
            <div className="loader-label">{props.children}</div>
        </div>
    )
}

export function Article(props) {
    return (
        <div className="article">
            {props.children}
        </div>
    )
}

export function Backdrop(props) {
    return (
        <div className="backdrop" onClick={props.onClick}>
        </div>
    )
}

export function Hint(props) {
    return (
        <blockquote className={`hint ${props.ok && `ok`} ${props.error && `error`}`}>
            {props.title && <p className="title">{props.title}</p>}
            <p>{props.children}</p>
        </blockquote>
    )
}

export function PageContent(props) {
    return (
        <div className="page-content">
            {props.children}</div>
    )
}

export function PageHeader(props) {
    return (
        <h1 className={`dd-header ${props.icon && `icon icon-${props.icon}`}`}>{props.children}</h1>
    )
}

// FORMS AND BUTTONS

export function Button(props) {
    return (
        <button
            onClick={!props.disabled && props.onClick}
            className={`dd-button ${props.accent && `accent`} 
                ${props.disabled && `disabled`}
                ${props.icon && `icon icon-${props.icon}`}`}
        >
            {props.children}</button>
    )
}

export function Input(props) {
    return (
        <div className="field-wrapper">
            {((props.type === 'text') || (props.type === 'password')) &&
                <React.Fragment>
                    <label>{props.label}</label>
                    <input
                        className="dd-field"
                        placeholder={props.placeholder}
                        type={props.type}
                        onChange={props.onChange} />
                </React.Fragment>
            }
        </div>
    )
}


export function Radio(props) {
    const [selectedOption, setSelectedOption] = useState(props.defaultValue);
    return (
        <div className="dd-radio">
            {props.options.map(option =>
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

// Private Routing
export function PrivateRoute({ children, hasRole, ...rest }) {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.isAutorised() && auth.hasRole(hasRole) ? (
                    children
                ) : auth.isAutorised() && !auth.hasRole(hasRole) ? <AccessDenied /> : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

// Theming
export function SetTheme() {
    return (
        <ChangeTheme initial />
    )
}

export function ChangeTheme(props) {
    let currentTheme = localStorage.getItem('dd-theme')
    !currentTheme && (currentTheme = 'classic')

    const setTheme = theme => {
        localStorage.setItem('dd-theme', theme)
        if (theme === 'classic') {
            document.documentElement.style.setProperty('--button-border-color', '#8E8E8E')
            document.documentElement.style.setProperty('--field-border-color', '#8E8E8E')
            document.documentElement.style.setProperty('--accent-color', '#058efc')
            document.documentElement.style.setProperty('--secondary-accent-color', '#0062BD')
            document.documentElement.style.setProperty('--button-accent-color', '#fff')
            document.documentElement.style.setProperty('--background-color', '#ffffff')
            document.documentElement.style.setProperty('--secondary-background-color', '#eeeeee')
            document.documentElement.style.setProperty('--font-color', '#333333')
            document.documentElement.style.setProperty('--hint-color', '#333')
            document.documentElement.style.setProperty('--code-color', '#333')
            document.documentElement.style.setProperty('--code-color-background', '#eeeeee')
            document.documentElement.style.setProperty('--error-color', '#FF525B')
            document.documentElement.style.setProperty('--error-color-light', '#FFD6D8')
            document.documentElement.style.setProperty('--alert-color', '#ECA910')
            document.documentElement.style.setProperty('--alert-color-light', '#F9DFA4')
            document.documentElement.style.setProperty('--ok-color', '#00C197')
            document.documentElement.style.setProperty('--ok-color-light', '#D6F8E5')
            document.documentElement.style.setProperty('--border-radius', '25px')
            document.documentElement.style.setProperty('--label-color', '#B9E0CB')
            document.documentElement.style.setProperty('--label-text-color', '#333')
        }
        if (theme === 'tiffany') {
            document.documentElement.style.setProperty('--button-border-color', '#8E8E8E')
            document.documentElement.style.setProperty('--field-border-color', '#8E8E8E')
            document.documentElement.style.setProperty('--accent-color', '#4ad5c8')
            document.documentElement.style.setProperty('--secondary-accent-color', '#37aea3')
            document.documentElement.style.setProperty('--button-accent-color', '#fff')
            document.documentElement.style.setProperty('--background-color', '#ffffff')
            document.documentElement.style.setProperty('--secondary-background-color', '#eeeeee')
            document.documentElement.style.setProperty('--font-color', '#333333')
            document.documentElement.style.setProperty('--hint-color', '#333')
            document.documentElement.style.setProperty('--code-color', '#333')
            document.documentElement.style.setProperty('--code-color-background', '#eeeeee')
            document.documentElement.style.setProperty('--error-color', '#FF525B')
            document.documentElement.style.setProperty('--error-color-light', '#FFD6D8')
            document.documentElement.style.setProperty('--alert-color', '#ECA910')
            document.documentElement.style.setProperty('--alert-color-light', '#F9DFA4')
            document.documentElement.style.setProperty('--ok-color', '#00C197')
            document.documentElement.style.setProperty('--ok-color-light', '#D6F8E5')
            document.documentElement.style.setProperty('--border-radius', '25px')
            document.documentElement.style.setProperty('--label-color', '#FFCCA9')
            document.documentElement.style.setProperty('--label-text-color', '#333')
        }
        if (theme === 'dark-mint') {
            document.documentElement.style.setProperty('--button-border-color', '#2f00ff')
            document.documentElement.style.setProperty('--field-border-color', 'rgba(255,255,255,.2)')
            document.documentElement.style.setProperty('--accent-color', '#00ff98')
            document.documentElement.style.setProperty('--secondary-accent-color', '#02c073')
            document.documentElement.style.setProperty('--button-accent-color', ' #131022')
            document.documentElement.style.setProperty('--background-color', '#131022')
            document.documentElement.style.setProperty('--secondary-background-color', '#1c1d3b')
            document.documentElement.style.setProperty('--font-color', '#fff')
            document.documentElement.style.setProperty('--hint-color', '#fff')
            document.documentElement.style.setProperty('--code-color', '#333')
            document.documentElement.style.setProperty('--code-color-background', 'rgba(255,255,255,0.7)')
            document.documentElement.style.setProperty('--error-color', '#FF525B')
            document.documentElement.style.setProperty('--error-color-light', '#6B4151')
            document.documentElement.style.setProperty('--alert-color', '#ECA910')
            document.documentElement.style.setProperty('--alert-color-light', '#665846')
            document.documentElement.style.setProperty('--ok-color', '#00C197')
            document.documentElement.style.setProperty('--ok-color-light', '#346266')
            document.documentElement.style.setProperty('--border-radius', '25px')
            document.documentElement.style.setProperty('--label-color', '#2f00ff')
            document.documentElement.style.setProperty('--label-text-color', 'rgba(255,255,255,.85)')
        }
        if (theme === 'warm-night') {
            document.documentElement.style.setProperty('--button-border-color', '#ce9306')
            document.documentElement.style.setProperty('--field-border-color', 'rgba(255,255,255,.2)')
            document.documentElement.style.setProperty('--accent-color', '#85c92e')
            document.documentElement.style.setProperty('--secondary-accent-color', '#8fff00')
            document.documentElement.style.setProperty('--button-accent-color', ' #142025')
            document.documentElement.style.setProperty('--background-color', '#303d47')
            document.documentElement.style.setProperty('--secondary-background-color', '#142025')
            document.documentElement.style.setProperty('--font-color', '#c2c6cb')
            document.documentElement.style.setProperty('--hint-color', '#fff')
            document.documentElement.style.setProperty('--code-color', '#333')
            document.documentElement.style.setProperty('--code-color-background', 'rgba(255,255,255,0.7)')
            document.documentElement.style.setProperty('--error-color', '#ce4144')
            document.documentElement.style.setProperty('--error-color-light', '#763136')
            document.documentElement.style.setProperty('--alert-color', '#cd9300')
            document.documentElement.style.setProperty('--alert-color-light', '#745b0e')
            document.documentElement.style.setProperty('--ok-color', '#76ab24')
            document.documentElement.style.setProperty('--ok-color-light', '#476927')
            document.documentElement.style.setProperty('--border-radius', '25px')
            document.documentElement.style.setProperty('--label-color', '#ce9306')
            document.documentElement.style.setProperty('--label-text-color', 'rgba(255,255,255,.85)')
        }

    }

    currentTheme && setTheme(currentTheme)
    const changeTheme = e => setTheme(e.target.value)

    const options =
        [
            {
                value: 'classic',
                label: 'Directual Blue, light theme'
            },
            {
                value: 'tiffany',
                label: 'Tiffany Blue, light theme'
            },
            {
                value: 'dark-mint',
                label: 'Denim-Mint, dark theme'
            },
            {
                value: 'warm-night',
                label: 'Warm Night, dark theme'
            }
        ]

    const userOptions = (props.themes && options.filter(option => props.themes.indexOf(option.value) != -1)) || options
    return (
        <React.Fragment>
            {!props.initial &&
                <React.Fragment>
                    <PageHeader icon="styles">{props.header || 'Choose theme'}</PageHeader>
                    <Radio
                        onChange={changeTheme}
                        defaultValue={currentTheme}
                        options={userOptions}
                    />
                </React.Fragment>}
        </React.Fragment>
    )
}