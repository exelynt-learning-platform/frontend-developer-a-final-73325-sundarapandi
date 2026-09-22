import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#2563eb" },
    secondary: { main: "#64748b" },
    background: { default: "#f5f7fb" }
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiTextField: { defaultProps: { fullWidth: true } }
  }
});
