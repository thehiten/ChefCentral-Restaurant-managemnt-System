const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  taste: {
    type: String,
    // You can add more validation or customize based on your needs
  },
  is_drink: {
    type: Boolean,
    default: false // Assuming it's not a drink by default
  },
  ingredient: {
    type: String
    // You might want to use an array if there are multiple ingredients
  },
  num_sales: {
    type: Number,
    default: 0 // Assuming initially no sales
  }
});
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
