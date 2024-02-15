const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); // this is model and important 
router.post('/', async (req, res)=>{
    try{
      const data = req.body
      const newPerson = new Person(data); 
      const savedPerson = await newPerson.save();  // wait karo jab tak data save nai jata 
      console.log('data saved');
      res.status(200).json(savedPerson);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched:', data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
  });
  
router.get('/:workType', async(req,res)=>{
    try{
    const workType=req.params.workType;
    if(workType=='chef'|| workType=='manager'|| workType=='manager'){
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: 'Invalid work type'});  
    }
    }
    catch(err){
      console.log(err);
      res.status(500).json( {error : 'Internal server error'});
    }
  })

 
  router.put('/:person_id', async (req, res) => {
    try {
        const personId = req.params.person_id;  // Corrected variable name
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.error(err);  // Corrected variable name
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findOneAndDelete({ _id: personId });
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
     console.log('Data deleted');
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports=router;
