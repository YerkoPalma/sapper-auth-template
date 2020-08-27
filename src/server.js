import sirv from 'sirv'
import polka from 'polka'
import mongoose from 'mongoose'
import compression from 'compression'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import configPassport from './passport'
import * as sapper from '@sapper/server'

configPassport(passport)

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const app = polka()

;(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('MongoDB connected!')
  } catch (err) {
    console.log('error: ' + err)
  }

  app
    .use(
      compression({ threshold: 0 }),
      sirv('static', { dev }),
      bodyParser(),
      session({
        secret: 'asdo812nk123',
        resave: true,
        saveUninitialized: true
      }),
      passport.initialize(),
      passport.session(),
      sapper.middleware({
        session: (req, res) => {
          const { name, email } = req.user || {}
          return req.user ? {
            user: { name, email }
          } : {}
        }
      })
    )
    .listen(PORT, err => {
      if (err) console.log('error', err)
    })
})()
