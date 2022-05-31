import Box from "@mui/material/Box";
import {Button, styled} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useState} from "react";
import Typography from "@mui/material/Typography";

const Input = styled('input')({
  display: 'none',
});

function UploadController({setUploadFile}) {
  const [filename, setFilename] = useState("");
  // TODO: clear this on mount

  function onUpload(e) {
    console.log(e.target.files[0])
    setFilename(e.target.files[0].name)
    const url = window.URL.createObjectURL(e.target.files[0])
    setUploadFile(url)
  }

  return (
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 3
      }}>
        <label htmlFor={"upload-wav-audio-clip"}>
          <Input
              accept={"audio/wav"}
              id={"upload-wav-audio-clip"}
              type={"file"}
              onChange={onUpload}
          />
          <Button
              variant={"contained"}
              color={"secondary"}
              endIcon={<FileUploadIcon/>}
              component={"span"}
          >
            选择本地音频文件
          </Button>
        </label>
        <Box sx={{minHeight: 2}}>&nbsp;</Box>
        { filename &&
            <Typography variant={"body1"} >
              当前音频：{filename}
            </Typography>
        }
      </Box>
  )
}

export default UploadController