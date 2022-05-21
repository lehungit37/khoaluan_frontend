import React from "react";
import { Grid, Typography } from "@mui/material";
import style from "./style";
import { makeStyles } from "@mui/styles";
import Link from "@mui/material/Link";

const useStyles = makeStyles(style);

function Tutorial() {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.container}>
        <Typography
          className="animate__heartBeat"
          textAlign={"center"}
          color={"#FF6600	"}
          variant={"h5"}
          fontWeight={"bold"}
        >
          HƯỚNG DẪN ĐĂNG TIN
        </Typography>
        <Typography sx={{ lineHeight: "2" }}>
          Chào bạn, sau đây là hướng dẫn sử dụng cho thành viên website
          phongtro123.com.
          <br />
          Nếu bạn chưa có tài khoản,
          <Link href="#" underline="hover" sx={{ color: "blue" }}>
            hãy đăng ký tại đây
          </Link>{" "}
          trước khi bắt đầu đăng tin mới.
          <br />
          Nếu đã có tài khoản, sau khi{" "}
          <Link href="#" underline="hover" sx={{ color: "blue" }}>
            Đăng nhập
          </Link>{" "}
          vào website, bạn bấm vào nút{" "}
          <Link href="#" underline="hover" sx={{ color: "blue" }}>
            Đăng Tin
          </Link>{" "}
          để bắt đầu.
          <br />
          Khi đăng tin các bạn đọc kỹ mô tả từng bước, nhập đầy đủ và chính xác
          nội dung cho tin đăng, đặc biệt là mục Giá và Diện tích. Những tin có
          nội dung hình ảnh rõ ràng, đầy đủ sẽ có tỉ lệ xem cao hơn 50%.
          <br />
          Lưu ý khi đăng tin:
          <br />
          + Điền đầy đủ các thông tin bắt buộc vào các ô nhập liệu trong phần
          đăng tin.
          <br />
          + Phần giá cho thuê, vui lòng nhập chính xác 1 giá duy nhất (Không
          nhập giá từ ....đến ....) và chọn đúng đơn vị giá là triệu/tháng hoặc
          nghìn/tháng. Ví dụ bạn cho thuê 3 triệu/tháng thì bạn nhập đủ như sau
          3000000 (1 số 3 và 6 số 0)
          <br />
          + Diện tích nhập đúng 1 diện tích duy nhất (Không nhập diện tích từ
          ....đến ....)
          <br />+ Sau khi nhập đầy đủ các thông tin, bấm ĐĂNG TIN NGAY và chờ
          vài giây để tin bạn hiển thị trên website, nếu đăng tin thành công hệ
          thống sẽ báo bạn đã đăng tin thành công, nếu hệ thống cảnh báo màu đỏ,
          các ô chọn màu bị sai, vui lòng nhập lại cho chính xác và bấm ĐĂNG TIN
          NGAY lại.
        </Typography>
        <Typography variant="h5" padding={"1rem 0"}>
          Hướng dẫn nạp tiền:
        </Typography>
        <Typography sx={{ lineHeight: "2" }}>
          Sau khi "Đăng nhập" quý khách nhấp chọn vào phần Quản lý tài khoản và
          chọn{" "}
          <Link href="#" underline="hover" sx={{ color: "blue" }}>
            Nạp Tiền
          </Link>{" "}
          <br />
          Quý khách có thể chọn các hình thức thanh toán sau:
          <br />+ Chuyển khoản trực tiếp vào các số tài khoản tại
          Phongtro123.com thông qua internet banking hoặc chuyển khoản thông
          thường.
          <br />
          + Thanh toán bằng thẻ ngân hàng nội địa (Lưu ý, thẻ ngân hàng nội địa
          phải đăng ký giao dịch online tại ngân hàng phát hành thẻ)
          <br />
          + Thanh toán bằng thẻ tính dụng quốc tế/Visa
          <br />
          + Thanh toán qua ví điện tử Momo cho số điện thoại 0905705567
          <br />
          Link nạp tiền:{" "}
          <Link href="#" underline="hover" sx={{ color: "blue" }}>
            https://phongtro123.com/quan-ly/nap-tien.html
          </Link>{" "}
        </Typography>
        <Typography variant="h5" padding={"1rem 0"}>
          Hướng dẫn quản lý tin rao:
        </Typography>
        <Typography>
          Đăng nhập tài khoản, sau đó nhấp vào phần Quản lý tài khoản, chọn{" "}
          <Link href="#" underline="hover" sx={{ color: "blue" }}>
            Quản lý tin đăng
          </Link>{" "}
          để quản lý các tin đã đăng trên hệ thống.
          <br />
          <Typography sx={{ lineHeight: "2" }}>
            + Đẩy tin: có nghĩa là làm mới tin, đưa tin lên đầu ở từng mục, bạn
            đang đăng tin thường, thì up lên top sẽ ở đầu danh sách tin thường,
            bạn đang đăng tin VIP thì ở đầu danh sách tin VIP (Vip có 2 loại VIP
            VÀNG và SUPPER VIP)
            <br />+ Nâng cấp VIP: là chức năng giúp thay đổi vị trí hiện thị của
            tin đăng lên vị trí cao hơn tiếp cận được nhiều người xem hơn.
            <br />+ Sửa: có nghĩa là bạn có thể sửa lại tin bạn đã đăng như nội
            dung, tiêu đề, hoặc giá vvv...
            <br />+ Đã cho thuê: chức năng này rất hay, khi bấm vào tin đăng của
            bạn sẽ ko còn hiện trên mục tìm kiếm, người khác sẽ không thấy tin
            đăng của bạn, nhưng tin vẫn còn lưu trên website, khi nào bạn cần
            đăng lại thì có thể nhấp vào để tin hiển thị lại.
            <br />+ Xoá: có nghĩa là bạn sẽ xoá bỏ vĩnh viễn tin đăng của mình.
          </Typography>
        </Typography>
      </Grid>
    </>
  );
}

export default Tutorial;
