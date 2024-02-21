import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CardComponent = ({
  _id,
  brand,
  model,
  condition,
  size,
  liters,
  price,
  description,
  image,
  location,
  phone,
  liked, 
  onDeleteCard,
  onEditCard,
  onLikeCard,
  isLoggedIn,
  userData,
  onShowDetails,
}) => {
  const handleDeleteCardClick = () => {
    onDeleteCard(_id);
  };

  const handleClickEditCard = () => {
    onEditCard(_id);
  };

  const handleLikeCardClick = () => {
    onLikeCard(_id, !liked); 
  };

  const handleShowDetailsClick = () => {
    onShowDetails({
      image,
      name: `${brand} ${model}`,
      condition,
      size,
      liters,
      price,
      description,
      location,
      phone,
    });
  };

  const isAuth = () => {
    if (isLoggedIn && userData && (userData.isBusiness || userData.isAdmin)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Card
      sx={{
        border: "2px solid #fff",
        height: "100vh",
        borderRadius: 4,
      }}
    >
      <CardActionArea onClick={handleShowDetailsClick}>
        <CardMedia
          component="img"
          image={image.url}
          alt={image.alt}
          sx={{
            border: "2px solid #33ab9f",
            height: "55vh",
            borderRadius: 4,
            transition:
              "transform 0.3s cubic-bezier(0.25, 0.45, 0.45, 0.95), box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(10px)",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        />
      </CardActionArea>
      <CardContent>
        <CardHeader title={`${brand} ${model}`} sx={{ p: 0, mb: 1 }} />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Condition:{" "}
            </Typography>
            {condition}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Size:{" "}
            </Typography>
            {size}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Volume in Liters:{" "}
            </Typography>
            {liters}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Price in Shekels:{" "}
            </Typography>
            {price}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Description:{" "}
            </Typography>
            {description}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Location:{" "}
            </Typography>
            {location}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="500" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {isAuth() && (
              <React.Fragment>
                <IconButton onClick={handleClickEditCard}>
                  <CreateIcon />
                </IconButton>
                <IconButton onClick={handleDeleteCardClick}>
                  <DeleteIcon />
                </IconButton>
              </React.Fragment>
            )}
          </Box>
          <Box>
            {isLoggedIn && (
              <IconButton onClick={handleLikeCardClick}>
                <FavoriteIcon color={liked ? "favActive" : "false"} />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.defaultProps = {
  image: {
    url: "https://img.freepik.com/premium-photo/retro-wood-shortboard-surfboard-isolated-white-with-clipping-path-object-vintage-styles_1484-2215.jpg?w=740",
    alt: "album board",
  },
};

export default CardComponent;
