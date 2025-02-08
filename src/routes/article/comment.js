'use strict';

const { ObjectId } = require('@fastify/mongodb');
const vc = require('../../utils/promise');

module.exports = async (fastify, options)=>{
    const articleCollection = fastify.mongo.db.collection('article');

    fastify.route({
        url: '/:article_id',
        method: 'GET',
        schema: {
            params: {
                type: 'object',
                properties:{
                    article_id: { type: 'string' }
                },
                required: [ 'article_id' ]
            },
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            mention: { type: 'string' },
                            content: { type: 'string' },
                            comment_id: { type: 'string' },
                            user_id: { type: 'string' },
                            is_reply: { type: 'boolean'},
                            is_visible: { type: 'boolean' },
                            created_at: { type: 'string' },
                            updated_at: { type: 'string' }
                        },
                    },
                },
                415: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number' },
                        code: { type: 'string' },
                        error: { type: 'string' },
                        message: { type: 'string' }
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
            const { article_id } = request.params
            const [ err, result ] = await vc(articleCollection.findOne({
                _id: new ObjectId(article_id)
            }));
            if (err) return reply.code(500).send(err);

            const data = result.comments.filter(
                comment=> comment.is_reply == false
            );

            return reply.code(200).send(data);
        }
    })


    fastify.route({
        url: '/add/:article_id',
        method: 'PUT',
        schema: {
            params: { 
                type: 'object',
                properties: {
                    article_id: { type: 'string'}
                },
                required: ['article_id']
            },
            body: {
                type: 'object',
                properties: {
                    content: { type: 'string' },
                    mention: { type: 'string' },
                    comment_id: { type: 'string' }
                },
                required: [ 'content' ]
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        acknowledged: { type: 'boolean'},
                        modifiedCount: { type: 'number' },
                        upsertedId: { type: ['string', 'null']},
                        upsertedCount: { type: 'number'},
                        matchedCount: { type: 'number' }
                    },
                },
                415: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number' },
                        code: { type: 'string' },
                        error: { type: 'string' },
                        message: { type: 'string' }
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
            const { article_id } = request.params;
            const body = request.body
            const is_reply = body.comment_id != null ? true : false
            const input = {
                _id: new ObjectId(),
                ...body,
                user_id: 'user_id',
                is_reply,
                is_visible: true,
                created_at: new Date(),
                updated_at: new Date()
            }

            const [ err, data ] = await vc(await articleCollection.updateOne({
                _id: new ObjectId(article_id)
            }, { $push: { comments: input }}))
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url: "/delete/:article_id/:comment_id",
        method: "DELETE",
        shcmea: {
            params: {
                type: 'object',
                properties: {
                    article_id: { type: 'string' },
                    comment_id: { type: 'string' }
                },
                required: [ 'article_id', 'comment_id' ]
            }
        },
        handler: async (request, reply)=>{
            const { article_id, comment_id } = request.params
            const [ err, article ] = await vc(articleCollection.findOne({
                _id: new ObjectId(article_id)
            }));

            const comment = article.comments.find(comment=>comment._id == comment_id);
            if(!comment) { 
                return reply.code(404).send({
                    message: `Comment ${comment_id} is Not Found!`,
                    error: 'Not Found',
                    statusCode: 404,
                });
            }
            const data = {
                ...comment,
                is_visible: false
            }

            return reply.code(200).send({
                local: true,
                data
            });
        }
    })


    // update comment
    // delete comment
    // comment restriction/ blacklisted users
}