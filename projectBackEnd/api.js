////////// Imports //////////

////////////////////////////////

require("dotenv").config();
const express = require("express");

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
app.get("/api/restaurants", (req, res) => {
    res.status(200).json({
        status: "sucsess",
        data: { restaurant: "toco bell" },
    });
});

//Get one restaurant
app.get("/api/restaurants/:id", (req, res) => {
    res.status(200).json({
        status: "sucsess",
        data: { restaurant: "toco bell" },
    });
});

//Create a restaurant
app.post("/api/restaurants/create", (req, res) => {
    console.log(req.body);
    res.status(200).json({
        status: "sucsess",
        data: { restaurant: "toco bell" },
    });
});

//Update a restaurant
app.put("/api/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "sucsess",
        data: { restaurant: "toco bell" },
    });
});

//Delete a restaurantt
app.delete("/api/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "sucsess",
    });
});
