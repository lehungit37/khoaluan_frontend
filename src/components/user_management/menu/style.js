import color from "../../../constant/color";

const style = () => ({
  link: {
    "& a": {
      textDecoration: "none",
      color: color.BLACK,
      fontSize: 14,
      "&.active": {
        color: color.RED
      }
    }
  }
});

export default style;
