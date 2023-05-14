const mongoose = require('mongoose');
const app = require('./app');
const { MONGODB_URL, PORT } = require('./config/env');

// mongodb connection
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error));

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
