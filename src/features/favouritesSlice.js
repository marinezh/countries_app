import { createSlice } from "@reduxjs/toolkit";

const favourites =
  localStorage.getItem("Favourites") !== null
    ? JSON.parse(localStorage.getItem("Favourites"))
    : [];
// console.log( favourites);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: favourites,
  },

  reducers: {
    getFavourites(state, action) {
      state.favourites = action.payload;
    },

    addFavourites(state, action) {
      state.favourites = [...state.favourites, action.payload]; //name of country
      localStorage.setItem("Favourites", JSON.stringify(state.favourites));
    },

    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favorite) => favorite !== action.payload
      );
      localStorage.setItem("Favourites", JSON.stringify(state.favourites));
    },

    clearFavourites(state, action) {
      localStorage.removeItem("Favourites");
      state.favourites = [];
    },
  },
});

export const {
  getFavourites,
  addFavourites,
  clearFavourites,
  removeFavourite,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
