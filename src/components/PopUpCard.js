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
import {useTranslation} from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm'


import 'katex/dist/katex.min.css'



function PopUpCard(props){

    const {cardInfo}=props;

    const {t} = useTranslation("main");

    const imgMap={
        "mosnet":mosnetImg,
        "srmr":srmrImg,
        "bsseval":bssevalImg,
        "pesq":pesqImg,
        "sisdr":sisdrImg,
        "stoi":stoiImg,
    }

    const mdMap={
        "mosnet":t("algo_md_info.mosnet"),
        "srmr":t("algo_md_info.srmr"),
        "bsseval":t("algo_md_info.bsseval"),
        "pesq":t("algo_md_info.pesq"),
        "sisdr":t("algo_md_info.sisdr"),
        "stoi":t("algo_md_info.stoi"),
    }



    const [open,setOpen]=React.useState(false);
    const handleOpen=()=>{setOpen(true);};
    const handleClose=()=>{setOpen(false);};



    const cardStyle={
        margin: "1%",
        width: 1 / 4,
        height: 85/100,
        webkitTransitionDuration: '0.3s',
        transitionDuration: '0.3s',
        webkitTransitionProperty: "transform",
        transitionProperty: "transform",
        "&:hover":{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            cursor:"pointer",
            position: "relative",
            transform: "scale(1.05)",
        }
    };

    const popupStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 2/3,
        bgcolor: 'background.paper',
        border: '10px solid #000',
        boxShadow: 24,
        p: 4,


    };

    return(

            <Grid sx={cardStyle} >
                <Card onClick={handleOpen} sx={{minHeight:"100%"}}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        // height="65%"
                        sx={{maxHeight: "14vh"}}
                        src={imgMap[cardInfo.algoName]}
                    />
                    <CardContent sx={{minHeight:"6vh"}}>
                        <Typography gutterBottom variant="h6" component="div" sx={{height:"60%",fontSize:"1 rem"}} >
                            {cardInfo.algoName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{height:"30%",fontSize:"1 rem",margin:"1%"}}>
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
                            <Typography id="modal-modal-description" sx={{height: "60vh",overflow:"scroll",mt:"2"}}>
                                <ReactMarkdown
                                               children={mdMap[cardInfo.algoName]}
                                               remarkPlugins={[remarkMath,remarkGfm]}
                                               rehypePlugins={[rehypeKatex]}/>
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
