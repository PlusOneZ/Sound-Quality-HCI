import {Checkbox, FormControlLabel} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const availableAlgorithms = [
  "mosnet",
  "srmr",
  "bsseval",
  "pesq",
  "sisdr",
  "stoi"
]

function booleanObjFromArr(arr, bool) {
  let obj = {}
  for (let i = 0; i<arr.length; i++) {
    obj[arr[i]] = bool;
  }
  return obj
}

const allFalseState = booleanObjFromArr(availableAlgorithms, false)
const initState = {...allFalseState, mosnet: true}

function AlgorithmSelection({callBack, mode}) {
  const {t} = useTranslation("main");
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
      callBack(allSetState)
    } else {
      setAlgorithms(allFalseState)
      callBack(allFalseState)
    }
  }

  function handleChangeController(name) {
    return function inner(e) {
      setAlgorithms(prevState => {
        let newState = {...prevState}
        newState[name] = e.target.checked
        callBack(newState)
        return newState
      })
    }
  }

  return (
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
            if (mode === "RECORD" && (algo === "bsseval" || algo === "pesq"))
              return (<Box sx={{display: "none"}} key={algo}></Box>);
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
  )
}

export {AlgorithmSelection, availableAlgorithms, initState}