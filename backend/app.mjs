import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'


const app = express();
const port = 3001;

app.use(cors());

const db = mysql.createConnection({
    host: 'wedding.cihg8aa88bhp.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'B8(4s$sY0',
    database: 'wedding',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database', err);
        return;
    }
    console.log('Connected to MySQL Database');
})

app.get('/load-invites', (req, res) => {
    const query = 'SELECT * FROM invite_list';
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data');
            return;
        }
        res.json(results);
    })
   
    
})