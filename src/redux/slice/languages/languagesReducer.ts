import { LanguageState, LanguagesDefault } from "@/utils";
import {  PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dictionary: LanguagesDefault,
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageState>) {
      state.dictionary = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
