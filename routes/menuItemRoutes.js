const express = require('express');
const router = express.Router();
// this is model and important 
const  MenuItem  = require('../models/MenuItem');
router.post('/', async (req, res)=>{
    try{
      const data = req.body
      const newMenuItem = new MenuItem(data); 
      const savedMenuItem = await newMenuItem.save();  // wait karo jab tak data save nai jata 
      console.log('data saved');
      res.status(200).json(savedMenuItem);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error', details: err.message });
  }
  });
router.get('/', async (req, res) => {
  try {
      const data = await MenuItem.find();
      console.log('Data fetched:', data);
      res.status(200).json(data);
  } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});


router.put('/:menu_item_id', async (req, res) => {
  try {
      const menuItemId = req.params.menu_item_id;  // Corrected variable name
      const updateMenuItemData = req.body;
      
      const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuItemData, {
          new: true,
          runValidators: true
      });

      if (!response) {
          return res.status(404).json({ error: 'MenuItem not found' });
      }

      console.log('MenuItem data updated');
      res.status(200).json(response);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:menuItemId', async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const response = await MenuItem.findByIdAndDelete({ _id: menuItemId });

    if (!response) {
      return res.status(404).json({ error: 'MenuItem not found' });
    }

    console.log('MenuItem data deleted');
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;