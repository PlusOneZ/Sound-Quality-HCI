import axios from "axios";

async function audioQualityRequest(audioURL) {
  let audio = await fetch(audioURL).then(r => r.blob())
  return axios.post("tbd", audio, {
    headers: {"Content-Type": "audio/wav"}
  })
}

export {audioQualityRequest}