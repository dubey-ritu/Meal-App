
import { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

function MealsByCategory() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals || []))
      .catch((err) => console.error("Failed to fetch meals", err));
  }, [categoryName]);

  return (
    <div className="meals-by-category-page">
      <h1>{categoryName} Recipes</h1>

      {meals.length === 0 ? (
        <p>No meals found in this category.</p>
      ) : (
        <div className="meal-grid">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-card"
              onClick={() => navigate(`/meal-recipe/${meal.idMeal}`)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy"/>
              <h4>{meal.strMeal}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(MealsByCategory);
