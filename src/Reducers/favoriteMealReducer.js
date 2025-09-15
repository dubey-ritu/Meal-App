export function favoriteMealReducer(state, action) {
  console.log(action, "action")
  console.log(state, "state")
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      if (state.favoriteMeals.some(meal => meal.idMeal === action.payload.idMeal)) {
        return state;
      }
      return {
        ...state,
        favoriteMeals: [...state.favoriteMeals, action.payload]
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favoriteMeals: state.favoriteMeals.filter(meal => meal !== action.payload),
      };
    default:
      return state;
  }
  return state;
}