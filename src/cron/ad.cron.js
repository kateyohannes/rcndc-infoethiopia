const { CronJob } = require('cron');
const vc = require("../utils/promise");

module.exports = async (fastify, options)=>{
    const adCollection = fastify.mongo.db.collection("ad");
    new CronJob(
        '0 0 * * *', // every 24 hours at 0
        async function () {
            // it revalidate both start and end date of an ad
            const [ err, start ] = await vc(await adCollection.find({
                $and: [
                    { is_checked: true },
                    { is_visible: false },
                    { is_approved: { status: true }}
                ]
            }).toArray());
            if (err) console.log({ err })
            console.log({ start });
        },
    ).start();
}