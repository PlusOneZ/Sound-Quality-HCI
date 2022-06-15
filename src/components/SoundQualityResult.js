import ReactECharts from "echarts-for-react";
import {availableAlgorithms} from "./AlgorithmSelection";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';


const mockedData = {
  "bsseval": {
    "avgScore": 49.2513,
    "score": {
      "isr": [
        48.58202895299484,
        48.51845450137591,
        48.71872628487888,
        48.522052293724045,
        48.54494387541641,
        48.37160654736623,
        48.342660275008676,
        48.52361344677916,
        48.28629152593855,
        48.774238295967734,
        48.71583437192488,
        47.820511998532126,
        48.241787997088785,
        47.966654318585185
      ],
      "sar": [
        59.87368109297212,
        58.75310539058073,
        56.134283660916296,
        60.003924436872595,
        60.32985072963936,
        59.487150772793456,
        58.738264355094955,
        62.08679920778116,
        33.77250229382492,
        50.548818736660834,
        58.95604722201544,
        58.65646532192321,
        60.313843235665956,
        58.74325054681127
      ],
      "sdr": [
        49.46840751981597,
        49.6473850281849,
        48.644274523037154,
        49.00052443909172,
        49.164294894169565,
        49.79239773802789,
        49.82209568006851,
        49.43500912057581,
        33.319109140530955,
        46.505960614976715,
        49.38680445943939,
        49.331572611392794,
        49.51174189381451,
        48.93867637065253
      ]
    },
    "time": 8609.375
  },
  "mosnet": {
    "avgScore": 3.7317068917410716,
    "score": [
      3.6321489810943604,
      3.861367702484131,
      3.4525816440582275,
      4.094010829925537,
      3.802400588989258,
      3.5387372970581055,
      3.5034596920013428,
      3.1659483909606934,
      3.4220223426818848,
      4.071146011352539,
      3.2239973545074463,
      3.8648972511291504,
      4.566028118133545,
      4.045150279998779
    ],
    "time": 10796.875
  },
  "pesq": {
    "avgScore": 4.642327581133161,
    "score": [
      4.643880367279053,
      4.643888473510742,
      4.642822742462158,
      4.643771171569824,
      4.642657279968262,
      4.64280891418457,
      4.643807888031006,
      4.641385555267334,
      4.631412982940674,
      4.643867492675781,
      4.6413750648498535,
      4.643274784088135,
      4.643888473510742,
      4.643744945526123
    ],
    "time": 7140.625
  },
  "sisdr": {
    "avgScore": 57.74351770770895,
    "score": [
      60.863826242733964,
      61.498627300376455,
      55.61616716961049,
      59.555965318847356,
      60.58719114658614,
      60.81190795017009,
      59.68326849263299,
      64.20245694496747,
      33.895161824318656,
      50.144254449396385,
      56.60873384310888,
      62.11004092371512,
      62.40563897158643,
      60.42600732987484
    ],
    "time": 5390.625
  },
  "srmr": {
    "avgScore": 4.458021706897024,
    "score": [
      4.778388832721726,
      4.439111179150384,
      5.197028544267056,
      3.5617396090781503,
      5.281827442771843,
      5.594592891146886,
      4.6950948188235,
      3.1967678883425727,
      3.076317182836973,
      3.2729722834753208,
      5.0885436784923055,
      4.742939689786579,
      3.0733630970950667,
      6.413616758569973
    ],
    "time": 1468.75
  },
  "stoi": {
    "avgScore": 0.999945270803565,
    "score": [
      0.9999998916472654,
      0.9999998591261258,
      0.9999976056210689,
      0.9999991782353267,
      0.9999995255683473,
      0.999999941293113,
      0.9999998784436394,
      0.9999998570466945,
      0.9992561464237323,
      0.9999843080458238,
      0.9999998553426749,
      0.9999991933165636,
      0.9999997245741501,
      0.9999988265653845
    ],
    "time": 3734.375
  }
}

const HtmlTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

function QualityRating({algoName, max, rating}) {
  const {t} = useTranslation("main")
  console.log(algoName, rating / max * 5)
  return (
      <Box sx={{ml: 10}}>
        <HtmlTooltip
            title={
          <>{max === 'db' ?
              <Typography variant={"p"} >
                {t("scoreDescription.db") }
              </Typography> :
              (max === 1) ? (
                  <Typography variant={"p"} >
                    {t("scoreDescription.dimensionless") }
                  </Typography>
              ) : (
                  <Box sx={{display: "block"}}>
                    <Typography variant={"p"} >
                      {t("scoreDescription.five-metric") }
                    </Typography>
                    <br/>
                    <Typography variant={"p"} >
                      {t("scoreDescription.excellent-5") }
                    </Typography>
                    <br/>
                    <Typography variant={"p"} >
                      {t("scoreDescription.good-5") }
                    </Typography>
                    <br/>
                    <Typography variant={"p"} >
                      {t("scoreDescription.medium-5") }
                    </Typography>
                    <br/>
                    <Typography variant={"p"} >
                      {t("scoreDescription.bad-5") }
                    </Typography>
                    <br/>
                    <Typography variant={"p"} >
                      {t("scoreDescription.worse-5") }
                    </Typography>
                  </Box>
              )
          }
          </>
            }
        >
          <Typography component="legend">
            {t("hints.overallScoreOfAlgo")}({algoName}): {rating.toFixed(3)}/{max}
          </Typography>
          {/*<Rating name={algoName + "-rating"} value={rating} max={max} readOnly/>*/}
        </HtmlTooltip>
      </Box>
  )
}

function CircularProgressWithLabel({rating, max}) {
  const value = Math.round(rating / max * 100)
  return (
      <Box sx={{position: 'relative', display: 'inline-flex', ml: 10, mt: 2}}>
        <CircularProgress variant="determinate" value={value} size={'4em'}/>
        <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
        >
          <Typography variant="caption" component="div">
            {`${rating.toFixed(2)} / ${max}`}
          </Typography>
        </Box>
      </Box>
  );
}

function SoundQualityResult({data, loading}) {
  const {t} = useTranslation("main")

  function getTimeConsumptionBar(data) {
    let algoList = []
    let dataList = []
    for (let i = 0; i < availableAlgorithms.length; i++) {
      if (data[availableAlgorithms[i]]) {
        algoList.push(availableAlgorithms[i])
        dataList.push(data[availableAlgorithms[i]].time)
      }
    }
    return {
      title: [
        {
          text: t("hints.timeConsumptionTitle"),
          left: 'center'
        },
      ],
      xAxis: {
        data: algoList
      },
      yAxis: {
        type: 'value',
        splitArea: {
          show: true
        },
        title: "time/ms"
      },
      series: [
        {
          type: 'bar',
          data: dataList
        }
      ]
    };
  }

  function getBoxOption(title, dataset, columnNames, granu = 5) {
    return {
      title: [
        {
          text: `${t("hints.qualityResultOfAlgo")} ${title}`,
          left: 'center'
        },
      ],
      dataset: [
        {
          source: dataset
        },
        {
          transform: {
            type: 'boxplot',
          }
        },
        {
          fromDatasetIndex: 1,
          fromTransformResult: 1
        }
      ],
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: false
        },
        splitLine: {
          show: true
        },
        axisLabel: {
          formatter: function (value) {
            return columnNames[value]
          }
        }
      },
      yAxis: {
        type: 'value',
        splitArea: {
          show: true
        },
        splitLine: {
          show: true
        },
        max: Math.ceil(Math.max(
            ...dataset.reduce((prev, val) => prev.concat(val), [])
        ) / granu) * granu,
        min: Math.floor(Math.min(
            ...dataset.reduce((prev, val) => prev.concat(val), [])
        ) / granu) * granu,
      },
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          datasetIndex: 1
        },
        {
          name: 'outlier',
          type: 'scatter',
          datasetIndex: 2
        }
      ]
    }
  }

  let timeBarOptions = null
  if (data) {
    timeBarOptions = getTimeConsumptionBar(data)
  }

  return (
      <Box sx={{mt: 10}}>
        {loading ?
            <Box sx={{textAlign: "center"}}>
              <CircularProgress/>
            </Box>
            :
            <>
              <Typography variant={"h2"} sx={{textAlign: "center"}}>
                {t("hints.qualityResultTitle")}
              </Typography>
              <Box sx={{height: 2}}> &nbsp; </Box>
              {data.bsseval &&
                  <>
                    <ReactECharts option={getBoxOption(
                        "bsseval",
                        [
                          data.bsseval.score.isr,
                          data.bsseval.score.sar,
                          data.bsseval.score.sdr
                        ],
                        ["isr", "sar", "sdr"]
                    )}/>
                    <QualityRating
                        algoName={"bsseval"}
                        rating={data.bsseval.avgScore}
                        max={"db"}
                        precision={0.5}
                    />
                  </>
              }
              <Box sx={{display: "flex", flexWrap: "wrap", mt: 5}}>
                {
                  [
                    {algo: "mosnet", max: 5},
                    {algo: "srmr", max: 5},
                    {algo: "pesq", max: 5},
                    {algo: "sisdr", max: "db"},
                    {algo: "stoi", max: 1}
                  ].map(({algo, max}) => {
                    return (<Box key={algo} sx={{width: "50%"}}>
                      {data[algo] &&
                          <>
                            <ReactECharts option={getBoxOption(
                                algo,
                                [data[algo].score],
                                ["overall"],
                                (algo === "pesq" ? 1e-2 : (algo === "stoi" ? 1e-7 : 5))
                            )}/>
                            <QualityRating
                                algoName={algo}
                                rating={data[algo].avgScore}
                                max={max}
                                precision={0.5}
                            />
                            {algo !== "sisdr" &&
                                <CircularProgressWithLabel
                                    rating={data[algo].avgScore}
                                    max={max}
                                />
                            }
                            <Box sx={{height: 4, pt: 2, mt: 4}}> &nbsp; </Box>
                          </>
                      }
                    </Box>)
                  })
                }
              </Box>
              <ReactECharts option={timeBarOptions}/>
            </>
        }
        <Box sx={{height: 4, pt: 2, mt: 4}}> &nbsp; </Box>
      </Box>
  )
}

export default SoundQualityResult;
export {mockedData}
