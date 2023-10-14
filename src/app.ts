import fastify from "fastify"

export const app = fastify({
    logger: true
})

app.get("/", async (request, reply) => {
    return {hello: "world"}
})