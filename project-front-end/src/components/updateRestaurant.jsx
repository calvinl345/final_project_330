import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reactApi from "../communication/reactApi";

const UpdateRestaurant = (props) => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await reactApi.get(`/${id}`);
            console.log(response.data.data);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setRating(response.data.data.restaurant.rating);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateRestaurant = await reactApi.put(`/${id}`, {
            name,
            location,
            rating,
        });
        console.log(updateRestaurant);
        navigate("/");
    };

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={name}
                        id="name"
                        className="form-control"
                        type="text"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={location}
                        id="location"
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder={rating}
                        id="rating"
                        className="form-control"
                        type="number"
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateRestaurant;
