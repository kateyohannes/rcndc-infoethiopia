'use strict';

module.exports = async(fastify, options)=>{
    fastify.route({
        url: '/',
        method: 'GET',
        handler: async (request, reply)=>{
            reply.code(200).send({
                message: 'Its working!'
            })
        }
    });
}