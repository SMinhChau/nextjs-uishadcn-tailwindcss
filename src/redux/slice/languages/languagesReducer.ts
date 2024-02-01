import { LanguagesDefault, PropsContent } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  dictionary: PropsContent;
}

const initialState = {
  dictionary: LanguagesDefault,
} as LanguageState;

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setLanguage(state, action) {
      console.log("action.payload ", action.payload);

      state.dictionary = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
