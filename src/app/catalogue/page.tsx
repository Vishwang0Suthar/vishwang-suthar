import Collection from "@/containers/catalogue";
import React from "react";

type Props = {};

const Catalogue = (props: Props) => {
  return (
    <section>
      <h1 className="text-6xl py-10">Catalogue</h1>
      <Collection />
    </section>
  );
};

export default Catalogue;
