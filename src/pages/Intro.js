import {createTheme,ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container"
import {CssBaseline} from "@mui/material";
import {Grid} from "@mui/material";

import PopUpCard from "../components/PopUpCard"
import VideoCard from "../components/VideoCard"



//TODO: add i18n



const algorithmCards=[
    {
        algoName: "mosnet",
        description: "some scratch info about mosnet",
    },
    {
        algoName: "srmr",
        description: "some scratch info about srmr",
    },
    {
        algoName: "bsseval",
        description: "some scratch info about bsseva;",
    },
    {
        algoName: "pesq",
        description: "some scratch info about pesq",
    },
    {
        algoName: "sisdr",
        description: "some scratch info about sisdr",
    },
    {
        algoName: "stoi",
        description: "some scratch info about stoi",
    }
];



const theme = createTheme()

export default function IntroPage(){
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    {/*<MainFeaturedPost post={mainFeaturedPost} />*/}
                    <Grid sx={{ flexGrow: 1,padding:5 }} container spacing={10}>
                        <Grid item xs={12} >
                            <Grid container justifyContent="center" spacing={2} >
                                {[0, 1, 2].map((value) => (
                                    // <Grid key={value} item>
                                    //     <Paper
                                    //         sx={{
                                    //             height: 140,
                                    //             width: 100,
                                    //             backgroundColor: (theme) =>
                                    //                 theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    //         }}
                                    //     />
                                    //
                                    // </Grid>
                                    <PopUpCard cardInfo={algorithmCards[value]} />
                                ))}
                            </Grid>
                            <Grid container justifyContent="center" spacing={2}>
                            <VideoCard />
                            </Grid>
                            <Grid container justifyContent="center" spacing={2}>
                                {[3, 4, 5].map((value) => (
                                    // <Grid key={value} item>
                                    //     <Paper
                                    //         sx={{
                                    //             height: 140,
                                    //             width: 100,
                                    //             backgroundColor: (theme) =>
                                    //                 theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    //         }}
                                    //     />
                                    //
                                    // </Grid>
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
