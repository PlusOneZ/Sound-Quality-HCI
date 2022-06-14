import {useEffect, useState} from "react";
import {saveRecording, startRecording} from "../handlers/recorder-controls";

// import { MediaRecorder, register } from 'extendable-media-recorder';
// import { connect } from 'extendable-media-recorder-wav-encoder';

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};
//
// // Returns Uint8Array of WAV bytes
// function getWavBytes(buffer, options) {
//   const type = options.isFloat ? Float32Array : Uint16Array
//   const numFrames = buffer.byteLength / type.BYTES_PER_ELEMENT
//
//   const headerBytes = getWavHeader(Object.assign({}, options, { numFrames }))
//   const wavBytes = new Uint8Array(headerBytes.length + buffer.byteLength);
//
//   // prepend header, then add pcmBytes
//   wavBytes.set(headerBytes, 0)
//   wavBytes.set(new Uint8Array(buffer), headerBytes.length)
//
//   return wavBytes
// }
//
// // adapted from https://gist.github.com/also/900023
// // returns Uint8Array of WAV header bytes
// function getWavHeader(options) {
//   const numFrames =      options.numFrames
//   const numChannels =    options.numChannels || 2
//   const sampleRate =     options.sampleRate || 44100
//   const bytesPerSample = options.isFloat? 4 : 2
//   const format =         options.isFloat? 3 : 1
//
//   const blockAlign = numChannels * bytesPerSample
//   const byteRate = sampleRate * blockAlign
//   const dataSize = numFrames * blockAlign
//
//   const buffer = new ArrayBuffer(44)
//   const dv = new DataView(buffer)
//
//   let p = 0
//
//   function writeString(s) {
//     for (let i = 0; i < s.length; i++) {
//       dv.setUint8(p + i, s.charCodeAt(i))
//     }
//     p += s.length
//   }
//
//   function writeUint32(d) {
//     dv.setUint32(p, d, true)
//     p += 4
//   }
//
//   function writeUint16(d) {
//     dv.setUint16(p, d, true)
//     p += 2
//   }
//
//   writeString('RIFF')              // ChunkID
//   writeUint32(dataSize + 36)       // ChunkSize
//   writeString('WAVE')              // Format
//   writeString('fmt ')              // Subchunk1ID
//   writeUint32(16)                  // Subchunk1Size
//   writeUint16(format)              // AudioFormat https://i.stack.imgur.com/BuSmb.png
//   writeUint16(numChannels)         // NumChannels
//   writeUint32(sampleRate)          // SampleRate
//   writeUint32(byteRate)            // ByteRate
//   writeUint16(blockAlign)          // BlockAlign
//   writeUint16(bytesPerSample * 8)  // BitsPerSample
//   writeString('data')              // Subchunk2ID
//   writeUint32(dataSize)            // Subchunk2Size
//
//   return new Uint8Array(buffer)
// }

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState(initialState);
  // await register(await connect());
  // recorderState.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

  useEffect(() => {
    const MAX_RECORDER_TIME = 5;
    let recordingInterval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
              prevState.recordingMinutes === MAX_RECORDER_TIME &&
              prevState.recordingSeconds === 0
          ) {
            clearInterval(recordingInterval);
            return prevState;
          }

          if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };

          if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  useEffect(() => {
    if (recorderState.mediaStream)
      setRecorderState((prevState) => {
        // let mediaRecorder = new MediaRecorder();
        // mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        // mediaRecorder.setOutputFormat(MediaRecorder.AudioFormat.ENCODING_PCM_16BIT);
        // mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
        // mediaRecorder.setAudioChannels(1);
        // mediaRecorder.setAudioEncodingBitRate(128000);
        // mediaRecorder.setAudioSamplingRate(48000);
        // mediaRecorder.setOutputFile(MainActivity.PATH_TEMP_RECORDING);
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream, {mimeType : 'audio/webm'}),
        };
      });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks);
        const file = new File([blob], "result.webm", {type: 'audio/webm'})

        // var arrayBuffer = await blob.arrayBuffer()
        // const audioContext = new AudioContext();
        // await audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
        //   const [left, right] = [audioBuffer.getChannelData(0), audioBuffer.getChannelData(1)]
        //   // interleaved
        //   const interleaved = new Float32Array(left.length + right.length)
        //   for (let src = 0, dst = 0; src < left.length; src++, dst += 2) {
        //     interleaved[dst] = left[src]
        //     interleaved[dst + 1] = right[src]
        //   }
        //
        //   // get WAV file bytes and audio params of your audio source
        //   const wavBytes = getWavBytes(interleaved.buffer, {
        //     isFloat: true,       // floating point or 16-bit integer
        //     numChannels: 2,
        //     sampleRate: 48000,
        //   })
        //   const wav = new Blob([wavBytes], {type: 'audio/wav'})
        // })
        chunks = [];

        console.log(file)
        console.log(window.URL.createObjectURL(file))
        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: window.URL.createObjectURL(file),
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
    setUploadFile: (fileUrl) => {
      setRecorderState({
        ...initialState,
        audio: fileUrl
      })
    }
  };
}