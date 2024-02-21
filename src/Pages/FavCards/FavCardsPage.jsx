import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MoreInfoComponent from "../../components/MoreInfoComponent";
import AuthTokenService from "../../service/authTokenService";

const FavCardsPage = () => {
  const [likedCards, setLikedCards] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false); // State variable to trigger page refresh
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = AuthTokenService.isUserLoggedIn();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (!userData) return;
    axios
      .get("/cards")
      .then(({ data }) => {
        const liked = data.filter((card) => card.likes.includes(userData?._id));
        setLikedCards(liked);
      })
      .catch((err) => {
        console.error("Error fetching liked cards:", err);
        toast.error("Error fetching liked cards ❌");
      });
  }, [userData, refreshPage]); 

  const isAuth = () => {
    return isLoggedIn;
  };

  const handleDeleteCard = (_id) => {
    axios
      .delete(`/cards/${_id}`)
      .then(() => {
        setRefreshPage((prev) => !prev); 
        toast.success("Card deleted successfully! ✅");
      })
      .catch((error) => {
        toast.error("Error deleting the card ❌");
        console.error("Error deleting card:", error);
      });
  };

  const handleEditCard = (_id) => {
    const cardToEdit = likedCards.find((card) => card._id === _id);
    if (cardToEdit && cardToEdit.userId === userData._id) {
      navigate(`${ROUTES.EDITCARD}/${_id}`);
    } else {
      toast.error("You can only edit your own cards! 🚫");
    }
  };

  const handleLikeCard = (_id, liked) => {
    axios
      .patch(`/cards/${_id}`, { liked })
      .then(() => {
        setRefreshPage((prev) => !prev); // Toggle refreshPage to trigger page refresh
        toast.success(`Card ${liked ? "liked" : "unliked"} successfully! ✅`);
      })
      .catch((error) => {
        toast.error(`Error ${liked ? "liking" : "unliking"} the card ❌`);
        console.error(`Error ${liked ? "liking" : "unliking"} card:`, error);
      });
  };

  const handleShowDetails = (cardDetails) => {
    setSelectedCard(cardDetails);
  };

  const handleCloseDetails = () => {
    setSelectedCard(null);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {likedCards.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              {...card}
              liked={card.likes.includes(userData?._id)}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              onLikeCard={handleLikeCard}
              isAuth={isAuth}
              isLoggedIn={isLoggedIn}
              userData={userData}
              onShowDetails={handleShowDetails}
            />
          </Grid>
        ))}
      </Grid>
      {selectedCard && (
        <MoreInfoComponent
          cardDetails={selectedCard}
          onClose={handleCloseDetails}
        />
      )}
    </Container>
  );
};

export default FavCardsPage;
