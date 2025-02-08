'use strict';

module.exports = async (fastify, options)=>{
    const blacklistColletion = fastify.mongo.db.collection("blacklist");
    
    fastify.route({
        url: "/",
        method: "GET",
        handler: async (request, reply)=>{
            const [ err, data ] = await vc(await blacklistColletion.find({}).toArray());
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });
    
}