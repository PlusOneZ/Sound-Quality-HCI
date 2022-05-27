import {createTheme,ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container"
import {CssBaseline} from "@mui/material";
import MainFeaturedPost from "../components/MainFeaturePost";

//TODO: add i18n

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
};


const theme = createTheme()

export default function IntroPage(){
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />

                </main>
            </Container>
        </ThemeProvider>
    )
}
