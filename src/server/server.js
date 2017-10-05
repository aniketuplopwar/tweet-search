import express from 'express';
import APIRoutes from './api/api-routes';
import ViewRoutes from './view/view-routes';

const app = express();

app.use('/', ViewRoutes);
app.use('/services', APIRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});