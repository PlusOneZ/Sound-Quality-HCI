import * as React from 'react';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {useTranslation} from "react-i18next";
import Paper from "@mui/material/Paper";
import {Link, useLocation} from 'react-router-dom'

import CalculateIcon from '@mui/icons-material/Calculate';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
// import HistoryIcon from '@mui/icons-material/History';



function TabBar(props) {
  const {t} = useTranslation("main", { keyPrefix: "menu" });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();

  const tabs = [
    {
      label: t("algo"),
      route: "/algorithms",
      icon: <CalculateIcon />
    },
    {
      label: t("quality"),
      route: "/sound-quality-analysis/record",
      icon: <GraphicEqIcon />
    },
    {
      label: t("augment"),
      route: "/sound-denoise/record",
      icon: <AutofpsSelectIcon />
    },
    // {
    //   label: t("history"),
    //   icon: <HistoryIcon />
    // }
  ]

  let v = 0;
  for (let i = 0; i < tabs.length; i++) {
    if (location.pathname.indexOf(tabs[i].route) !== -1) {
      v = i;
    }
  }

  const [value, setValue] = React.useState(v);

  return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
      >
          {tabs.map((tab, index) => (
              <BottomNavigationAction
                  key={index}
                  label={tab.label}
                  to={tab.route}
                  icon={tab.icon}
                  component={Link}
              />
          ))}
      </BottomNavigation>
      </Paper>
  );
}

export default TabBar;