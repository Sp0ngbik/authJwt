import jwtDecode from "jwt-decode";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
export function PrivatePage() {
  const isAuthenticated = localStorage.getItem("jtwToken");
  const navigate = useNavigate();
  let userInfo = null;
  useEffect(() => {
    !isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);
  if (isAuthenticated) {
    userInfo = jwtDecode(isAuthenticated);
  }
  return (
    isAuthenticated && (
      <div className={style.userPage}>
        <ul>
          <img src={userInfo.image} alt="user avatar not found" />
          <li>{userInfo.firstName}</li>
          <li>{userInfo.lastName}</li>
          <li>{userInfo.gender}</li>
          <li>{userInfo.email}</li>
          <li>{userInfo.id}</li>
        </ul>
        <Button
          onClick={() => {
            localStorage.removeItem("jtwToken");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
    )
  );
}
