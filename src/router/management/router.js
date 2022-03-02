import PostManagement from "../../features/user_management/management_post";
import NewPost from "../../features/user_management/new_post";

export const ManagementRouteLocal = [
  {
    path: "/tin-dang",
    name: "Quản lý tin đăng",
    component: PostManagement,
  },
  {
    path: "/dang-tin-moi",
    name: "Quản lý tin đăng",
    component: NewPost,
  },
];
