import AllCategories from "../../AllCategories";
import CategoryMeals from "../../CategoryMeals";
import { memo, useRef, useState } from "react";
import "./style.css";
import Banner from "../Banner";


function Home() {

  const [selectedCategory, setSelectedCategory] = useState("Vegan");

  const categoriesRef = useRef(null);

  const scrollToCategories = () => {
    console.log('button clicked')
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <Banner scrollToCategories={scrollToCategories} />
      <div ref={categoriesRef}>
        <AllCategories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      </div>
      <div className="home-container">
        <CategoryMeals selectedCategory={selectedCategory} />
      </div>
    </>
  )
}

export default memo(Home);