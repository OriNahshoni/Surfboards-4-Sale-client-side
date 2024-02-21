import React, { useEffect, useState } from "react";
import {
  Container,Grid, FormControl, InputLabel,Select,MenuItem,Button,Box,useTheme,
} from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate, useLocation } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MoreInfoComponent from "../../components/MoreInfoComponent";
import AuthTokenService from "../../service/authTokenService";
import WelcomeComponent from "../../components/WelcomeComponent";
import TableView from "../../components/TableView";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = AuthTokenService.isUserLoggedIn();
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsPerRow, setCardsPerRow] = useState(3);
  const queryParams = useQueryParams();
  const location = useLocation();
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const [viewType, setViewType] = useState("card");
  const theme = useTheme();

  useEffect(() => {
    if (userData) {
      axios
        .get("/cards")
        .then(({ data }) => {
          setDataFromServer(data);
          setInitialDataFromServer(data);
        })
        .catch((err) => {
          console.error("Error fetching cards:", err);
          toast.error("Error fetching cards ❌");
        });
    } else {
      axios
        .get("/cards")
        .then(({ data }) => {
          setDataFromServer(data);
          setInitialDataFromServer(data);
        })
        .catch((err) => {
          console.error("Error fetching cards:", err);
          toast.error("Error fetching cards ❌");
        });
    }
  }, [userData]);
  useEffect(() => {
    const searchQuery = queryParams.filter?.toLowerCase();
    if (!searchQuery) {
      setDataFromServer(initialDataFromServer);
      return;
    }
    const filteredCards = initialDataFromServer.filter(
      (card) =>
        card.brand.toLowerCase().startsWith(searchQuery) ||
        card.model.toLowerCase().startsWith(searchQuery) ||
        card.size.toString().startsWith(searchQuery) ||
        card.liters.toString().startsWith(searchQuery)
    );
    setDataFromServer(filteredCards);
  }, [queryParams.filter, location.pathname, initialDataFromServer]);

  const isAuth = () => {
    return isLoggedIn && userData && (userData.isBusiness || userData.isAdmin);
  };

  const handleDeleteCard = (_id) => {
    axios
      .delete(`/cards/${_id}`)
      .then(() => {
        setDataFromServer(dataFromServer.filter((card) => card._id !== _id));
        toast.success("Card deleted successfully! ✅");
      })
      .catch((error) => {
        toast.error("Error deleting the card ❌");
        console.error("Error deleting card:", error);
      });
  };

  const handleEditCard = (_id) => {
    const cardToEdit = dataFromServer.find((card) => card._id === _id);
    if (cardToEdit && cardToEdit.userId === userData._id) {
      navigate(`${ROUTES.EDITCARD}/${_id}`);
    } else {
      toast.error("You can only edit your own cards! 🚫");
    }
  };
  const handleLikeCard = (_id, liked) => {
    axios
      .patch(`/cards/${_id}`, { liked })
      .then(({ data }) => {
        const updatedData = dataFromServer.map((card) => {
          if (card._id === data.card._id) {
            return { ...card, likes: data.card.likes };
          }
          return card;
        });
        setDataFromServer(updatedData);
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
  const handleChangeCardsPerRow = (event) => {
    setCardsPerRow(event.target.value);
  };
  const toggleViewType = () => {
    setViewType((prevType) => (prevType === "card" ? "table" : "card"));
  };
  return (
    <Container>
      <Box sx={{ flexGrow: 1, mb: 10 }}>
        <WelcomeComponent />
      </Box>
      <FormControl
        fullWidth
        sx={{
          p: 0,
          mb: 1,
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        <InputLabel id="cards-per-row-label">Cards Per Row</InputLabel>
        <Select
          labelId="cards-per-row-label"
          id="cards-per-row"
          value={cardsPerRow}
          onChange={handleChangeCardsPerRow}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        size="small"
        sx={{ m: 1 }}
        onClick={toggleViewType}
      >
        {viewType === "card" ? "Switch to Table View" : "Switch to Card View"}
      </Button>
      {viewType === "card" ? (
        <Grid container spacing={2}>
          {dataFromServer.map((card) => (
            <Grid
              item
              key={card._id}
              xs={12}
              sm={6}
              md={12 / cardsPerRow}
              lg={12 / cardsPerRow}
            >
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
      ) : (
        <TableView data={dataFromServer} />
      )}
      {selectedCard && (
        <MoreInfoComponent
          cardDetails={selectedCard}
          onClose={handleCloseDetails}
        />
      )}
    </Container>
  );
};
export default HomePage;
