import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Alert,
  AlertTitle
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SelectForm from "../../../custom_fileds/hook-form/select_form";
import FormTextField from "../../../custom_fileds/hook-form/text_field";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getAddress,
  getCategories,
  getRootLocation,
  addPost,
  resetImagesLink
} from "./new_post_slice";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "./component/upload_image";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import PostMap from "./component/map/post_map";
import { toast } from "react-toastify";
const schema = yup
  .object({
    cityId: yup.string().required("Vui lòng chọn thành phố"),
    districtId: yup.string().required("Vui lòng chọn quận huyện"),
    street: yup.string().required("Vui lòng nhập dịa chỉ nhà"),
    categoryId: yup.string().required("Vui lòng chọn loại chuyên mục"),
    title: yup
      .string()
      .max(100, "Tiêu đề không quá 100 ký tự")
      .required("Vui lòng nhập tiêu đề"),
    infoConnect: yup.string(),
    description: yup
      .string()
      .max(500, "Mô tả không quá 500 ký tự")
      .required("Vui lòng nhập mô tả bài viết"),
    price: yup
      .number("Số tiền không hợp lệ, Vui lòng nhập lại")
      .min(1, "Số tiền không hợp lệ, Vui lòng nhập lại")
      .required("Vui lòng nhập số tiền muốn cho thuê"),
    objectId: yup.string().required("Vui lòng chọn đối tượng cho thuê")
  })
  .required();

function NewPost() {
  const dispatch = useDispatch();
  const { address, formDataValue, imagesLink, categories, loadingNewPost } =
    useSelector((state) => state.newPostReducer);
  const [exactAddress, setExactAddress] = useState({
    cityId: formDataValue.cityId,
    districtId: formDataValue.districtId,
    street: formDataValue.street
  });
  const [getLocationAddress, setGetLocationAddress] = useState(false);
  const {
    api: {
      getInfo: { me }
    }
  } = useSelector((state) => state.userReducer);
  let defaultValues = useMemo(() => formDataValue, [formDataValue]);

  const [stringAddress, setStringAddress] = useState("");
  const [rootLocation, setRootLocation] = useState("");
  const renderExactAddress = () => {
    const indexCity = address?.city?.findIndex(
      (item) => item.code === exactAddress.cityId
    );
    const indexDistrict = address?.districts?.findIndex(
      (item) => item.code === exactAddress.districtId
    );

    const nameCity = address?.city?.[indexCity]?.name;
    const districtName = address?.districts?.[indexDistrict]?.name;

    return `${exactAddress?.street}${exactAddress?.street ? ", " : ""}${
      districtName || ""
    }${districtName ? ", " : ""}${nameCity || ""}`;
  };

  useEffect(() => {
    setStringAddress(renderExactAddress());
  }, [exactAddress]);

  const {
    control,
    reset,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  useEffect(() => {
    dispatch(getAddress());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stringAddress) {
        setGetLocationAddress(true);
        dispatch(getRootLocation({ address: stringAddress }))
          .unwrap()
          .then((data) => {
            setGetLocationAddress(false);

            const { rootLocation } = data;
            setRootLocation(rootLocation);
          })
          .catch(() => {
            setGetLocationAddress(false);
          });
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [stringAddress]);

  useEffect(() => {
    setValue("infoConnect", me?.phoneNumber);
  }, [me]);

  const onSubmit = (data) => {
    const dataSend = {
      info: {
        ...data,
        imagePost:
          imagesLink[0]?.url ||
          "http://localhost:3000/api/images/default-logo.png",
        rootLocation,
        userId: me?.id
      },
      relatedImages: imagesLink || []
    };

    setGetLocationAddress(true);

    dispatch(addPost(dataSend))
      .unwrap()
      .then(() => {
        toast.success("Thêm bài viết thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
        reset();
        setGetLocationAddress(false);
        dispatch(resetImagesLink());
        setRootLocation("16.054407,108.202164 ");
      })
      .catch((error) => {
        toast.error(error.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
        setGetLocationAddress(false);
      });
  };

  const handleChangeAddress = (e) => {
    const { cityId, districtId, street } = getValues();
    const indexCity = address?.city?.findIndex((item) => item.code === cityId);
    const indexDistrict = address?.districts?.findIndex(
      (item) => item.code === districtId
    );

    const nameCity = address?.city?.[indexCity]?.name;
    const districtName = address?.districts?.[indexDistrict]?.name;
    setValue(
      "address",
      `${street}${street ? ", " : ""}${districtName || ""}${
        districtName ? ", " : ""
      }${nameCity || ""}`
    );
    setStringAddress(
      `${street}${street ? ", " : ""}${districtName || ""}${
        districtName ? ", " : ""
      }${nameCity || ""}`
    );
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          borderBottom: "1px solid #000",
          padding: "10px 0px",
          marginBottom: "10px"
        }}
      >
        Đăng tin mới
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ marginTop: "20px" }}>
              <Typography variant="h5">Địa chỉ cho thuê</Typography>
              <Grid
                container
                columnSpacing={4}
                rowSpacing={5}
                alignItems="center"
                sx={{ marginBottom: "10px" }}
              >
                <Grid item md={4}>
                  <SelectForm
                    name="cityId"
                    label="Thành Phố"
                    control={control}
                    errors={errors}
                    options={address?.city || []}
                    keyItem="code"
                    labelItem="name"
                    size="small"
                    onChange={handleChangeAddress}
                  />
                </Grid>
                <Grid item md={4}>
                  <SelectForm
                    name="districtId"
                    label="Quận/Huyện"
                    control={control}
                    errors={errors}
                    options={address?.districts || []}
                    keyItem="code"
                    labelItem="name"
                    size="small"
                    onChange={handleChangeAddress}
                  />
                </Grid>
                <Grid item md={4}>
                  <FormTextField
                    control={control}
                    name={"street"}
                    label="Địa chỉ nhà"
                    size="small"
                    onChange={handleChangeAddress}
                  />
                </Grid>
              </Grid>
              <Grid item md={12} display="flex">
                <FormTextField
                  control={control}
                  name={"address"}
                  label="Địa chỉ chính xác"
                  size="small"
                  disabled={true}
                />
                <LoadingButton disabled={true} loading={getLocationAddress}>
                  {getLocationAddress === false ? (
                    rootLocation ? (
                      <IconButton color="success" aria-label="delete">
                        <Tooltip title="Đã xác nhận">
                          <CheckCircleOutlineOutlinedIcon />
                        </Tooltip>
                      </IconButton>
                    ) : (
                      <IconButton color="error" aria-label="delete">
                        <Tooltip title="Chưa xác nhận">
                          <ErrorOutlineOutlinedIcon />
                        </Tooltip>
                      </IconButton>
                    )
                  ) : null}
                </LoadingButton>
              </Grid>
            </Box>
            <Box sx={{ margin: "40px 0px" }}>
              <Typography variant="h5">Thông tin mô tả</Typography>
              <Grid container flexDirection={" column"} rowGap={2}>
                <Grid item md={6}>
                  <SelectForm
                    name="categoryId"
                    label="Loại chuyên mục"
                    control={control}
                    errors={errors}
                    options={categories || []}
                    keyItem="id"
                    labelItem="nameCategories"
                    size="small"
                  />
                </Grid>
                <Grid item md={12}>
                  <FormTextField
                    control={control}
                    name={"title"}
                    label="Tiêu đề"
                    size="small"
                  />
                </Grid>
                <Grid item md={12}>
                  <FormTextField
                    control={control}
                    name={"description"}
                    label="Nội dung mô tả"
                    size="small"
                    rows={10}
                  />
                </Grid>
                <Grid item md={6}>
                  <FormTextField
                    control={control}
                    name={"infoConnect"}
                    label="Thông tin liên hệ"
                    size="small"
                    disabled={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <FormTextField
                    control={control}
                    name="price"
                    label="Giá cho thuê"
                    size="small"
                  />
                </Grid>
                <Grid item md={6}>
                  <SelectForm
                    name="objectId"
                    label="Đối tượng cho thuê"
                    control={control}
                    errors={errors}
                    options={[
                      { id: "all", name: "Tất cả" },
                      { id: "male", name: "Nam" },
                      { id: "female", name: "Nữ" }
                    ]}
                    keyItem="id"
                    labelItem="name"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h5">Hình ảnh</Typography>
              <UploadImage />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type={"submit"}
                onSubmit={handleSubmit(onSubmit)}
              >
                Đăng bài
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid
          item
          md={5}
          sx={{
            paddingTop: "40px !important",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <PostMap rootLocation={rootLocation} />
          <Box sx={{ marginTop: "20px" }}>
            <Alert severity="info">
              <AlertTitle>Hướng dẫn đăng tin</AlertTitle>
              <ul>
                <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
                <li>Tiêu đề không dài quá 100 ký tự</li>
                <li>
                  Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có
                  hiệu quả hơn
                </li>
                <li>
                  Để tăng độ tin cậy, các bạn hãy nhập vị trí chính xác nhất
                </li>
                <li>
                  Khi đăng tin các bạn nên đăng các hình ảnh mô tả để có sự liên
                  lạc nhanh hơn
                </li>
              </ul>
            </Alert>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default NewPost;
