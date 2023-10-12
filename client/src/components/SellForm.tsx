import React, { FormEvent, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
  Box,
  styled,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const NewProductListingForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");

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
    setSelectedFile(e.target.files![0]);
  };

  const userId = useSelector((state: RootState) => state.user.user?.id);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price.toString());
    data.append("category", category.toString());
    if (selectedFile) {
      data.append("image", selectedFile, selectedFile.name);
    }
    console.log(data);
    axios
      .post("http://localhost:3001/listings/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) navigate("/");
        else console.log(res.data.error);
      })
      .catch((error) => console.error(error));
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
              required
              hidden
            />
          </Button>
        </Box>
        <Box margin="20px 0" textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </ThemeProvider>
  );
};

export default NewProductListingForm;
