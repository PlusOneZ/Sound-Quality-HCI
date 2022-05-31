import Box from "@mui/material/Box";
import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import {useTranslation} from "react-i18next";
import Tab from "@mui/material/Tab";
import {Link, Outlet} from "react-router-dom"
import {Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


function UploadOrRecord({uploadHandler, audio}) {
  const [value, setValue] = useState(0);
  const {t} = useTranslation("main");


  function changeValue(event, newVal) {
    setValue(newVal)
  }

  return (
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
                  <Button
                      variant="outlined"
                      sx={{mt: 2}}
                      onClick={uploadHandler}
                      endIcon={<SendIcon/>}
                  >
                    {t("hints.analysisButton")}
                  </Button>
                </Box>
            )
        }

      {/*  TODO: Results goes here */}
      </Box>
  )
}

export default UploadOrRecord;