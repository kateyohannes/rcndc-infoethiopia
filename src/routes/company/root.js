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
        url : "/:id",
        method: "GET",
        handler: async (request, reply)=>{
            const { id } = request.params;
            const [ err, data ] = await vc(await companyCollection.findOne({
                _id: new ObjectId(id)
            }));
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url : "/register",
        method: "POST",
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    catagory_id: { type :'string' }
                },
                required: [ 'name', 'catagory_id' ]
            }
        },
        handler: async (request, reply)=>{
            const body = request.body;
            const input = {
                _id: new ObjectId(),
                ...body,
                created_at: new Date(),
                updated_at: new Date()
            }

            const [ err, data ] = await vc(await companyCollection.insertOne(input));
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    });

    fastify.route({
        url: "/deleteAll",
        method: "DELETE",
        handler: async (request, reply)=>{
            const [ err, data ] = await vc(await companyCollection.deleteMany())
            if (err) return reply.code(500).send(err);
            return reply.code(200).send(data);
        }
    })
}