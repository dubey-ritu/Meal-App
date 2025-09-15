import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Recipe from './Pages/Recipe';
import Nav from './Pages/Nav';
import Categories from './Categories';
import MealsByCategory from './Categories/MealsByCategory';
import { FavoriteProvider } from './Context/FavoritesContext';
import FavoriteRecipe from './Pages/FavoriteMeals';
import About from './Pages/About';

function App() {
  return (
    <FavoriteProvider>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/meal-recipe/:mealId' element={<Recipe />}></Route>
          <Route path='/categories' element={<Categories />}></Route>
          <Route path="/categories/:categoryName" element={<MealsByCategory />} />
          <Route path='/favorites' element={<FavoriteRecipe />} />
        </Routes>
      </BrowserRouter>
    </FavoriteProvider>



    // <div className="meals-app-conatiner">
    //   <AllCategories />
    //   <CategoryMeals />
    // </div>
  );
}

export default App;
