import {formatMinutes, formatSeconds} from "../utils/format-time";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import {IconButton, keyframes, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";

const recordAnimate = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const RecordingIndicator = styled("div")`
  width: 10px;
  height: 10px;
  margin-right: 0.5rem;
  margin-top: 1.5rem;
  border-radius: 50%;
  background-color: #099fff;
  animation-name: ${recordAnimate};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

const BlankIndicator = styled("div")`
  width: 10px;
  height: 10px;
  margin-right: .5rem;
  content: " ";
`

export default function RecorderControls({recorderState, handlers, audio}) {
  const {recordingMinutes, recordingSeconds, initRecording} = recorderState;
  const {startRecording, saveRecording, cancelRecording} = handlers;
  const {t} = useTranslation("main");

  return (
      <Box>
        <Box sx={{m: "0 auto", p: 2, display: "flex", justifyContent: "center"}}>
          <Box sx={{mb: "3"}}>
            <Box sx={{display: "flex"}}>
              {initRecording ? <RecordingIndicator/> : <BlankIndicator/>}
              <Typography variant={"h1"}>
                <span>{formatMinutes(recordingMinutes)}</span>
                <span>:</span>
                <span>{formatSeconds(recordingSeconds)}</span>
              </Typography>
            </Box>
          </Box>

          <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ml: 2
              }}>
            {/* Button group */}
            <div>
              {initRecording ? (
                  <IconButton
                      color={"warning"}
                      title={"Stop Recording"}
                      aria-label={"stop recording button"}
                      onClick={cancelRecording}
                      size="large"
                  >
                    <CloseIcon/>
                  </IconButton>
              ) : (
                  <IconButton
                      title={"Start recording"}
                      aria-label={"start recording button"}
                      onClick={startRecording}
                      color={"primary"}
                      size="large"
                  >
                    <KeyboardVoiceIcon/>
                  </IconButton>
              )}
            </div>
            <div>
              {initRecording && (
                  <IconButton
                      title="Save recording"
                      aria-label={"save recording button"}
                      color={"success"}
                      onClick={saveRecording}
                      disabled={recordingSeconds === 0}
                      size="large"
                  >
                    <SaveIcon/>
                  </IconButton>
              )}
            </div>
          </Box>
        </Box>

        <Box sx={{display: "flex", justifyContent: "center"}}>
          {!audio &&
              (<div>
                {initRecording ?
                    (
                        <Typography variant={"h6"}>
                          <SaveIcon fontSize={"small"}/> - {t('hints.saveRecording')} &nbsp;
                          <CloseIcon fontSize={"small"}/> - {t('hints.cancelRecording')}
                        </Typography>
                    )
                    :
                    (
                        <Typography variant={"h6"}>
                          <KeyboardVoiceIcon fontSize={"small"}/> - {t("hints.clickToStartRecording")}
                        </Typography>
                    )
                }
              </div>)
          }
        </Box>
      </Box>
  );
}