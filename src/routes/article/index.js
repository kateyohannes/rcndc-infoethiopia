'use strict';

module.exports = async (fastify, options)=>{
    fastify.register(require("./root"));
    
    fastify.register(require("./blacklist"),{
        prefix: "/blacklist"
    })

    fastify.register(require("./comment"),{
        prefix: "/comment"
    });

    fastify.register(require("./reaction"), {
        prefix: "/reaction"
    })
}