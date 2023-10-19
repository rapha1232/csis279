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
import { RiDeleteBin6Line } from "react-icons/ri";
import { handleClose } from "../utils/toastUtils";

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const date = new Date().toISOString().split("T")[0];
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price.toString());
    data.append("category", category.toString());
    data.append("date", date);
    data.append("userId", userId!.toString());

    if (!editData) {
      if (!selectedFile) {
        return setOpen(true);
      }
      data.append("image", selectedFile);
    } else {
      data.append("id", editData.product_id);
    }

    axios
      .request({
        method: !editData ? "post" : "put",
        url: `http://localhost:3001/${
          !editData ? "add" : "edit"
        }ProductListing`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/", {
            state: {
              open: true,
              message: `Your listing has been successfully ${
                !editData ? "created" : "edited"
              }`,
              type: "success",
            },
          });
        } else {
          console.error(res.data.error);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
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
          inputProps={{ min: 0, step: 0.01 }}
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
            <MenuItem value="6">Electronics</MenuItem>
            <MenuItem value="7">Vehicles</MenuItem>
            <MenuItem value="8">Appliances</MenuItem>
            <MenuItem value="9">Furniture</MenuItem>
            <MenuItem value="10">Photography</MenuItem>
            <MenuItem value="11">Sports & Outdoors</MenuItem>
            <MenuItem value="12">Musical Instruments</MenuItem>
            <MenuItem value="13">Home & Kitchen</MenuItem>
            <MenuItem value="14">Gaming</MenuItem>
            <MenuItem value="15">Fashion</MenuItem>
            <MenuItem value="16">Office Supplies</MenuItem>
          </Select>
        </FormControl>
        {!editData && (
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
        )}
        <Box margin="20px 0" textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => handleClose(setOpen)}
      >
        <Alert
          onClose={() => handleClose(setOpen)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Upload an Image
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewProductListingForm;
