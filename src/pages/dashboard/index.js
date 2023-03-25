import React from "react";
import PrivateComponent from "../../components/HOC/PrivateComponent";
const index = () => {
  return (
    <PrivateComponent>
      <div>hello world</div>
    </PrivateComponent>
  );
};

export default index;
