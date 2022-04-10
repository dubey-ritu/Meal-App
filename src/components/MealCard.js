import { useNavigate } from "react-router-dom";

function MealCard({meal}) {
  const navigate = useNavigate();
  function goToMeal(){
    navigate(`/meal/${meal.idMeal}`);
  }
  return (
    <div className="meal-card" onClick={goToMeal}>
      <div className="meal-image">
        <img src={meal.strMealThumb} />
      </div>
      <div className="meal-name">{meal.strMeal}</div>
    </div>
  )
}

export default MealCard;

