import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";
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



