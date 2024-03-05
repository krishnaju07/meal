import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getCategories } from '../services/api';

const HomePage = () => {
  const { state, dispatch } = useAppContext();
  const { categories } = state;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        dispatch({ type: 'SET_CATEGORIES', payload: response.categories });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
