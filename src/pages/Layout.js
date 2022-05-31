/*
Layout

 - Header (Optional)
 - Content
 - Tab bar

 */

import { BrowserRouter } from "react-router-dom";
import TabBar from "../components/TabBar";
import {Route, Routes, Outlet} from "react-router-dom";
import UploadOrRecord from "../components/UploadOrRecord";
import AppBar from "../components/AppBar";

function Layout(props) {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<> <AppBar /> <Outlet />  <TabBar /></>} >
            <Route path={"algorithms"} element={<> </>} />
            <Route path={"sound-quality-analysis"} element={<UploadOrRecord />} />
            <Route path={"sound-augmentation"} element={<> </>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Layout;