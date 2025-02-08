
'use strict';

module.exports = async (fastify, options)=>{
    fastify.register(require("./root"));

    fastify.register(require("./document"),{
        prefix: "/document"
    });

    fastify.register(require("./staff"),{
        prefix: "/staff"
    });
}