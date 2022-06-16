import Box from "@mui/material/Box";
import {CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import WaveGraph from "./WaveGraph";


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
                <audio controls src={data} id={"audio-element-dn2"} style={{display: "none"}}/>
                <WaveGraph url={data} destination={"denoise-2"} source={"#audio-element-dn2"}/>
              </Stack>
            </>
        }
        <Box sx={{height: 4, pt: 2, mt: 4}}> &nbsp; </Box>
      </Box>
  )
}

export default SoundDenoiseResult