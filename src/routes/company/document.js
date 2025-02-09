
'use strict'

const { ObjectId } = require("@fastify/mongodb");
const vc = require("../../utils/promise");

module.exports = async (fastify, options)=>{
    const companyCollection = fastify.mongo.db.collection("company");

    // for admin
    fastify.route({
        url: "/view/:company_id",
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
            const [ err, data ] = await vc(await companyCollection.find({
                _id: new ObjectId(company_id)
            }));
            if (err) return reply.code(500).send(err);
            reply.code(200).send(data);
        }
    });
    // for admin
    fastify.route({
        url: "/view/:company_id/:document_id",
        method: "GET",
        schema: {
            params: {
                type: 'object',
                properties: {
                    company_id: { type: 'string' },
                    document_id: { type: 'string' },
                },
                required: [
                    'company_id',
                    'document_id'
                ]
            }
        },
        handler: async (request, reply)=>{
            const {company_id, document_id } = request.params 
            const [ err, company] = await vc(await companyCollection.findOne({
                _id: new ObjectId(company_id)
            }));
            if (err) return reply.code(500).send(err);

            const data = company.documents.find(document=> document._id == document_id);
            if(!data) { 
                return reply.code(404).send({
                    message: `Document ${document_id} is Not Found!`,
                    error: 'Not Found',
                    statusCode: 404,
                });
            }
            return reply.code(200).send(data);
        }
    });

}