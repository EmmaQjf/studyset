const wordCtrl = require('../controllers/wordController')
const express = require('express')
const router = express.Router()

//INDUCES    EDIT, NEW(FRONT-END)  IDUCS --API(BACKEND)
router.get('/', wordCtrl.index) // grab all words
router.post('/', wordCtrl.create) // create a new word
router.put('/:id', wordCtrl.update) // find the word and change it.
router.delete('/:id', wordCtrl.destroy) // find the word and get rid of it
router.get('/:id', wordCtrl.show) // find the word and show it.

module.exports = router
