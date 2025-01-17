import React from "react";
import { Oval } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center mt-6">
      <Oval
        visible={true}
        height="40"
        width="40"
        color="black"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        secondaryColor="gray"
      />
    </div>
  );
};

export default Loader;
