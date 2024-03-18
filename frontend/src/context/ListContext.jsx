import PropTypes from "prop-types"; // Import PropTypes
import React, { useContext, useEffect, useState } from "react";
import { getAllShortUrls } from "../services/api.service";

const ListContext = React.createContext(null);

export const ListContextProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [existingUrl, setExistingUrl] = useState(""); // The state you want to pass down
  const [loading, setLoading] = useState(true); // The state you want to pass down
  const fetchAllUrl = async (init = false) => {
    try {
      if (init) {
        setLoading(true);
      }
      const response = await getAllShortUrls();
      console.log(response);
      setList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllUrl(true);
  }, []);

  const addUrl = () => {
    fetchAllUrl();
  };
  const deleteUrl = (data) => {
    console.log("delete", data);
    fetchAllUrl();
  };

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        addUrl,
        deleteUrl,
        setExistingUrl,
        existingUrl,
        loading,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
ListContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useListContext = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error("useListContext must be used within ListContextProvier");
  }
  return context;
};
