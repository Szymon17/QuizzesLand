import "./Search-box.styles.css";
import { FC, HTMLAttributes } from "react";

type searchBoxProps = {
  onChangeHandler: () => void;
};

const SearchBox: FC<searchBoxProps> = ({ onChangeHandler }) => {
  return (
    <div className="search-box">
      <input type="search" onChange={onChangeHandler} placeholder="Szukaj Quizu" />
    </div>
  );
};

export default SearchBox;
