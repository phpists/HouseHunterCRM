import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authActions } from "../store/auth/auth.slice";
import { clientsActions } from "../store/clients/clients.slice";
import { requestsActions } from "../store/requests/requests.slice";
import { objectsActions } from "../store/objects/objects.slice";
import { structureActions } from "../store/structure/structure.slice";

const actions = {
  ...authActions,
  ...clientsActions,
  ...requestsActions,
  ...objectsActions,
  ...structureActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};