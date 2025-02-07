'use strict';

const path = require("node:path");
const fastify = require("fastify")({
    logger: true,
});

fastify.register(require('@fastify/autoload'),{
    dir: path.join(__dirname, 'plugins')
});

fastify.register(require("./routes"), {
    prefix: "/api/v1",
});

const start = async ()=>{
    try{
        await fastify.listen({ 
            port: 4500, 
            host: '0.0.0.0' 
        });
    }catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
}

start();