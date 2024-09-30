import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetClientsRequestQuery } from "../../../store/clients/clients.api";
import {
  useGetLocationsQuery,
  useLazyDeleteRequestQuery,
  useLazyRestoreRequestsQuery,
} from "../../../store/requests/requests.api";
import {
  checkIsArray,
  checkIsJSON,
  handleFormatDate,
  handleGetLocationAllPath,
  handleResponse,
  showAlert,
} from "../../../utilits";
import { Card } from "./Card/Card";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useAppSelect } from "../../../hooks/redux";

export const RequestsList = ({
  onSelect,
  onOpenInfo,
  active,
  onChangeRequestsCount,
  selectedItems,
  onSelectItem,
  isRefresh,
  onRefreshed,
  isDelete,
  isEdit,
  onSelectAll,
}) => {
  const { id } = useParams();
  const [requests, setRequests] = useState([]);
  const [getClientsRequests] = useLazyGetClientsRequestQuery();
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [restoreRequests] = useLazyRestoreRequestsQuery();
  const requestsCurrentPage = useRef(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);
  const { user } = useAppSelect((state) => state.auth);
  const [confirmText, setConfimText] = useState("");

  const handleFormatLocations = () => {
    const locList = Object.entries(locationsList)?.map((loc) => loc[1]);
    const locations = Object.entries(locationsList)
      .sort((a, b) => Number(b[1].id_parent) - Number(a[1].id_parent))
      ?.map((loc) => loc[1])
      //   .filter((loc) => Number(loc?.id_parent) !== 0)
      .map(({ id, id_parent, name }) => {
        return handleGetLocationAllPath(locList, id, id_parent, name);
      });

    setFormatedLocations(locations);
  };

  useEffect(() => {
    if (locationsList) {
      handleFormatLocations();
    }
  }, [locationsList]);

  const handleGetLocation = (location) => {
    const locationValue = checkIsArray(checkIsJSON(location));

    return !formatedLocations
      ? []
      : formatedLocations
          ?.filter((v) => locationValue.find((l) => l === v.value))
          ?.map((l) => l.title)
          ?.join(",") ?? [];
  };

  const handleGetClientsRequests = (isReset) => {
    getClientsRequests({
      current_page: requestsCurrentPage.current,
      item_on_page: 100,
      id_client: id,
    }).then((resp) => {
      const data = resp?.data?.data;
      if (data) {
        const updatedData = isReset ? data : { ...requests, ...data };
        setRequests(updatedData);
        onSelectAll(
          Object.entries(updatedData)?.map((r) => ({
            id: r[0],
            type: "request",
          }))
        );
      }
    });
  };

  useEffect(() => {
    handleGetClientsRequests(true);
  }, []);

  useEffect(() => {
    if (isRefresh) {
      handleGetClientsRequests(true);
      onRefreshed(false);
    }
  }, [isRefresh]);

  const handleDeleteRequestSuccess = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).filter(
          (req) => id !== Object.entries(req[1])[1][1]?.id_group
        )
      )
    );
  };

  const handleToggleFavoriteStatus = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).map((req) => {
          const reqId = Object.entries(req[1])[1][1]?.id_group;
          if (reqId === id) {
            let request = [];
            request[0] = req[0];
            request[1] = {
              ...req[1],
              General_field_group: {
                ...req[1].General_field_group,
                favorite: !req[1].General_field_group.favorite,
              },
            };
            return request;
          }
          return req;
        })
      )
    );
  };
  const handleCancelDeleteRequest = () => {
    setDeleteModal(false);
  };

  const handleOnDeleteRequest = (id, isFinally) => {
    setDeleteModal(isFinally ? "finally" : true);
    setSelectedCard(id);
  };

  const handleGetRequestById = (id) =>
    !id
      ? null
      : Object.fromEntries(
          Object.entries(requests).filter(
            (req) => Object.entries(req[1])[1][1]?.id_group === id
          )
        )?.[id] ?? undefined;

  const handleToggleDeleteStatus = (id, val) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).map((req) => {
          const reqId = Object.entries(req[1])[1][1]?.id_group;
          if (reqId === id) {
            let request = [];
            request[0] = req[0];
            request[1] = {
              ...req[1],
              General_field_group: {
                ...req[1].General_field_group,
                deleted: val,
              },
            };
            return request;
          }
          return req;
        })
      )
    );
  };

  const handleDeleteRequest = () => {
    deleteRequest({
      id_groups: [selectedCard],
      final_remove:
        handleGetRequestById(selectedCard)?.General_field_group?.deleted ===
          "1" || deleteModal === "finally"
          ? "1"
          : undefined,
      reasone_remove: confirmText,
    }).then((resp) =>
      handleResponse(resp, () => {
        showAlert("success", "Запит успішно видалено!");
        handleGetRequestById(selectedCard)?.General_field_group?.deleted === "1"
          ? handleDeleteRequestSuccess(selectedCard)
          : handleToggleDeleteStatus(selectedCard, "1");
        setSelectedCard(null);
      })
    );
  };

  useEffect(() => {
    onChangeRequestsCount(Object.entries(requests)?.length ?? 0);
  }, [requests]);

  const handleRestoreRequest = (id, idGroup) => {
    restoreRequests([idGroup]).then((resp) =>
      handleResponse(resp, () => {
        showAlert("success", "Запит успішно видалено!");
        handleToggleDeleteStatus(id, "0");
      })
    );
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={
            handleGetRequestById(selectedCard)?.General_field_group?.deleted ===
              "1" || deleteModal === "finally"
              ? "Видалити запит остаточно?"
              : "Видалити запит?"
          }
          onClose={handleCancelDeleteRequest}
          onSubmit={handleDeleteRequest}
          passwordCheck={
            handleGetRequestById(selectedCard)?.General_field_group?.deleted ===
              "1" || deleteModal === "finally"
          }
          confirmText={deleteModal === "finally" ? null : confirmText}
          onChangeConfirmText={(val) => setConfimText(val)}
        />
      )}
      <div>
        {requests && Object.entries(requests)?.length
          ? Object.entries(requests).map((c, i) => {
              const id = c[0];
              const infoField = Object.entries(c[1]).filter(
                (f) => f[0] !== "General_field_group"
              )[0][1];

              return (
                <Card
                  key={`request-${i}`}
                  selected={
                    // active === id ||
                    !!selectedItems?.find((s) => s.id === id)
                  }
                  currency={infoField?.price_currency}
                  onSelect={() =>
                    onSelect({
                      id: id,
                      type: "request",
                    })
                  }
                  onSelectItem={() =>
                    onSelectItem({
                      id: id,
                      type: "request",
                      isDeleted: c[1]?.General_field_group?.deleted === "1",
                    })
                  }
                  onOpenInfo={() => onOpenInfo(true)}
                  date={handleFormatDate(
                    Number(c[1]?.General_field_group?.dt_add) * 1000,
                    true
                  )}
                  dateTo={
                    c[1]?.General_field_group?.dt_deadline
                      ? handleFormatDate(
                          Number(c[1]?.General_field_group?.dt_deadline) * 1000,
                          true
                        )
                      : undefined
                  }
                  title={infoField?.rubric}
                  location={handleGetLocation(infoField?.location)}
                  price={infoField?.price_max}
                  id={id}
                  favorite={c[1]?.General_field_group?.favorite}
                  onChangeFavorite={() => handleToggleFavoriteStatus(id)}
                  onDelete={() => handleOnDeleteRequest(id)}
                  isDelete={isDelete}
                  isEdit={isEdit}
                  isDeleted={c[1]?.General_field_group?.deleted === "1"}
                  onRestore={() =>
                    handleRestoreRequest(id, infoField?.id_group)
                  }
                  onDeleteFinally={
                    user?.struct_level === 1
                      ? () => handleOnDeleteRequest(id, true)
                      : null
                  }
                />
              );
            })
          : null}
      </div>
    </>
  );
};
