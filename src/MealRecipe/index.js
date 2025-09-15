import { memo, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { FavoriteContext } from "../Context/FavoritesContext";

function MealRecipe() {
  const params = useParams();
  const navigate = useNavigate();

  const [mealRecipe, setMealRecipe] = useState(null);
  const { state, dispatch } = useContext(FavoriteContext);

  const isFavorite = useMemo(() => {
    state.favoriteMeals.some(meal => meal.idMeal === params.mealId);
  },[state, params])
  // const isFavorite = mealRecipe ? state.favoriteMeals.some(meal => meal === params.mealId) : false;



  // console.log(isFavorite, "is favorite")

  useEffect(() => {
    async function fetchMeal() {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + params.mealId);
      const data = await res.json();
      data.meals[0]['isFavorite'] = false;
      setMealRecipe(data.meals[0]);
      // mealRecipe['isFavorite'] = false;
      console.log(mealRecipe, "meal recipe")
    }

    fetchMeal();
  }, [params]);

  function createMealIngredientArray() {
    if (!mealRecipe) return [];
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealRecipe[`strIngredient${i}`];
      const measure = mealRecipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  const toggleFavorite = () => {
    console.log('clicked favorite', mealRecipe)
    if (!isFavorite) {
      dispatch({
        type: "ADD_TO_FAVORITES",
        payload: {
          idMeal: mealRecipe.idMeal,
          imgurl: mealRecipe.strMealThumb
        }
      })
    } else {
      dispatch({
        type: "REMOVE_FROM_FAVORITES",
        payload: mealRecipe.idMeal
      })
    }
  };

  return (
    <div className="meal-recipe-container">
      <div className="back-button" onClick={handleBackClick}><i className="fa fa-chevron-left" aria-hidden="true" title="back"></i></div>

      {mealRecipe && (
        <div className="hero-section">
          <img src={mealRecipe.strMealThumb} alt={mealRecipe.strMeal} className="hero-image" loading="lazy"/>
          <div className="hero-content">
            <h1>{mealRecipe.strMeal}</h1>

            <div className="tag-section">
              <div className="meal-tags">
                <span className="tag">{mealRecipe.strCategory}</span>
                <span className="tag">{mealRecipe.strArea}</span>
                {mealRecipe.strTags && mealRecipe.strTags.split(",").map((tag, i) => (
                  <span key={i} className="tag">{tag.trim()}</span>
                ))}
              </div>
              <button
                className="favorite-btn"
                onClick={toggleFavorite}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <i className="fa fa-heart favorite" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-heart no-favorite" aria-hidden="true"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {mealRecipe && (
        <div className="meal-details">
          <div className="left">
            <h2>Ingredients</h2>
            <div className="ingredient-two-col">
              {createMealIngredientArray().map((item, index) => (
                <div key={index} className="ingredient-item">
                  {item.ingredient} - {item.measure}
                </div>
              ))}
            </div>

            <h2>Instructions</h2>
            <ol className="instruction-list">
              {mealRecipe.strInstructions
                .split(/\r?\n/)
                .filter((line) => line.trim() !== "")
                .map((step, index) => (
                  <li key={index}>{step.trim()}</li>
                ))}
            </ol>


            {mealRecipe.strYoutube && (
              <div className="youtube-link">
                <a href={mealRecipe.strYoutube} target="_blank" rel="noopener noreferrer">
                  📺 Watch on YouTube
                </a>
              </div>
            )}
          </div>

          <div className="right">
            <img src={mealRecipe.strMealThumb} alt={mealRecipe.strMeal} className="detail-image" loading="lazy"/>
            {mealRecipe.strSource && (
              <div className="source">
                🔗 <a href={mealRecipe.strSource} target="_blank" rel="noopener noreferrer">Original Source</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(MealRecipe);



