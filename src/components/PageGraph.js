import React from "react"
import classnames from "classnames"
import withStyles from "@material-ui/core/styles/withStyles"
import {TextField, Typography, Button, Grid, Paper} from '@material-ui/core'
import {CameraAlt as Camera} from "@material-ui/icons"
import BilanClimatique from "./graphs/BilanClimatique"
import DropZone from "react-dropzone"
import {formatDate, climDemoE2} from "../utils"
import html2canvas from "html2canvas"
import download from "downloadjs"


class PageGraph extends React.Component {

  state = {
    dateDebut: null,
    dateFin: null,
    climbox: null,
    colors: {
      TMoy: "#FF9A5A",
      TMax: "#FF0200",
      TMini: "#53DDFF",
      TZone: "#FFD19B",
      Pluie: "#4682b4"
    }
  }


  changeDateFin = (e) => {

    this.setState({dateFin: new Date(e.target.value)})
  }

  changeDateDebut = (e) => {

    this.setState({dateDebut: new Date(e.target.value)})
  }

  onDrop = (acceptedFiles) => {

    if (!acceptedFiles.length) return

    const reader = new FileReader()

    reader.onloadend = ()=>{
      climDemoE2(reader.result,(climbox)=>{
        this.setState({
          climbox,
          dateDebut: new Date(climbox.data[0].date),
          dateFin: new Date(climbox.data[climbox.data.length - 1].date)
        })
      })
    }
    reader.readAsText(acceptedFiles[0], "latin1")
  }

  takePicture = () => {

    const {climbox} = this.state
    //console.log(this.graph)
    html2canvas(document.getElementById("graph"), {
      logging: false
    }).then(function (canvas) {
      download(canvas.toDataURL("image/png"), `BilanClimatique-${climbox.station}.png`, "image/png");
      // window.open(canvas.toDataURL("image/png"))
    })
  }

  render() {

    const {dateDebut, dateFin, climbox, colors} = this.state
    const {classes} = this.props

    if (!climbox || !dateDebut || !dateFin)
      return (
        <DropZone disableClick={false} className={classnames(classes.root, classes.dropzone)} onDrop={this.onDrop}
                  accept="text/csv">
          <Typography paragraph={true} className={classes.form} variant="display1">Bilan Climatique</Typography>
          <Typography variant="headline">
            Déposez un fichier ".csv"<span className={classes.station}>-CLIMDEMO - Exemple 2-</span>
          </Typography>
        </DropZone>
      )


    return (

      <DropZone disableClick={true} className={classes.root} onDrop={this.onDrop} accept="text/csv">

        <form className={classes.form} noValidate>
          <TextField
            id="dateDebut"
            label="Du"
            type="date"
            onChange={this.changeDateDebut}
            value={formatDate(dateDebut)}
            className={classes.textField}
            InputLabelProps={{shrink: true}}
          />
          <TextField
            id="dateFin"
            label="Au"
            type="date"
            onChange={this.changeDateFin}
            value={formatDate(dateFin)}
            className={classes.textField}
            InputLabelProps={{shrink: true}}
          />
          <Button onClick={this.takePicture} variant="fab" color="#B0B0B0"><Camera/></Button>
        </form>

        <div id="graph" className={classes.root}>

          <Typography paragraph={true} variant="display1" contentEditable={false}>Bilan climatique pour la station {climbox.station}</Typography>

          <BilanClimatique
            debut={dateDebut}
            fin={dateFin}
            json={climbox.data}
            width={960}
            height={500}/>

          <Grid container justify="center" spacing={40}>
            {Object.keys(colors).map(key => (
              <Grid key={key} item>
                <Paper elevation={0} className={classes.paper} style={{backgroundColor:colors[key], margin:8, border: "1px solid #A2A2A2"}}/>
                <Typography style={{color:"#787878"}}>{key}</Typography>
              </Grid>
            ))}
          </Grid>

        </div>

      </DropZone>

    )
  }
}

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  root: {
    margin: "20px auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    "& *": {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  paper: {
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
  }
});
const StyledGraph = withStyles(styles)(PageGraph);

export default StyledGraph