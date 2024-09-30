const express = require('express');
const router = express.Router()
const Alien = require('../models/alien');
const alien = require('../models/alien');


router.get('/', async(req, res) =>{
    try{
        const aliens = await Alien.find()
        res.json(aliens)

    }catch(err){
        res.send('error' + err)
    }
})


router.get('/:id', async(req, res) =>{
    try{
        const alien = await Alien.findById(req.params.id)
        res.json(alien)

    }catch(err){
        res.send('error' + err)
    }
})


router.post('/', async(req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })
    try{
        const a1 = await alien.save()
        res.json(a1)

    }catch(err){
        res.send('error')
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        if (!alien) {
            return res.status(404).send("Alien not found");
        }
        if (req.body.name !== undefined) {
            alien.name = req.body.name;
        }
        if (req.body.tech !== undefined) {
            alien.tech = req.body.tech;
        }
        if (req.body.sub !== undefined) {
            alien.sub = req.body.sub;
        }

        const updatedAlien = await alien.save();
        res.json(updatedAlien);

    } catch (err) {
        console.error(err); 
        res.send("error");
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const alien = await Alien.findByIdAndDelete(req.params.id);
        if (!alien) {
            return res.status(404).json({ message: 'Alien not found' });
        }
        res.json(alien); 

    } catch (err) {
        res.status(500).send("error: " + err);
    }
});


module.exports = router