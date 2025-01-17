import { Oval } from "react-loader-spinner";

import React from "react";

const ButtonLoader = () => {
  return (
    <Oval
      visible={true}
      height="20"
      width="20"
      color="white"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
      secondaryColor="gray"
    />
  );
};

export default ButtonLoader;
