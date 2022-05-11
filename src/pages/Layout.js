/*
Layout

 - Header (Optional)
 - Content
 - Tab bar

 */

import { BrowserRouter } from "react-router-dom";
import TabBar from "../components/TabBar";

function Layout(props) {
  return (
      <BrowserRouter>
        <TabBar />
      </BrowserRouter>
  )
}

export default Layout;