const mongoose = require('mongoose')
const wordSchema = new mongoose.Schema({
    pinyin: {type: String, required:true},
    hanzi: {type: String, required: true},
    meaning: {type: String, required: true},
    picked:{type: Boolean, required: true} 
}, {
    timestamps: true
})

const Word = mongoose.model('Word', wordSchema)
module.exports = Word