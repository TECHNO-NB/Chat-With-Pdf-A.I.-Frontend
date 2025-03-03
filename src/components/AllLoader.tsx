import React from "react";
import { ThreeDots } from "react-loader-spinner";

const AllLoader = () => {
  return (
    <div className="ml-10">
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="blue"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
      </div>
  );
};

export default AllLoader;
