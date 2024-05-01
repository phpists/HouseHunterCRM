import { styled } from "styled-components";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { Workers } from "./Workers/Workers";
import { Button } from "../../../../components/Button";
import { useGetPackadgesQuery } from "../../../../store/billing/billing.api";

export const RepeatCard = ({ onOpenTarif }) => {
  const { data } = useGetPackadgesQuery();

  return (
    <StyledRepeatCard className="flex items-end justify-between">
      <div>
        <Title />
        <Subtitle daysCount={data?.count_day} />
      </div>
      <div className="flex items-center repeatcard-footer ">
        {/* <Workers /> */}
        <Button
          title="Поповнити"
          outline="true"
          className="repeat-btn"
          onClick={onOpenTarif}
        />
      </div>
    </StyledRepeatCard>
  );
};

const StyledRepeatCard = styled.div`
  width: 100%;
  border-radius: 13px;
  background: var(--bg-10);
  backdrop-filter: blur(4.5px);
  padding: 11px 19px 13px 15px;
  cursor: no-drop;
  .repeat-btn {
    padding: 7px 17px 5px;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    height: 26px;
    border-radius: 6px;
    border: 1.2px solid #fff;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: start;
    padding: 10px 15px;
    .repeatcard-footer {
      margin-top: 10px;
    }
  }
`;
