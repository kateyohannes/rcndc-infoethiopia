
'use strict';

const { ObjectId } = require("@fastify/mongodb");
const vc = require("../../utils/promise");

module.exports = async (fastify, options)=>{
    const companyStaffCollection = fastify.mongo.db.collection('company_staff')

    fastify.route({
        url: "/:company_id",
        method: "GET",
        schema: {
            params: {
                type: 'object',
                properties: {
                    company_id: { type: 'string' }
                },
                required: [ 'company_id' ]
            },
            query: {
                type: 'object',
                properties: {
                    is_active: { type: 'boolean' }
                }
            }
        },
        handler: async (request, reply)=>{
            const { company_id } = request.params
            const [ err, data ] = await vc(await companyStaffCollection.find({
                company_id: new ObjectId(company_id)
            }).toArray());

            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    })


    fastify.route({
        url: "/:company_id/:staff_id",
        method: "GET",
        schema: {
            params: {
                type: 'object',
                properties: {
                    company_id: { type: 'string' },
                    staff_id: { type: 'string' }
                },
                required: [
                    'company_id',
                    'staff_id'
                ]
            }
        },
        handler: async (request, reply)=>{
            const { staff_id } = request.params;
            const [ err, data ] = await vc(await companyStaffCollection.findOne({
                $and: [
                    {  _id: new ObjectId(staff_id) },
                    { company_id: new ObjectId(company_id) }
                ]
            }));

            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

}