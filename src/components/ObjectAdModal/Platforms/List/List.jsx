import styled from "styled-components";
import { Card } from "./Card";
import olxIcon from "../../../../assets/images/olx.png";
import realstateIcon from "../../../../assets/images/realstate-icon.png";
import flombuIcon from "../../../../assets/images/flombu.png";
import rieltorIcon from "../../../../assets/images/rieltor-logo.webp";
import domriaIcon from "../../../../assets/images/domria.png";

import {
  useGetStatusAccountQuery,
  useLazyChangeMlsObjectQuery,
  useLazyPublishObjectQuery,
} from "../../../../store/objects/objects.api";
import { Link, useNavigate } from "react-router-dom";
import {
  useFlombuConnectStatusQuery,
  useGetAccountRieltorListQuery,
  useGetRealestateStatusQuery,
  useLazyGetAccountRieltorStatusQuery,
} from "../../../../store/auth/auth.api";
import { Button } from "./Button";
import { XHOUSE_COMPANY_ID } from "../../../../constants";
import { useGetCompanyInfoQuery } from "../../../../store/billing/billing.api";
import { handleResponse, showAlert } from "../../../../utilits";
import { Confirm } from "../../../Confirm/Confirm";
import { useEffect, useState } from "react";
import cogoToast from "cogo-toast";
import { useAppSelect } from "../../../../hooks/redux";

export const List = ({
  data,
  onChange,
  onChangeActiveTab,
  activeTab,
  activeAds,
}) => {
  const navigate = useNavigate();
  const { data: accounts } = useGetStatusAccountQuery();
  const { data: realestateAccounts } = useGetRealestateStatusQuery();
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const { data: flombuAccounts } = useFlombuConnectStatusQuery();
  const { data: rieltorAccounts, refetch: refetchRieltorAccounts } =
    useGetAccountRieltorListQuery();
  const [getRieltorAccountStatus] = useLazyGetAccountRieltorStatusQuery();
  const { user } = useAppSelect((state) => state.auth);
  const [publishObject] = useLazyPublishObjectQuery();
  const [changeMls] = useLazyChangeMlsObjectQuery();
  const [openAuthConfirm, setOpenAuthConfirm] = useState(null);
  const iS_AD_ACCESS =
    XHOUSE_COMPANY_ID.includes(companyInfo?.data?.id_hash) ||
    XHOUSE_COMPANY_ID.includes(user?.id);
  const [rieltorAccountsData, setRieltorAccountsData] = useState([]);

  const handleTelegramPublish = (id) => {
    const { hide } = cogoToast.loading("Опублікування реклами в телеграмі", {
      position: "top-right",
    });
    publishObject({
      id_obj: id,
      resource: "telegram",
    }).then((resp) => {
      setTimeout(() => {
        hide();
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
            showAlert(
              "info",
              messages[resp?.data?.status] ?? "Оголошення успішно опубліковано"
            );
          },
          () => {
            const message = resp?.data?.messege;

            showAlert("error", message);
          },
          true
        );
      }, 1000);
    });
  };

  const handleChangeMls = () => {
    changeMls(data?.id).then((resp) =>
      handleResponse(resp, () => {
        onChange("mls", !data?.mls);
        showAlert("success", "Статус успішно змінено");
      })
    );
  };

  const handleGetRieltorAccountsData = () => {
    Promise.all(
      rieltorAccounts?.data?.map((rieltorId) =>
        getRieltorAccountStatus(rieltorId)
      )
    ).then((resp) => {
      setRieltorAccountsData(
        Array.isArray(resp)
          ? resp?.map((r) => r?.data?.data)?.filter((r) => r?.status === "OK")
          : []
      );
    });
  };

  useEffect(() => {
    rieltorAccounts?.data
      ? handleGetRieltorAccountsData()
      : setRieltorAccountsData([]);
  }, [rieltorAccounts]);

  return (
    <StyledList>
      {(accounts?.accounts?.length === 0 || !accounts?.accounts) &&
      realestateAccounts?.data?.length === 0 ? (
        <div className="empty">
          <span>Потрібно</span>
          <Link to="/ad-setting">авторизуватись</Link>
        </div>
      ) : null}
      {openAuthConfirm && (
        <Confirm
          title={`В ${
            openAuthConfirm === "4"
              ? "Realstate"
              : openAuthConfirm === "3"
              ? "Flombu"
              : openAuthConfirm === "1"
              ? "Olx"
              : ""
          } потрібна авторизація, перейти на сторінку авторизації?`}
          onClose={() => setOpenAuthConfirm(null)}
          onSubmit={() => {
            navigate(`/ad-setting?type=${openAuthConfirm}`);
          }}
        />
      )}
      {accounts?.accounts
        ?.filter((a) => a?.error !== "invalid_token")
        ?.filter((a) => new Date().getTime() < Number(a?.TokenExpires) * 1000)
        ?.length > 0
        ? accounts?.accounts?.map((account, i) => (
            <Card
              key={i}
              icon={olxIcon}
              title={
                account?.data?.name ??
                account?.data?.phone ??
                account?.data?.email ??
                account?.data?.id
              }
              onClick={() =>
                onChange(
                  "id_user_olx",
                  data?.id_user_olx?.includes(account?.data?.id)
                    ? data?.id_user_olx.filter((id) => id !== account?.data?.id)
                    : [...data?.id_user_olx, account?.data?.id]
                )
              }
              onChangeActiveTab={() => onChangeActiveTab(0)}
              active={data?.id_user_olx?.includes(account?.data?.id)}
              selected={activeTab === 0}
              activeAd={
                !!activeAds?.find(
                  (a) => Number(a.id_user_olx) === account?.data?.id
                )
              }
            />
          ))
        : null}
      {realestateAccounts?.data?.length > 0
        ? realestateAccounts?.data?.map(({ id_account, email }, i) => (
            <Card
              key={i}
              icon={realstateIcon}
              title={email ?? id_account}
              onClick={() =>
                onChange(
                  "id_realstate_users",
                  data?.id_realstate_users?.includes(id_account)
                    ? data?.id_realstate_users.filter((i) => i !== id_account)
                    : [...data?.id_realstate_users, id_account]
                )
              }
              onChangeActiveTab={() => onChangeActiveTab(1)}
              active={data?.id_realstate_users?.includes(id_account)}
              selected={activeTab === 1}
            />
          ))
        : null}
      {flombuAccounts?.error === 0 && iS_AD_ACCESS ? (
        <Card
          icon={flombuIcon}
          title={"Авторизовано"}
          onClick={() => onChange("flombu", !data?.flombu)}
          onChangeActiveTab={() => onChangeActiveTab(2)}
          active={data?.flombu}
          selected={activeTab === 2}
        />
      ) : null}

      {rieltorAccountsData?.length > 0
        ? rieltorAccountsData.map((r, i) => (
            <Card
              key={i}
              icon={rieltorIcon}
              title={r?.data?.email}
              onChangeActiveTab={() => onChangeActiveTab(3)}
              selected={activeTab === 3}
              onClick={() =>
                onChange(
                  "id_rieltor_users",
                  data?.id_rieltor_users?.includes(r?.data?.userId)
                    ? data?.id_rieltor_users.filter(
                        (i) => i !== r?.data?.userId
                      )
                    : [...data?.id_rieltor_users, r?.data?.userId]
                )
              }
              active={data?.id_rieltor_users?.includes(r?.data?.userId)}
            />
          ))
        : null}

      {companyInfo?.data?.id_hash === "0022b718e5a80c0e3992686fd10ff1dc" ||
      user?.id === "0022b718e5a80c0e3992686fd10ff1dc" ? (
        <Card
          icon={domriaIcon}
          title={"DIM RIA"}
          onClick={() => onChange("domria", !data?.domria)}
          onChangeActiveTab={() => onChangeActiveTab(4)}
          active={data?.domria}
          selected={activeTab === 4}
        />
      ) : null}

      {accounts?.accounts
        ?.filter((a) => a?.error !== "invalid_token")
        ?.filter((a) => new Date().getTime() < Number(a?.TokenExpires) * 1000)
        ?.length > 0 ? null : (
        <Card
          icon={olxIcon}
          title={"Потрібна авторизація"}
          onChangeActiveTab={() => setOpenAuthConfirm("1")}
          noAuth
        />
      )}
      {realestateAccounts?.data?.length > 0 ? null : (
        <Card
          icon={realstateIcon}
          title={"Потрібна авторизація"}
          onChangeActiveTab={() => setOpenAuthConfirm("4")}
          noAuth
        />
      )}
      {flombuAccounts?.error === 0
        ? null
        : iS_AD_ACCESS && (
            <Card
              icon={flombuIcon}
              title={"Потрібна авторизація"}
              onChangeActiveTab={() => setOpenAuthConfirm("3")}
              noAuth
            />
          )}
      {rieltorAccountsData?.length > 0 ? null : (
        <Card
          icon={rieltorIcon}
          title={"Потрібна авторизація"}
          onChangeActiveTab={() => setOpenAuthConfirm("4")}
          noAuth
        />
      )}
      <Button title="MLS" active={data?.mls} onClick={handleChangeMls} />
      {companyInfo?.data?.id_hash === "0022b718e5a80c0e3992686fd10ff1dc" &&
        data?.type_object !== "street_base" &&
        data?.type_object !== "mls" && (
          <Button
            title="Рекламувати в телеграм"
            onClick={() => handleTelegramPublish(data?.id)}
          />
        )}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
  .empty {
    color: var(--dark-90);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 4px;
    a {
      color: var(--main-color);
      font-weight: 500;
      margin-left: 10px;
      display: inline-block;
      text-decoration: underline;
    }
  }
`;
