import React, { StrictMode, Suspense, lazy } from 'react'
import reactLogo from '../assets/react.svg'
import {logo} from './app.css'
import { Provider } from 'react-redux'

import type { Store } from '@/store/store'
import { Counter } from '@/counter/counter'
import { Films } from '../films/Films'
import { Route, Routes, Link, useLocation } from 'react-router-dom'


const Home = lazy(() => import('./pages/home'),)
const About = lazy(() => import('./pages/about'),)

function App({ store }: { store: Store }) {
    const location = useLocation()

    console.log({ location })

    return (
        <StrictMode>
            <Provider store={store}>
                <Suspense>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Suspense>
                <div className="App">
                    <div>
                        <a href="https://vitejs.dev" target="_blank">
                            <img src="/vite.svg" className={logo} alt="Vite logo" />
                        </a>
                        <a href="https://reactjs.org" target="_blank">
                            <img src={reactLogo} className= {`${logo} react`} alt="React logo" />
                        </a>
                    </div>
                    <h1>Vite + hello +  React</h1>
                    <div className="card">
                        <Counter />
                    </div>
                    <p className="read-the-docs">
                        Click on the Vite and React logos to learn more
                    </p>
                </div>
                <div>
                    <Link to="/">Home</Link>
                    <br />
                    <Link to="/about">About</Link>
                </div>
                <Films />
            </Provider>
        </StrictMode>

    )
}

export default App
