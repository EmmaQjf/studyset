const Word = require('../models/word')
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')



/*
router.get('/', wordCtrl.index) // grab all words
router.post('/', wordCtrl.create) // create a new word
router.put('/:id', wordCtrl.update) // find the word and change it.
router.delete('/:id', wordCtrl.destroy) // find the word and get rid of it
router.get('/:id', wordCtrl.show) // find the word and show it.
*/

/*
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status 
200 - good response 
300 - redirection 
400 -- bad response but it is the users' fault
//401 Unauthorized
Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
500 - server's fault

*/
exports.index = async function index (req, res) {
    //grab all the words
    try {
       const allWords = await Word.find({})
       res.status(200).json(allWords)//ok request 

    } catch (error) {
      res.status(400).json({msg: error.message})
    }
}



exports.create = async function create(req, res) {
    // create a new word
    try {
       const newWord = await Word.create(req.body)
       res.status(200).json(newWord)

    } catch (error) {
        res.status(400).json({msg: error.message})
    }  
}

//[options.new=false] «Boolean» if true, return the modified document rather than the original

exports.update = async function update(req, res) {
    // update a word
    try {
       const updatedWord = await Word.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})//...req.body visually reminds them that they are sending an object 
        //{returnDocument='before'} also works. instead of {new: true}
        res.status(200).json(updatedWord)

    } catch (error) {
        res.status(400).json({msg: error.message})
    }   
}

//Model.deleteOne()
//Deletes the first document that matches conditions from the collection. It returns an object with the property deletedCount indicating how many documents were deleted.

//findOneAndDelete()
//Finds a matching document, removes it, and returns the found document (if any).


exports.destroy = async function destroy(req, res) {
    //delete a word
    try {
        const deleted = await Word.findOneAndDelete({_id: req.params.id})
        //204 No Content
//There is no content to send for this request, but the headers may be useful. The user agent may update its cached headers for this resource with the new ones.
        //res.sendStatus(204) task succeed but does not send back any data

        res.status(200).json({ msg: `The word with the Id of ${deleted._id} was deleted from the MongoDB database, no further action necessary`})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
    
}

exports.show = async function show (req, res) {
    // display a word
    try {
        const foundWord = await Word.findOne({_id: req.params.id})
        res.status(200).json(foundWord)
    } catch (error) {
        res.status(400).json({msg: error.message}) 
    }
}