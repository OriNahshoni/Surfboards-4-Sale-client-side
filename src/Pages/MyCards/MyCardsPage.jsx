import { useEffect, useState } from "react";
import { Container, Grid, Typography, useTheme } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import AuthTokenService from "../../service/authTokenService";
import myCardsNormalization from "./myCardsNormalization"; 
import { toast } from "react-toastify";
import MoreInfoComponent from "../../components/MoreInfoComponent";

const MyCardsPage = () => {
  const [myCards, setMyCards] = useState([]);
  const navigate = useNavigate();
  const [refreshPage, setRefreshPage] = useState(false); 

  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = AuthTokenService.isUserLoggedIn();
  const [selectedCard, setSelectedCard] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("/cards/my-cards")
        .then(({ data }) => {
          const myCardsData = myCardsNormalization(data, userData?._id);
          setMyCards(myCardsData);
        })
        .catch((err) => {
          console.error("Error fetching cards:", err);
          toast.error("Error fetching cards ❌");
        });
    }
  }, [isLoggedIn, userData?._id,refreshPage]);

  const isAuth = () => {
    if (isLoggedIn && (userData.isBusiness || userData.isAdmin)) {
      return true;
    } else return false;
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
    const cardToEdit = myCards.find((card) => card._id === _id);
    if (cardToEdit && cardToEdit.userId === userData?._id) {
      navigate(`${ROUTES.EDITCARD}/${_id}`);
    } else {
          toast.error("You can only edit your own cards! 🚫");
    }
  };

  const handleLikeCard = (_id, liked) => {
    axios
      .patch(`/cards/${_id}`, { liked })
      .then(() => {
        setRefreshPage((prev) => !prev); 
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
      <Typography variant="h2" fontFamily="lucida" textAlign="center">
        Welcome to Your Surfboards Page!
      </Typography>
      <Typography
        textAlign="center"
        sx={{
          marginBottom: 3,
          [theme.breakpoints.down("sm")]: {},
        }}
      >
        Explore and manage the surfboard cards you've created. Make any edits or deletions
        as needed.
      </Typography>
      <Grid container spacing={2}>
        {myCards.map((card) => (
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
        {selectedCard && (
          <MoreInfoComponent
            cardDetails={selectedCard}
            onClose={handleCloseDetails}
          />
        )}
      </Grid>
    </Container>
  );
};
export default MyCardsPage;
