import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authActions } from "../store/auth/auth.slice";
import { clientsActions } from "../store/clients/clients.slice";
import { requestsActions } from "../store/requests/requests.slice";

const actions = {
  ...authActions,
  ...clientsActions,
  ...requestsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
