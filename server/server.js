import express, { json } from 'express'
import 'dotenv/config';
import cors  from 'cors'
import connectDB from './config/db.js';
import AuthRoutes from './routes/AuthRoutes.js';


const app = express()

await connectDB()

app.use(cors())
app.use(express.json())




app.get('/', (req,res) => {
    res.send("server is running")
})

app.use('/api/auth',AuthRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT , () => {
    console.log(`server is running at http://localhost:${PORT}`);
    
})