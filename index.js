require('dotenv').config();
const app = require('./app');
const database = require('./config/database.config');

const PORT = process.env.PORT || 6969;

database.connect();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
