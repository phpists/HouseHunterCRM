import styled from "styled-components";

// new: fresh advert before activation and moderation
// active: visible on OLX
// limited: advert exceeded limit of free adverts in selected category
// removed_by_user: manually removed by user
// outdated: advert reached expiration date
// unconfirmed: waiting for confirmation
// unpaid: waiting for payment
// moderated: negative moderation result
// blocked: blocked by moderation
// disabled: disabled by moderation, offer blocked and waiting for verification
// removed_by_moderator: removed by moderator

const STATUSES = {
  error: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Помилка",
  },
  err: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Помилка",
  },
  limited: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Перевищено ліміт",
  },
  removed_by_user: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Видалено користувачем",
  },
  blocked: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Заблоковано",
  },
  removed_by_moderator: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Видалено модератором",
  },
  moderation: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "На модерації",
  },
  new: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "На модерації",
  },
  unconfirmed: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "На модерації",
  },
  unpaid: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "Не оплачено",
  },
  disabled: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "Не оплачено",
  },
  active: {
    color: "var(--green-tag)",
    bg: "var(--green-tag-bg)",
    title: "Рекламується",
  },
};

export const Status = ({ status }) => (
  <StyledStatus
    status={STATUSES[status]}
    className="flex items-center justify-center"
  >
    {STATUSES[status]?.title}
  </StyledStatus>
);

const StyledStatus = styled.div`
  height: 18px;
  padding: 0 4px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 200;
  line-height: 14.98px;
  letter-spacing: 0.02em;
  text-align: left;
  color: ${({ status }) => status?.color};
  background: ${({ status }) => status?.bg};
  text-align: center;
`;
