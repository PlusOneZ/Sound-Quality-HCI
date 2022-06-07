import CardMedia from '@mui/material/CardMedia';

import Card from "@mui/material/Card";
import * as React from "react";


export default function VideoCard(){


    return(
        <Card sx={{ margin:2, width:161/200,background:"black"}}>
            <CardMedia
                component="video"
                height="400"
                image={require("../assets/videoplayback.mp4").default}
                controls
            />
        </Card>
    )

}



