const express = require('express');
const app = express();

const roleRouter = require('./routes/roles');
const userRouter = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
