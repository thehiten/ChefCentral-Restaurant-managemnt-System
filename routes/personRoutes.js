const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); // this is model and important 

const {jwtAuthMiddleware, generateToken} = require('./../jwt')

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        console.log('Data saved');
        
        const payload ={
          id: savedPerson.id,
          username: savedPerson.username

        }

        const token = generateToken(payload);

        console.log("Token generated:", token);

        // Combine savedPerson and token into a single object before sending as response
        const responseData = {
            person: savedPerson,
            token: token
        };

        res.status(200).json(responseData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// login Routes

router.post('/login', async (req, res) => {
  try {
      // extract username and password from request body
      const { username, password } = req.body;

      // find the user by username
      const user = await Person.findOne({ username: username });
       
      if (!user) {
        // If user doesn't exist, respond with an error
        res.status(401).json({ message: 'Invalid username or password' });
        return; // Exit the function early
      }
  
      // Check if the password matches
      const passwordMatches = await user.comparePassword(password);
      if (!passwordMatches) {
        // If password doesn't match, respond with an error
        res.status(401).json({ message: 'Invalid username or password' });
        return; // Exit the function early
      }


        // If both user exists and password matches, generate token
        const payload = {
          id: user.id,
          username: user.username
        };

        const token = generateToken(payload);


        // return token as response

        res.json({token});
  }

     catch (error) {
      // Error occurred during login process
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// profile routes


router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user; // user have decoded value 
        const userId = userData.id;
        const user = await Person.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  




router.get('/', jwtAuthMiddleware, async (req, res) => {
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
