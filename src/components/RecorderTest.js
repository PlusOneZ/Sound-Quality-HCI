import Recorder from 'recorder-js';
import {useState} from "react";
import {Button} from "@mui/material";
import {audioQualityTestRequest} from "../requests/soundQuality";
import Box from "@mui/material/Box";

const audioContext =  new (window.AudioContext || window.webkitAudioContext)();

const recorder = new Recorder(audioContext, {
  // An array of 255 Numbers
  // You can use this to visualize the audio stream
  // If you use react, check out react-wave-stream
  onAnalysed: data => console.log(data),
});

navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => recorder.init(stream))
    .catch(err => console.log('Uh oh... unable to get stream...', err));


function RecorderTest() {

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  function startRecording() {
    recorder.start()
        .then(() => setIsRecording(true));
  }

  function stopRecording() {
    recorder.stop()
        .then(({blob, buffer}) => {
          setAudioBlob(blob)
          setIsRecording(false)
          // buffer is an AudioBuffer
        });
  }

  function download() {
    Recorder.download(audioBlob, 'my-audio-file'); // downloads a .wav file
  }

  function upload() {
    audioQualityTestRequest(audioBlob).then(
        response => {
          //pass
        },
        err => {
          console.log(err)
        }
    )
  }

  return (
      <Box>
        <Button onClick={startRecording} disabled={isRecording}> Record </Button>
        <Button onClick={stopRecording} disabled={!isRecording}> Stop </Button>
        { audioBlob ?
            <audio src={audioBlob} /> :
            null
        }
        <Button onClick={download} disabled={!audioBlob} > Download </Button>
        <Button onClick={upload} disabled={!audioBlob} > Upload </Button>
      </Box>
  )

}

export {RecorderTest}