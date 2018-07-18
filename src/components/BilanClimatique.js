import React from "react"
import classnames from "classnames"
import withStyles from "@material-ui/core/styles/withStyles"
import {TextField, Typography, Button, Grid, Paper} from '@material-ui/core'
import {CameraAlt as Camera, Add} from "@material-ui/icons"
import Graph from "./graphs/GraphBilanClimatique"
import DropZone from "react-dropzone"
import {formatDate, climDemoE2} from "../utils"
import html2canvas from "html2canvas"
import download from "downloadjs"
import moment from "moment"
import Slider, { createSliderWithTooltip }  from 'rc-slider'
import 'rc-slider/assets/index.css'
import Panel from "./Panel";
import Option from "./Option";
import TemperatureCle from "./TemperatureCle";

const SliderTooltip = createSliderWithTooltip(Slider)

class BilanClimatique extends React.Component {

  state = {
    climbox: null,
    options:{
      debut: null,
      fin: null,
      offset: 10,
      dateTicks: 12,
      colors: {
        TMoy: "#FF9A5A",
        TMax: "#FF0200",
        TMini: "#53DDFF",
        TZone: "#FFD19B",
        Pluie: "#4682b4"
      },
      tempCles:[]
    },
  }

  changeDateFin = (e) => {

    const date = moment(e.target.value, "YYYY-MM-DD").utc()
    this.setOption({fin: date.toDate()})
  }

  changeDateDebut = (e) => {

    const date = moment(e.target.value, "YYYY-MM-DD").utc()
    this.setOption({debut: date.toDate()})
  }

  changeOffset = (offset) => {

    this.setOption({offset})
  }

  setOption = ( option )=>{

    const {options} = this.state
    this.setState({options:{...options, ...option}})
  }

  onDrop = (acceptedFiles, rejected) => {

    if (!acceptedFiles.length) return

    const reader = new FileReader()

    reader.onloadend = ()=>{
      climDemoE2(reader.result,(climbox)=>{
        this.setState({climbox})
        this.setOption({
          debut: new Date(climbox.data[0].date),
          fin: new Date(climbox.data[climbox.data.length - 1].date)
        })
      })
    }
    reader.readAsText(acceptedFiles[0], "latin1")
  }

  takePicture = () => {

    const {climbox} = this.state

    html2canvas(document.getElementById("graph"), {
      logging: false
    }).then(function (canvas) {
      download(canvas.toDataURL("image/png"), `BilanClimatique-${climbox.station}.png`, "image/png");
    })
  }

  changeTempCle = (i, key, value)=>{

    let {tempCles} = this.state.options

    tempCles[i][key] = value
    this.setOption({ tempCles })
  }

  addTempCle= ()=>{
    let {tempCles} = this.state.options

    tempCles.push({
      temp: 20,
      color: "#000000",
      label: "",
      side: "left"
    })
    this.setOption({ tempCles })
  }

  removeTempCle = (i)=>{

    let {tempCles} = this.state.options
    tempCles.splice(i,1)
    this.setOption({ tempCles })
  }

  render() {

    const {climbox, options} = this.state
    const {debut, fin, colors, offset, tempCles} = options
    const {classes} = this.props

    if (!climbox || !debut || !fin)
      return (
        <DropZone disableClick={false} className={classnames(classes.graph, classes.dropzone)} onDrop={this.onDrop}
                  accept="text/csv,application/vnd.ms-excel">
          <Typography paragraph={true} className={classes.form} variant="display1">Bilan Climatique</Typography>
          <Typography variant="headline">
            Déposez un fichier ".csv"<span className={classes.station}>-CLIMDEMO - Exemple 2-</span>
          </Typography>
        </DropZone>
      )

    return (

      <DropZone disableClick={true} className={classes.graph} onDrop={this.onDrop} accept="text/csv,application/vnd.ms-excel">

        <form className={classes.form} noValidate>
          <TextField
            id="dateDebut"
            label="Du"
            type="date"
            onChange={this.changeDateDebut}
            value={formatDate(debut)}
            className={classes.textField}
            InputLabelProps={{shrink: true}}
          />
          <TextField
            id="dateFin"
            label="Au"
            type="date"
            onChange={this.changeDateFin}
            value={formatDate(fin)}
            className={classes.textField}
            InputLabelProps={{shrink: true}}
          />
          <Button onClick={this.takePicture} variant="fab"><Camera/></Button>
        </form>

        <div id="graph" className={classes.graph}>

          <Typography paragraph={true} variant="display1" contentEditable={false}>Bilan climatique pour la station {climbox.station}</Typography>

          <Graph
            options={options}
            json={climbox.data}
            width={960}
            height={500}/>

          <Grid container justify="center" spacing={40}>
            {Object.keys(colors).map(key => (
              <Grid key={key} item>
                <Paper elevation={0} className={classes.legend} style={{backgroundColor:options.colors[key], margin:8, border: "1px solid #A2A2A2"}}/>
                <Typography style={{color:"#787878"}}>{key}</Typography>
              </Grid>
            ))}
          </Grid>

        </div>

        <Grid container justify="center" spacing={40}>

          <Grid item xs={6}>
            <Panel titre="Températures clés">
              <Button className={classes.addTemp} onClick={this.addTempCle} variant="fab"><Add/></Button>
                {tempCles.map((d,i)=>(
                  <TemperatureCle
                    i={i}
                    onChange={this.changeTempCle}
                    remove={this.removeTempCle}
                    temp={d.temp}
                    label={d.label}
                    color={d.color}
                  />
                ))}
            </Panel>
          </Grid>

          <Grid item xs={6}>
            <Panel titre="Options du graphique">
              <Option
                titre="Offset"
                desc="Ajout de valeurs de graduations vides pour une meilleure lisibilité">
                <SliderTooltip tipFormatter={v=>`${v} %`} value={offset} onChange={this.changeOffset} />
              </Option>
            </Panel>
          </Grid>

        </Grid>


      </DropZone>

    )
  }
}

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  graph: {
    margin: "0 auto",
    marginBottom: 30,
    width: 960,
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
  },
  legend: {
    height: 20,
    width: 20,
  },
  station: {
    color: "#4682b4"
  },
  textField: {
    width: 200
  },
  dropzone: {
    width: "100%",
    border: '1px dotted blue',
    minHeight: 400
  },
  form: {
    margin: 30
  },
  addTemp:{
    position : "absolute",
    top: 8,
    right: 20,
    width: 35,
    height: 10
  }
});
const StyledBilanClimatique = withStyles(styles)(BilanClimatique);

export default StyledBilanClimatique