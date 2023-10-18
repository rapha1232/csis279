import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Listing } from "../types";

export const handleEdit = (product_id: number, navigate: NavigateFunction) => {
  // Make an Axios GET request to fetch the existing data for the product with the specified ID
  axios
    .get(`http://localhost:3001/getProductListing?listingId=${product_id}`)
    .then((response) => {
      const editData = response.data.listing;
      navigate("/sell", { state: { editData } });
    })
    .catch((error) => console.error(error));
};

export const handleDelete = (
  product_id: number,
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>
) => {
  axios
    .delete(`http://localhost:3001/deleteListing?listingId=${product_id}`)
    .then(() =>
      setListings((prevData) =>
        prevData.filter((listing) => listing.product_id !== product_id)
      )
    )
    .catch((error) => console.error(error));
};
