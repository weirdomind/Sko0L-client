import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import SendTo from "./components/sendtopage/sendtopage";
import { SERVER_URL } from "./constanats";
import Home from "./pages/home/home";
import NotFound from "./pages/notfound/notfound";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import { setSocket, setUser } from "./redux/action";
import { StoreInterface, UserInterface } from "./redux/reducers";

function App() {
  const [{ jwt }, setCookie] = useCookies(["jwt"]);

  const user: UserInterface = useSelector((s: StoreInterface) => s.user);
  const dispatch = useDispatch();
  useEffect(() => {
    toast.configure();
    if (jwt) {
      axios
        .post(`${SERVER_URL}/auth/verifytoken`, { token: jwt })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            const newSoc: Socket = io(SERVER_URL, {
              transports: ["websocket"],
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
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
