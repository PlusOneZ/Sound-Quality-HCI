import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CalculateIcon from '@mui/icons-material/Calculate';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
import HistoryIcon from '@mui/icons-material/History';
import {useTranslation} from "react-i18next";

function a11yProps(index) {
  return {
    id: `app-tab-bar-${index}`,
    'aria-controls': `app-tab-panel-${index}`,
  };
}


function TabBar(props) {
  const {t} = useTranslation("main", { keyPrefix: "menu" });
  const [value, setValue] = React.useState(0);

  const tabs = [
    {
      label: t("algo"),
      icon: <CalculateIcon />
    },
    {
      label: t("record"),
      icon: <GraphicEqIcon />
    },
    {
      label: t("score"),
      icon: <AutofpsSelectIcon />
    },
    {
      label: t("history"),
      icon: <HistoryIcon />
    }
  ]

  const handleChange = (event, newValue) => {
    // TODO: set url
    setValue(newValue);
  };
  return (
      <AppBar position={"fixed"} sx={{top: "auto", bottom: 0, pb: 1}}>
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
        >
          {tabs.map((tab, index) => (
              <Tab
                  key={index}
                  label={tab.label}
                  icon={tab.icon}
                  {...a11yProps(index)}
              />
          ))}
        </Tabs>
      </AppBar>
  );
}

export default TabBar;