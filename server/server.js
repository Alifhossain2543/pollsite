require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { graphqlUploadExpress } = require('graphql-upload')

const mongoose = require('mongoose')
const {DB_PASSWORD} = process.env
// mongoose.connect(`mongodb+srv://huimin:${DB_PASSWORD}@survey-app.r3sta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
}
mongoose.connect(
  `mongodb+srv://me-using_new:b040oG9O5fqHJl8P@cluster0.6b5lg.mongodb.net/surveyapp?authSource=admin&replicaSet=atlas-kjxazy-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
  options
)
mongoose.connection.once("open", () => console.log("Connected to MongoDB"))
async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            try{
                const token = req.header('x-auth-token')
                if(!token) return {user: null}
    
                const decoded = jwt.verify(
                    token, "mysecretkey")
                return { user: decoded }
            } catch(err) {
                return {user: null}
            }
        }
    })

    await server.start()

    const app = express()
    app.use(cors())

    app.use(graphqlUploadExpress())

    server.applyMiddleware({ app })

    await new Promise(r => app.listen({ port: 4000 }, r));
    
    console.log(`🚀Server ready at http://localhost:4000${server.graphqlPath}`)
}

startServer()