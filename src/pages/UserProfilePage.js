import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/component/UserProfile";
import Footer from "../features/common/Footer";
const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
        
        <UserProfile></UserProfile>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default UserProfilePage;
