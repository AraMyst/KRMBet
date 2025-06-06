// backend/src/server.js

require('dotenv').config(); // Load environment variables from .env

const app = require('./app');
const config = require('./utils/config');

const PORT = config.PORT;

// Start the server and listen on the configured port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
