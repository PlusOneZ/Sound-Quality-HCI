import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";


function SoundDenoiseResult({data, loading}) {

  return (
      <Box sx={{mt: 10}}>
        {loading ?
            <Box sx={{textAlign: "center"}}>
              <CircularProgress/>
            </Box>
            :
            <>
              <audio src={data} />
            </>
        }
        <Box sx={{height: 4, pt: 2, mt: 4}}> &nbsp; </Box>
      </Box>
  )
}

export default SoundDenoiseResult