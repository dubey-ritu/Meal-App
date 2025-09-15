import { memo, useEffect, useState } from "react";
import "./style.css";
import Loader from "../Pages/Loader";
import Pill from "../Components/Pill";

function AllCategories({ setSelectedCategory, selectedCategory }) {

  const [allCategories, setAllCategories] = useState([]);
  const [loader, setLoader] = useState(false);

  async function getAllCategories() {
    setLoader(true);
    try {
      const promiseCategoriesData = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const categoriesData = await promiseCategoriesData.json();
      setLoader(false);
      setAllCategories(categoriesData.categories);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="all-categories-container">
      {
        loader && <Loader />
      }
      <div className="category-container">
        {/* <h3>Categories</h3> */}
        <div className="all-categories">
          {
            allCategories.map((entry) => {
              return (
                <Pill
                  key={entry.strCategory}
                  label={entry.strCategory}
                  onClick={() => setSelectedCategory(entry.strCategory)}
                  selected={selectedCategory === entry.strCategory}
                ></Pill>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default memo(AllCategories);