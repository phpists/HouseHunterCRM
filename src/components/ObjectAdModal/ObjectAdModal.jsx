import styled from "styled-components";
import { CloseButton } from "./CloseButton";
import { Title } from "./Title";
import { Header } from "./Header/Header";
import { Platforms } from "./Platforms/Platforms";
import { Info } from "./Info/Info";
import { useEffect, useState } from "react";
import {
  useGetCommentsToFieldsQuery,
  useLazyPublishObjectQuery,
} from "../../store/objects/objects.api";
import { handleResponse, showAlert } from "../../utilits";
import {
  useLazyFlombuPublishQuery,
  useLazyPublishDomriaQuery,
  useLazyPublishRealestateQuery,
  useLazyPublishRieltorQuery,
} from "../../store/auth/auth.api";
import { useAppSelect } from "../../hooks/redux";

export const ObjectAdModal = ({ onClose, object }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    id_user_olx: [],
    id_realstate_users: [],
    id_rieltor_users: [],
    obl: "1",
    region: "",
    city: "",
    letter: "",
    house: "",
    street: "",
    street2: "",
    home: "",
    flombu: false,
    author_name: "",
    author_phone: "",
    regionId: "",
    cityId: "",
    districtId: "",
    streetId: "",
    houseNameUnfound: "",
  });
  const [loading, setLoading] = useState(false);
  const [publishObject] = useLazyPublishObjectQuery();
  const [publishRealestate] = useLazyPublishRealestateQuery();
  const [publishFlombu] = useLazyFlombuPublishQuery();
  const [publishRieltor] = useLazyPublishRieltorQuery();
  const [publishDomria] = useLazyPublishDomriaQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [citiesCount, setCitiesCount] = useState(0);
  const [streetsCount, setStreetsCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAppSelect((state) => state.auth);
  const handleChangeField = (field, value, changeAll) =>
    setData(changeAll ? value : { ...data, [field]: value });

  const handleChangeCitiesCount = (val) => setCitiesCount(val);
  const handleChangeStreetsCount = (val) => setStreetsCount(val);
  const handleChangeActiveTab = (val) => setActiveTab(val);

  useEffect(() => {
    setData({
      title: object?.title ?? "",
      description: object?.description?.replaceAll("<br />", "\n") ?? "",
      id_user_olx: [],
      id_realstate_users: [],
      id_rieltor_users: [],
      obl: "1",
      region: "",
      city: "",
      letter: "",
      house: "",
      street: "",
      street2: "",
      home: "",
      flombu: false,
      author_name: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`,
      author_phone: user?.phones?.[0]?.phone ?? "",
      regionId: "",
      cityId: "",
      districtId: "",
      streetId: "",
      houseNameUnfound: "",
      ...object,
    });
  }, [object]);

  const handleSubmit = () => {
    setLoading(true);
    data?.id_user_olx?.forEach((id_user_olx) => {
      publishObject({
        id_obj: object?.id,
        id_user_olx,
        resource: "olx",
        author_name: data?.author_name,
        author_phone: data?.author_phone,
        title: data?.title,
        description: data?.description,
      }).then((resp) => {
        setLoading(false);
        handleResponse(
          resp,
          () => {
            onClose();
            showAlert("info", "Оголошення успішно опубліковано");
          },
          () => {
            const message = resp?.data?.messege;
            const fields = resp?.data?.fields_validation
              ? resp?.data?.fields_validation?.map(
                  (f) => commentsToFields?.object[f]
                )
              : [];
            const fieldsMore = resp?.data?.err_data
              ? Object.entries(resp?.data?.fields_validation)?.map(
                  (f) => `${commentsToFields?.object[f[0]]}: ${f[1]}`
                )
              : [];
            showAlert(
              "error",
              `${message} ${fields?.length > 0 ? [...fields]?.join(",") : ""}`
            );
            if (fieldsMore?.length > 0) {
              showAlert("error", fieldsMore?.join(","));
            }
          },
          true
        );
      });
    });
    data?.id_realstate_users?.forEach((id_account) => {
      publishRealestate({
        id_obj: object?.id,
        id_account,
        ...data,
      }).then((resp) => {
        setLoading(false);
        handleResponse(
          resp,
          () => {
            onClose();
            showAlert("info", "Оголошення успішно опубліковано");
          },
          () => {
            const fields = resp?.data?.fields_validation
              ? Object.entries(resp?.data?.fields_validation)?.map(
                  (f) => commentsToFields?.object[f[0]]
                )
              : [];
            showAlert("error", `${resp?.data?.messege} ${fields?.join(",")}`);
          },
          true
        );
      });
    });

    if (data?.flombu) {
      publishFlombu(object?.id).then((resp) => {
        setLoading(false);
        handleResponse(
          resp,
          () => {
            onClose();
            showAlert("info", "Оголошення успішно опубліковано");
          },
          () => {
            const fields = resp?.data?.fields_validation
              ? resp?.data?.fields_validation?.map(
                  (f) => commentsToFields?.object[f]
                )
              : [];
            showAlert(
              "error",
              `${resp?.data?.messege ?? "Помилка"} ${fields?.join(", \n\n")}`
            );
          },
          true
        );
      });
    }

    data?.id_rieltor_users?.forEach((id_account) => {
      const {
        cityId,
        districtId,
        regionId,
        streetId,
        houseNameUnfound,
        description,
        title,
      } = data;
      publishRieltor({
        id_account,
        id_object: object?.id,
        cityId,
        districtId,
        regionId,
        streetId,
        houseNameUnfound,
        description,
        title,
      }).then((resp) => {
        setLoading(false);
        handleResponse(
          resp,
          () => {
            onClose();
            showAlert("info", "Оголошення успішно опубліковано");
          },
          () => {
            const message = resp?.data?.messege;
            const fields = resp?.data?.fields_validation
              ? Object.entries(resp?.data?.fields_validation)?.map(
                  (f) => commentsToFields?.object[f[0]]
                )
              : [];
            showAlert("error", `${message} ${fields?.join(", \n")}`);
          },
          true
        );
      });
    });

    if (data?.domria) {
      const { object_type, street_type, wall_type } = data;

      publishDomria({
        id_obj: object?.id,
        object_type,
        street_type,
        wall_type,
      }).then((resp) => {
        setLoading(false);
        handleResponse(
          resp,
          () => {
            onClose();
            showAlert("info", "Оголошення успішно опубліковано");
          },
          () => {
            const message = resp?.data?.messege;
            const fields = resp?.data?.fields_validation
              ? Object.entries(resp?.data?.fields_validation)?.map(
                  (f) => commentsToFields?.object[f[0]]
                )
              : [];
            showAlert("error", `${message} ${fields?.join(", \n")}`);
          },
          true
        );
      });
    }
  };

  return (
    <StyledObjectAdModal>
      <div className="modal-wrapper">
        <CloseButton onClick={onClose} />
        <div className="flex items-center justify-between mb-3 header-modal-ad">
          <Title />
          <Header
            onSubmit={handleSubmit}
            loading={loading}
            disabled={
              (data?.id_user_olx?.length === 0 &&
                data?.id_realstate_users?.length === 0 &&
                !data?.flombu &&
                !data?.domria &&
                data?.id_rieltor_users?.length === 0) ||
              (data?.id_realstate_users?.length === 0
                ? false
                : data?.id_realstate_users?.length > 0
                ? data?.region?.length === 0 ||
                  (data?.city?.length === 0 && citiesCount > 0) ||
                  (data?.street?.length === 0 && streetsCount > 0)
                : true) ||
              (data?.id_rieltor_users?.length === 0
                ? false
                : data?.id_rieltor_users?.length > 0
                ? data?.regionId?.toString()?.length === 0 ||
                  data?.cityId?.toString()?.length === 0 ||
                  data?.streetId?.toString()?.length === 0 ||
                  data?.houseNameUnfound?.toString()?.length === 0
                : true)
            }
            onEdit={
              !object?.acsses_change
                ? undefined
                : () =>
                    window.open(
                      `${window.location.origin}/edit-object/${object?.id_client}/${object?.id}`,
                      "_blank"
                    )
            }
          />
        </div>
        <div className="content">
          <Platforms
            data={data}
            onChange={handleChangeField}
            onChangeActiveTab={handleChangeActiveTab}
            activeTab={activeTab}
            activeAds={object?.arr_adverst_object ?? []}
          />
          <Info
            data={data}
            onChange={handleChangeField}
            onChangeCitiesCount={handleChangeCitiesCount}
            activeTab={activeTab}
            onChangeStreetsCount={handleChangeStreetsCount}
          />
        </div>
      </div>
    </StyledObjectAdModal>
  );
};

const StyledObjectAdModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: #2c2c2c66;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-wrapper {
    background: var(--modal-bg);
    padding: 40px;
    border-radius: 10px;
    width: 96svw;
    max-width: 1000px;
    position: relative;
    max-height: 80vh;
    overflow: auto;
  }
  .content {
    display: grid;
    grid-template-columns: 330px 1fr;
    gap: 40px;
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      .header-modal-ad {
        flex-direction: column;
        gap: 10px;
      }
    }
  }
  @media (max-width: 800px) {
    .header-modal-ad {
      flex-direction: column;
      gap: 10px;
    }
  }
`;
