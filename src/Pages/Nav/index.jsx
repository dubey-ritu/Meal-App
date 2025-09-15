import { Link } from 'react-router-dom';
import './style.css';
import { memo } from 'react';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="logo"><i className="fa fa-cutlery" aria-hidden="true"></i> <span>MealApp</span></div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li>
          <Link to='/categories'>Categories</Link>
        </li>
        <li>
          <Link to='/favorites'>Favorites</Link>
        </li>
      </ul>
    </nav>
  )
}


export default memo(Nav);