const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResearchFieldSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    parent : {
        type : Schema.Types.ObjectId,
        ref : 'ResearchField'
    }
})

ResearchFieldSchema.pre('remove', async function(next) {
    const children = await this.model('ResearchField')
        .find({
            parent : this._id
        })
    
    await Promise.all(children.map( async child => {
        await child.remove()
    }))

    return next()
})


const ResearchField = mongoose.model('ResearchField', ResearchFieldSchema)

module.exports = ResearchField 