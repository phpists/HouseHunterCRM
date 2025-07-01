import styled from "styled-components";
import { Card } from "./Card";
import { useAppSelect } from "../../hooks/redux";
import { useEffect, useRef, useState } from "react";

export const Notifications = () => {
  const { notifications } = useAppSelect((state) => state.auth);
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(20); // Initial chunk
  const CHUNK_SIZE = 20;

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      // Near bottom, load more
      setVisibleCount((prev) =>
        Math.min(prev + CHUNK_SIZE, notifications.length)
      );
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [notifications.length]);

  const visibleNotifications = [...notifications]
    .sort((a, b) => b?.date - a?.date)
    .slice(0, visibleCount);

  return (
    <StyledNotifications ref={containerRef}>
      {visibleNotifications.map((data) => (
        <Card key={data?.id_hash} data={data} />
      ))}
      {visibleCount < notifications.length && (
        <LoadingMessage>Loading more...</LoadingMessage>
      )}
    </StyledNotifications>
  );
};

const StyledNotifications = styled.div`
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  height: calc(100vh - 125px);
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 10px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 10px;
  color: #ccc;
`;
