import Images from "./../../../constant/images";
import colors from "../../../constant/color";

const style = () => {
  return {
    boxContainer: {
      width: "100%",
      height: "100vh",
      background: `url(${Images.ADMIN_LOGIN_BG})`,
      position: "relative"
    },
    boxForm: {
      width: "25%",
      background: colors.WHITE,
      padding: "20px",
      borderRadius: "10px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    boxTitle: {
      background: colors.BLUE,
      color: colors.WHITE,
      padding: "10px 0px",
      textAlign: "center",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      position: "absolute",
      top: "-10%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%"
    }
  };
};

export default style;
