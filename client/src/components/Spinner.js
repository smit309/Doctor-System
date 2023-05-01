import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border" role="status">
        <SyncLoader color="#ffffff" margin={0} size={12} />{" "}
      </div>
    </div>
  );
};

export default Spinner;
