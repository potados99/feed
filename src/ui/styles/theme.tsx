export const lightTheme = {
  background: "#fff",
  highlight: "#07f",
  highlightArea: "#07f",
  textPrimary: "#123",
  textSecondary: "#456",
  border: "#eee",
  skeleton: "#eee",
  overlay: "#777",
  modal: "#fff",
};

export const darkTheme = {
  background: "#131313",
  highlight: "#8ab4f8",
  highlightArea: "#8ab4f8",
  textPrimary: "#bdc1c6",
  textSecondary: "#9aa0a6",
  border: "#555",
  skeleton: "#222",
  overlay: "#222",
  modal: "#262626",
};

export type ThemeType = Common<typeof lightTheme, typeof darkTheme>;

type Common<A, B> = {
  [P in keyof A & keyof B]: A[P] | B[P];
};
