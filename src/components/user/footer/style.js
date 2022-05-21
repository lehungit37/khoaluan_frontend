import { typography } from "@mui/system";
import { hover } from "@testing-library/user-event/dist/hover";

const style = () => {
  return {
    above: {
      textAlign: "center",
      margin: "0 5rem",
    },

    above_1: {
      margin: "1rem",
      padding: "1rem 0",
      backgroundColor: "#FFFFE0",
      border: "5px dashed #A9A9A9",
      borderRadius: "5px",
    },
    container: {
      borderTop: "1px solid #A9A9A9",
      padding: "1rem",
    },

    contentFooter: {
      lineHeight: "1.6",
      padding: "1rem 2rem",
    },
    image: {
      maxHeight: "60px",
      margin: "1rem 0.5rem",
    },
    //Mobile
    "@media (max-width:768px)": {
      above: {
        margin: "0",
      },
      contentFooter: {
        width: "100%",
        textAlign: "center",
      },
    },
    // Tablet
    "@media (min-width:769px) and (max-width:1024px)": {
      above: {
        margin: "0",
      },
      contentFooter: {
        width: "50%",
        textAlign: "center",
      },
    },
  };
};

export default style;
