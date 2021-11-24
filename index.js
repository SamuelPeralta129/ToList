const express =   require( 'express');
const morgan =  require('morgan');
const path =   require('path');
const env =  require( 'dotenv').config();
const {mongoose} =    require( './database.js');
const cors =  require( "cors");

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/api/tasks', require('./routes/task.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'dist')));

//Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
}); 

