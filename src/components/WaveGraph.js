import React from "react";
import WaveSurfer from "wavesurfer.js";
import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Recorder from "recorder-js";
import {Download} from "@mui/icons-material";


class WaveGraph extends React.Component {

  constructor(props) {
    super();
    this.props = props
    this.state = {
      waveform: null,
      audioContext: new AudioContext(),
      playing: false
    }
    this.togglePlayPause = this.togglePlayPause.bind(this)
    this.PlayButton = this.PlayButton.bind(this)
    this.download = this.download.bind(this)
  }

  componentDidMount() {
    let wavs = WaveSurfer.create({
      audioContext: this.state.audioContext,
      container: `#waveform-${this.props.destination}`
    })
    wavs.load(document.querySelector(this.props.source))
    wavs.on('finish', this.togglePlayPause)
    this.setState({waveform: wavs})

    setTimeout(() => {
      document.querySelector(`#waveform-${this.props.destination}`).children[0].style.display = "none"
    }, 100)
  }

  PlayButton() {
    return this.state.playing ? <PauseIcon/> : <PlayArrowIcon/>
  }

  togglePlayPause() {
    if (this.state.audioContext?.state === "suspended") {
      this.state.audioContext.resume()
    }

    this.state.waveform.playPause()
    this.setState({ playing: !this.state.playing})
  }

  async download() {
    Recorder.download(await fetch(this.props.url).then(r => r.blob()), 'audio-file');
  }

  render() {
    return (
        <Box sx={{width: "40vw", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <IconButton onClick={this.togglePlayPause}>
            {this.PlayButton()}
          </IconButton>
          <Box id={`waveform-${this.props.destination}`} sx={{width: "70%"}}> </Box>
          <IconButton
              color={"success"}
              title={"download audio"}
              aria-label={"download the ready audio"}
              onClick={this.download}
          >
            <Download/>
          </IconButton>
        </Box>
    );
  }
}


export default WaveGraph;
