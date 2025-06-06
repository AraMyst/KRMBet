require('dotenv').config(); // Load environment variables

const app = require('./app');
const config = require('./utils/config');

const PORT = config.PORT;

// Start the server on the configured port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
