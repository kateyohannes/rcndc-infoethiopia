
const Catagory = require("../models/catagory.model")

module.exports = {
    getCatagories: async (req, res)=>{
        try{
            const data = await Catagory.find();
            return res.status(200).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    },
    getCatagory: async (req, res)=>{
        try{
            const { id } = req.params
            const data = await Catagory.findById(id)

            if(!data){
                return res.status(404).json({
                    message: "Catagory Not Found!"
                })
            }
            return res.status(200).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    },
    addCatagory: async (req, res)=>{
        try{
            const body = req.body
            if(body.parent){
                const ref = await Catagory.findById(body.parent) 
                if(!ref){
                    return res.status(404).json({
                        message: "Parent Not Found!"
                    })
                }

                body.slug = ref.slug + "_" + body.name.replaceAll(" ", "_").toLocaleLowerCase();
                const data = await Catagory.create(body)
                return res.status(201).json({
                    success: true,
                    hasParent: true,
                    data
                })
            }

            body.slug = body.name.replaceAll(" ", "_").toLocaleLowerCase(); 
            const data = await Catagory.create(body)
            return res.status(201).json({
                success: true,
                hasParent: true,
                data
            })
        }catch(err){
            return res.status(500).json(err);
        }
    },
    updateCatagory: async (req, res)=>{
        try{
            const { id } = req.params
            const body = req.body
            const data = await Catagory.findOne({
                _id : id
            })

            if(!data){
                return res.status(404).json({
                    message: "Catagory Not Found!"
                })
            }

            // child: sub_catagory
            if(data.parent){
                
                const child_slug = data.slug.split("_")
                const child_name = data.name.toLowerCase().split(" ")
                const input_name = body.name.toLocaleLowerCase().replaceAll(" ", "_");
                
                let parent = [];
                child_slug.forEach(slug => {
                    let filtered = child_name.filter(name=> name === slug)
                    if(!filtered.length){
                        parent.push(slug)
                    }
                });
                
                data.name = body.name;
                data.slug = parent.join("_") + "_" + input_name
                const update = await data.save()
                return res.status(201).json({
                    success: true,
                    update
                })
            }
        
            // parent
            console.log("it a parent")
            const childrens = await Catagory.find({
                parent: id
            })

            const op = []
            childrens.map(children=>{
                const child_slug = children.slug.split("_");
                const parent_slug = data.slug.split("_");

                let holder = [];
                child_slug.forEach(slug => {
                    let filtered = parent_slug.filter(name=> name === slug)
                    if(!filtered.length){
                        holder.push(slug)
                    }
                });

                op.push({
                    updateOne: {
                        filter: { _id: children._id },
                        update: { $set: { slug: body.name.toLowerCase().replaceAll(" ", "_") + "_" + holder } },
                        upsert: false
                    }
                })
            })

            data.name = body.name
            data.slug = body.name.toLowerCase().replaceAll(" ", "_");
            const ok = await data.save();
            const result = await Catagory.bulkWrite(op);
            
            const length = childrens.length;    
            
            return res.status(200).json({
                success: true,
                length,
                ok,
                result
            });

        }catch(err){
            return res.status(500).json(err);
        }
    },

    deleteAll: async (req, res)=>{
        try{
            const data = await Catagory.deleteMany()
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err);
        }
    }
}