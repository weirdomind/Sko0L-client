import { Socket } from "socket.io-client";
import ActionTypes from "./actionsconstants";
import { ObjectId } from "mongoose";

export const defaultUser: UserInterface = {
  name: "",
  email: "",
  about: "",
  avatar: "",
  auth: false,
  grade: "",
  subjects: [],
  phone: "",
};

export interface StoreInterface {
  user: UserInterface;
  socket: Socket | null;
}

const DefaultRootState: StoreInterface = {
  user: defaultUser,
  socket: null,
};

export interface UserInterface {
  _id?: ObjectId;
  name: string;
  email: string;
  about?: string;
  avatar: string;
  phone?: string;
  grade: string;
  subjects: string[];
  createdAt?: Date;
  auth: boolean;
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
