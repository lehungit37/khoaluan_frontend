import React, { useRef } from "react";
import { Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../new_post_slice";
import _ from "lodash";
import { toast } from "react-toastify";

export default function UploadImage(props) {
  const imageRef = useRef();
  const dispatch = useDispatch();
  const { imagesLink } = useSelector((state) => state.newPostReducer);
  const openUploadSimpleImage = () => {
    imageRef.current.click();
  };

  const handleChangeMultiImage = (e) => {
    const { files } = e.target;
    let formData = new FormData();
    _.forEach(files, (file) => {
      formData.append("file", file);
    });
    dispatch(uploadImage(formData))
      .unwrap()
      .then(() => {})
      .catch((err) => {
        console.log(err);
        toast.error(err.messages, {
          position: "bottom-left",
          autoClose: 2000
        });
      });
  };
  return (
    <Grid container sx={{ margin: "20px 0px" }}>
      <Grid container>
        <Grid item md={4}>
          <input
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            ref={imageRef}
            multiple
            onChange={handleChangeMultiImage}
          />
          <Button onClick={openUploadSimpleImage} variant="contained">
            Tải ảnh lên
          </Button>
        </Grid>
        <Grid item md={8}>
          <Grid container spacing={3}>
            {imagesLink?.map((image) => {
              return (
                <Grid item md={4}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={image.url}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
