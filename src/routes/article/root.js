'use strict';

const { ObjectId } = require("@fastify/mongodb");
const vc = require("../../utils/promise");

module.exports = async (fastify, options)=>{
    const articleCollection = fastify.mongo.db.collection("article")
    fastify.route({
        url: "/",
        method: "GET",
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            company_id: { type: 'string' },
                            user_id: { type: 'string' },
                            catagory_id: { type: 'string' },
                            articles: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        lang: { type: 'string' },
                                        title: { type: 'string' },
                                        content: { type: 'string' },
                                        is_visible: { type: 'boolean'},
                                        is_approved: {
                                            type: 'object',
                                            properties: {
                                                status: { type: 'boolean' },
                                                staff_id: { type: 'string' },
                                                reason: { type: 'string' },
                                                at: { type: 'string' }
                                            }
                                        },
                                        author_id: { type: 'string' },
                                        created_at: { type: 'string' },
                                        updated_at: { type: 'string' }
                                    },
                                },
                            },
                            comments: { type: 'number' },
                            reaction: {
                                type: 'object',
                                properties: {
                                    like: { type: 'number' },
                                    dislike: { type: 'number' }
                                },
                            },
                            is_visible: { type: 'boolean' },
                            created_at: { type: 'string' },
                            updated_at: { type: 'string' }
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
            const [ err, articles ] = await vc(articleCollection.find({}).toArray());
            if (err) return reply.code(500).send(err);
            const data = articles.map(article=>{
                const { like, dislike } = article.reaction
                return{
                    ...article,
                    comments: article.comments.length,
                    reaction:{
                        like: like.length,
                        dislike: dislike.length
                    }
                }
            })
            return reply.code(200).send(data);
        }
    });


    fastify.route({
        url: "/:id",
        method: "GET",
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string'}
                },
            },
            response: {
                // 200: {
                //     type: 'object',
                //     properties: {                            
                //         _id: { type: 'string' },
                //         company_id: { type: 'string' },
                //         user_id: { type: 'string' },
                //         catagory_id: { type: 'string' },
                //         articles: {
                //             type: 'array',
                //             items: {
                //                 type: 'object',
                //                 properties: {
                //                     _id: { type: 'string' },
                //                     lang: { type: 'string' },
                //                     title: { type: 'string' },
                //                     content: { type: 'string' },
                //                     is_visible: { type: 'boolean'},
                //                     is_approved: {
                //                         type: 'object',
                //                         properties: {
                //                             status: { type: 'boolean' },
                //                             staff_id: { type: 'string' },
                //                             reason: { type: 'string' },
                //                             at: { type: 'string' }
                //                         }
                //                     },
                //                     author_id: { type: 'string' },
                //                     created_at: { type: 'string' },
                //                     updated_at: { type: 'string' }
                //                 },
                //             },
                //         },
                //         is_visible: { type: 'boolean' },
                //         created_at: { type: 'string' },
                //         updated_at: { type: 'string' }

                //     }
                // },
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
            const [ err, data ] = await vc(articleCollection.findOne({
                _id: new ObjectId(id)
            }));
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url: "/add",
        method: "POST",
        schema: {
            body: {
                type: 'object',
                properties: {
                    catagory_id: { type: 'string' },
                    content_picture: { type: 'string' },
                    articles: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                lang: { 
                                    type: 'string',
                                    enum: ["AM", "OR", "EN"]
                                },
                                title: { type: 'string' },
                                content: { type: 'string' },
                            },
                        },
                    }
                },
                required: ["catagory_id"]
            },
            response: {
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

            const articles = body.articles.map(article=>{
                return {
                    _id: new ObjectId(),
                    ...article,
                    is_visible: false, 
                    is_approved: {
                        status: 'Pending',
                    },
                    author_id: `author of ${article.lang}`,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            })

            const input = {
                _id: new ObjectId(),
                company_id: "company_id",
                ...body,
                articles,
                comments: [],
                reaction: {
                    like: [],
                    dislike: []
                },
                is_visible: false,
                created_at: new Date(),
                updated_at: new Date()
            }

            const [ err, data ] = await vc(articleCollection.insertOne(input));
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url: "/deleteAll",
        method: "DELETE",
        handler: async (request, reply)=>{
            const [ err, data ] = await vc(await articleCollection.deleteMany())
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    })
}
