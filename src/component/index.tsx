import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login";
import { useState } from "react";
import { indexContext, IndexContext } from "../context/index/index.context";
import LeftPanel from "./layout/LeftPanel";
import LeftPanelRoute from "./layout/LeftPanelRoute";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function Index() {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const handleLogin = () => {
    setAccessToken("test");
  };

  const indexContextData: IndexContext = {
    handleLogin: handleLogin,
  };

  return (
    <>
      <indexContext.Provider value={indexContextData}>
        <Header></Header>
        {!accessToken && <Login></Login>}
        {accessToken && <LeftPanelRoute></LeftPanelRoute>}{" "}
        {/*<LeftPanel></LeftPanel>*/}
        <Footer></Footer>
      </indexContext.Provider>
    </>
  );
}

export default Index;
