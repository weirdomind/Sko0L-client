import { notification } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import OfflineComponent from "./components/offline";
import SendTo from "./components/sendtopage/sendtopage";
import server from "./configs/axiosinstance";
import { SERVER_URL } from "./constanats";
import Home from "./pages/home/home";
import NotFound from "./pages/notfound/notfound";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import { setSocket, setUser } from "./redux/action";
import { StoreInterface, UserInterface } from "./redux/reducers";

function App() {
  const [{ jwt }, setCookie] = useCookies(["jwt"]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const user: UserInterface = useSelector((s: StoreInterface) => s.user);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("isOnline:", isOnline);
  }, [isOnline]);

  useEffect(() => {
    toast.configure();

    // JWT verification
    if (jwt) {
      console.log("sending");
      server
        .post(`/auth/verifytoken`, { token: jwt })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            // Socket connection
            const newSoc: Socket = io(SERVER_URL, {
              transports: ["websocket"],
            });
            newSoc.on("connect", () => {
              console.log("connected to socket");
            });
            dispatch(setSocket(newSoc));
            dispatch(setUser({ ...res.data.data.student, auth: true }));
            // Closing socket on unmount
            return () => {
              newSoc.close();
            };
          } else {
            setCookie("jwt", "", { path: "/" });
          }
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    // check if user is online or not
    window.addEventListener("online", () => {
      setIsOnline(true);
    });
    window.addEventListener("offline", () => {
      setIsOnline(false);
    });

    return () => {
      window.removeEventListener("online", () => {
        setIsOnline(true);
      });
      window.removeEventListener("offline", () => {
        setIsOnline(false);
      });
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isOnline ? (
          <>
            <Route
              path="/"
              element={user.auth ? <SendTo page="/dashboard" /> : <Home />}
            />
            <Route
              path="/signin"
              element={user.auth ? <SendTo page="/dashboard" /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={user.auth ? <SendTo page="/dashboard" /> : <SignUp />}
            />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route
              path="*"
              element={<OfflineComponent setIsOnline={setIsOnline} />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
