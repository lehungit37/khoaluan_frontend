import { hover } from "@testing-library/user-event/dist/hover";

const style = () => {
  return {
    fabove: {
      margin: "1rem 10rem",
      textAlign: "center",
    },
    fabove_1: {
      padding: "1rem 0",
      backgroundColor: "#FFFFE0",
      border: "1px solid #A9A9A9",
      borderRadius: "5px",
    },
    fabove_2: {
      marginTop: "1rem",
      padding: "1rem 0",
      backgroundColor: "#FFFFE0",
      border: "5px dashed #A9A9A9",
      borderRadius: "5px",
    },
    container: {
      borderTop: "1px solid #A9A9A9",
      padding: "20px 25px",
      marginTop: "1rem",
    },
    image: {
      width: "10%",
      padding: "0 0.5rem",
      cursor: "pointer",
      height: "50px",
    },
    contentFooter: {
      lineHeight: "1.6",
      padding: "0 1.5rem",
    },
  };
};

export default style;
