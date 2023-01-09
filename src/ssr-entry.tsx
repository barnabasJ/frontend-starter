import { Store } from '@reduxjs/toolkit'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import  App  from './client/App'

export function render(url: string, store: Store) {
    console.log({store, url})

  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App store={store}/>
    </StaticRouter>,
  )
}
