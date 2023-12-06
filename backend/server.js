const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
