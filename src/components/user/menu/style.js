import color from "../../../constant/color";
import { styled, alpha } from "@mui/material/styles";
import { Menu } from "@mui/material";

const style = () => {
  return {
    root: {
      padding: "1% 8%",
    },
    image: {
      width: "100%",
    },
    nameUser: {
      textTransform: "uppercase",
      fontWeight: "bold",
      marginLeft: 5,
    },
    navbar: {
      background: color.BLUE,
    },
    navbarItem: {
      display: "flex",
      justifyContent: "center",
      "@media(max-width:768px)": {
        display: "none",
      },
      "& a": {
        textDecoration: "none",
        color: color.WHITE,
        fontWeight: "bold",
        padding: "15px 20px",
        transition: ".3s easy-in-out",
        "&.active, &:hover": {
          background: color.RED,
        },
      },
    },

    repon_navbarItem: {
      display: "flex",
      flexDirection: "column",
      "& a": {
        textDecoration: "none",
        color: "#000",
        fontWeight: "bold",
        padding: "15px 20px",
        transition: ".3s easy-in-out",
        "&.active, &:hover": {
          background: color.RED,
          width: "100%",
        },
      },
    },
  };
};

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default style;
