import Box from "@mui/material/Box";
import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import {useTranslation} from "react-i18next";
import Tab from "@mui/material/Tab";
import {Link, Outlet, useLocation} from "react-router-dom"
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {AlgorithmSelection, initState} from "../components/AlgorithmSelection";
import {IconButton, Stack} from "@mui/material";
import Recorder from "recorder-js";
import {Download} from "@mui/icons-material";
import SoundQualityResult from "../components/SoundQualityResult";


function UploadOrRecord({uploadHandler, audio, clearAudio}) {
  const location = useLocation();
  const {t} = useTranslation("main");
  const [algoList, setAlgoList] = useState(initState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const setAlgoCb = (algo) => {
    setAlgoList(algo)
  }

  function onUpload() {
    setLoading(true)
    uploadHandler(audio, algoList).then(response => {
      console.log(response)
      setResult(response.data)
      setLoading(false)
    }, error => {
      setLoading(false)
      alert("error occurred uploading file")
      console.log(error)
    })
  }

  let v = 0;
  if (location.pathname.indexOf("record") === -1) {
    v = 1
  }
  const [value, setValue] = useState(v);

  function changeValue(event, newVal) {
    clearAudio()
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
                  <Stack direction={"row"} alignItems="center" spacing={2}>
                    <audio controls src={audio}/>
                    <IconButton
                        color={"success"}
                        title={"download audio"}
                        aria-label={"download the ready audio"}
                        onClick={async function download() {
                          Recorder.download(await fetch(audio).then(r => r.blob()), 'audio-file');
                        }}
                    >
                      <Download />
                    </IconButton>
                  </Stack>
                  <AlgorithmSelection callBack={setAlgoCb} mode={value===0 ? "RECORD" : "UPLOAD"}/>
                  <Button
                      variant="outlined"
                      sx={{mt: 2}}
                      onClick={onUpload}
                      endIcon={<SendIcon/>}
                      size={"large"}
                  >
                    {t("hints.analysisButton")}
                  </Button>
                </Box>
            )
        }

        {/*  TODO: Results goes here */}
        {(result || loading) &&
            <SoundQualityResult data={result} loading={loading}/>
        }
      </Box>
  )
}

export {UploadOrRecord};