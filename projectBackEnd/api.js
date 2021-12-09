////////// Imports //////////

////////////////////////////////

require("dotenv").config();
const express = require("express");
const db = require("./db");
////////// Middleware //////////

////////////////////////////////
const app = express();
app.use(express.json());

////////// API Config //////////

////////////////////////////////
const port = process.env.PORT || 4002;
app.listen(port, () => {
    console.log(`server is live on port ${port}`);
});

////////// API Routes //////////

////////////////////////////////

//Get all restaurants
app.get("/api/restaurants", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM yelp.restaurants");
        //console.log(results);
        res.status(200).json({
            status: "sucsess",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//Get one restaurant
app.get("/api/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await db.query(
            `select * from yelp.restaurants q WHERE q.id = $1`,
            [req.params.id]
        );
        res.status(200).json({
            status: "sucsess",
            data: { restaurant: restaurant.rows },
        });
    } catch (err) {
        console.log(err);
    }
});

//Create a restaurant
app.post("/api/restaurants/create", async (req, res) => {
    try {
        const results = await db.query(
            "INSERT INTO yelp.restaurants (name, location, price_range) values ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
        );
        console.log(results);
        res.status(201).json({
            status: "sucsess",
            data: { restaurant: results.rows[0] },
        });
    } catch (err) {
        console.log(err);
    }
});

//Update a restaurant
app.put("/api/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE yelp.restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [
                req.body.name,
                req.body.location,
                req.body.price_range,
                req.params.id,
            ]
        );
        console.log(results);
        res.status(200).json({
            status: "sucsess",
            data: { restaurant: results.rows[0] },
        });
    } catch (err) {
        console.log(err);
    }
});

//Delete a restaurant
app.delete("/api/restaurants/:id", async (req, res) => {
    try {
        const results = db.query("DELETE FROM yelp.restaurants where id = $1", [
            req.params.id,
        ]);
        res.status(204).json({
            status: "sucess",
        });
    } catch (err) {
        console.log(err);
    }
});
