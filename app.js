const express = require('express');
const pool = require('./db');
const cors = require('cors');

// create express app
const app = express();

// use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.send('Midterm Exam Routes....');
});
app.get('/NeneriaAyuno-2.1.1', async (req, res) => {
    try {
        const sql = 'Select count(*) from film';
        const query_res = await pool.query(sql);
        res.json(query_res.rows);
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});

app.get('/NeneriaAyuno-2.1.2', async (req, res) => {
    try {
        const sql = `
            Select rating as "rating",
	        sum(length)
	        from film
            group by rating
            order by rating asc
            `;

        const query_res = await pool.query(sql);
        res.json(query_res.rows);
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});

app.get('/NeneriaAyuno-2.1.3', async (req, res) => {
    try {
        const sql = `
            select film_id,
	   title	   
from film
group by film_id
having replacement_cost = (select max(replacement_cost) from film)
order by 1 asc
limit 15;
            `;

        const query_res = await pool.query(sql);
        res.json(query_res.rows);
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});

app.get('/NeneriaAyuno-2.2.1', async (req, res) => {
    try {
        const sql = `SELECT * FROM midterm_list_of_films`;

        const query_res = await pool.query(sql);
        res.json(query_res.rows);
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});

app.get('/NeneriaAyuno-2.2.2', async (req, res) => {
    try {
        const sql = `SELECT * FROM midterm_total_films_per_category`;

        const query_res = await pool.query(sql);
        res.json(query_res.rows);
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});

app.get('/NeneriaAyuno-2.3.1', async (req, res) => {
    try {
        const sql = `
            SELECT p.payment_id, 
            CONCAT(c.first_name, ' ',c.last_name) AS "Customer Name", 
            CONCAT(s.first_name, ' ',s.last_name) AS "Staff Name"
            FROM payment AS "p"
            JOIN customer AS "c" ON p.customer_id = c.customer_id
            JOIN staff AS "s" ON p.staff_id = s.staff_id
        `;

        const query_res = await pool.query(sql);
        res.json(query_res.rows);
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});

app.get('/NeneriaAyuno-2.3.2', async (req, res) => {
    try {
        const sql = `
            SELECT CONCAT(s.first_name, ' ',s.last_name) AS "Staff Name",
            a.address AS "Adress", cy.city AS "City"
            FROM staff AS "s"
            JOIN address AS "a" ON s.address_id = a.address_id
            JOIN city AS "cy" on a.city_id = cy.city_id
        `;

        const query_res = await pool.query(sql);
        res.json(query_res.rows);
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});

app.get('/NeneriaAyuno-2.4.1/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const sql = `SELECT * FROM get_film_by_category($1)`;
        const data = [category];

        const query_res = await pool.query(sql, data);
        res.json(query_res.rows);
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});

app.post('/NeneriaAyuno-2.4.2', async (req, res) => {
    try {
        const { firstname, lastname } = req.body;
        const sql = `CALL add_actor($1, $2)`;
        const data = [firstname, lastname];

        const query_res = await pool.query(sql, data);
        res.json({ messsage: 'Actor Added Successfully' });
    } catch (error) {
        console.error(error);
        res.status(404);
        res.json({ message: error.message });
    }
});



app.listen(3000, () => console.log('server is now listening at localhost:3000...'));
