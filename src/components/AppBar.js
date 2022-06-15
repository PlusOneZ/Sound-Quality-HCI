import MuiAppBar from "@mui/material/AppBar";
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Link} from "@mui/material";
import {IconButton} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import i18n from "i18next";
import TranslateIcon from '@mui/icons-material/Translate';

function AppBar() {
  const {t} = useTranslation("main");

  function changeLang() {
    let currentLang = i18n.language;
    if (currentLang === 'en') {
      i18n.changeLanguage('zh');
      document.title = t('title')
    } else {
      i18n.changeLanguage('en');
      document.title = t('title')
    }
  }

  return (
      <Box sx={{flexGrow: 1}}>
        <MuiAppBar position="static" color={"primary"} sx={{justifyContent:"space-between"}}>
          <Toolbar>
             <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              {t("title")}
             </Typography>
            <IconButton
                variant="outlined"
                onClick={changeLang}
            >
              <TranslateIcon />
            </IconButton>
              <Link href="https://github.com/PlusOneZ/Sound-Quality-HCI">
                  <IconButton >
                    <GitHubIcon />
                  </IconButton>
              </Link>
          </Toolbar>
        </MuiAppBar>
      </Box>
  )
}

export default AppBar;
