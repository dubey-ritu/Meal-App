import { useNavigate } from "react-router-dom";
import "./style.css";
import { memo, useCallback, useContext } from "react";
import { FavoriteContext } from "../../Context/FavoritesContext";

function FavoriteRecipe() {
  const { state, dispatch } = useContext(FavoriteContext);

  const handleRemove = (mealId) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: mealId });
  };

  return (
    <div className="favorites-page">
      <h1>Favorite Recipes</h1>

      {state.favoriteMeals.length === 0 ? (
        <p className="no-favorites">You have no favorite meals yet.</p>
      ) : (
        <div className="favorite-grid">
          {state.favoriteMeals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img
                src={meal.imgurl}
                alt="meal"
                loading="lazy"
              />
              <div className="meal-info">
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(meal.idMeal)}
                  title="Remove from favorites"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(FavoriteRecipe);
