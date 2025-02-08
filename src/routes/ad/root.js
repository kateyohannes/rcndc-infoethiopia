'use strict';

const { ObjectId } = require("@fastify/mongodb");
const vc = require("../../utils/promise");

module.exports = async (fastify, options)=>{
    const adCollection = fastify.mongo.db.collection("ad");

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
                            // oneOf: [
                            //     { company_id: { type: 'string' } },
                            //     { user_id: { type: 'string' } }
                            // ],
                            description: { type: 'number' },
                            content_url: { type: 'string' },
                            position: {
                                type: 'array',
                                items: { 
                                    type: 'string', 
                                    enum: ['Top', 'Left', 'Right', 'Bottom' ]
                                },
                            },
                            duration: { type: 'number' }, // second, default 5 - 30
                            timetable: {
                                start_from: { type: 'string'},
                                end_at: { type: 'string' }
                            },
                            view_counter: { type: 'number' },
                            is_visible: { type: 'boolean' },
                            is_checked: { type: 'boolean' },
                            is_approved: {
                                type: 'object',
                                properties: {
                                    status: { type: 'boolean' },
                                    staff_id: { type: 'string' },
                                    reason: { type: 'string' },
                                    at: { type: 'string' }
                                },
                            },
                            created_at: { type: 'string' },
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
            const [ err, data ] = await vc(await adCollection.find({}).toArray())
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url: "/:id",
        method: "GET",
        schema : {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        // oneOf: [
                        //     { company_id: { type: 'string' } },
                        //     { user_id: { type: 'string' } }
                        // ],
                        description: { type: 'string' },
                        content_url: { type: 'string' },
                        position: {
                            type: 'array',
                            items: { 
                                type: 'string', 
                                enum: ['Top', 'Left', 'Right', 'Bottom' ]
                            },
                        },
                        duration: { type: 'number' },
                        timetable: {
                            type: 'object',
                            properties: {
                                start_from: { type: 'string'},
                                end_at: { type: 'string' }
                            }
                        },
                        view_counter: { type: 'number' },
                        is_visible: { type: 'boolean' },
                        is_checked: { type: 'boolean' },
                        is_approved: {
                            type: 'object',
                            properties: {
                                status: { type: 'boolean' },
                                staff_id: { type: 'string' },
                                reason: { type: 'string' },
                                at: { type: 'string' }
                            },
                        },
                        created_at: { type: 'string' },
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
            const { id } = request.params;
            const [ err, data ] = await vc(await adCollection.findOne({
                _id: new ObjectId(id)
            }))
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url: "/add",
        method: "POST",
        schema:{
            body: {
                type: 'object',
                properties: {
                    description: { type: 'string' },
                    content_url: { type: 'string' },
                    position: {
                        type: 'array',
                        items: { 
                            type: 'string', 
                            enum: ['Top', 'Left', 'Right', 'Bottom' ]
                        },
                    },
                    duration: { type: 'number', default: 5 },
                    timetable: {
                        type: 'object',
                        properties: {
                            start_from: { type: 'string'},
                            end_at: { type: 'string' }
                        }
                    },
                },
                required: ['content_url', 'position', 'timetable']
            },
            response:{
                201: {
                    type: 'object',
                    properties: {
                        acknowledged: { type: 'boolean' },
                        insertedId: { type: 'string' },
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
            const body = request.body;
            const input = {
                _id: new ObjectId(),
                // based on the role, the post wold be make using
                ...body,
                view_counter: 0,
                is_visible: false,
                is_checked: false,
                is_approved: {
                    status: 'Pending'
                },
                created_at: new Date(),
                updated_at: new Date()
            }

            const [ err, data ] = await vc(await adCollection.insertOne(input));
            if(err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url: '/approve/:id',
        method: 'PUT',
        schema: {
            params: { 
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
            },
            body:{
                type: 'object',
                properties: {
                    status: { type: 'boolean' },
                    reason: { type: 'string' },
                },
                required: ['status']
            },
            response:{
                200: {
                    type: 'object',
                    properties: {
                        acknowledged: { type: 'boolean' },
                        modifiedCount: { type: 'number' },
                        upsertedId: { 
                            type: [ 'string', 'null']
                        },
                        upsertedCount: { type: 'number'},
                        matchedCount: { type: 'number' }
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
        handler: async(request, reply)=>{
            const body = request.body;
            const { id } = request.params;
            const input = {
                ...body,
                staff_id: 'staff_id',
                is_checked: true,
                at: new Date()
            }
            const [ err, data ] = await vc(await adCollection.updateOne({
                _id: new ObjectId(id)
            }, { $set: input },
            { upsert: false }));
        }
    });

    fastify.route({
        url: "/deleteAll",
        method: "DELETE",
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        acknowledged: { type : 'boolean' },
                        deletedCount: { type: 'number' }
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
            }
        },
        handler: async (request, reply)=>{
            const [ err, data ] = await vc(await departmentCollection.deleteMany());
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });


    
}
