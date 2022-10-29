import React from "react";
import "./Home.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import DP from "./dp.jpg";
import Loader from "../Loader/Loader";

const Home = () => {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {};
    const data = await axios.post(
      "http://demo2211087.mockable.io/mock",
      body,
      config
    );
    setData(data.data.companies);
  };
  useEffect(() => {
    fetchData();
    if (data != null) {
      setLoading(false);
    }
  }, [data]);
  return (
    <>
      {loading === false ? (
        <div className="main-home">
          <div>
            <h2>Companies</h2>
            <h3> Total Companies : {data.length}</h3>
            <h3>Selected : {selected}</h3>
          </div>
          <div className="card-container">
            {data.map((item, key) => (
              <div className="main-card" key={key}>
                <div className="big-div">
                  <input
                    type="checkBox"
                    id={`id${key}`}
                    onClick={() => {
                      let temp = document.getElementById(`id${key}`);

                      if (temp.checked === true) {
                        setSelected(selected + 1);
                      } else {
                        setSelected(selected - 1);
                      }
                    }}
                  />
                  <img src={DP} alt="" />
                  <span>{item.name}</span>
                </div>
                <div>
                  <span>{item.email}</span>
                </div>
                <div>User</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
