import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-b-4 border-blue-800 w-10 h-10"></div>
    </div>
  );
};

export default Loader;
