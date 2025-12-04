import express, { json } from 'express'
import 'dotenv/config';
import cors  from 'cors'
import connectDB from './config/db.js';
import AuthRoutes from './routes/AuthRoutes.js';
import cookieParser from 'cookie-parser';


const app = express()

await connectDB()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())




app.get('/', (req,res) => {
    res.send("server is running")
})

app.use('/api/auth',AuthRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT , () => {
    console.log(`server is running at http://localhost:${PORT}`);
    
})