import { extendTheme } from "@chakra-ui/react";

// Create a custom theme using Chakra's extendTheme.
// This example uses custom colors and fonts from your design.
const customTheme = extendTheme({
  colors: {
    // You can use these colors via theme.colors.primary, etc.
    primary: "#291f4e",
    secondary: "#f97316",
    tertiary: "#835aec",
    fourth: "#835aec",
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        margin: 0,
        padding: 0,
        background: "white", // or change to a desired background
        color: "black", // default text color
      },
    },
  },
});

export default customTheme;
