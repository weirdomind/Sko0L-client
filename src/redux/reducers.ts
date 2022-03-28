import { Socket } from "socket.io-client";
import ActionTypes from "./actionsconstants";

let user = {
  _id: "",
  name: "",
  email: "",
  about: "",
  displayPicture: "",
  auth: false,
};

export interface StoreInterface {
  user: UserInterface;
  socket: Socket | null;
}

const DefaultRootState: StoreInterface = {
  user,
  socket: null,
};

export interface UserInterface {
  _id?: string;
  name?: string;
  email?: string;
  about?: string;
  displayPicture?: string;
  auth?: boolean;
}

// reducer function
function reducerFunction(state = DefaultRootState, action: any) {
  switch (action.type) {
    case ActionTypes.USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
}

export default reducerFunction;
