import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import { AppProvider } from './context/AppContext';
import MealsList from './pages/Mealslist';
import Cartpage from './pages/Cartpage';
import OrdersListingPage from './pages/OrdersListingPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mealslist/:strCategory" element={<MealsList />} />
          <Route path="/CartPage" element={<Cartpage />} />
          <Route path="/OrdersListingPage" element={<OrdersListingPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
