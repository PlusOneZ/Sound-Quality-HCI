import Box from "@mui/material/Box";
import {CircularProgress, IconButton, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import Recorder from "recorder-js";
import {Download} from "@mui/icons-material";


function SoundDenoiseResult({data, loading}) {
  const {t} = useTranslation("main", { keyPrefix: "hints"})
  return (
      <Box sx={{mt: 5}}>
        {loading ?
            <Box sx={{textAlign: "center"}}>
              <CircularProgress/>
            </Box>
            :
            <>
              <Typography variant={"h4"} sx={{textAlign: "center"}}>
                {t("denoisingResultTitle")}
              </Typography>
              <Stack
                  direction={"row"}
                  alignItems="center"
                  spacing={2} sx={{mt: 2}}
                  justifyContent={"center"}
              >
                <audio controls src={data}/>
                <IconButton
                    color={"success"}
                    title={"download audio"}
                    aria-label={"download the ready audio"}
                    onClick={async function download() {
                      Recorder.download(await fetch(data).then(r => r.blob()), 'denoise-result');
                    }}
                >
                  <Download />
                </IconButton>
              </Stack>
            </>
        }
        <Box sx={{height: 4, pt: 2, mt: 4}}> &nbsp; </Box>
      </Box>
  )
}

export default SoundDenoiseResult