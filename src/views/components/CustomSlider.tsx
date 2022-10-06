import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import tinygradient from "tinygradient";

import { GRADIENT_START, GRADIENT_END } from "../../theme/muiThemes";

const HEIGHT = 8; // Thickness of slider line.
// Gradient instance to be used for calculate the color based on value between min & max value.
const gradient = tinygradient(GRADIENT_END, GRADIENT_START);

const CustomSlider = styled(Slider)(({ theme, max, value }) => {
  // Validate value to be single number.
  if (!value) value = 0;
  if (Array.isArray(value)) value = value[0];

  let currentEndColor: string; // Color of slider handler (thumb) and End color of gradient in track line.
  if (max) {
    // Calculate end color based on current value and maximum value.
    currentEndColor = gradient.rgbAt(value / max).toHex();
  } else {
    currentEndColor = "";
  }

  return {
    height: HEIGHT,
    padding: "13px 0",
    "& .MuiSlider-thumb": {
      height: 26,
      width: 26,
      backgroundColor: theme.palette.background.default,
      border: "solid 6px #" + currentEndColor,
    },
    "& .MuiSlider-track": {
      height: HEIGHT,
      backgroundImage:
        "linear-gradient(270deg, #" +
        currentEndColor +
        " 0.13%, " +
        GRADIENT_END +
        " 100%);",
      border: "none",
    },
    "& .MuiSlider-rail": {
      color: "#FFFFFF",
      opacity: 0.3,
      height: HEIGHT,
    },
    "& .MuiSlider-mark": {
      display: "none",
    },
  };
});

export default CustomSlider;
