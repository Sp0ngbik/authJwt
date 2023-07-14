import { Button, Form, Input } from "antd";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function AuthPage() {
  const [usenameState, setUsernameState] = useState();
  const [passwordState, setPasswordState] = useState();
  const [allUsersState, setAllUsersState] = useState();
  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => setAllUsersState(res.data.users));
  }, []);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: usenameState,
        password: passwordState,
      });

      const token = response.data.token;
      localStorage.setItem("jtwToken", token);
      navigate("/private");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <div className={style.formAutorizeBlock}>
        <Form onFinish={handleLogin} className={style.formBlock}>
          <Form.Item name="username">
            <Input
              type="username"
              onChange={(e) => {
                setUsernameState(e.target.value);
              }}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              type="password"
              onChange={(e) => {
                setPasswordState(e.target.value);
              }}
              placeholder="Password"
            />
          </Form.Item>
          <Button htmlType="submit">Login</Button>
        </Form>
      </div>

      <div>Available users for this practice : </div>
      {allUsersState &&
        allUsersState.map((el) => {
          return (
            <ul key={el.id} className={style.availableUsers}>
              <li>Username - {el.username}</li>
              <ol>Password - {el.password}</ol>
            </ul>
          );
        })}
    </div>
  );
}
