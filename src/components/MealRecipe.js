import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader.js";

function MealRecipe(){
  const [activeTab,setActiveTab] = useState("ingredients");
  const [meal,setMeal] = useState({});
  const [loader,setLoader] = useState(true);
  const params = useParams();

  async function getMeal(){
    setLoader(true);
    const reqMeal = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+params.mealId);
    const resMeal = await reqMeal.json();
    const meal = resMeal.meals[0];
    setLoader(false);
    setMeal(meal);
  }

  useEffect(function(){
    getMeal();
  },[]);

  function getIngredient(){
    let ingArr = [];
    for(let i=1;i<=20;i++){
      let igr = meal["strIngredient"+i];
      if(igr===""||igr===null){
        break;
      }
      let msr = meal["strMeasure"+i];
      ingArr.push(`${igr} - ${msr}`);
    }
    return ingArr;
  }
  if(loader === true){
    return <Loader/>
  }
  return(
    <div className="meal-recipe">
      <div className="image">
        <img src={meal.strMealThumb} alt={meal.strMeal}/>
      </div>
      <div className="meal-details">
        <h2 className="meal-name">{meal.strMeal}</h2>
        <p className="meal-desc"></p>
        <h4 className="meal-type">{meal.strCategory} - {meal.strArea}</h4>
        <div className="tab">
          <div className="tab-header">
            <div 
              className={(activeTab==="ingredients"?"active":"")}
              onClick={function(){setActiveTab("ingredients")}}
            >Ingredients</div>
            <div 
              className={(activeTab==="instructions"?"active":"")}
              onClick={function(){setActiveTab("instructions")}}
            >Instructions</div>
          </div>
          <div className="tab-body">
            {
              (activeTab==="ingredients")?(
                <ol>
                  {
                    getIngredient().map(function(ing,i){
                      return(
                        <li>{ing}</li>
                      )
                    })
                  }
                </ol>
              ):(
                <p>{meal.strInstructions}</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}


export default MealRecipe;
