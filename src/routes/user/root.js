'use strict';

const vc = require("../../utils/promise");

module.exports = async (fastify, options)=>{
    const userCollection = fastify.mongo.db.collection("user");

    fastify.route({
        url: "/",
        method: "GET",
        schema : {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            username: { type: 'string' },
                            profile: {
                                type: 'object',
                                properties: {
                                    full_name: { 
                                        type: 'object',
                                        properties: {
                                            first_name: { type: 'string' },
                                            middle_name: { type: 'string' },
                                            last_name: { type: 'string' }
                                        },
                                    },
                                    gender: { type: 'string', enum: ['Male', 'Female'] },
                                    birth_of_date: { type: 'string' },
                                    profile_picture: { type: 'string' } 
                                },
                            },
                            created_at: { type: 'string' },
                            updated_at: { type: 'string'}
                        },
                    },
                },
                415: {
                    type: 'object',
                    properties: {
                        statusCode: { type: "number" },
                        code: { type: "string" },
                        error: { type: "string" },
                        message: { type: "string" }
                    }
                },
                500: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number' },
                        error: { type: 'string' },
                        message: { type: 'string' }
                    },
                },
            },
        },
        handler: async (request, reply)=>{
            const [ err, data ] = await vc(await userCollection.find({}).toArray())
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url: "/:id",
        method: "GET",
        // schema : {
        //     params: {
        //         type: 'object',
        //         properties: {
        //             id: { type: 'string' }
        //         },
        //     },
        //     response: {
        //         200: {
        //             type: 'object',
        //             properties: {
        //                 type: 'object',
        //                 properties: {
        //                     _id: { type: 'string' },
        //                     username: { type: 'string' },
        //                     password:{ 
        //                         type: 'object',
        //                         properties: {
        //                             salt: { type: 'string' },
        //                             old_password: { type: 'string' },
        //                             current_password: { type: 'string' }
        //                         },
        //                     },
        //                     profile: {
        //                         type: 'object',
        //                         properties: {
        //                             full_name: { 
        //                                 type: 'object',
        //                                 probjectoperties: {
        //                                     first_name: { type: 'string' },
        //                                     middle_name: { type: 'string' },
        //                                     last_name: { type: 'string' }
        //                                 },
        //                             },
        //                             gender: { 
        //                                 type: 'string', 
        //                                 enum: ['Male', 'Female'] 
        //                             },
        //                             birth_of_date: { type: 'string' },
        //                             profile_picture: { type: 'string' } 
        //                         },
        //                     },
        //                     saved_post: {
        //                         type: 'array',
        //                         items: { 
        //                             type: 'object',
        //                             properties: {
        //                                 post_id: { type: 'string' },
        //                                 saved_at: { type: 'string' }
        //                             },
        //                         },
        //                     },
        //                     is_active: { type: 'boolean' },
        //                     is_verified: { type: 'boolean' },
        //                     is_subscribed: { type: 'boolean' },
        //                     role: { type: 'string' },
        //                     created_at: { type: 'string' },
        //                     updated_at: { type: 'string'}
        //                 },
        //             },
        //         },
        //         415: {
        //             type: 'object',
        //             properties: {
        //                 statusCode: { type: "number" },
        //                 code: { type: "string" },
        //                 error: { type: "string" },
        //                 message: { type: "string" }
        //             }
        //         },
        //         500: {
        //             type: 'object',
        //             properties: {
        //                 statusCode: { type: 'number' },
        //                 error: { type: 'string' },
        //                 message: { type: 'string' }
        //             },
        //         },
        //     },
        // },
        handler: async (request, reply)=>{
            const { id } = request.params;
            const [ err, data ] = await vc(await userCollection.findOne({
                _id: new ObjectId(id)
            }));
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

}