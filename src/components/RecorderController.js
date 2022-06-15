import {formatMinutes, formatSeconds} from "../utils/format-time";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import {IconButton, keyframes, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import Recorder from "recorder-js";
import {audioQualityTestRequest} from "../requests/soundQuality";

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

let audioContext = null, recorder = null;

async function init() {
  audioContext =  new (window.AudioContext || window.webkitAudioContext)();

  recorder = new Recorder(audioContext, {
    // An array of 255 Numbers
    // You can use this to visualize the audio stream
    // If you use react, check out react-wave-stream
    // onAnalysed: data => console.log(data),
  });

  await navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => recorder.init(stream))
      .catch(err => console.log('Uh oh... unable to get stream...', err));
}

export default function RecorderControls({setGlobalAudio}) {
  const [recordingMinutes, setRecordingMinutes] = useState(0);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const [timerInterval, setTimerInterval] = useState(0);

  function clearTime() {
    console.log(timerInterval)
    setRecordingMinutes(0)
    setRecordingSeconds(0)
    clearInterval(timerInterval)
    setTimerInterval(0)
    console.log("Cleared time interval")
  }

  function updateTime() {
    setRecordingSeconds(prevState => {
      if (prevState <= 59) {
        return prevState + 1
      } else {
        setRecordingMinutes(prev => prev+1)
        return 0
      }
    })
  }

  function startRecording() {
    function start() {
      recorder.start()
          .then(() => {
            setIsRecording(true);
            setTimerInterval(setInterval(() => updateTime(), 1000))
          });
    }

    if (audioContext === null || recorder === null) {
      init().then( () => {
        start();
      })
    } else {
      start();
    }
  }

  function saveRecording() {
    console.log("Stopped recording")
    recorder.stop()
        .then(({blob, buffer}) => {
          clearTime()
          setAudioBlob(blob)
          setIsRecording(false)
          console.log(blob)
          setGlobalAudio(window.URL.createObjectURL(blob))
          // Recorder.download(blob, 'my-audio-file');
          // buffer is an AudioBuffer
        });
  }

  function cancelRecording() {
    console.log("Canceled recording")
    recorder.stop();
    setAudioBlob(null);
    setIsRecording(false);
    clearTime()
  }

  const {t} = useTranslation("main");

  return (
      <Box>
        <Box sx={{m: "0 auto", p: 2, display: "flex", justifyContent: "center"}}>
          <Box sx={{mb: "3"}}>
            <Box sx={{display: "flex"}}>
              {isRecording ? <RecordingIndicator/> : <BlankIndicator/>}
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
              {isRecording ? (
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
              {isRecording && (
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
          {!audioBlob &&
              (<div>
                {isRecording ?
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