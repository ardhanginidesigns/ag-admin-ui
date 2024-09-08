import React from "react";
import { ToastContainer } from "react-toastify";

function Footer() {
  return (
    <>
      <section className="brandlogo-sec bg-light d-none d-md-block">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 text-center text-derk py-3 /">
              <p className="m-0 fw-bold text-primary">
                Copyright 2024 © Ardhangini Private Limited. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default Footer;
