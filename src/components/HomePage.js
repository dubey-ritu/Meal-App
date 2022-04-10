const { Link } = require("react-router-dom");

function HomePage(){
  return(
    <div className="homepage">
      <div className="banner">
        <div className="content-wrapper">
          <h1>Meals</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro fugit atque incidunt, qui architecto dolores repellendus, expedita, debitis iusto molestias pariatur doloribus ad perferendis adipisci sit animi nam enim libero?</p>
          <Link to="/categories">get your meals here</Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage;