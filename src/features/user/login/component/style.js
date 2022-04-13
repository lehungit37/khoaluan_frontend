import color from "../../../../constant/color";

const style = () => {
  return {
    boxModal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px"
    },
    formItem: {
      position: "relative",
      padding: "2% 4%",
      borderRadius: "10px",
      width: "100%"
    },
    paper: {
      position: "absolute",
      top: "-3%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "70%",
      textAlign: "center  ",
      backgroundColor: `${color.BLUE} !important`,
      color: `${color.WHITE} !important`,
      padding: "10px 20px"
    },
    header: {
      padding: "10px 0px",
      borderBottom: "1px solid #000"
    }
  };
};
export default style;
