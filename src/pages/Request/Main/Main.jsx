import { Comment } from "./Comment";
import { Content } from "./Content";
import { Search } from "./Search/Search";

export const Main = () => {
  return (
    <div className="request-card hide-scroll">
      <Comment />
      <Content />
      <Search />
    </div>
  );
};
