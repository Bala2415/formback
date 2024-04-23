const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON body

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/appform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the employee application
const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Application = mongoose.model('Application', ApplicationSchema);

// Route to handle form submissions
app.post('/apply', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Create a new application
    const application = new Application({ name, email, phone });

    await application.save();

    res.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
