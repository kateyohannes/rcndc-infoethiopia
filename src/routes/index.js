'use strict';

module.exports = async (fastify, options)=>{
    fastify.register(require('./root'));

    fastify.register(require('./ad'),{
        prefix: '/ad'
    });

    fastify.register(require('./article'),{
        prefix: '/article'
    })

    fastify.register(require('./user'),{
        prefix: '/user'
    });
}