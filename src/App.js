import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryPage from "./components/CategoryPage.js";
import MealRecipe from "./components/MealRecipe.js";
import HomePage from "./components/HomePage.js";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/categories" element={<CategoryPage/>}/>
        <Route path="/meal/:mealId" element={<MealRecipe/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;