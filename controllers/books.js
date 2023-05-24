const router = require('express').Router()
const Books = require('../models/book')

router.get('/', async (req,res) => {
    try {
        const books = await Books.find()
        res.json(books)
    } catch (error){
        console.log('error retreiving books: ', error)
        res.status(404).json({message: 'error retreiving books'})
    }
})

//Seeding the database
router.get('/seed', (req, res) => {
    Books.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

//Gets one at a time
router.get('/:id', async (req,res) => {
    const { id } = req.params
    try {
        const book = await Books.findById(id)
        res.json(book)
    } catch (error) {
        console.log('error retreiving book: ', error)
        res.status(404).json({message: `error retreiving book ${req.params}`})
    }
})

//Updates 
router.put('/:id', async (req,res) => {
    const { id } = req.params
    try {
       const bookUpdate = await Books.findByIdAndUpdate(id)
       res.json(bookUpdate)        
    } catch (error) {
        console.log('error retreiving book: ', error)
        res.status(404).json({message: `error retreiving book ${req.params}`})
    }
})

//Delete
router.delete('/:id', async (req,res) => {
    const { id } = req.params
    try {
       await Books.findByIdAndDelete(id)
       res.status(303).redirect('/books')              
    } catch (error) {
        console.log('error deleting book: ', error)
        res.status(404).json({message: `error deleting book ${req.params}`})
    }
})

//Creating new book 
router.post('/', async (req,res) => {
    try {
        const newBook = await new Books(req.body).save()
        res.json(newBook)
    } catch (error) {
        console.log('error creating book: ', error)
        res.status(404).json({message: `error creating book ${req.params}`})
    }
})


module.exports = router