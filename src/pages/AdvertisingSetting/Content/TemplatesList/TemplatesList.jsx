import styled from "styled-components";
import { Card } from "./Card";
import { Divider } from "../Divider";
import { Empty } from "../../../../components/Empty";
import React from "react";

export const TemplatesList = ({
  templates,
  selectedTemplate,
  onSelect,
  olxAuth,
}) => (
  <StyledTemplatesList>
    {templates?.length > 0 ? (
      <div className="list-wrapper content-card">
        {templates?.map((t, i) => (
          <React.Fragment key={i}>
            <Card
              key={i}
              onSelect={() => onSelect(t)}
              selected={selectedTemplate?.id === t?.id}
              last={i === templates?.length - 1}
              olxAuth={olxAuth}
            />
          </React.Fragment>
        ))}
      </div>
    ) : (
      <Empty />
    )}
  </StyledTemplatesList>
);

const StyledTemplatesList = styled.div`
  .list-wrapper {
    padding: 12px 8px 6px;
    background: var(--tag-bg-2);
    border-radius: 14px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    @media (max-width: 800px) {
      padding: 8px;
    }
  }
`;
