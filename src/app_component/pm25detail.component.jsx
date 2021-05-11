import React from "react";

const PM25Detail = (props) => {
  return (
    <div className="container text-light">
      <div className="row">
        <div className="col-md-4">
          <div className="col"></div>
          {props.day1.map((pred, i) => {
            return (
              <h3 style={{ fontSize: "20px" }} key={i}>
                {pred.time + " ---------- " + pred.score.toFixed(3)}
              </h3>
            );
          })}
        </div>
        <div className="col-md-4">
          {props.day2.map((pred, i) => {
            return (
              <h3 style={{ fontSize: "20px" }} key={i + 24}>
                {pred.time + " ---------- " + pred.score.toFixed(3)}
              </h3>
            );
          })}
        </div>
        <div className="col-md-4">
          {props.day3.map((pred, i) => {
            return (
              <h3 style={{ fontSize: "20px" }} key={i + 48}>
                {pred.time + " ---------- " + pred.score.toFixed(3)}
              </h3>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PM25Detail;
