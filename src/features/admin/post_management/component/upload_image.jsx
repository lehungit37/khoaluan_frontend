import React, { useRef } from "react";
import { Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";

export default function UploadImage(props) {
  const { imagesLink, handleUpload, multiple } = props;
  const imageRef = useRef();
  const dispatch = useDispatch();
  const openUploadImage = () => {
    imageRef.current.click();
  };

  const handleChangeMultiImage = (e) => {
    const { files } = e.target;
    let formData = new FormData();
    if (multiple) {
      _.forEach(files, (file) => {
        formData.append("file", file);
      });
    } else {
      formData.append("file", files[0]);
    }

    handleUpload(formData);
    // dispatch(uploadImage(formData))
    //   .unwrap()
    //   .then(() => {})
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(err.messages, {
    //       position: "bottom-left",
    //       autoClose: 2000
    //     });
    //   });
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
            multiple={multiple}
            onChange={handleChangeMultiImage}
          />
          <Button onClick={openUploadImage} variant="contained">
            Tải ảnh lên
          </Button>
        </Grid>

        <Grid item md={8}>
          <Grid container spacing={3}>
            {imagesLink?.length > 0 &&
              imagesLink?.map((image) => {
                return (
                  <Grid item md={4}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={
                        image?.url ||
                        "http://localhost:3000/api/images/default-logo.png"
                      }
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
