import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json())

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

app.post('/add-invite', (req, res) => {
    const { first_name, last_name, address_1, address_2, city, state, postal, country} = req.body

    const query = "INSERT INTO invite_list (first_name, last_name, address_1, address_2, city, state, postal, country) VALUES (?,?,?,?,?,?,?,?)"
    db.query(query, [first_name, last_name, address_1, address_2, city, state, postal, country] ,(err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data');
            return;
        }
        res.status(200).send('Invite added successfully');
    })
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})