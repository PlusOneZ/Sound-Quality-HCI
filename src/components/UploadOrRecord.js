import Box from "@mui/material/Box";
import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import {useTranslation} from "react-i18next";
import Tab from "@mui/material/Tab";
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`audio-tab-${index}`}
          aria-labelledby={`tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{ p: 3 }}>
              {children}
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function UploadOrRecord(props) {
  const [value, setValue] = useState(0);
  const {t} = useTranslation("main", { keyPrefix: "menu" });

  function changeValue(event, newVal) {
    setValue(newVal)
  }

  return (
      <Box>
        <Tabs value={value} onChange={changeValue} aria-label="choose to upload or record sound">
          <Tab label={t("record")} />
          <Tab label={t("upload")} />
        </Tabs>
        <TabPanel index={value} value={0} >
        {/*  Record UI here */}
        </TabPanel>
        <TabPanel index={value} value={0} >
        {/*  Upload UI here*/}
        </TabPanel>
      </Box>
  )
}

export default UploadOrRecord;