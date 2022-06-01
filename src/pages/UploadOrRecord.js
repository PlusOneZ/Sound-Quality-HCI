import Box from "@mui/material/Box";
import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import {useTranslation} from "react-i18next";
import Tab from "@mui/material/Tab";
import {Link, Outlet, useLocation} from "react-router-dom"
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

function booleanObjFromArr(arr, bool) {
  let obj = {}
  for (let i = 0; i<arr.length; i++) {
    obj[arr[i]] = bool;
  }
  return obj
}

function UploadOrRecord({uploadHandler, audio}) {
  const location = useLocation();
  const {t} = useTranslation("main");
  const availableAlgorithms = [
    "mosnet",
    "srmr",
    "bsseval",
    "pesq",
    "sisdr",
    "stoi"
  ]
  let initState = booleanObjFromArr(availableAlgorithms, false)
  initState.mosnet = true;
  const allSetState = booleanObjFromArr(availableAlgorithms, true)
  const [algorithms, setAlgorithms] = useState(initState);

  const checkAll = (expect) => {
    return availableAlgorithms.reduce((flag, algo) => {
      flag = flag && (expect ? algorithms[algo] : !algorithms[algo]);
      return flag;
    }, true)
  }

  function setAll(e) {
    if (e.target.checked) {
      setAlgorithms(allSetState)
    } else {
      setAlgorithms(initState)
    }
  }

  function handleChangeController(name) {
    return function inner(e) {
      setAlgorithms(prevState => {
        let newState = prevState
        newState[name] = e.target.checked
        return newState
      })
    }
  }

  function onUpload() {
    uploadHandler(audio)
  }

  let v = 0;
  if (location.pathname.indexOf("record") === -1) {
    v = 1
  }
  const [value, setValue] = useState(v);

  function changeValue(event, newVal) {
    setValue(newVal)
  }

  return (
      // TODO: reactive to device width
      <Box sx={{p: 2, width: "60%", m: "0 auto"}}>
        <Tabs
            value={value}
            onChange={changeValue}
            aria-label="choose to upload or record sound"
            variant={"fullWidth"}
        >
          <Tab label={t("menu.record")} component={Link} to={"record"}/>
          <Tab label={t("menu.upload")} component={Link} to={"upload"}/>
        </Tabs>
        <Outlet/>

        {audio &&
            (
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <audio controls src={audio}/>
                  <Box sx={{
                    border: "1px solid",
                    borderRadius: "5px",
                    p: 1, mt: 2
                  }} >
                    {t("hints.chooseAlgorithms")}
                    <FormControlLabel
                        label={t("descriptions.all")}
                        control={
                          <Checkbox
                              checked={checkAll(true)}
                              indeterminate={!checkAll(true) && !checkAll(false)}
                              onChange={setAll}
                          />}
                    />
                    <Box sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr"
                    }} >
                      {availableAlgorithms.map((algo) => {
                        return (
                            <FormControlLabel
                                key={algo}
                                label={algo + t('descriptions.algo')}
                                control={
                                  <Checkbox
                                      checked={algorithms[algo]}
                                      onChange={handleChangeController(algo)}
                                  />}
                            />
                        )
                      })}
                    </Box>
                  </Box>
                  <Button
                      variant="outlined"
                      sx={{mt: 2}}
                      onClick={onUpload}
                      endIcon={<SendIcon/>}
                  >
                    {t("hints.analysisButton")}
                  </Button>
                </Box>
            )
        }

        {/*  TODO: Results goes here */}
      </Box>
  )
}

export default UploadOrRecord;