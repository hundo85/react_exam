import React, { useState } from "react";
import Subscription from "./Subscription";

const Character = ({ key, name, details }) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="hotel">
      <p>{name}</p>

      {shown ? (
        <button onClick={() => setShown(false)}>Show less</button>
      ) : (
        <button onClick={() => setShown(true)}>Show more</button>
      )}
      {shown && (
        <p>
          {details}
          <br />
          <Subscription close={() => setShown(false)} hotel={name} />
        </p>
      )}
    </div>
  );
};

export default Character;
