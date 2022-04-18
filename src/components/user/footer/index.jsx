import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import style from "./style";
import { useHistory } from "react-router-dom";
import Images from "../../../constant/images";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles(style);

function Footer() {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.above}>
        <Grid className={classes.above_1}>
          <h3>Tại sao lại chọn PhongTro123.com?</h3>
          <Typography
            sx={{
              "@media(max-width:768px)": {
                display: "none",
              },
            }}
          >
            Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự
            hào là trang web đứng top google về các từ khóa:
            <Link href="#" underline="hover" sx={{ color: "blue" }}>
              cho thuê phòng trọ
            </Link>{" "}
            <Link href="#" underline="hover" sx={{ color: "blue" }}>
              , nhà trọ
            </Link>{" "}
            <Link href="#" underline="hover" sx={{ color: "blue" }}>
              , thuê nhà nguyên căn
            </Link>{" "}
            <Link href="#" underline="hover" sx={{ color: "blue" }}>
              , tìm người ở ghép
            </Link>{" "}
            <Link href="#" underline="hover" sx={{ color: "blue" }}>
              ,cho thuê mặt bằng
            </Link>{" "}
            ...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều
            khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn
          </Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "0 5rem",
              "@media(max-width:768px)": {
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <Grid>
              <Typography variant="h5">70.000+</Typography>
              <Typography>Thành viên</Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">100.000+</Typography>
              <Typography>Tin đăng</Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">300.000+</Typography>
              <Typography>Lượt truy cập/tháng</Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">2.500.000+</Typography>
              <Typography>Lượt xem/tháng</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6">Chi phí thấp, hiệu quả tối đa</Typography>
          <Rating
            name="half-rating-read"
            defaultValue={5}
            precision={0.5}
            readOnly
          />
          <br />
          <Typography
            sx={{
              "@media(max-width:768px)": {
                display: "none",
              },
            }}
          >
            "Trước khi biết website phongtro123, mình phải tốn nhiều công sức và
            chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy,
            và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết
            website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu
            quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng
            trống kéo dài."
          </Typography>
          <br />
          <Typography variant="h6">
            Bạn đang có phòng trọ / căn hộ cho thuê?
          </Typography>
          <Typography>
            Không phải lo tìm người cho thuê, phòng trống kéo dài
          </Typography>
          <br />
          <Button
            sx={{ backgroundColor: "red" }}
            variant="contained"
            disableElevation
          >
            Đăng tin ngay
          </Button>
        </Grid>
        <Grid className={classes.above_1}>
          <img
            width={"50%"}
            src="https://phongtro123.com/images/support-bg.jpg"
          ></img>
          <Typography>Liên hệ với chúng tôi nếu bạn cần hỗ trợ:</Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "1rem 5rem",

              "@media(max-width:768px)": {
                display: "flex",
                flexDirection: "column",
                padding: "1rem 0",
              },
            }}
          >
            <Grid>
              <Typography variant="button" color={"#DC143C"} fontSize={"20px"}>
                Hổ trợ thanh toán
              </Typography>
              <Typography>Điện thoại: 0763835472</Typography>
              <Typography>Zalo: 0763835472</Typography>
            </Grid>
            <Grid>
              <Typography variant="button" fontSize={"20px"} color={"#DC143C"}>
                Hổ trợ đăng tin
              </Typography>
              <Typography>Điện thoại: 0905705567</Typography>
              <Typography>Zalo: 0905705567</Typography>
            </Grid>
            <Grid>
              <Typography variant="button" fontSize={"20px"} color={"#DC143C"}>
                Hotline 24/7
              </Typography>
              <Typography>Điện thoại: 0373249607</Typography>
              <Typography>Zalo: 0373249607</Typography>
            </Grid>
          </Grid>
          <Button variant="contained" disableElevation>
            Gửi liên hệ
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid
          md={3}
          className={classes.contentFooter}
          sx={{
            boxShadow: "7px 0px 10px 0px rgba(0,0,0,0.1)",
            borderRight: "1px solid #A9A9A9",
            "@media(max-width:768px)": {
              borderRight: "none",
            },
          }}
        >
          <Link to="/">
            <img width={"40%"} src={Images.MAIN_LOGO} />
          </Link>
          <Typography
            color={"#800000	"}
            sx={{
              "@media(max-width:768px)": {
                display: "none",
              },
            }}
          >
            FastRoom tự hào có lượng dữ liệu bài đăng lớn nhất trong lĩnh vực
            cho thuê phòng trọ.
          </Typography>
        </Grid>
        <Grid
          md={3}
          className={classes.contentFooter}
          sx={{
            borderRight: "1px solid #A9A9A9",
            boxShadow: "7px 0px 10px 0px rgba(0,0,0,0.1)",
            "@media(max-width:768px)": {
              borderRight: "none",
            },
          }}
        >
          <Typography fontWeight={"bold"} color={"blue"} fontSize={"18px"}>
            Về FASTROOM
          </Typography>
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Trang chủ
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Giới thiệu
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Blog
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Quy chế hoạt động
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Quy định sử dụng
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Chính sách bảo mật
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Liên hệ
          </Link>
        </Grid>
        <Grid
          md={3}
          className={classes.contentFooter}
          sx={{
            boxShadow: "7px 0px 10px 0px rgba(0,0,0,0.1)",
            borderRight: "1px solid #A9A9A9",
            "@media(max-width:768px)": {
              borderRight: "none",
            },
          }}
        >
          <Typography fontWeight={"bold"} color={"blue"} fontSize={"18px"}>
            Hổ trợ khách hàng
          </Typography>
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Câu hỏi thường gặp
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Hướng dẫn đăng tin
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Bảng giá dịch vụ
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Quy định đăng tin
          </Link>
          <br />
          <Link href="#" underline="hover" sx={{ color: "#000" }}>
            Giải quyết khiếu nại
          </Link>
        </Grid>
        <Grid
          md={3}
          className={classes.contentFooter}
          sx={{
            boxShadow: "7px 0px 10px 0px rgba(0,0,0,0.1)",
          }}
        >
          <Typography fontWeight={"bold"} color={"blue"} fontSize={"18px"}>
            Liên hệ với chúng tôi
          </Typography>
          <Link>
            <FacebookIcon fontSize="large" cursor="pointer" />
          </Link>
          <Link>
            <YouTubeIcon
              fontSize="large"
              sx={{ color: "red", cursor: "pointer" }}
            />
          </Link>
          <Link>
            <TwitterIcon
              fontSize="large"
              sx={{ color: "	#7B68EE", cursor: "pointer" }}
            />
          </Link>
          <Link>
            <PermPhoneMsgIcon
              fontSize="large"
              sx={{ color: "#00FF00", cursor: "pointer" }}
            />
          </Link>
          <Link>
            <TelegramIcon
              fontSize="large"
              sx={{ color: "#0000FF", cursor: "pointer" }}
            />
          </Link>
        </Grid>
      </Grid>
      <Grid
        className={classes.container}
        sx={{
          textAlign: "center",
          color: "#000",
          backgroundColor: "#E4F0F0",
        }}
      >
        <Typography variant="h6">CÔNG TY TNHH LBKCORP</Typography>
        <Typography>Tổng đài CSKH: 0917686101</Typography>
        <Typography>Copyright © 2015 - 2022 Phongtro123.com</Typography>
        <Typography>Email: cskh.phongtro123@gmail.com</Typography>
        <Typography>Trường Đại học Duy Tân University</Typography>
        <Typography>
          Giấy phép đăng ký kinh doanh số 0313588502 do Sở kế hoạch và Đầu tư
          thành phố Đà Nẵng cấp ngày 24 tháng 12 năm 2021.
        </Typography>
        <Grid>
          <Link to="/">
            <img className={classes.image} src={Images.Da_Dangky} />
          </Link>
          <Link to="/">
            <img className={classes.image} src={Images.DMCA} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
