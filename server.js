const express = require('express');
const app = express();

const roleRouter = require('./routes/roles.routes');
const userRouter = require('./routes/users.routes');
const categoryRouter = require('./routes/categories.routes');
const productRouter = require('./routes/products.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
