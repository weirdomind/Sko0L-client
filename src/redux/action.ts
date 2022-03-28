import { Socket } from "socket.io-client";
import ActionTypes from "./actionsconstants";
import { UserInterface } from "./reducers";

export const setUser = (user: UserInterface) => ({
  type: ActionTypes.USER,
  payload: user,
});
export const setSocket = (socket: Socket) => ({
  type: ActionTypes.SOCKET,
  payload: socket,
});
