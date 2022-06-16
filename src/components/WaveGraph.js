import React, {useEffect, useState} from "react";
import {WaveSurfer} from "wavesurfer.js";




function WaveGraph(url){

    const [audio]=url;
    const [waveSurfer,setWavesurfer]=useState(null)


    useEffect(()=>{


        setWavesurfer(WaveSurfer.create({
            container:"#waveform",

        }))

    },[])

    useEffect(()=>{
        console.log(audio.url)
        console.log("yes")
        if(waveSurfer){
            waveSurfer.load(audio)
        }
    },[audio, waveSurfer])

    return(
        <div id="waveform">
        </div>
    )
}





export default WaveGraph;
