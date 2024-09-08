import React from "react";
import logo from "../../images/logo.png";
function Header() {
  const accessToken: string | undefined = undefined;
  return (
    <section className="brandlogo-sec py-3 bg-light d-none d-md-block">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-2">
            <a href="/">
              <img src={logo} alt="Logo" className="img-fluid" width="80" />
            </a>
          </div>
          {accessToken && (
            <div className="col-md-10 text-end">
              <a href="/" className="btn btn-primary">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Header;
