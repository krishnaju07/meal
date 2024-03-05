const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Fetch categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const getItemsByCategory = async strCategory => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${strCategory}`);
    const data = await response.json();
    console.log(data,"skskks")
    return data;
  } catch (error) {
    throw new Error('Failed to fetch items by category');
  }
};

export const getMealsByCategory = async (strCategory) => {
    try {
      const response = await fetch(`${API_BASE_URL}/filter.php?c=${strCategory}`);
      const data = await response.json();
      return data.meals; 
    } catch (error) {
      throw new Error('Failed to fetch meals by category');
    }
  };

