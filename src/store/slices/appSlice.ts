import { createAppSlice } from "./common";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAppState {}

const initialState: IAppState = {};

export const appSlice = createAppSlice({
  name: "app",
  initialState,
  reducers: (_create) => ({}),
  selectors: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = appSlice.actions;

// eslint-disable-next-line no-empty-pattern
export const {} = appSlice.selectors;

export default appSlice.reducer;
