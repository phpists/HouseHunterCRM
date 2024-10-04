import styled from "styled-components";
import { Card } from "./Card";
import olxIcon from "../../../../assets/images/olx.png";
import realstateIcon from "../../../../assets/images/realstate-icon.png";
import flombuIcon from "../../../../assets/images/flombu.png";
import {
  useGetStatusAccountQuery,
  useLazyChangeMlsObjectQuery,
  useLazyPublishObjectQuery,
} from "../../../../store/objects/objects.api";
import { Link, useNavigate } from "react-router-dom";
import {
  useFlombuConnectStatusQuery,
  useGetRealestateStatusQuery,
} from "../../../../store/auth/auth.api";
import { Button } from "./Button";
import { XHOUSE_COMPANY_ID } from "../../../../constants";
import { useGetCompanyInfoQuery } from "../../../../store/billing/billing.api";
import { handleResponse, showAlert } from "../../../../utilits";
import { Confirm } from "../../../Confirm/Confirm";
import { useState } from "react";
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
  const { user } = useAppSelect((state) => state.auth);
  const [publishObject] = useLazyPublishObjectQuery();
  const [changeMls] = useLazyChangeMlsObjectQuery();
  const [openAuthConfirm, setOpenAuthConfirm] = useState(null);
  const iS_AD_ACCESS =
    XHOUSE_COMPANY_ID.includes(companyInfo?.data?.id_hash) ||
    XHOUSE_COMPANY_ID.includes(user?.id);

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
      {accounts?.accounts?.filter((a) => a?.error !== "invalid_token")?.length >
      0
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

      {accounts?.accounts?.filter((a) => a?.error !== "invalid_token")?.length >
      0 ? null : (
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
