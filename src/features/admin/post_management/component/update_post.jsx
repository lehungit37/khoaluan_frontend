import { yupResolver } from "@hookform/resolvers/yup";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import SelectForm from "../../../../custom_fileds/hook-form/select_form";
import FormTextField from "../../../../custom_fileds/hook-form/text_field";
import PostMap from "../../new_post/component/map/post_map";
import UploadImage from "./upload_image";
import {
  getAddress,
  getCategories,
  getRootLocation,
  uploadImage
} from "../../new_post/new_post_slice";
import { getInfoPostEdit, updatePost } from "./../../../../app/post_slice";
import Loading from "../../../../components/loading";
import { toast } from "react-toastify";
import { uploadSimpleImage } from "../../../../app/image";

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

const UpdatePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { infoPost, loading } = useSelector((state) => state.postReducer);
  const defaultValues = useMemo(() => infoPost, [infoPost]);
  const { address, categories, loadingNewPost } = useSelector(
    (state) => state.newPostReducer
  );
  const [imagesLink, setImagesLink] = useState([]);
  const [imagePost, setImagePost] = useState("");
  const [isChangeRelatedIamge, setIsChangeRelatedImage] = useState(false);
  const [exactAddress, setExactAddress] = useState({
    cityId: infoPost?.cityId,
    districtId: infoPost?.districtId,
    street: infoPost?.street
  });
  const [getLocationAddress, setGetLocationAddress] = useState(false);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [stringAddress, setStringAddress] = useState(infoPost.address);
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
    reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    setRootLocation(infoPost?.rootLocation);
    setStringAddress(infoPost?.address);
    setImagesLink(infoPost.relatedImagesLists);
    setImagePost(infoPost.imagePost);
  }, [infoPost]);

  useEffect(() => {
    dispatch(getInfoPostEdit(id))
      .unwrap()
      .then(() => {
        dispatch(getAddress());
        dispatch(getCategories());
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stringAddress && stringAddress !== infoPost?.address) {
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

  const onSubmit = (data) => {
    [
      "address",
      "createdAt",
      "districtId",
      "infoConnect",
      "relatedImagesLists",
      "rootLocation",
      "street",
      "updatedAt"
    ].forEach((e) => delete data[e]);
    const dataSend = {
      info: {
        ...data,
        imagePost
      }
    };
    if (isChangeRelatedIamge) {
      dataSend.newRelatedImage = imagesLink;
      dataSend.oldRelatedImage = infoPost.relatedImagesLists;
    }

    setLoadingUpdate(true);
    dispatch(updatePost({ dataSend, id }))
      .unwrap()
      .then(() => {
        toast.success("Cập nhật bài viết thành công", {
          position: "bottom-left",
          autoClose: 2000
        });
        setLoadingUpdate(false);
      })
      .catch((error) => {
        toast.error(error.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
        setLoadingUpdate(false);
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

  const handleUploadMultiImage = (formData) => {
    dispatch(uploadImage(formData))
      .unwrap()
      .then((data) => {
        setImagesLink(data);
        setIsChangeRelatedImage(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
      });
  };

  const handleUploadSimpleImage = (formData) => {
    dispatch(uploadSimpleImage(formData))
      .unwrap()
      .then((data) => {
        setImagePost(data?.url);
        setIsChangeRelatedImage(true);
      })
      .catch((error) => {
        toast.error(error.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
      });
  };

  //render Layout
  if (loading.getInfo || loadingNewPost.getAddress) {
    return <Loading />;
  }

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
        Chỉnh sửa tin
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
                    disabled
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
                    disabled
                  />
                </Grid>
                <Grid item md={4}>
                  <FormTextField
                    control={control}
                    name={"street"}
                    label="Địa chỉ nhà"
                    size="small"
                    onChange={handleChangeAddress}
                    disabled
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
              <Typography variant="h5">Hình ảnh hiển thị</Typography>
              <UploadImage
                handleUpload={handleUploadSimpleImage}
                imagesLink={[{ url: imagePost }]}
              />
            </Box>
            <Box>
              <Typography variant="h5">Hình ảnh liên quan</Typography>
              <UploadImage
                handleUpload={handleUploadMultiImage}
                imagesLink={imagesLink}
                multiple
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type={"submit"}
                onSubmit={handleSubmit(onSubmit)}
                disabled={loadingUpdate}
              >
                Cập nhật
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid
          item
          md={5}
          sx={{ paddingTop: "40px !important", height: "500px" }}
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
};

export default UpdatePost;
