import React, { useState, useContext } from "react";
import reactApi from "../communication/reactApi";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await reactApi.post("/create", {
                name,
                location,
                rating,
            });
            console.log(response);
            addRestaurants(response.data.data.restaurant);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="name"
                        />
                    </div>
                    <div className="col">
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="location"
                        />
                    </div>
                    <div className="col">
                        <input
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="rating"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;
