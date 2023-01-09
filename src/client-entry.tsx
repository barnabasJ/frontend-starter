import { createStore } from '@/store/store'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import  App  from './client/App'

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <App store={createStore()} />
  </BrowserRouter>,
)
console.log('hydrated')
