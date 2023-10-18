import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authActions } from "../store/auth/auth.slice";
import { clientsActions } from "../store/clients/clients.slice";

const actions = {
  ...authActions,
  ...clientsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
