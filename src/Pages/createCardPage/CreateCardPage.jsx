import { useState } from "react";
import { TextField, Grid, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { validateCreateCard } from "../../validation/createCardValidation";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const CreateCardPage = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputValue] = useState({
    brand: "",
    model: "",
    condition: "",
    size: 0,
    liters: 0,
    price: 0,
    description: "",
    url: "",
    alt: "",
    location: "", // Added
    phone: "", // Added
  });

  const handleInputsChange = (e) => {
    const { id, value } = e.target;
    const updatedInputsValue = { ...inputsValue };
    if (id.includes(".")) {
      const [parent, child] = id.split(".");
      updatedInputsValue[parent][child] = value;
    } else {
      updatedInputsValue[id] = value;
    }
    setInputValue(updatedInputsValue);
  };

  const isSubmitDisabled = () => {
    // Check if any required field is empty
    const requiredFields = [
      "brand",
      "model",
      "condition",
      "size",
      "liters",
      "price",
      "description",
      "url",
      "alt",
      "location",
      "phone",
    ];

    return requiredFields.some((field) => !inputsValue[field]);
  };




  const renderTextField = (name, label, props = {}) => (
    <Grid item xs={12} sm={6} key={name}>
      <TextField
        required={props.required}
        fullWidth
        id={name}
        label={label}
        name={name}
        autoComplete={`new-${name}`}
        value={inputsValue[name]}
        onChange={handleInputsChange}
        {...props}
      />
      {errorsState && errorsState[name] && (
        <Alert severity="warning">{errorsState[name]}</Alert>
      )}
    </Grid>
  );

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const validationErrors = validateCreateCard(inputsValue); // Perform client-side validation
      if (validationErrors) {
        setErrorsState(validationErrors);
        return;
      }

      const requestData = {
        brand: inputsValue.brand,
        model: inputsValue.model,
        condition: inputsValue.condition,
        size: parseFloat(inputsValue.size),
        liters: parseFloat(inputsValue.liters),
        price: parseFloat(inputsValue.price), 
        description: inputsValue.description,
        image: {
          url: inputsValue.url,
          alt: inputsValue.alt,
        },
        location: inputsValue.location,
        phone: inputsValue.phone,
      };

      await axios.post("/cards", requestData);
      navigate(ROUTES.MYCARDS);
      toast("You created a new card 📇✅", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("Error during form submission:", err);
    }
  };


  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Create a Card
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {renderTextField("brand", "Brand", { required: true })}
          {renderTextField("model", "Model", { required: true })}
          {renderTextField("condition", "Condition", { required: true })}
          {renderTextField("size", "Size", {
            type: "number",
            required: true,
          })}
          {renderTextField("liters", "Volume in Liters", {
            type: "number",
            required: true,
          })}
          {renderTextField("price", "Price", {
            type: "number",
            required: true,
          })}
          {renderTextField("description", "Description", { required: true })}
          {renderTextField("url", "Image URL", { required: true })}
          {renderTextField("alt", "Image Alt", { required: true })}
          {renderTextField("location", "Location", { required: true })}
          {renderTextField("phone", "Phone", { required: true })}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitDisabled()}
        >
          Create Card
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCardPage;
