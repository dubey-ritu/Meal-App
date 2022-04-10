import { useEffect, useState } from "react";
import Loader from "./Loader.js";
import MealCard from "./MealCard.js";

function CategoryPage() {
	const [categories, setCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState("");
	const [activeMeal, setActiveMeal] = useState([]);
	const [loader,setLoader] = useState(false);

	async function getCategory() {
		const reqCategory = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
		const resCategory = await reqCategory.json();
		const category = resCategory.categories;
		setCategories(category);
		setActiveCategory(category[0].strCategory);
	}
	useEffect(function () {
		getCategory();
	}, []);
	async function getActiveCategoryMeal() {
		setActiveMeal([]);
		setLoader(true);
		const reqActiveMeal = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + activeCategory);
		const resActiveMeal = await reqActiveMeal.json();
		const activeMeal = resActiveMeal.meals;
		setLoader(false);
		setActiveMeal(activeMeal);
	}
	useEffect(function(){
		if(activeCategory!==""){
			getActiveCategoryMeal();
		}
	},[activeCategory]);
	return (
		<div className="home-grid">
			<div className="category-list">
				{
					categories.map(function (c, i) {
						return (
							<div 
								className={"category " + (c.strCategory === activeCategory ? "active" : "")}
								onClick={function(){setActiveCategory(c.strCategory)}}
							>{c.strCategory}</div>
						)
					})
				}
			</div>
			<div className="category-meals">
				{(loader===true)?<Loader/>:null}
				{
					activeMeal.map(function (m, i) {
						return (
							<MealCard meal={m}/>
						)
					})
				}
			</div>
		</div>
	)
}

export default CategoryPage;