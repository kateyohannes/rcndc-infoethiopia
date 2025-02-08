'use strict';

const vc = require('../../utils/promise');

module.exports = async (fastify, options)=>{
    const articleCollection = fastify.mongo.db.collection('article');

    fastify.route({
        url: '/like/:id',
        method: 'PUT',
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: [ 'id' ]
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
            const input= {
                user_id: 'user_id'
            }
            const [ err, data ] = await vc(await articleCollection.updateOne({
                _id: new ObjectId(id)
            }, { $push:  { likes: { $each: ['user_id'] } }}, { upset: true}))
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });
}