const K_SIZE = 40;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "relative",
  width: "60%",
  height: "60%",
  left: "-20px",
  top: "-20px",

  borderRadius: "20px",

  textAlign: "center",
  color: "red",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "4px",
  cursor: "pointer"
};

const style = () => {
  return {
    box: {
      width: "300px",

      padding: "20px",
      background: "#fff"
    },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between"
    },
    flexColumn: {
      flexDirection: "column"
    },
    marginBox: {
      marginBottom: "20px"
    },
    fontWeight: {
      fontWeight: "800 !important"
    },
    fontSize: {
      fontSize: "20px !important"
    },
    toolTipFlex: {
      flex: 2
    },
    position: {
      position: "absolute",
      top: "-160px",
      left: "15px"
    },
    absoluteIcon: {
      position: "absolute",
      fontSize: "30px !important"
    },
    fontSizeText: {
      fontSize: "13px !important"
    }
  };
};

export { greatPlaceStyle, K_SIZE };
export default style;
