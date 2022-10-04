import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import tinygradient from "tinygradient";

import { GRADIENT_START, GRADIENT_END } from "../../theme/muiThemes";

const HEIGHT = 8;
const gradient = tinygradient(GRADIENT_END, GRADIENT_START);

const CustomSlider = styled(Slider)(({ theme, max, value }) => {
  if (!value) value = 0;
  if (Array.isArray(value)) value = value[0];

  let currentColor: string;
  if (max) {
    currentColor = gradient.rgbAt(value / max).toHex();
  } else {
    currentColor = "";
  }

  return {
    height: HEIGHT,
    padding: "13px 0",
    "& .MuiSlider-thumb": {
      height: 26,
      width: 26,
      backgroundColor: theme.palette.background.default,
      border: "solid 6px #" + currentColor,
    },
    "& .MuiSlider-track": {
      height: HEIGHT,
      backgroundImage:
        "linear-gradient(270deg, #" +
        currentColor +
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
