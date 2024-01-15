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
      <div style={styles.inputWrap} className="justify-between flex">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
          placeholder="Search products..."
          className="border-0 w-full rounded-full"
        />
        <button onClick={handleSearch} style={styles.button_search} className="bg-green">
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
     // Adjust the width as needed
    margin: "auto",
  },
  inputWrap: {
    flex: 1,
    padding: "6px",
    fontSize: "16px",
    borderRadius: "50px",
    border: "1px solid #ccc",
  },
  button_search: {
    
    color: "#fff",
    padding: "10px",
    borderRadius: "50px",
fontSize:"27px",
    cursor: "pointer",
  },
};

export default SearchComponent;
