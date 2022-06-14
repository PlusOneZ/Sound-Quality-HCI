/*
Layout

 - Header (Optional)
 - Content
 - Tab bar

 */

import { BrowserRouter } from "react-router-dom";
import TabBar from "../components/TabBar";
import {Route, Routes, Outlet} from "react-router-dom";
import {UploadOrRecord} from "./UploadOrRecord";
import AppBar from "../components/AppBar";
import RecorderControls from "../components/RecorderController";
import useRecorder from "../hooks/useRecorder";
import UploadController from "../components/UploadController";
import {audioQualityRequest} from "../requests/soundQuality";
import IntroPage from "./Intro";
import {RecorderTest} from "../components/RecorderTest";

function Layout(props) {
  const {recorderState, ...handlers} = useRecorder()
  const { audio } = recorderState;

  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<> <AppBar /> <Outlet />  <TabBar /></>} >
            <Route path={"algorithms"} element={<IntroPage />} />
            <Route path={"sound-quality-analysis"}
                   element={<UploadOrRecord audio={audio} uploadHandler={audioQualityRequest}/>}
            >
              <Route path={""}/>
              <Route path={"record"} element={<RecorderControls recorderState={recorderState} handlers={handlers} audio={audio}/>}>
                {/*  Record UI here */}
              </Route>
              <Route path={"upload"} element={<UploadController setUploadFile={handlers.setUploadFile}/>}>
                {/*  Record UI here */}
              </Route>
            </Route>
            <Route path={"sound-augmentation"} element={<> </>} />
            <Route path={"test"} element={<RecorderTest />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Layout;
