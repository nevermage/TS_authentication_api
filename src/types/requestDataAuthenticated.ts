import {RequestData} from "./requestData";
import {UserData} from "./userData";

export type RequestDataAuthenticated = RequestData & { userData: UserData }