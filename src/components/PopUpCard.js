import * as React from 'react';

import Card from "@mui/material/Card"
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";
import { Modal} from "@mui/material";
import "../assets/popup.css"
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from "@mui/icons-material/Close";

import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import mosnetImg from "../assets/mosnet.png"
import srmrImg from "../assets/srmr.png"
import bssevalImg from "../assets/bsseval.png"
import pesqImg from "../assets/pesq.png"
import sisdrImg from "../assets/sisdr.png"
import stoiImg from "../assets/stoi.png"
import {Grid} from "@mui/material";
import markdown from "../assets/markdown.json"



import ReactMarkdown from "react-markdown";






function PopUpCard(props){
    const {cardInfo}=props;

    const imgMap={
        "mosnet":mosnetImg,
        "srmr":srmrImg,
        "bsseval":bssevalImg,
        "pesq":pesqImg,
        "sisdr":sisdrImg,
        "stoi":stoiImg,
    }


    const [open,setOpen]=React.useState(false);
    const handleOpen=()=>{setOpen(true);};
    const handleClose=()=>{setOpen(false);};




    const cardStyle={
        margin: 2,
        width: 1 / 4,

        "&:hover":{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            cursor:"pointer",
        }
    };

    const popupStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 2/3,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,


    };

    return(

            <Grid sx={cardStyle}>
                <Card onClick={handleOpen}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="200"
                        src={imgMap[cardInfo.algoName]}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {cardInfo.algoName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {cardInfo.description}
                        </Typography>
                    </CardContent>
                </Card>
                <Modal
                    open={open}
                    onClose={handleClose}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={open}>
                        <Box sx={popupStyle}>
                            <Typography id="modal-modal-title" variant="h3" component="h1">
                                {cardInfo.algoName}
                            </Typography>
                            <IconButton sx={{float:"right",position: 'absolute', top:10,right:10,}}
                                        onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <ReactMarkdown children={markdown[cardInfo.id].content}/>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>

    )

}

PopUpCard.propTypes={
    cardInfo:PropTypes.shape({
        id:PropTypes.number.isRequired,
        algoName:PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
    }).isRequired,
};
export default PopUpCard;
