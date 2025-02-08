
'use strict';

const { ObjectId } = require("@fastify/mongodb");
const vc = require("../../utils/promise");

module.exports = async (fastify, options)=>{
    const companyStaffCollection = fastify.mongo.db.collection('company_staff')

    fastify.route({
        url: "/",
        method: "GET",
        handler: async (request, reply)=>{
            const [ err, data ] = await vc(await companyStaffCollection.find({
                company_id: "company_id"
            }).toArray());

            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    })


    fastify.route({
        url: "/:staff_id",
        method: "GET",
        schema: {
            params: {
                type: 'object',
                properties: {
                    staff_id: { type: 'string' }
                }
            }
        },
        handler: async (request, reply)=>{
            const { staff_id } = request.params;
            const [ err, data ] = await vc(await companyStaffCollection.findOne({
                $and: [
                    {  _id: new ObjectId(staff_id) },
                    { company_id: "company_id" }
                ]
            }));

            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    })

    fastify.route({
        url: "/addStaff",
        method: "POST",
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                    email: { type: 'string' },
                    full_name: {
                        type: 'object',
                        properties: {
                            first_name: { type: 'string' },
                            middle_name: { type: 'string' },
                            last_name: { type: 'string' }
                        }
                    },
                  
                    role: { type: 'string' },
                },
                required: [ 
                    'username',
                    'password',
                    'email',
                    'full_name',
                    'role'
                ]
            },
        },
        handler: async (request, reply)=>{
            const body = request.body
            const input= {
                _id: new ObjectId(),
                username: body.username,
                email: body.email,
                password: {
                    salt: "salt",
                    current_password: body.password
                },
                profile: {
                    full_name: body.full_name
                },
                role: body?.role,
                company_id: "company_id",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            }
            const [ err, data ] = await vc(await companyStaffCollection.insertOne(input))
            if (err) return reply.code(500).send(err)

            return reply.code(201).send(data)
        }
    });

    fastify.route({
        url: "/inactive_account/:staff_id",
        method: "PUT",
        schema: {
            params: { 
                type: 'object',
                properties: {
                    staff_id: { type: 'string' }
                },
                required: [ 'staff_id' ]
            },
        },
        handler: async (request, reply)=>{
            const { staff_id } = request.params
            const [ err, data ] = await vc(await companyStaffCollection.updateOne({
                _id: new ObjectId(staff_id)
            }, { $set: { is_active: false }},
            { upsert: false }))
        }
    });


    fastify.route({
        url: "/active_account/:staff_id",
        method: "PUT",
        schema: {
            params: { 
                type: 'object',
                properties: {
                    staff_id: { type: 'string' }
                },
                required: [ 'staff_id' ]
            },
        },
        handler: async (request, reply)=>{
            const { staff_id } = request.params
            const [ err, data ] = await vc(await companyStaffCollection.updateOne({
                _id: new ObjectId(staff_id)
            }, { $set: { is_active: true }},
            { upsert: false }))
        }
    });


}