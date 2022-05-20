import rootred from "./redux/reducers/main";
import { createStore} from "redux";

const store=createStore(rootred);
export default store;