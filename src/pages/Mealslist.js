import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import { useParams, useNavigate } from "react-router-dom";
import { getMealsByCategory } from "../services/api";
import Itemdetails from "./Itemdetails";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import { useAppContext } from "../context/AppContext";

const MealsList = () => {
  const { strCategory } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState([null]);
  const [cartItems, setCartItems] = useState([]);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const fetchedMeals = await getMealsByCategory(strCategory);
        const mealsWithQuantity = fetchedMeals.map((meal) => ({
          ...meal,
          quantity: 0,
          price: 150,
        }));
        setMeals(mealsWithQuantity);
        setSelectedCategory(strCategory);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setLoading(false);
      }
    };

    fetchMeals();
  }, [strCategory]);

  useEffect(() => {
    const fetchMealDetails = async () => {
      if (selectedMeal) {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMeal.idMeal}`
          );
          const data = await response.json();
          if (data.meals && data.meals.length > 0) {
            setSelectedMeal(data.meals[0]);
          }
        } catch (error) {
          console.error("Error fetching meal details:", error);
        }
      }
    };

    fetchMealDetails();
  }, [selectedMeal]);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    setShowDetails(true);
  };

  const handleAddToCart = (meal) => {
    const existingCartItem = state.cart.find(
      (item) => item.idMeal === meal.idMeal
    );

    if (existingCartItem) {
      if (existingCartItem.quantity === 0) {
        const updatedMeals = meals.map((m) =>
          m.idMeal === meal.idMeal ? { ...m, quantity: 1 } : m
        );
        setMeals(updatedMeals);
      }
      return null;
    } else {
      const updatedMeals = meals.map((m) =>
        m.idMeal === meal.idMeal ? { ...m, quantity: 1 } : m
      );
      setMeals(updatedMeals);
      dispatch({
        type: "ADD_TO_CART",
        payload: [...state.cart, { ...meal, quantity: 1, price: 150 }],
      });
    }
  };

  const incrementItem = (meal) => {
    if (!meal || !meal.idMeal) {
      return;
    }

    const updatedCart = state.cart.map((item) =>
      item.idMeal === meal.idMeal
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    const itemIndex = updatedCart.findIndex(
      (item) => item.idMeal === meal.idMeal
    );
    if (itemIndex !== -1) {
      dispatch({
        type: "UPDATE_CART_ITEM_QUANTITY",
        payload: {
          itemId: meal.idMeal,
          newQuantity: updatedCart[itemIndex].quantity,
        },
      });
    }
  };

  const decrementItem = (meal) => {
    if (!meal || !meal.idMeal) {
      return;
    }
  
    const updatedCart = state.cart.map((item) =>
      item.idMeal === meal.idMeal
        ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
        : item
    );
  
    const itemIndex = updatedCart.findIndex(
      (item) => item.idMeal === meal.idMeal
    );
    if (itemIndex !== -1) {
      dispatch({
        type: "UPDATE_CART_ITEM_QUANTITY",
        payload: {
          itemId: meal.idMeal,
          newQuantity: updatedCart[itemIndex].quantity,
        },
      });
    }
  };
  

  const handleGoBack = () => {
    setShowDetails(false);
    setSelectedMeal(null);
    navigate(-1);
  };

  return (
    <>
      {!showDetails && (
        <>
          <Typography variant="h6" align="left" gutterBottom>
            Meals in {selectedCategory}
          </Typography>
          {loading && <LinearProgress />}
          <div className="meal-list">
            {meals.map((meal, index) => (
              <div key={index} className="meal-card">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  onClick={() => handleMealClick(meal)}
                />
                <div className="meal-details">
                  <Typography variant="subtitle1" gutterBottom>
                    {meal.strMeal}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Price: ₹{150}
                  </Typography>
                  <div className="quantity-controls">
                    {meal.quantity === 0 ? (
                      <IconButton
                        color="primary"
                        aria-label="add to cart"
                        onClick={() => handleAddToCart(meal)}
                      >
                        <Typography variant="body2">Add to Cart</Typography>
                      </IconButton>
                    ) : (
                      <>
                        <div className="quantity-controls">
                          <IconButton onClick={() => decrementItem(meal)}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            variant="body1"
                            style={{ margin: "0 8px" }}
                          >
                            {state.cart.find(
                              (item) => item.idMeal === meal.idMeal
                            )?.quantity || 0}
                          </Typography>
                          <IconButton onClick={() => incrementItem(meal)}>
                            <AddIcon />
                          </IconButton>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showDetails && <Itemdetails onBack={handleGoBack} meal={selectedMeal} />}
    </>
  );
};

export default MealsList;
