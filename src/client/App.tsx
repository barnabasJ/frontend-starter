import reactLogo from '../assets/react.svg'
import './App.css'
import { Provider } from 'react-redux'

import { store } from '@/store/store'
import { Counter } from '@/counter/counter'
import { Films } from '../films/Films'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src="/vite.svg" className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://reactjs.org" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
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
        </Provider>

    )
}

export default App
