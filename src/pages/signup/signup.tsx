import {
  CheckOutlined,
  CheckRounded,
  ErrorRounded,
  NavigateNextRounded,
  RefreshOutlined,
  SipOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import validator from "validator";
import auth from "./auth.svg";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Text from "antd/lib/typography/Text";
import { Link, useNavigate } from "react-router-dom";
import { UserInterface } from "../../redux/reducers";
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { SERVER_URL } from "../../constanats";
import Loader from "../../components/loader/loader";
import { toast } from "react-toastify";
import { ToastProps } from "react-toastify/dist/types";
import ResponseDataInterface from "../../utils/httpService";
import { notification, Spin } from "antd";
import { setUser } from "../../redux/action";
import server from "../../configs/axiosinstance";

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
  } else if (prop === "grade") {
    if (!val.length) {
      return !bool ? "Your Grade" : false;
    }
    if (!val || !val.trim()) {
      return !bool ? `Grade is required` : true;
    } else {
      return !bool ? "" : false;
    }
  } else if (prop === "subject") {
    if (!val.length) {
      return !bool ? "Your Subjects" : false;
    }
    if (!(val.length >= 3)) {
      return !bool ? `Minimum 3 subjects are required` : true;
    } else {
      return !bool ? "" : false;
    }
  }
};

interface SignUpDataInterface {
  name: string;
  email: string;
  password: string;
  grade: string;
  subjects: any[];
  avatar: string;
}

const SignUp = () => {
  const [data, setData] = useState<SignUpDataInterface>({
    name: "",
    email: "",
    password: "",
    grade: "",
    subjects: [],
    avatar: "",
  });
  const [, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const [passvisible, setPassvisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((s: UserInterface) => s);
  const [step, setStep] = useState(1);
  const [availableSubjects, setAvailableSubjects] = useState([
    "Hindi",
    "Maths",
    "Science",
    "SST",
    "Computer Science",
    "Biology",
  ]);
  const [availableAvatars, setAvailableAvatars]: any = useState([]);
  const [avatarSelectorOpen, setAvatarSelectorOpen] = useState(false);

  useEffect(() => {
    if (user.auth) {
      navigate("/dashboard");
    }
    return () => {};
  }, [history, user.auth]);
  const getAvatars = () => {
    server.get(SERVER_URL + `/utils/avatars`).then((res) => {
      setAvailableAvatars(res.data.data.avatars);
    });
  };

  const signUpProcess = () => {
    const toastId = toast.loading("Signing up", {
      autoClose: false,
    });
    server.post(SERVER_URL + `/auth/signup`, data).then((res) => {
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 5000);
      if (res.data.success) {
        toast.update(toastId, {
          render: "Successfully signed up",
          type: "success",
          icon: <CheckRounded color="success" />,
          autoClose: 3000,
        });
        dispatch(setUser({ ...res.data.student, auth: true }));
        console.log(res.data.data.token);

        setCookie("jwt", res.data.data.token, { path: "/" });
        navigate("/dashboard");
      } else {
        toast.done(toastId);
        toast.update(toastId, {
          render: "Error signing up",
          type: "error",
          icon: <ErrorRounded color="error" />,
          autoClose: 3000,
        });
        res.data.errors.map((err: Error | string) => {
          toast.error(err);
        });
      }
    });
  };

  useEffect(() => {
    getAvatars();
    return () => {};
  }, []);

  return (
    <Layout>
      <div className="w-screen min-h-screen pt-16 px-0 md:px-16">
        <div className="flex min-h-nonav justify-around items-center">
          <div className="max-w-md hidden lg:block">
            <img src={auth} alt="Sign up" />
          </div>
          <Box
            className="flex border-t-6 rounded-t-xl border-t-secondary bg-white flex-col md:border-t-side gap-4 justify-center items-center md:border-l-2  md:border-r-2 md:border-b-2 rounded-lg border-riflegreen px-10 md:px-14 py-14 w-full max-w-md md:w-1/2 duration-300"
            component="form"
          >
            <div className="text-3xl text-secondary font-bold">Sign Up</div>
            <hr className="border-t border-b border-riflegreen bg-riflegreen w-4/5" />
            <Box
              className={`${
                step === 1 ? "" : "hidden"
              } space-y-4 flex flex-col justify-center items-center`}
            >
              <TextField
                autoFocus
                spellCheck="false"
                className="max-w-xs w-full"
                required
                variant="outlined"
                size="small"
                label="Name"
                type="text"
                value={data.name}
                error={!!helper("name", data.name, true)}
                helperText={helper("name", data.name)}
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }));
                }}
              />
              <TextField
                spellCheck="false"
                className="max-w-xs w-full"
                required
                variant="outlined"
                size="small"
                label="Email"
                type="email"
                value={data.email}
                error={!!helper("email", data.email, true)}
                helperText={helper("email", data.email)}
                onChange={(e) => {
                  setData((prevData: SignUpDataInterface) => ({
                    ...prevData,
                    email: e.target.value,
                  }));
                }}
              />
              <TextField
                spellCheck="false"
                className="max-w-xs w-full"
                required
                variant="outlined"
                size="small"
                label="Password"
                type={passvisible ? "text" : "password"}
                value={data.password}
                error={!!helper("password", data.password, true)}
                helperText={helper("password", data.password)}
                onChange={(e) => {
                  setData((prevData: SignUpDataInterface) => ({
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
            </Box>
            <Box
              className={`${
                step === 2 ? "" : "hidden"
              } space-y-4 flex flex-col justify-center items-center`}
            >
              <Box
                onClick={() => {
                  setAvatarSelectorOpen((aso) => !aso);
                }}
                className="w-24 h-24 rounded-full"
              >
                <Avatar
                  src={data.avatar}
                  sx={{
                    width: "6rem",
                    height: "6rem",
                  }}
                  className="w-24 h-24 rounded-full"
                  sizes=""
                />
              </Box>
              <TextField
                spellCheck="false"
                autoFocus
                className="max-w-xs w-full"
                required
                variant="outlined"
                size="small"
                label="Grade"
                type="text"
                value={data.grade}
                error={!!helper("grade", data.grade, true)}
                helperText={helper("grade", data.grade)}
                onChange={(e) => {
                  setData((prevData: SignUpDataInterface) => ({
                    ...prevData,
                    grade: e.target.value,
                  }));
                }}
              />
              <FormControl className="w-full">
                <InputLabel id="subjects-label">Subjects</InputLabel>
                <Select
                  className="max-w-xs w-full"
                  labelId="subjects-label"
                  label="Subjects"
                  multiple
                  value={data.subjects}
                  onChange={(e) => {
                    setData((prevData: SignUpDataInterface) => ({
                      ...prevData,
                      subjects: [...e.target.value],
                    }));
                  }}
                  input={<OutlinedInput label="Subjects" />}
                >
                  {availableSubjects.map((subject, i) => {
                    return (
                      <MenuItem
                        key={subject}
                        value={subject}
                        className="bg-black"
                      >
                        {subject}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Dialog
                onClose={() => setAvatarSelectorOpen(false)}
                open={avatarSelectorOpen}
              >
                <DialogTitle>Select an Avatar</DialogTitle>
                <List
                  sx={{
                    p: 0,
                  }}
                  className="flex flex-wrap p-4 justify-center items-center"
                >
                  {availableAvatars.length === 9 ? (
                    [
                      [
                        availableAvatars[0],
                        availableAvatars[1],
                        availableAvatars[2],
                      ],
                      [
                        availableAvatars[3],
                        availableAvatars[4],
                        availableAvatars[5],
                      ],
                      ,
                      [
                        availableAvatars[6],
                        availableAvatars[7],
                        availableAvatars[8],
                      ],
                    ].map((avatars3, i) => {
                      return (
                        <div key={i}>
                          {avatars3 &&
                            avatars3.map((avatar, j) => (
                              <ListItem
                                sx={{
                                  width: "8rem",
                                  height: "8rem",
                                }}
                                button
                                onClick={() => {
                                  setAvatarSelectorOpen(false);
                                  setData((prevData: SignUpDataInterface) => ({
                                    ...prevData,
                                    avatar,
                                  }));
                                }}
                                key={j}
                              >
                                <Avatar
                                  sx={{
                                    width: "6rem",
                                    height: "6rem",
                                  }}
                                  src={avatar}
                                ></Avatar>
                              </ListItem>
                            ))}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4">
                      <Loader />
                    </div>
                  )}
                </List>
                <Box className="p-4 w-full flex justify-around items-center">
                  <button
                    onClick={() => {
                      getAvatars();
                    }}
                    className={`px-4 py-1 uppercase font-bold bg-secondary text-white rounded-md ring-secondary ring-opacity-50 focus:ring-4 focus:outline-none hover:ring-4 focus:border-secondary hover:border-secondary duration-300`}
                  >
                    <RefreshOutlined />
                  </button>
                  <button
                    onClick={() => {
                      setAvatarSelectorOpen(false);
                    }}
                    className={`px-4 py-1 uppercase font-bold bg-secondary text-white rounded-md ring-secondary ring-opacity-50 focus:ring-4 focus:outline-none hover:ring-4 focus:border-secondary hover:border-secondary duration-300`}
                  >
                    OK
                  </button>
                </Box>
              </Dialog>
            </Box>
            <div
              className={`w-full flex ${
                step === 1 ? "justify-end" : "justify-between"
              }`}
            >
              <button
                type="button"
                className={`${
                  step > 1 ? "block" : "hidden"
                } px-2 py-1 cursor-pointer uppercase font-bold bg-secondary text-white rounded-md ring-secondary ring-opacity-50 focus:ring-4 focus:outline-none hover:ring-4 focus:border-secondary hover:border-secondary duration-300`}
                onClick={() => {
                  setStep(1);
                }}
              >
                Previous
              </button>
              <button
                type="button"
                className="px-2 py-1 flex cursor-pointer justify-center items-center uppercase font-bold bg-secondary text-white rounded-md ring-secondary ring-opacity-50 focus:ring-4 focus:outline-none hover:ring-4 focus:border-secondary hover:border-secondary duration-300"
                onClick={() => {
                  if (step === 1) {
                    setStep(2);
                  } else {
                    // Signup process
                    signUpProcess();
                  }
                }}
              >
                {step === 1 ? "Next" : "Submit"}
                <NavigateNextRounded />
              </button>
            </div>
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
