import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import {
  Button,
  MantineProvider,
  NativeSelect,
  TextInput,
  createTheme,
} from "@mantine/core";

const theme = createTheme({
  fontFamily: "arial, helvetica, clean, sans-serif",
  components: {
    NativeSelect: NativeSelect.extend({
      defaultProps: {
        radius: "xs",
        rightSectionWidth: 20,
        rightSectionProps: {
          style: {
            justifyContent: "flex-end",
          },
        },
      },

      styles: (theme) => ({
        input: {
          height: "20px",
          minHeight: "20px",
          fontSize: "13px",
          border: `1px solid black`,
          lineHeight: "20px",
          paddingLeft: "5px",
          paddingTop: "0px",
          paddingBottom: "0px",
        },
      }),
    }),
    // 2. Theme for TextInput
    TextInput: TextInput.extend({
      styles: (theme) => ({
        input: {
          height: "20px",
          minHeight: "20px", // Set to 20px for consistency
          padding: "0px 5px", // Changed from 0px 2px for a bit more space
          fontSize: "13px",
          border: `1px solid ${theme.colors.gray[6]}`, // Using theme color
          borderRadius: theme.radius.xs,
        },
      }),
    }),

    Button: Button.extend({
      defaultProps: {
        h: 20,
        w: 60,
        p: 0,
        color: "#f0f0f0",
        c: "black",
        radius: 2,
        fw: 400,
      },
      styles: (theme) => ({
        root: {
          border: `0.5px solid black`,
        },
      }),
    }),
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);
