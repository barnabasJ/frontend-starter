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

function resolve (p: string) {
    return path.resolve(__dirname, p)
}

async function startServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
) {

      console.log({isProd})
    const app = fastify({ logger: envToLogger['development'] })

    await app.register(import('@fastify/http-proxy'), {
        upstream: 'https://swapi-graphql.netlify.app',
        prefix: '/api',
        rewritePrefix: '/.netlify/functions/index',
    })

    await app.register(async (f, _, done) => {

        if (isProd) {
        f.register(import('@fastify/static'), {
            root: path.join(__dirname, '../client/assets'),
            prefix: '/assets/'
        })
        }



        let vite
        if (!isProd) {
            await f.register(import('@fastify/express'))

            vite = await createViteServer({
                server: {
                    middlewareMode: true
                },
                appType: 'custom',
            })

            f.use(vite.middlewares)
        }

        await f.register(storePlugin)
        f.get('/*', async (req, res) => {

            const url = req.url

            try {
                // 1. Read index.html
                let template =
                    fs.readFileSync(
                        isProd ?
    path.resolve(__dirname, '../client/index.html')
                    : path.resolve(__dirname, '../../', 'index.html'),
                    'utf-8',
                )

                console.log(req.store)

                // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
                //    also applies HTML transforms from Vite plugins, e.g. global preambles
                //    from @vitejs/plugin-react
                // template = await vite.transformIndexHtml(url, template)

                // 3. Load the server entry. vite.ssrLoadModule automatically transforms
                //    your ESM source code to be usable in Node.js! There is no bundling
                //    required, and provides efficient invalidation similar to HMR.
                const { render } =
                    isProd ? await import('./ssr-entry.cjs')
                    : await vite?.ssrLoadModule(
                    path.resolve(__dirname, '../../', 'src/ssr-entry.tsx'))

                // 4. render the app HTML. This assumes entry-server.js's exported `render`
                //    function calls appropriate framework SSR APIs,
                //    e.g. ReactDOMServer.renderToString()
                const appHtml = await render(url, req.store)

                // 5. Inject the app-rendered HTML into the template.
                const html = template.replace(`<!--ssr-outlet-->`, appHtml)

                // 6. Send the rendered HTML back.
                res.code(200)
                res.header( 'Content-Type', 'text/html' )
                res.send(html)
            } catch (e) {
                console.log(e)
                // If an error is caught, let Vite fix the stack trace so it maps back to
                // your actual source code.
                vite?.ssrFixStacktrace(e)
            }
        })
        done()
    })

    app.listen({ port: 5123 })
}

startServer()

