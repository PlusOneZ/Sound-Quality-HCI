import CardMedia from '@mui/material/CardMedia';

import Card from "@mui/material/Card";
import * as React from "react";


export default function VideoCard(){


    return(
        <Card sx={{ width:158/200 , height:"95%" , background:"black"}}>
            <CardMedia
                component="video"
                sx={{height:"100%"}}
                image={require("../assets/videoplayback.mp4").default}
                controls
            />
        </Card>
    )

}



