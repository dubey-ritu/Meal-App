import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  return (
    <div className="categories-container">
      <h1>Explore Categories</h1>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.idCategory}
            className="category-card"
            onClick={() => navigate(`/categories/${cat.strCategory}`)}
          >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} loading="lazy"/>
            <h3>{cat.strCategory}</h3>
            <p>{cat.strCategoryDescription.slice(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Categories);
