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

import UploadController from "../components/UploadController";
import {audioQualityRequest} from "../requests/soundQuality";
import IntroPage from "./Intro";
import {RecorderTest} from "../components/RecorderTest";
import {useState} from "react";

function Layout(props) {
  const [audio, setAudio] = useState(null);
  function changeAudio(au) {
    setAudio(au)
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<> <AppBar /> <Outlet />  <TabBar /></>} >
            <Route path={"algorithms"} element={<IntroPage />} />
            <Route path={"sound-quality-analysis"}
                   element={<UploadOrRecord audio={audio} uploadHandler={audioQualityRequest}/>}
            >
              <Route path={""}/>
              <Route path={"record"} element={<RecorderControls  setGlobalAudio={changeAudio}/>}>
                {/*  Record UI here */}
              </Route>
              <Route path={"upload"} element={<UploadController setUploadFile={changeAudio}/>}>
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
