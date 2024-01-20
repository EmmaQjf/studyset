/*
router.get('/', wordCtrl.index) // grab all words  
// i need to test and see that I can make a list of all the words.
router.post('/', wordCtrl.create) // create a new word
// i need to test and see that I can create a new word
router.put('/:id', wordCtrl.update) // find the word and change it.
// I need to ensure that given a valid id  and a valid body that I can change an exisiting word.
router.delete('/:id', wordCtrl.destroy) // find the word and get rid of it
router.get('/:id', wordCtrl.show) // find the word and show it.


*/

const mongoose = require('mongoose')
const app = require('../app')
const {MongoMemoryServer} = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8080', console.log('Lets test'))
const Word = require('../models/word')


let mongoServer // use it in two functions: afterAll and beforeAll

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create() // create a server, same as go to the mongoDBAtlas and create a cluster
    await mongoose.connect(mongoServer.getUri(),{useNewUrlParser: true, useUnifiedTopology: true})
}) //before all the tests run, do something 

afterAll(async () => {
    await mongoose.connection.close() // same as ctrl+c; shut off mongoose connection with mongodb 
    mongoServer.stop() //shut off the database as it is using the local memory, otherwise it will destroy the ram in our cmoputer 
    server.close() // shut off the application server
})


describe("test words endpoint for a RESTFUL JSON API", () => {
    test ('it should display a list of words', async() => {
        // const word = new Word({pinyin: "wo", hanzi: "我", meaning: "I", picked: false})
        // await word.save()

        const word = await Word.create({pinyin: "wo", hanzi: "我", meaning: "I", picked: false})
        
        const response = await request(app).get('/words')
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy
        for (let i = 0; i < response.body.length; i++) {
            expect(response.body[i]).toHaveProperty('_id')
            expect(response.body[i]).toHaveProperty('pinyin')
            expect(response.body[i]).toHaveProperty('hanzi')
            expect(response.body[i]).toHaveProperty('picked')
            expect(response.body[i]).toHaveProperty('createdAt')
        }
    })
})