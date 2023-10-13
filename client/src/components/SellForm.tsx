import React, { FormEvent, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import DarkTheme from "./DarkTheme";
import { RiDeleteBin6Line } from "react-icons/ri";

const NewProductListingForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useSelector((state: RootState) => state.user.user?.user_id);
  var editData =
    location.state && location.state.editData ? location.state.editData : null;

  const populateFormWithData = (data: {
    title: string;
    description: string;
    price: string;
    category_id: string;
  }) => {
    setTitle(data.title);
    setDescription(data.description);
    setPrice(Number(data.price));
    setCategory(data.category_id);
  };

  useEffect(() => {
    if (location.state && location.state.editData) {
      editData = location.state.editData;
      populateFormWithData(editData);
    }
  }, [location]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value as string);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return setOpen(true);
    const date = new Date().toISOString().split("T")[0];
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price.toString());
    data.append("category", category.toString());
    data.append("image", selectedFile);
    data.append("date", date);
    data.append("userId", userId!.toString());

    // Check if you are adding a new listing or editing an existing one
    if (!editData) {
      axios
        .post("http://localhost:3001/addProductListing", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success)
            navigate("/", {
              state: {
                open: true,
                message: "Your listing has been successfully created",
                type: "success",
              },
            });
          else console.error(res.data.error);
        })
        .catch((error) => console.error(error));
    } else {
      // For editing an existing listing
      data.append("id", editData.id); // Include the ID of the listing being edited
      axios
        .put("http://localhost:3001/editProductListing", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success)
            navigate("/", {
              state: {
                open: true,
                message: "Your listing has been successfully editted",
                type: "success",
              },
            });
          else console.error(res.data.error);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <DarkTheme>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          value={title}
          onChange={handleTitleChange}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          margin="normal"
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          name="price"
          value={price}
          onChange={handlePriceChange}
          margin="normal"
          required
          type="number"
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            required
          >
            <MenuItem value="1">Electronics</MenuItem>
            <MenuItem value="2">Clothing</MenuItem>
            <MenuItem value="3">Vehicles</MenuItem>
            <MenuItem value="4">Utilities</MenuItem>
            <MenuItem value="5">Other</MenuItem>
          </Select>
        </FormControl>
        <Box marginY="10px" textAlign={"center"}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
            size="large"
          >
            Upload file
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              hidden
            />
          </Button>
          <p>
            {selectedFile && (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={4}
              >
                Uploaded File: {selectedFile.name}
                <RiDeleteBin6Line
                  size={20}
                  color="white"
                  onClick={() => setSelectedFile(undefined)}
                />
              </Box>
            )}
          </p>
        </Box>
        <Box margin="20px 0" textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Upload an Image
        </Alert>
      </Snackbar>
    </DarkTheme>
  );
};

export default NewProductListingForm;
