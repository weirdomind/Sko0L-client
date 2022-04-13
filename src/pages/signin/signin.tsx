import { Box, IconButton, InputAdornment, TextField } from "@material-ui/core";
import {
  CheckRounded,
  ErrorRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";
import { Button, notification } from "antd";
import signin from "./signin.svg";
import { SERVER_URL } from "../../constanats";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
``;
import Text from "antd/lib/typography/Text";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/action";
import Layout from "../../components/layout/Layout";
import server from "../../configs/axiosinstance";
import { toast } from "react-toastify";

const helper = (prop: string, val: string, bool: boolean = false) => {
  if (prop === "nameOrEmail") {
    if (!val.length) {
      return !bool ? "Your Username or Email address" : false;
    }
    if (typeof val === "string" && !val.trim()) {
      return !bool ? "This Field is required" : true;
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

const SignIn = () => {
  const [data, setData] = useState({
    nameOrEmail: "",
    password: "",
  });
  const [, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const [passvisible, setPassvisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const dispatch = useDispatch();

  const requestSignIn = () => {
    if (
      helper("nameOrEmail", data.nameOrEmail, true) ||
      helper("password", data.password, true)
    ) {
      notification.error({
        message: "Failed",
        description: "Invalid details",
        placement: "bottomRight",
      });
    } else {
      setIsSigningIn(true);
      const toastId = toast.loading("Signing up", {
        autoClose: false,
      });
      server
        .post(`/auth/signin`, data)
        .then((res) => {
          setTimeout(() => {
            toast.dismiss(toastId);
          }, 5000);
          if (res.data.success) {
            dispatch(
              setUser({
                ...res.data.data.user,
                auth: true,
              })
            );
            toast.update(toastId, {
              render: "Successfully signed in",
              type: "success",
              icon: <CheckRounded color="success" />,
              autoClose: 3000,
            });
            setCookie("jwt", res.data.data.token, { path: "/" });
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } else {
            toast.update(toastId, {
              render: "Failed to sign in",
              type: "error",
              icon: <ErrorRounded color="error" />,
              autoClose: 3000,
            });
            res.data.errors.map((err: Error | string) => {
              toast.error(err);
            });
          }
          setIsSigningIn(false);
        })
        .catch((err) => {
          console.error(err);
          setIsSigningIn(false);
        });
    }
  };

  return (
    <Layout>
      <div className="w-screen min-h-screen pt-16 px-0 md:px-16">
        <div className="flex min-h-nonav justify-around items-center">
          <div className="max-w-md hidden lg:block">
            <img src={signin} alt="Sign In" />
          </div>
          <Box
            className="flex border-t-6 border-t-secondary bg-white flex-col md:border-t-side gap-4 justify-center items-center md:border-l-2  md:border-r-2 md:border-b-2 rounded-lg rounded-t-xl border-riflegreen px-10 md:px-14 py-14 w-full max-w-md md:w-1/2"
            component="form"
          >
            <div className="text-3xl text-secondary font-bold">Sign In</div>
            <hr className="border-t border-b border-riflegreen bg-rifleborder-riflegreen w-4/5" />
            <TextField
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  requestSignIn();
                }
              }}
              autoFocus
              spellCheck="false"
              className="w-full"
              required
              variant="outlined"
              size="small"
              label="Name or Email"
              type="text"
              value={data.nameOrEmail}
              error={!!helper("nameOrEmail", data.nameOrEmail, true)}
              helperText={helper("nameOrEmail", data.nameOrEmail)}
              onChange={(e) => {
                setData((prevData) => ({
                  ...prevData,
                  nameOrEmail: e.target.value.trimStart(),
                }));
              }}
            />
            <TextField
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  requestSignIn();
                }
              }}
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
              disabled={isSigningIn}
              className="px-2 py-1 uppercase font-bold bg-secondary text-white rounded-md ring-secondary ring-opacity-50 focus:ring-4 focus:outline-none hover:ring-4 focus:border-secondary hover:border-secondary duration-300"
              onClick={() => {
                requestSignIn();
              }}
            >
              Sign In
            </Button>
            <Text className="text-sm font-extralight">
              don't have an account?{" "}
              <Link className="text-sky-500 font-light" to="/signup">
                Sign Up
              </Link>
            </Text>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
