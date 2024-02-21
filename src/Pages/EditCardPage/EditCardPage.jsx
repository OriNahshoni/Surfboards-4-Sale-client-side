import { useState, useEffect } from "react";
import { TextField, Grid, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { validateEditCard } from "../../validation/editCardValidation";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const EditCardPage = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    brand: "",
    model: "",
    condition: "",
    size: 0,
    liters: 0,
    price: 0,
    description: "",
    url: "",
    alt: "",
    location: "",
    phone: "",
  });

  const { _id } = useParams();

  useEffect(() => {
    axios
      .get("/cards/" + _id)
      .then(({ data }) => {
        setInputsValue(data);
      })
      .catch((err) => {
        console.error("Error fetching card data:", err);
      });
  }, [_id]);

  const handleInputsChange = (e) => {
    setInputsValue((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const isSubmitDisabled = () => {
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
        autoComplete={`edit-${name}`}
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

      const validationErrors = validateEditCard(inputsValue);
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

      await axios.put("/cards/" + _id, requestData);
      navigate(ROUTES.MYCARDS);
      toast("Your edits were applied successfully 🔨👷‍♂️", {
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
      console.error("Error updating card data:", err);
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
        Edit your Card
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
          Edit Card
        </Button>
      </Box>
    </Box>
  );
};

export default EditCardPage;
