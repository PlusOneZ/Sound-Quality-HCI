import {createTheme, ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container"
import {CssBaseline} from "@mui/material";
import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import PopUpCard from "../components/PopUpCard"
import VideoCard from "../components/VideoCard"



function IntroPage(){

    const theme = createTheme()

    const {t} = useTranslation("main");

    const algorithmCards=[
        {
            id:0,
            algoName: "mosnet",
            description: t("algo_brief_info.mosnet"),
        },
        {
            id:1,
            algoName: "srmr",
            description: t("algo_brief_info.srmr"),
        },
        {
            id:2,
            algoName: "bsseval",
            description: t("algo_brief_info.bsseval"),
        },
        {
            id:3,
            algoName: "pesq",
            description: t("algo_brief_info.pesq"),
        },
        {
            id:4,
            algoName: "sisdr",
            description: t("algo_brief_info.sisdr"),
        },
        {
            id:5,
            algoName: "stoi",
            description: t("algo_brief_info.stoi"),
        }
    ];

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" >
                <Grid sx={{ flexGrow: 1,padding:2 }} container spacing={10}>
                    <Grid item xs={12} sx={{height:"100vh"}}>
                        <Grid container justifyContent="center" spacing={2} sx={{height:"30%"}}>
                            {[0, 1, 2].map((value) => (
                                <PopUpCard cardInfo={algorithmCards[value]} key={value} />
                            ))}
                        </Grid>
                        <Grid container justifyContent="center" spacing={2} sx={{height:"40%"}}>
                            <VideoCard />
                        </Grid>
                        <Grid container justifyContent="center" spacing={2} sx={{height:"30%"}}>
                            {[3, 4, 5].map((value) => (
                                <PopUpCard cardInfo={algorithmCards[value]} key={value} />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

            </Container>
        </ThemeProvider>
    )
}

export default  IntroPage;
