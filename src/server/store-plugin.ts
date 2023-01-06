import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import { createStore } from '../store/store'
import { Store } from '@reduxjs/toolkit'

declare module 'fastify' {
  interface FastifyRequest {
    store?: Store
  }
}


const storePlugin = fp(function (fastify: FastifyInstance, _: unknown, done: () => void) {

    fastify.decorateRequest('store', undefined)

    fastify.addHook('preHandler', (req, res, done) => {
        req.store = createStore()
    })
    done()
})

export default storePlugin
