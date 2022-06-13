import MuiAppBar from "@mui/material/AppBar";
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Link} from "@mui/material";
import {IconButton} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

function AppBar() {
  const {t} = useTranslation("main");

  return (
      <Box sx={{flexGrow: 1}}>
        <MuiAppBar position="static" color={"secondary"} sx={{justifyContent:"space-between"}}>
          <Toolbar>
             <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              {t("title")}
             </Typography>
              <Link href="https://github.com/PlusOneZ/Sound-Quality-HCI">
                  <IconButton>
                    <GitHubIcon />
                  </IconButton>
              </Link>
          </Toolbar>
        </MuiAppBar>
      </Box>
  )
}

export default AppBar;
