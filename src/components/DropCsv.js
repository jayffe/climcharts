
import React from "react"
import DropZone from "react-dropzone"
import {Typography} from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import classnames from "classnames"

const DropCsv = ({titre, typecsv, children, classes, onDrop})=>{

  if(!titre)
    return (
      <DropZone disableClick={true}
                className={classes.graph}
                onDrop={onDrop}
                accept="text/csv,application/vnd.ms-excel">
        {children}
      </DropZone>
    )

  return (
    <DropZone disableClick={false}
              className={classnames(classes.graph, classes.dropzone)}
              onDrop={onDrop}
              accept="text/csv,application/vnd.ms-excel">
      <Typography paragraph={true} className={classes.form} variant="display1">{titre}</Typography>
      <Typography variant="headline">
        Déposez un fichier ".csv" <span className={classes.station}>-{typecsv}-</span>
      </Typography>
    </DropZone>
  )
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
  dropzone: {
    width: "100%",
    border: '1px dotted blue',
    minHeight: 400
  },
  form: {
    margin: 30
  }

});
const StyledDropCsv = withStyles(styles)(DropCsv)

export default StyledDropCsv