import {createTheme,ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container"
import {CssBaseline} from "@mui/material";
import {Grid} from "@mui/material";

import PopUpCard from "../components/PopUpCard"
import VideoCard from "../components/VideoCard"



//TODO: add i18n



const algorithmCards=[
    {
        id:0,
        algoName: "mosnet",
        description: "some scratch info about mosnet",
    },
    {
        id:1,
        algoName: "srmr",
        description: "some scratch info about srmr",
    },
    {
        id:2,
        algoName: "bsseval",
        description: "some scratch info about bsseva;",
    },
    {
        id:3,
        algoName: "pesq",
        description: "some scratch info about pesq",
    },
    {
        id:4,
        algoName: "sisdr",
        description: "some scratch info about sisdr",
    },
    {
        id:5,
        algoName: "stoi",
        description: "some scratch info about stoi",
    }
];



const theme = createTheme()

export default function IntroPage(){
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" >
                <main>
                    {/*<MainFeaturedPost post={mainFeaturedPost} />*/}
                    <Grid sx={{ flexGrow: 1,padding:5 }} container spacing={10}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={2}>
                                {[0, 1, 2].map((value) => (

                                    <PopUpCard cardInfo={algorithmCards[value]} />
                                ))}
                            </Grid>
                            <Grid container justifyContent="center" spacing={2}>
                            <VideoCard />
                            </Grid>
                            <Grid container justifyContent="center" spacing={2}>
                                {[3, 4, 5].map((value) => (

                                    <PopUpCard cardInfo={algorithmCards[value]} />
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    )
}
