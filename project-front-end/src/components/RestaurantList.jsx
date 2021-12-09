import React, { useEffect, useContext } from "react";
import reactApi from "../communication/reactApi";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await reactApi.get("/");
                //console.log(response.data.data.restaurants);
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await reactApi.delete(`/${id}`);
            setRestaurants(
                restaurants.filter((restaurant) => {
                    return restaurant.id !== id;
                })
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/restaurants/${id}/update`);
    };

    return (
        <div className="list-group">
            <table className="table table-bordered">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {restaurants &&
                        restaurants.map((restaurant) => {
                            return (
                                <tr key={restaurant.id}>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.location}</td>
                                    <td>{restaurant.rating}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleUpdate(restaurant.id)
                                            }
                                            className="btn btn-info"
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDelete(restaurant.id)
                                            }
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {/*<tr>
                        <td>mcdonalds</td>
                        <td>New YOrk</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>mcdonalds</td>
                        <td>New YOrk</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>*/}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantList;
