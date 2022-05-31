/*
Layout

 - Header (Optional)
 - Content
 - Tab bar

 */

import { BrowserRouter } from "react-router-dom";
import TabBar from "../components/TabBar";
import {Route, Routes, Outlet} from "react-router-dom";
import UploadOrRecord from "./UploadOrRecord";
import AppBar from "../components/AppBar";
import RecorderControls from "../components/RecorderController";
import useRecorder from "../hooks/useRecorder";

function Layout(props) {
  const {recorderState, ...handlers} = useRecorder()
  const { audio } = recorderState;

  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<> <AppBar /> <Outlet />  <TabBar /></>} >
            <Route path={"algorithms"} element={<> </>} />
            <Route path={"sound-quality-analysis"} element={<UploadOrRecord audio={audio}/>} >
              <Route path={""}/>
              <Route path={"record"} element={<RecorderControls recorderState={recorderState} handlers={handlers} audio={audio}/>}>
                {/*  Record UI here */}
              </Route>
              <Route path={"upload"}>
                {/*  Record UI here */}
              </Route>
            </Route>
            <Route path={"sound-augmentation"} element={<> </>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Layout;