import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { getCategories } from "../services/api";
import "./Homepage.css";

const HomePage = () => {
  const { state, dispatch } = useAppContext();
  const { categories } = state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        dispatch({ type: "SET_CATEGORIES", payload: response.categories });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    navigate(`/mealslist/${category.strCategory}`);
  };

  return (
    <>
      <Typography variant="h6" align="left" gutterBottom>
        Categories
      </Typography>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <Typography variant="subtitle1" align="center">
              {category.strCategory}
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
