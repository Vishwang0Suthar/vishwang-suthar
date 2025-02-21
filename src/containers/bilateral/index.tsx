import React from "react";

type Props = {};

const Bilat = (props: Props) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-white hover:cursor-pointer"></div>
      <div className="flex-1 bg-black hover:cursor-pointer"></div>
    </div>
  );
};

export default Bilat;
