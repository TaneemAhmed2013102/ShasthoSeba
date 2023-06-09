import React, { useState } from "react";
import { imageUrl } from "../links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faTag } from "@fortawesome/free-solid-svg-icons";

function Item(props) {
   console.log(props);
  return (
    <>
    <a href={((props.list.treated === "No") ? `/details/${props.list.token}` : '#')} className="text-decoration-none">
      <div className={"card mb-3 " + ((props.list.treated === "No") ? "" : "opacity-25")} >
        <div className="row g-0">
          <div className="col-4 border-end border-2">
            <div className="d-flex justify-content-center">
              <img
                src={imageUrl + props.list.image}
                className="img-fluid rounded-start"
                alt="..."
                style={{ maxHeight: "180px" }}
              />
            </div>
          </div>
          <div className="col-8">
            <div className="card-body pb-1">
              <h3 className="card-title text-dark">{props.list.name}</h3>
              <h3 className="card-title text-dark">Age: {props.list.age}</h3>
              <h3 className="card-title text-dark">{props.list.isMale ? "Male" : "Female"}</h3>
              <div className="d-flex">
                <p className="card-text me-3">
                  <small className="text-muted">
                    <FontAwesomeIcon icon={faUserDoctor} />{" "}
                    {props.list.doctorSlug}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    <FontAwesomeIcon icon={faTag} /> {props.list.departmentSlug}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
    </>
  );
}

export default Item;
