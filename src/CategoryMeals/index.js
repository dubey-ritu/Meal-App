import { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Loader from "../Pages/Loader";
import { FavoriteContext } from "../Context/FavoritesContext";

function CategoryMeals({ selectedCategory }) {

  const navigate = useNavigate();

  const { state, dispatch } = useContext(FavoriteContext)

  const [categoryMeals, setCategoryMeals] = useState([]);
  const [loader, setLoader] = useState(false);

  console.log(state, "state in categorymeals")

  async function getCategoryMeals() {
    setLoader(true);
    try {
      const promiseCategoryMealsData = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory);
      const categoryMealsData = await promiseCategoryMealsData.json();
      setCategoryMeals(categoryMealsData.meals);
      setLoader(false);
    } catch (err) {
    }
  }

  function handleMealNameClick(entry) {
    navigate("/meal-recipe/" + entry.idMeal
    )
  }

  useEffect(() => {
    getCategoryMeals();
  }, [selectedCategory]);


  return (
    <div className="category-meals-container">
      {loader && <Loader />}

      <div className="meal-grid">
        {
          categoryMeals.map((entry) => {
            const isFavorite = state.favoriteMeals.some(meal => meal === entry.idMeal)
            return (
              <div
                key={entry.idMeal}
                className="meal-card"
                onClick={() => handleMealNameClick(entry)}
              >
                <img src={entry.strMealThumb} alt={entry.strMeal} loading="lazy"/>
                <h4>{entry.strMeal}</h4>

                {isFavorite && (
                  <div className="favorite-icon" title="In Favorites">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  </div>
                )}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default memo(CategoryMeals);