import Box from "@mui/material/Box";
import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import {useTranslation} from "react-i18next";
import Tab from "@mui/material/Tab";
import {Link, Outlet, useLocation} from "react-router-dom"
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {AlgorithmSelection, initState} from "../components/AlgorithmSelection";
import SoundQualityResult, {mockedData} from "../components/SoundQualityResult";


function UploadOrRecord({uploadHandler, audio}) {
  const location = useLocation();
  const {t} = useTranslation("main");
  const [algoList, setAlgoList] = useState(initState);

  const setAlgoCb = (algo) => {
    setAlgoList(algo)
  }

  function onUpload() {
    uploadHandler(audio, algoList)
  }

  let v = 0;
  if (location.pathname.indexOf("record") === -1) {
    v = 1
  }
  const [value, setValue] = useState(v);

  function changeValue(event, newVal) {
    setValue(newVal)
  }

  return (
      // TODO: reactive to device width
      <Box sx={{p: 2, width: "60%", m: "0 auto"}}>
        <Tabs
            value={value}
            onChange={changeValue}
            aria-label="choose to upload or record sound"
            variant={"fullWidth"}
        >
          <Tab label={t("menu.record")} component={Link} to={"record"}/>
          <Tab label={t("menu.upload")} component={Link} to={"upload"}/>
        </Tabs>
        <Outlet/>

        {audio &&
            (
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <audio controls src={audio}/>
                  <AlgorithmSelection callBack={setAlgoCb}/>
                  <Button
                      variant="outlined"
                      sx={{mt: 2}}
                      onClick={onUpload}
                      endIcon={<SendIcon/>}
                  >
                    {t("hints.analysisButton")}
                  </Button>
                </Box>
            )
        }

        {/*  TODO: Results goes here */}
        <SoundQualityResult data={mockedData} />
      </Box>
  )
}

export {UploadOrRecord};