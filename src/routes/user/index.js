'use strict';

module.exports = async (fastify, options)=>{
    fastify.register(require("./root"))
}