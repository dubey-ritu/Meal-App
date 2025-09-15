import { createContext, useEffect, useReducer, useState } from "react";
import { favoriteMealReducer } from "../Reducers/favoriteMealReducer";

function getFavoritesFromLocalStorage() {
  const data = localStorage.getItem('favoriteMeals');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }
  return [];
}

export const FavoriteContext = createContext();

const initialState = {
  favoriteMeals: getFavoritesFromLocalStorage()
};

export function FavoriteProvider({ children }) {

  const [state, dispatch] = useReducer(favoriteMealReducer, initialState);

  useEffect(() => {
    localStorage.setItem("favoriteMeals", JSON.stringify(state.favoriteMeals))
  }, [state.favoriteMeals]);

  return <FavoriteContext.Provider value={{ state, dispatch }}>{children}</FavoriteContext.Provider>
}

