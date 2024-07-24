import styled from "styled-components";
import { useGetRubricsQuery } from "../../../../../../store/requests/requests.api";

export const Description = ({ rubricId }) => {
  const { data: rubricsList } = useGetRubricsQuery();

  return (
    <StyledDescription>
      {rubricsList?.find((r) => r.id === rubricId)?.name}
    </StyledDescription>
  );
};
const StyledDescription = styled.div`
  font-size: 11px;
  font-weight: var(--font-weight-100);
  line-height: 14.98px;
  letter-spacing: 0.02em;
  text-align: left;
  opacity: var(--opacity-light);
`;
