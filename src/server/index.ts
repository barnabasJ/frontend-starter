import fs from 'fs'
import path from 'path'
import fastify from 'fastify'
import { createServer as createViteServer } from 'vite'
import storePlugin from './store-plugin'

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
}

async function startServer() {
    const app = fastify({ logger: envToLogger['development'] })

    await app.register(import('@fastify/http-proxy'), {
        upstream: 'https://swapi-graphql.netlify.app',
        prefix: '/api',
        rewritePrefix: '/.netlify/functions/index',
    })

    await app.register(async (f, _, done) => {

        f.get('/*', () => undefined) // needed to make sure fastify calls the middleware attached in here

        await f.register(storePlugin)

        await f.register(import('@fastify/express'))

        const vite = await createViteServer({
            server: {
                middlewareMode: true
            },
            appType: 'custom',
        })

        f.use(vite.middlewares)


        f.use('*', async (req, res, next) => {
            const url = req.originalUrl

            try {
                // 1. Read index.html
                let template = fs.readFileSync(
                    path.resolve(__dirname, '../../', 'index.html'),
                    'utf-8',
                )

                // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
                //    also applies HTML transforms from Vite plugins, e.g. global preambles
                //    from @vitejs/plugin-react
                template = await vite.transformIndexHtml(url, template)

                // 3. Load the server entry. vite.ssrLoadModule automatically transforms
                //    your ESM source code to be usable in Node.js! There is no bundling
                //    required, and provides efficient invalidation similar to HMR.
                const { render } = await vite.ssrLoadModule(
                    path.resolve(__dirname, '../../', 'src/ssr-entry.tsx'))

                // 4. render the app HTML. This assumes entry-server.js's exported `render`
                //    function calls appropriate framework SSR APIs,
                //    e.g. ReactDOMServer.renderToString()
                const appHtml = await render(url, req.store)

                // 5. Inject the app-rendered HTML into the template.
                const html = template.replace(`<!--ssr-outlet-->`, appHtml)

                // 6. Send the rendered HTML back.
                res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
            } catch (e) {
                // If an error is caught, let Vite fix the stack trace so it maps back to
                // your actual source code.
                vite.ssrFixStacktrace(e)
                next(e)
            }
        })
        done()
    })

    app.listen({ port: 5123 })
}

startServer()

