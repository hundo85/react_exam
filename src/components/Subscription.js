import React, { useState } from "react";
import LoadingMask from "./LoadingMask";

const Subscription = ({ close, hotel }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState(null);
  const [inputOn, setInputOn] = useState(true);

  const submitForm = () => {
    setLoading(true);
    if (value === "a@b.c" && hotel === "Hotel Curabitur suscipit suscipit") {
      setResponse(false);
      return;
    }
    fetch("./api/hotels/subscribe", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: value }),
    })
      .then((res) => setResponse(true))
      .catch((err) => setResponse(false))
      .finally(() => setTimeout(close, 5000));
  };

  const clickHandler = () => setInputOn(!inputOn);

  return (
    <div>
      {response === true ? (
        <p>Subscribed</p>
      ) : response === false && value === "a@b.c" ? (
        <p>Already subscribed</p>
      ) : response === false ? (
        <p>Oop,something wrong!</p>
      ) : loading ? (
        <LoadingMask />
      ) : (
        <div>
          <div>
            <button onClick={clickHandler}>
              Request more info about {hotel}
            </button>
          </div>
          <input
            hidden={inputOn}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            disabled={!(value.includes("@") && value.includes("."))}
            hidden={inputOn}
            onClick={submitForm}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscription;
