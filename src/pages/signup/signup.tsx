import { Box, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import validator from "validator";
import { Button, notification } from "antd";
import auth from "./auth.svg";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Text from "antd/lib/typography/Text";
import { Link, useNavigate } from "react-router-dom";
import { UserInterface } from "../../redux/reducers";

const helper = (prop: string, val: string, bool: Boolean = false) => {
  if (prop === "name") {
    if (!val.length) {
      return !bool ? "Your Username" : false;
    }
    if (typeof val === "string" && !val.trim()) {
      return !bool ? "Name is required" : true;
    }
    if (validator.isEmail(val)) {
      return !bool ? "Can not use Email as Name" : true;
    }
    return !bool ? "" : false;
  } else if (prop === "email") {
    if (!val.length) {
      return !bool ? "Your Email" : false;
    }
    if (typeof val === "string" && !val.trim()) {
      return !bool ? "Email is required" : true;
    }
    if (!validator.isEmail(val)) {
      return !bool ? "Invalid Email" : true;
    }
    return !bool ? "" : false;
  } else if (prop === "password") {
    if (!val.length) {
      return !bool ? "Your Password" : false;
    }
    if (!val || !val.trim()) {
      return !bool ? `Password is required` : true;
    } else if (val.length < 8) {
      return !bool ? `Password must not be shorter than 8 characters` : true;
    } else {
      return !bool ? "" : false;
    }
  }
};

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const [passvisible, setPassvisible] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((s: UserInterface) => s);

  useEffect(() => {
    if (user.auth) {
      navigate("/");
    }
    return () => {};
  }, [history, user.auth]);
  useEffect(() => {
    console.log(user);

    return () => {};
  }, []);

  return (
    <Layout>
      <div className="w-full min-h-screen pt-16 px-0 md:px-16">
        <div className="flex min-h-nonav justify-around items-center">
          <div className="max-w-md hidden lg:block">
            <img src={auth} alt="Sign up" />
          </div>
          <Box
            className="flex border-t-6 rounded-t-xl border-t-secondary bg-white flex-col md:border-t-side gap-4 justify-center items-center md:border-l-2  md:border-r-2 md:border-b-2 rounded-lg border-riflegreen px-10 md:px-14 py-14 w-full max-w-md md:w-1/2"
            component="form"
          >
            <div className="text-3xl text-secondary font-bold">Sign Up</div>
            <hr className="border-t border-b border-riflegreen bg-riflegreen w-4/5" />
            <TextField
              autoFocus
              spellCheck="false"
              className="w-full"
              required
              variant="outlined"
              size="small"
              label="Name"
              type="text"
              value={data.name}
              error={!!helper("name", data.name, true)}
              helperText={helper("name", data.name)}
              onChange={(e) => {
                setData((prevData) => ({ ...prevData, name: e.target.value }));
              }}
            />
            <TextField
              spellCheck="false"
              className="w-full"
              required
              variant="outlined"
              size="small"
              label="Email"
              type="email"
              value={data.email}
              error={!!helper("email", data.email, true)}
              helperText={helper("email", data.email)}
              onChange={(e) => {
                setData((prevData) => ({ ...prevData, email: e.target.value }));
              }}
            />
            <TextField
              spellCheck="false"
              className="w-full"
              required
              variant="outlined"
              size="small"
              label="Password"
              type={passvisible ? "text" : "password"}
              value={data.password}
              error={!!helper("password", data.password, true)}
              helperText={helper("password", data.password)}
              onChange={(e) => {
                setData((prevData) => ({
                  ...prevData,
                  password: e.target.value.trimStart(),
                }));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setPassvisible((v) => !v);
                      }}
                      onMouseDown={() => {
                        setPassvisible((v) => !v);
                      }}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {!passvisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              size="large"
              disabled={isSigningUp}
              className="px-2 py-1 uppercase font-bold bg-secondary text-white rounded-md ring-secondary ring-opacity-50 focus:ring-4 focus:outline-none hover:ring-4 focus:border-secondary hover:border-secondary duration-300"
              onClick={() => {
                if (
                  helper("name", data.name, true) ||
                  helper("email", data.email, true) ||
                  helper("password", data.password, true)
                ) {
                  notification.error({
                    message: "Failed",
                    description: "Invalid details",
                    placement: "bottomRight",
                  });
                } else {
                  setIsSigningUp(true);
                  // axios
                  //   .post(`${SERVER_URL}/api/v1/user/auth/signup`, data)
                  //   .then((res) => {
                  //     const { data } = res;
                  //     if (data.res) {
                  //       // dispatch(
                  //       //   setUser({
                  //       //     name: data.data.user.name,
                  //       //     email: data.data.user.email,
                  //       //     auth: true,
                  //       //   })
                  //       // );
                  //       notification.success({
                  //         message: "Success",
                  //         description: data.msg,
                  //         placement: "bottomRight",
                  //       });
                  //       setCookie("jwt", data.data.token, { path: "/" });

                  //       navigate("/dashboard");
                  //     } else {
                  //       data.errs.forEach((err: string) => {
                  //         notification.error({
                  //           message: "Failed",
                  //           description: err,
                  //           placement: "bottomRight",
                  //         });
                  //       });
                  //     }
                  //     setIsSigningUp(false);
                  //   })
                  //   .catch((err) => {
                  //     console.error(err);
                  //     setIsSigningUp(false);
                  //   });
                  console.log(data);
                }
              }}
            >
              Sign Up
            </Button>
            <Text className="text-sm font-extralight">
              already have an account?{" "}
              <Link className="text-sky-500 font-light" to="/signin">
                Sign In
              </Link>
            </Text>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
