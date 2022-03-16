import React from "react";
import { Button } from "@mui/material";

function Dashboard() {
  const data = [
    {
      id: "9gzRrK1jbOkfzM9SmHFK",
      cityId: "43",
      districtId: "50",
      street: "196 Trần Cao Vân",
      address: "196 Trần Cao Vân, Thanh Khê, Đà Nẵng",
      title: "Demo Post 1",
      description: "Đây là demo về post",
      infoConnect: "0355912653",
      price: 100000,
      countDay: 5,
      objectId: "male",
      imagePost: "test link image",
      status: true,
      createdAt: "2022-03-10T15:45:35.000Z",
      updatedAt: "2022-03-10T15:45:35.000Z",
      typePostId: "IVMKhmAath1wAG5rkruY",
      categoryId: "v5holT77b9GARNYMLIFI",
      userId: "4ZNeTgCDbjkvpgQuvCzG"
    },
    {
      id: "cPrfOU4plzBl958QkPOY",
      cityId: "43",
      districtId: "50",
      street: "196 Trần Cao Vân",
      address: "196 Trần Cao Vân, Thanh Khê, Đà Nẵng",
      title: "Demo Post 1",
      description: "Đây là demo về post",
      infoConnect: "0355912653",
      price: 100000,
      countDay: 5,
      objectId: "male",
      imagePost: "test link image",
      status: true,
      createdAt: "2022-03-10T15:43:52.000Z",
      updatedAt: "2022-03-10T15:43:52.000Z",
      typePostId: "IVMKhmAath1wAG5rkruY",
      categoryId: "v5holT77b9GARNYMLIFI",
      userId: "4ZNeTgCDbjkvpgQuvCzG"
    },
    {
      id: "I2JSk4FGyMzotv3T4jGZ",
      cityId: "43",
      districtId: "50",
      street: "196 Trần Cao Vân",
      address: "196 Trần Cao Vân, Thanh Khê, Đà Nẵng",
      title: "Demo Post 22222",
      description: "Đây là demo về post",
      infoConnect: "0355912653",
      price: 100000,
      countDay: 5,
      objectId: "male",
      imagePost: "test link image",
      status: true,
      createdAt: "2022-03-10T15:33:57.000Z",
      updatedAt: "2022-03-10T15:33:57.000Z",
      typePostId: "IVMKhmAath1wAG5rkruY",
      categoryId: "v5holT77b9GARNYMLIFI",
      userId: "4ZNeTgCDbjkvpgQuvCzG"
    },
    {
      id: "usLPmeerTVs0lcUZVa97",
      cityId: "43",
      districtId: "50",
      street: "196 Trần Cao Vân",
      address: "196 Trần Cao Vân, Thanh Khê, Đà Nẵng",
      title: "Demo Post 22222",
      description: "Đây là demo về post",
      infoConnect: "0355912653",
      price: 100000,
      countDay: 5,
      objectId: "male",
      imagePost: "test link image",
      status: true,
      createdAt: "2022-03-10T15:43:34.000Z",
      updatedAt: "2022-03-10T15:43:34.000Z",
      typePostId: "IVMKhmAath1wAG5rkruY",
      categoryId: "v5holT77b9GARNYMLIFI",
      userId: "4ZNeTgCDbjkvpgQuvCzG"
    }
  ];
  return (
    <>
      <div>Dashboard</div>
      {data?.map((item) => {
        return <Button>Click here</Button>;
      })}
    </>
  );
}

export default Dashboard;
