import { memo } from 'react';
import './style.css';

const Banner = ({ scrollToCategories }) => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1>Welcome to MealApp 🍽️</h1>
        <p>Discover delicious meals from around the world!</p>
        <button className="banner-button" onClick={scrollToCategories}>Explore Recipes</button>
      </div>
    </section>
  );
};

export default memo(Banner);
