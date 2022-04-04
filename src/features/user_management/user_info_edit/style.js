import color from "../../../constant/color";
const style = () => ({
  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    marginTop: 20
  },
  formItem: {
    position: "relative",
    background: color.GRAY,
    padding: "2% 4%",
    borderRadius: "10px"
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
  header:{
    padding: "10px 0px",
    borderBottom: "1px solid #000"
 }
});
export default style;
