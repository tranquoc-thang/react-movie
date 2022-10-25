import "./auth.scss";

import Button from "../../components/button/button";
import Loading from "../../components/loading/Loading";

import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/tmovie.png";

import { Link, useNavigate } from "react-router-dom";

import { jsonbinApi } from "../../api/jsonbinApi";

import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../App";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [usernameBlur, setUsernameBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [confirmpasswordBlur, setConfirmpasswordBlur] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const required = (value) => {
    if (value === "" || value === null || value === undefined) {
      return false;
    }
    return true;
  };

  const match = (value, confirmValue) => {
    if (value !== confirmValue) {
      return false;
    }
    return true;
  };

  const length = (value) => {
    if (value.length < 6 || value.length > 32) {
      return false;
    }
    return true;
  };

  const login = async () => {
    setIsLoading(true);
    const userLogin = userList.find(
      (user) => user.username === username && user.password === password
    );
    if (userLogin) {
      setUser(userLogin);
      resetForm();
      setIsLoading(false);
      navigate("/");
    } else {
      setIsLoading(false);
      alert("Wrong username or password");
    }
  };

  const signup = async () => {
    setIsLoading(true);
    if (
      required(username) &&
      required(password) &&
      required(password) &&
      match(password, confirmpassword) &&
      length(username) &&
      length(password)
    ) {
      const register = async () => {
        const res = await jsonbinApi.register([
          ...userList,
          { username, password },
        ]);
        if (res.status === 200) {
          setIsLoading(false);
          setIsSignUp(false);
          resetForm();
          alert("Sign up succesfully");
        } else {
          setIsLoading(false);
          resetForm();
          alert("Something error");
        }
      };

      register();
      setUserList([...userList, { username, password }]);
      return;
    }
    setIsLoading(false);
    alert("Something went wrong");
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmpassword("");
    setUsernameBlur(false);
    setPasswordBlur(false);
    setConfirmpasswordBlur(false);
  };

  useEffect(() => {
    const getUserList = async () => {
      const res = await jsonbinApi.getUserList();
      setUserList(res.data.record.userList);
    };
    getUserList();
  }, []);

  return (
    <div className="auth" style={{ backgroundImage: `url(${bg})` }}>
      <div
        className="logo"
        style={{ position: "absolute", top: "2rem", left: "2rem" }}
      >
        <img src={logo} alt="" />
        <Link to="/">MoviesHD</Link>
      </div>
      {isLoading ? <Loading /> : null}
      <div className="form-auth">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

        <div className="form-item">
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => setUsernameBlur(true)}
            autoComplete="off"
          />
          <i className="bx bxs-user"></i>
        </div>
        {usernameBlur ? (
          <MessageValidate
            fieldName="Username"
            required={!required(username)}
            length={!length(username)}
          />
        ) : null}

        <div className="form-item">
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPasswordBlur(true)}
            autoComplete="off"
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        {passwordBlur ? (
          <MessageValidate
            fieldName="Password"
            required={!required(password)}
            length={!length(password)}
          />
        ) : null}

        {isSignUp ? (
          <>
            <div className="form-item">
              <input
                className="form-input"
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                onBlur={(e) => setConfirmpasswordBlur(true)}
                autoComplete="off"
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            {confirmpasswordBlur ? (
              <MessageValidate
                fieldName="Confirm Password"
                required={!required(confirmpassword)}
                match={!match(password, confirmpassword)}
              />
            ) : null}
          </>
        ) : null}

        {/* To signup to signin */}
        {isSignUp ? (
          <>
            <Button type="submit" className="small" onClick={signup}>
              Sign up
            </Button>
            <span style={{ color: "#737373" }}>
              Already have an account?
              <span
                onClick={() => setIsSignUp(false)}
                style={{
                  color: "white",
                  paddingLeft: ".4rem",
                  userSelect: "none",
                  cursor: "pointer",
                }}
              >
                Sign in now
              </span>
            </span>
          </>
        ) : (
          <>
            <Button type="submit" className="small" onClick={login}>
              Sign In
            </Button>
            <span style={{ color: "#737373" }}>
              New to MoviesHD?
              <span
                onClick={() => setIsSignUp(true)}
                style={{
                  color: "white",
                  paddingLeft: ".4rem",
                  userSelect: "none",
                  cursor: "pointer",
                }}
              >
                Sign up now
              </span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const MessageValidate = (props) => {
  return (
    <>
      {props.required ? (
        <span className="validate__message">{props.fieldName} is required</span>
      ) : null}
      {props.length ? (
        <span className="validate__message">
          The length of {props.fieldName} between 6 and 32 characters
        </span>
      ) : null}
      {props.match ? (
        <span className="validate__message">
          {props.fieldName} is not match
        </span>
      ) : null}
    </>
  );
};

export default Auth;
