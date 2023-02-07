import { createSlice } from "@reduxjs/toolkit";

export interface TemplateNameState {
  sampleState: boolean;
}

const initialState: TemplateNameState = {
  sampleState: false,
};

export const TemplateNameSlice = createSlice({
  initialState,
  name: "TemplateName",
  reducers: {},
});

export default TemplateNameSlice.reducer;
