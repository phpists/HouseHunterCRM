import { Comment } from "./Comment";
import { Content } from "./Content";
import { Search } from "./Search/Search";

export const Main = ({
  data,
  onChangeField,
  categories,
  onChangeCategories,
  fields,
}) => {
  return (
    <div className="request-card hide-scroll">
      <Comment
        value={data?.comment}
        onChange={(val) => onChangeField("comment", val)}
      />
      <Content
        data={data}
        onChangeField={onChangeField}
        categories={categories}
        onChangeCategories={onChangeCategories}
        fields={fields}
      />
      {/* <Search /> */}
    </div>
  );
};
