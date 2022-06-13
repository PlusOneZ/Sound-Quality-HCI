import axios from "axios";
import {availableAlgorithms} from "../components/AlgorithmSelection";


function getAlgoList(algo) {
  let list = []
  for (let i = 0; i < availableAlgorithms.length; i++) {
    if (algo[availableAlgorithms[i]]) {
      list.push(availableAlgorithms[i])
    }
  }
  return list
}

async function audioQualityRequest(audioURL, algorithms) {
  let audio = await fetch(audioURL).then(r => r.blob())
  let type = "wav"
  if (audio.type === "audio/webm") {
    type = "webm"
  }
  let algoList = getAlgoList(algorithms)
  let form = new FormData()
  form.append("audioFile", audio)
  form.append("algorithms", algoList)
  form.append("type", type)
  return axios.post("tbd", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export {audioQualityRequest}