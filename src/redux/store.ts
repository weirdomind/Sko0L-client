import { createStore } from "redux";

import reducerFunction from "./reducers";

export default createStore(reducerFunction);