import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authActions } from "../store/auth/auth.slice";
import { clientsActions } from "../store/clients/clients.slice";
import { requestsActions } from "../store/requests/requests.slice";
import { objectsActions } from "../store/objects/objects.slice";
import { structureActions } from "../store/structure/structure.slice";
import { callsActions } from "../store/calls/calls.slice";
import { selectionsActions } from "../store/selections/selections.slice";
import { billingActions } from "../store/billing/billing.slice";

const actions = {
  ...authActions,
  ...clientsActions,
  ...requestsActions,
  ...objectsActions,
  ...structureActions,
  ...callsActions,
  ...selectionsActions,
  ...billingActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
