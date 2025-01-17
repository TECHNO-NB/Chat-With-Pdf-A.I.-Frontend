import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFileType {
  file: File | string;
}

const initialState: IFileType = {
  file: "",
};

export const PdfFileSlice = createSlice({
  name: "pdfFile",
  initialState,
  reducers: {
    setPdfFile: (state, action: PayloadAction<File | string>) => {
      state.file = action.payload;
    },
  },
});

export const { setPdfFile } = PdfFileSlice.actions;
export default PdfFileSlice.reducer;
