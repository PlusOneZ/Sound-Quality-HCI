/*
Layout

 - Header (Optional)
 - Content
 - Tab bar

 */

import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import TabBar from "../components/TabBar";
import {QualityAnalysis} from "./QualityAnalysis";
import AppBar from "../components/AppBar";
import RecorderControls from "../components/RecorderController";
import UploadController from "../components/UploadController";
import {audioQualityRequest} from "../requests/soundQuality";
import IntroPage from "./Intro";
import {useState} from "react";
import Denoise from "./Denoise";
import {uploadForDenoising} from "../requests/audioDenoise";

function Layout(props) {
  const [audio, setAudio] = useState(null);

  function changeAudio(au) {
    setAudio(au)
  }

  function clearAu() {
    setAudio(null)
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<> <AppBar/> <Outlet/> <TabBar clearAudio={clearAu}/></>}>
            <Route path={"algorithms"} element={<IntroPage/>}/>
            <Route path={""} element={<IntroPage/>}/>
            <Route path={"sound-quality-analysis"}
                   element={
                     <QualityAnalysis
                         audio={audio}
                         uploadHandler={audioQualityRequest}
                         clearAudio={clearAu}
                     />
                   }
            >
              <Route path={"record"} element={<RecorderControls setGlobalAudio={changeAudio}/>}/>
              <Route path={"upload"} element={<UploadController setUploadFile={changeAudio}/>}/>
            </Route>
            <Route
                path={"sound-denoise"}
                element={<Denoise audio={audio} clearAudio={clearAu} uploadHandler={uploadForDenoising}/>}
            >
              <Route path={"record"} element={<RecorderControls setGlobalAudio={changeAudio}/>}/>
              <Route path={"upload"} element={<UploadController setUploadFile={changeAudio}/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Layout;
