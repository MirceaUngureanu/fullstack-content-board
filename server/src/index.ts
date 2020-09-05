import { MikroORM } from "@mikro-orm/core"
import microConfig from "./mikro-orm.config"
import express from 'express'
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
    // connect ot db
    const orm = await MikroORM.init(microConfig)
    // run schema migrations
    await orm.getMigrator().up()

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ HelloResolver ],
            validate: false
        })
    })

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('server stated on localhost:4000')
    })

    // run sql
    // const post = orm.em.create(Post, { title: 'my first post' })
    // await orm.em.persistAndFlush(post)

    // check insertions
    // const posts = await orm.em.find(Post, {})
    // console.log(posts)
}

main()