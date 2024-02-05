import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/component/UserProfile";
import Footer from "../features/common/Footer";
import Breadcrumb from "../features/common/Breadcrumb";

const UserProfilePage = () => {
  const pages = [
    { label: "Home", link: "/" },
    { label: "User Profile", linkClass: "text-blue-500" },
  ];
  return (
    <div>
      <Navbar>
      <Breadcrumb pages={pages} />
        <UserProfile></UserProfile>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default UserProfilePage;
