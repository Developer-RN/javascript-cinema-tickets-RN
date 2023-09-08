import express from 'express'
import routesV1 from './routes/V1/routes.js'
import bodyParser from 'body-parser'
import ErrorHandler from './pairtest/lib/ErrorHandler.js'
const app = express()
app.use(bodyParser.json())
app.use('/', routesV1)

app.use(ErrorHandler)

export default app
