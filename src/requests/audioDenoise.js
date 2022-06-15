import axios from "axios";

async function uploadForDenoising(audioUrl) {
  let audio = await fetch(audioUrl).then(r => r.blob())
  let type = "wav"
  if (audio.type === "audio/webm") {
    type = "webm"
  }
  let form = new FormData()
  form.append("audioFile", audio)
  form.append("type", type)
  return axios.post("http://192.168.3.133:5000/audioDenoising", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export {uploadForDenoising}