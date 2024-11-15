// ? Should we be meticulous with inconsistent/missing semi-colons?
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';


const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gigfinder')
  .then(() => console.log('successfully connected to database'))
  .catch((error: Error) => console.error('error connecting to database:  ', error));

//use routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})