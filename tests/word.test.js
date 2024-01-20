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
    await mongoose.connect(mongoServer.getUri())
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

    test('it should create a new word', async() => {

        const response = await request(app).post('/words').send({
            pinyin: "wo", hanzi: "我", meaning: "I", picked: false
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.pinyin).toEqual('wo')
        expect(response.body.hanzi).toEqual('我')
        expect(response.body.meaning).toEqual('I')
        expect(response.body.picked).toEqual(false)
    })

    test ('it should update a word', async() => {
        const word = await Word.create({pinyin: "wo", hanzi: "我", meaning: "I", picked: false})
        const response = await request(app).put(`/words/${word._id}`).send({
         picked: true
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.picked).toEqual(true)

    })

    test('It should show the word', async() => {
        const word = await Word.create({pinyin: "wo", hanzi: "我", meaning: "I", picked: true})
        const response = await request(app).get(`/words/${word._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.picked).toBeTruthy

    })

    test('It should delete the word', async() => {
        const word = await Word.create({pinyin: "wo", hanzi: "我", meaning: "I", picked: false})
        const response =await request(app).delete(`/words/${word._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('msg')
        expect(response.body.msg).toEqual(`The word with the Id of ${word._id} was deleted from the MongoDB database, no further action necessary`)
        
  })

})