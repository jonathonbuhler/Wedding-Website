import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json())

const pool = mysql.createPool({
    host: 'wedding.cihg8aa88bhp.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'B8(4s$sY0',
    database: 'wedding',
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0 
});

const db = pool.promise()

app.post('/add-invite', async (req, res) => {
    const { first_name, last_name, address_1, address_2, city, state, postal, country} = req.body

    const query = "INSERT INTO invite_list (first_name, last_name, address_1, address_2, city, state, postal, country) VALUES (?,?,?,?,?,?,?,?)"

    try {
        await db.query(query, [first_name, last_name, address_1, address_2, city, state, postal, country])
        res.status(200).send('Invite added successfully.');
    } catch (err) {
        console.error('Error inserting invite', err)
        res.status(500).send('Invite request failed.')
    }
    
    
})


app.get('/load-invites', async (req, res) => {
    const query = 'SELECT * FROM invite_list';
    
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error loading invites', err);
        res.status(500).send('Error loading invites');
    }
    
   
    
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})