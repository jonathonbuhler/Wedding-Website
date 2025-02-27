
import express from 'express'
import mysql from 'mysql2'
import splitName from './helper.mjs';

const router = express.Router();

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'admin',
    password: '7Ne9!@fh*z',
    database: 'wedding',
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0 
}).promise();


router.post('/add-invite', async (req, res) => {
    const { first_name, last_name, address_1, address_2, city, state, postal, country} = req.body

    const query1 = "INSERT INTO address (address_line1, address_line2, city, state, postal, country) VALUES (?,?,?,?,?,?)";
    const query2 = "INSERT INTO person (first_name, last_name, address_id) VALUES (?,?,?)";

    let connection = null;

    try {        
        connection = await pool.getConnection();
        await connection.beginTransaction()

        const [address] = await connection.query(query1, [address_1, address_2, city, state, postal, country]);
        await connection.query(query2, [first_name, last_name, address.insertId]);

        await connection.commit()

        console.log(`Successfully requested invite for ${first_name}`)
        res.status(200).send('Successfully requested invite.')
    } catch (err) {
        if (connection) {
            await connection.rollback()
        }
        console.error('Error adding invite', err)
        res.status(500).send('Failed to add invite.')
    } finally {
        if (connection) {
            connection.release()
        }
        
    }


})


router.get('/load-invites', async (req, res) => {
    const query = 'SELECT * FROM person LEFT JOIN address ON address.id = person.address_id';
    
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {        
        console.error('Error loading invites', err);
        res.status(500).send('Error loading invites');
    }  
})

router.post('/check-rsvp-status', async (req, res) => {
    const { first_name, last_name } = req.body;    
    const query = 'SELECT invited_luncheon, invited_sealing FROM person WHERE LOWER(first_name) = LOWER(?) and LOWER(last_name) = LOWER(?)';

    try {
        const [results] = await pool.query(query, [first_name, last_name])
        if (results.length === 0) {
            return res.json({ error: 'No guests found with that name.' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error("Error checking RSVP status.", err)
        res.status(500).send('Error checking RSVP status.')
    }
})

router.post('/submit-rsvp', async (req, res) => {
    const { name, bringingGuests, numGuests, guests, invitedLuncheon, invitedSealing, attendingSealing, attendingLuncheon, attendingReception } = req.body;

    if (!name) {
        return res.json({ message: 'An Error Occurred.' })
    }

    const { first_name, last_name } = splitName(name)

    const query0 = "SELECT party_id FROM person WHERE LOWER(first_name) = LOWER(?) AND LOWER(last_name) = LOWER(?)"
    const query1 = "INSERT INTO party(sealing_party_size, luncheon_party_size, reception_party_size) VALUES (?,?,?)"
    const query2 = "UPDATE person SET party_id = ?, attending_sealing = ?, attending_luncheon = ?, attending_reception = ? WHERE LOWER(first_name) = LOWER(?) AND LOWER(last_name) = LOWER(?)"    

    let connection = null;
    try {    
        connection = await pool.getConnection()
        await connection.beginTransaction()
        const [results] = await connection.query(query0, first_name, last_name)
        if (results.length > 0 && results[0].party_id) {
            return res.json({ message: "You cannot RSVP twice."})
        }

        const [party] = await connection.query(query1, [attendingSealing.length, attendingLuncheon.length, attendingReception.length]);        
        
        const promises1 = guests.map((value) => {
            const { guest_first_name, guest_last_name } = splitName(value)
            return connection.query(query2, [party.insertId, attendingSealing.includes(name), attendingLuncheon.includes(name), attendingReception.includes(name), guest_first_name, guest_last_name]);

        });

        await Promise.all(promises1);

        await connection.commit();
        res.json({ message: 'Thank you. Your submission has been recorded.' });
        

    } catch (err) {
        if (connection) {
            await connection.rollback()
        }
        res.json({ message: 'An Error Occurred.' })
    } finally {
        if (connection) {
            connection.release()
        }   
    }
})

router.get("/load-attending", async (req, res) => {
    const query = "SELECT SUM(sealing_party_size) AS sealing, SUM(luncheon_party_size) AS luncheon, SUM(reception_party_size) AS reception FROM party"
    try {
        const [results] = await pool.query(query)
        res.json(results[0])
    } catch (err) {
        res.json({ error: err })
    }
})

export default router