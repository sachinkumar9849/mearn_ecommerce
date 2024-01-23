import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProductsAsync } from "../productSlice";
import { IoMdSearch } from "react-icons/io";

function SearchComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      navigate(`/search?keyword=${keyword}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.inputWrap}
        className="flex bg-white rounded-full w-4/5 "
      >
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
          placeholder="Search products..."
          className="border-0 rounded-full w-full"
        />
        <button onClick={handleSearch} style={styles.button_search}>
          <IoMdSearch />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
    justifyContent: "center",
  },
  inputWrap: {
    with: "80%",
  },

  button_search: {
    color: "#000",
    padding: "10px",
    borderRadius: "50px",
    fontSize: "27px",
    cursor: "pointer",
  },
};

export default SearchComponent;
