import {Link, Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SoundDenoiseResult from "../components/SoundDenoiseResult";
import Typography from "@mui/material/Typography";
import WaveGraph from "../components/WaveGraph";


function Denoise({uploadHandler, audio, clearAudio}) {
  const location = useLocation();
  const {t} = useTranslation("main");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function onUpload() {
    setLoading(true)
    uploadHandler(audio).then(response => {
      console.log(response)
      setLoading(false)
      setResult(response.data) //TODO: fill this
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
      <Box sx={{p: 2, width: "60%", m: "0 auto"}}>
        <Typography variant={"h5"} >
          {t("hints.denoiseTitle")}
        </Typography>
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
                    <audio controls src={audio} id={"audio-element-dn1"} style={{display: "none"}}/>
                    <WaveGraph url={audio} destination={"denoise-1"} source={"#audio-element-dn1"}/>
                  </Stack>

                  <Button
                      variant="outlined"
                      sx={{mt: 2}}
                      onClick={onUpload}
                      endIcon={<SendIcon/>}
                      size={"large"}
                  >
                    {t("hints.denoiseButton")}
                  </Button>
                </Box>
            )
        }
        {(result || loading) &&
            <SoundDenoiseResult data={result} loading={loading}/>
        }
      </Box>
  )
}

export default Denoise;