import { createSlice } from "@reduxjs/toolkit";

const favourites =
  localStorage.getItem("Favourites") !== null
    ? JSON.parse(localStorage.getItem("Favourites"))
    : [];

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: favourites,
  },

  reducers: {
    getFavourites(state, action) {},
    addFavourites(state, action) {
      state.favourites = [...state.favourites, action.payload];
      localStorage.setItem("Favourites", JSON.stringify(state.favourites));
      console.log(state.favourites);
    },

    removeFavourites(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite !== action.payload.id
      );
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
  removeFavourites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
