import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import { AppProvider } from './context/AppContext';
import MealsList from './pages/Mealslist';
import Cartpage from './pages/Cartpage';
import OrdersListingPage from './pages/OrdersListingPage';
import { ThemeProvider } from './context/context';
import './App.css'

function App() {
  return (
    <ThemeProvider className='data-theme'>
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
    </ThemeProvider>
  );
}

export default App;
