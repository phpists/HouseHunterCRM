import styled from "styled-components";
import { CloseButton } from "./CloseButton";
import { Title } from "./Title";
import { Header } from "./Header/Header";
import { Platforms } from "./Platforms/Platforms";
import { Info } from "./Info/Info";
import { useEffect, useState } from "react";
import {
  useGetCommentsToFieldsQuery,
  useGetStatusAccountQuery,
  useLazyPublishObjectQuery,
} from "../../store/objects/objects.api";
import { handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";
import {
  useLazyFlombuPublishQuery,
  useLazyPublishRealestateQuery,
} from "../../store/auth/auth.api";
import { useAppSelect } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

export const ObjectAdModal = ({ onClose, object }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    id_user_olx: [],
    id_realstate_users: [],
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
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [publishObject] = useLazyPublishObjectQuery();
  const [publishRealestate] = useLazyPublishRealestateQuery();
  const [publishFlombu] = useLazyFlombuPublishQuery();
  const { data: adAAccounts } = useGetStatusAccountQuery();
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

  console.log(user);
  useEffect(() => {
    setData({
      title: object?.title ?? "",
      description: object?.description?.replaceAll("<br />", "\n") ?? "",
      id_user_olx: [],
      id_realstate_users: [],
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
            const messages = {
              new: "Нове оголошення, до активації та провірки",
              active: "Опубліковано на olx",
              limited:
                "Вичерпаний ліміт безкоштовних оголошень у вибраній категорії",
              removed_by_user: "Видалено користувачем",
              outdated: "Оголошення досягло дати придатності",
              unconfirmed: "Оголошення очікує на підтвердження ",
              unpaid: "Очікується оплата",
              moderated: "Відхилено модератором",
              blocked: "Заблоковано модератором",
              disabled:
                "Вимкнено модерацією, пропозиція заблокована та очікує перевірки",
              removed_by_moderator: "Видалено",
            };
            onClose();
            cogoToast.info(
              messages[resp?.data?.status] ?? "Оголошення успішно опубліковано",
              {
                hideAfter: 3,
                position: "top-right",
              }
            );
          },
          () => {
            const message = resp?.data?.messege;
            const fields = resp?.data?.fields_validation?.map(
              (f) => commentsToFields?.object[f]
            );
            cogoToast.error(
              <>
                {message} {fields?.join(",")}{" "}
              </>,
              {
                hideAfter: 3,
                position: "top-right",
              }
            );
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
        handleResponse(resp, () => {
          onClose();
          cogoToast.info("Оголошення успішно опубліковано", {
            hideAfter: 3,
            position: "top-right",
          });
        });
      });
    });

    if (data?.flombu) {
      publishFlombu(object?.id).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          onClose();
          cogoToast.info("Оголошення успішно опубліковано", {
            hideAfter: 3,
            position: "top-right",
          });
        });
      });
    }
  };

  console.log(object);
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
                !data?.flombu) ||
              (data?.id_realstate_users?.length === 0
                ? false
                : data?.id_realstate_users?.length > 0
                ? data?.region?.length === 0 ||
                  (data?.city?.length === 0 && citiesCount > 0) ||
                  (data?.street?.length === 0 && streetsCount > 0)
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
