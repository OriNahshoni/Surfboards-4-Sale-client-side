import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MoreInfoComponent = ({ cardDetails, onClose }) => {
  const imageUrl =
    cardDetails.image.url || "../../public/assets/imgs/cardmanjpg.jpg";
  const imageAlt = cardDetails.image.alt ? cardDetails.name : "profile";

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Typography
          variant="h4"
          style={{
            marginBottom: "6px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {cardDetails.name}
        </Typography>
        <img
          src={imageUrl}
          alt={imageAlt}
          style={{
            maxwidth: "400px",
            maxHeight: "400px",
            objectFit: "contain",
          }}
        />
        <IconButton
          aria-label="close"
          style={{ position: "absolute", top: "8px", right: "8px" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Condition:{" "}
            </Typography>
            {cardDetails.condition}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Size:{" "}
            </Typography>
            {cardDetails.size}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Volume in Liters:{" "}
            </Typography>
            {cardDetails.liters}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Price in Shekels:{" "}
            </Typography>
            {cardDetails.price}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Description:{" "}
            </Typography>
            {cardDetails.description}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Location:{" "}
            </Typography>
            {cardDetails.location}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {cardDetails.phone}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MoreInfoComponent;
