const express = require('express');
const app = express();
const { sequelize } = require('./models');
const db = require('./models/init-models')(sequelize);
console.log(db);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
