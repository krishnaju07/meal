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

const MealsList = () => {
  const { strCategory } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState([null]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const itemsInCart = meals.filter((meal) => meal.quantity > 0);
    setCartItems(itemsInCart);
  }, [meals]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const fetchedMeals = await getMealsByCategory(strCategory);
        const mealsWithQuantity = fetchedMeals.map((meal) => ({
          ...meal,
          quantity: 0,
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
    const updatedMeals = meals.map((m) =>
      m.idMeal === meal.idMeal ? { ...m, quantity: m.quantity + 1 } : m
    );
    setMeals(updatedMeals);
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
                          <IconButton
                            onClick={() =>
                              handleAddToCart({ ...meal, quantity: meal.quantity - 1 })
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            variant="body1"
                            style={{ margin: "0 8px" }}
                          >
                            {meal.quantity}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              handleAddToCart({ ...meal, quantity: meal.quantity + 1 })
                            }
                          >
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

      {showDetails && (
        <Itemdetails
          onBack={handleGoBack}
          meal={selectedMeal}
          cartItems={cartItems}
          increment={() => setSelectedMeal({ ...selectedMeal, quantity: selectedMeal.quantity + 1 })}
          decrement={() => setSelectedMeal({ ...selectedMeal, quantity: selectedMeal.quantity - 1 })}
        />
      )}
    </>
  );
};

export default MealsList;
