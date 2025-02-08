'use strict';

const { ObjectId } = require("@fastify/mongodb");
const vc = require("../../utils/promise");

module.exports = async (fastify, options)=>{
    const companyCollection = fastify.mongo.db.collection("company");

    fastify.route({
        url : "/",
        method: "GET",
        handler: async (request, reply)=>{
            const [ err, data ] = await vc(await companyCollection.find({}).toArray());
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url : "/:company_id",
        method: "GET",
        schema: {
            params: {
                type: 'object',
                properties: {
                    company_id: { type: 'string' }
                }
            }
        },
        handler: async (request, reply)=>{
            const { company_id } = request.params;
            const [ err, data ] = await vc(await companyCollection.findOne({
                _id: new ObjectId(company_id)
            }));
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

}