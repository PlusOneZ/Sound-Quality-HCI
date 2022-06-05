import MuiAppBar from "@mui/material/AppBar";
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function AppBar() {
  const {t} = useTranslation("main");

  return (
      <Box sx={{flexGrow: 1}}>
        <MuiAppBar position="static" color={"secondary"}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              {t("title")}
            </Typography>
          </Toolbar>
        </MuiAppBar>
      </Box>
  )
}

export default AppBar;