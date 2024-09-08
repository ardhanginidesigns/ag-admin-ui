import React, { useContext } from "react";
import { indexContext, IndexContext } from "../../context/index/index.context";

function Login() {
  const context: IndexContext | null = useContext<IndexContext | null>(
    indexContext
  );
  return (
    <section className="main_content dashboard_part">
      <div className="main_content_iner ">
        <div className="container-fluid p-0">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="white_box mb_30">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <div className="modal-content cs_modal">
                      <div className="modal-header justify-content-center theme_bg_1">
                        <h5 className="modal-title text_white">Log in</h5>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                            />
                          </div>
                          <a
                            href="#"
                            className="btn_1 full_width text-center"
                            onClick={context?.handleLogin}
                          >
                            Log in
                          </a>
                          <div className="text-center">
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#forgot_password"
                              data-bs-dismiss="modal"
                              className="pass_forget_btn"
                            >
                              Forget Password?
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
