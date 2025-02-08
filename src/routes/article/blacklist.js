'use strict';

module.exports = async (fastify, options)=>{
    fastify.route({
        url: "/",
        method: "GET",
        handler: async (request, reply)=>{
            return reply.code(200).send({
                messagE: "blacklisted!"
            })
        }
    });
    
}