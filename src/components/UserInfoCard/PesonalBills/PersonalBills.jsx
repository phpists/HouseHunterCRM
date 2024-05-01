import { styled } from "styled-components";
import { Card } from "./Card";
import { useLazyViewPayWorkerQuery } from "../../../store/billing/billing.api";
import React, { useEffect } from "react";
import { SectionTitle } from "../SectionTitle";

export const PersonalBills = ({ workerId }) => {
  const [viewPayWorker, data] = useLazyViewPayWorkerQuery();

  useEffect(() => {
    viewPayWorker(workerId);
  }, [workerId]);

  return (
    <>
      {data?.data?.data?.length > 0 ? (
        <>
          <SectionTitle title="Персональні Рахунки" />
          <StyledPersonalBills>
            {data?.data?.data?.map(({ time, package_price }, i) => (
              <React.Fragment key={i}>
                <Card type={true} time={time} price={package_price} />
                <div className="divider" />
              </React.Fragment>
            ))}
          </StyledPersonalBills>
        </>
      ) : null}
    </>
  );
};

const StyledPersonalBills = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: var(--bg-10);
  margin-bottom: 15px;
  .divider {
    width: 100%;
    height: 1px;
    margin: 6.5px 0;
    background: var(--bg-10);
  }
`;
