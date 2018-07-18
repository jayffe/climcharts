import React from "react"
import classnames from "classnames"
import withStyles from "@material-ui/core/styles/withStyles"
import {Typography, Grid} from '@material-ui/core'
import DropZone from "react-dropzone"
import {climDemoE2} from "../utils"
import Slider, { createSliderWithTooltip }  from 'rc-slider'
import 'rc-slider/assets/index.css'
import Panel from "./Panel"
import Option from "./Option"
import TemperaturesCles from "./TemperaturesCles"
import * as d3 from "d3"
import DateRange from "./DateRange";
import Legende from "./Legende";
import PictureButton from "./PictureButton";

const SliderTooltip = createSliderWithTooltip(Slider)

class BilanClimatique extends React.Component {

  state = {
    element: null,
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

  setElement = e =>!this.state.element && this.setState({element:e})

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

  render() {

    const {climbox, options, element} = this.state
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

        <DateRange onChange={this.setOption} debut={debut} fin={fin}/>

        <PictureButton element={element} />

        <div ref={this.setElement} className={classes.graph}>

          <Typography paragraph={true} variant="display1" contentEditable={false}>Bilan climatique pour la station {climbox.station}</Typography>

          <GraphBilanClimatique
            options={options}
            json={climbox.data}
            width={960}
            height={500}/>

          <Legende colors={colors}/>

        </div>

        <Grid container justify="center" spacing={40}>

          <Grid item xs={6}>
            <TemperaturesCles tempCles={tempCles} onChange={this.setOption}/>
          </Grid>

          <Grid item xs={6}>
            <Panel titre="Options du graphique">
              <Option
                titre="Offset"
                desc="Ajout de valeurs de graduations vides pour une meilleure lisibilité">
                <SliderTooltip tipFormatter={v=>`${v} %`} value={offset} onChange={(offset)=>this.setOption({offset})} />
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
const StyledBilanClimatique = withStyles(styles)(BilanClimatique);

export default StyledBilanClimatique


/* Graph D3
-------------------------------------------------------------------------------------------------*/
d3.timeFormatDefaultLocale({
  "decimal": ",",
  "thousands": ".",
  "grouping": [3],
  "currency": ["€", ""],
  "dateTime": "%a %b %e %X %Y",
  "date": "%d.%m.%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  "shortDays": ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
  "months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  "shortMonths": ["Jan", "Fev", "Mars", "Avr", "Mai", "Juin", "Juil", "Aout", "Sep", "Oct", "Nov", "Dec"]
})

class GraphBilanClimatique extends React.Component {


  componentDidMount() {
    this.show()
  }

  componentDidUpdate() {
    this.show()
  }

  setRef = (node) => {
    this.node = node
  }

  show = () => {

    const {json, options} = this.props
    const {debut, fin, offset, dateTicks, tempCles} = options
    const data = []

    json.forEach((d) => {
      d.date = new Date(d.date)
      if (d.date >= debut && d.date <= fin)
        data.push(d)
    })

    const margin = {top: 20, right: 70, bottom: 90, left: 70}
    const width = this.props.width - margin.left - margin.right
    const height = this.props.height - margin.top - margin.bottom;
    const barWidth = 2

    const container = d3.select(this.node)

    container.selectAll("*").remove()

    const svg = container.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .style("font-family", "Roboto")

    const off = offset * .01
    const maxTemp = d3.max(data, d => d.TMaxi) + Math.abs( d3.max(data, d => d.TMaxi) * off )
    const minTemp = d3.min(data, d => d.TMini) - Math.abs( d3.min(data, d => d.TMini) * off )
    const maxPluie = d3.max(data, (d) => d.Pluie) + Math.abs(  d3.max(data, (d) => d.Pluie) * off )

    const x = d3.scaleTime().range([0, width]).domain([debut, fin])
    const y0 = d3.scaleLinear().range([height, 0]).domain([minTemp, maxTemp]);
    const y1 = d3.scaleLinear().range([height, 0]).domain([0, maxPluie]);


    const areaTMoy = d3.area()
      .x((d) => x(d.date))
      .y0((d) => y0(d.TMini))
      .y1((d) => y0(d.TMaxi))

    const lineTMoy = d3.line()
      .x((d) => x(d.date))
      .y((d) => y0(d.TMoy))

    const lineTMax = d3.line()
      .x((d) => x(d.date))
      .y((d) => y0(d.TMaxi))

    const lineTMini = d3.line()
      .x((d) => x(d.date))
      .y((d) => y0(d.TMini))


    /* Axes
    -------------------------------------------------------------------------------------------------*/

    // Abscisse (dates)
    svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(dateTicks))

      // On oriente le texte
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")

    // Axe des températures
    svg.append("g")
    //.attr("transform", "translate(0,0)")
      .attr("class", "axisLeft")
      .call(d3.axisLeft(y0))
      .selectAll("text").style("fill", "#ff8843")

    // Et sa legende
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .text("Températures (°C)")

    // Axe des pluies
    svg.append("g")
      .attr("class", "axisRight")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(d3.axisRight(y1))
      .selectAll("text").style("fill", "steelblue")

    // Et sa legende
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", width + (margin.right * .5))
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .text("Pluies (mm)");


    /* Grille pour une meilleure lecture
    -------------------------------------------------------------------------------------------------*/

    svg.append("g")
      .attr("class", "grid gridX")
      .attr("transform", "translate(0," + height + ")")
      .style("opacity", .05)
      .call(d3.axisBottom(x).tickSize(-height).tickFormat(""))

    svg.append("g")
      .attr("class", "grid gridY")
      .attr("transform", "translate( 0, 0 )")
      .style("opacity", .35)
      .call(d3.axisLeft(y0).tickSize(-width).tickFormat(""))


    /* Graph
    -------------------------------------------------------------------------------------------------*/

    // Pluie
    svg.append("g")
      .attr("class", "pluie")
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "#4682b4")
      .attr("class", "bar")
      .attr("x", (d) => x(d.date) - barWidth * .5)
      .attr("width", (d) => barWidth)
      .attr("y", (d) => y1(d.Pluie))
      .attr("height", (d) => height - y1(d.Pluie))


    // Line TMax
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("fill", "none")
      .style("stroke-width", .5)
      .style("stroke", "#ff0200")
      .attr("d", lineTMax);

    // Line TMini
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("fill", "none")
      .style("stroke-width", .5)
      .style("stroke", "#53ddff")
      .attr("d", lineTMini);

    // Area TMoy
    svg.append("path")
      .datum(data)
      .attr("class", "area")
      .style("stroke", "none")
      .style("fill", "#ffd19b")
      .style("border", "none")
      .style("fill-opacity", .35)
      .attr("d", areaTMoy)

    // Line TMoy
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .style("fill", "none")
      .style("stroke", "#ff9a5a")
      .style("stroke-width", 1.5)
      .attr("d", lineTMoy)

    // Températures clés
    tempCles.forEach((t)=>{
      svg.append("line")
        .style("stroke", t.color)
        .style("stroke-width", 2)
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y0(t.temp))
        .attr("y2", y0(t.temp))
    })

  }

  render() {

    const {width, height, json, options} = this.props
    const {debut, fin} = options

    if (!json || !debut || !fin)
      return <p>Manque des données</p>

    return <svg width={width} height={height} ref={this.setRef}/>
  }

}