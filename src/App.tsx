import { useEffect } from "react";
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
  useEffect(() => {
    toast.configure();
    console.log("Configuring toast");

    return () => {};
  }, []);

  const user: UserInterface = useSelector((s: StoreInterface) => s.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const newSoc: Socket = io(SERVER_URL, { transports: ["websocket"] });
    dispatch(setSocket(newSoc));
    return () => {
      newSoc.close();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user.auth ? <SendTo page="/dashboard" /> : <Home />}
        ></Route>
        <Route
          path="/signin"
          element={user.auth ? <SendTo page="/dashboard" /> : <SignIn />}
        ></Route>
        <Route
          path="/signup"
          element={user.auth ? <SendTo page="/dashboard" /> : <SignUp />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
