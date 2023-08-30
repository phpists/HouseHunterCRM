import { styled } from "styled-components";

export const Description = () => {
  return (
    <StyledDescription>
      Lorem ipsum dolor sit amet consectetur. Ultrices quam porttitor aenean
      faucibus nullam egestas quam mattis proin. Elit magna in nunc ut velit
      turpis integer lorem. Faucibus eu a eget aenean interdum orci et. Tellus
      at rhoncus molestie tincidunt volutpat.
    </StyledDescription>
  );
};

const StyledDescription = styled.div`
  color: #fff;
  font-family: "Open Sans";
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
