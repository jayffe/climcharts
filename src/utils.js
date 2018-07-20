import * as csv from "csv-string"
import moment from "moment"
import 'moment/locale/fr'

export const formatDate = (d) => {

  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


export const climDemoE2 = (file, cb) => {

  csv.readAll(file, csv.detect(file), (csvLines) => {

    const firstDataLine = 7
    let data = []
    const station = csvLines[2][2]

    const joursFR = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
    const joursEN = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    const isFR = new RegExp( joursFR.join( "|" ), "i").test(csvLines[firstDataLine][0])


    let fDate = isFR ? "DD/MM/YYYY" : "MM/DD/YYYY"
    let jours = isFR ? joursFR : joursEN

    const regex = new RegExp( jours.join( "|" ), "i")

    csvLines
      .filter((line) => (regex.test(line[0])))
      .forEach((line) => {

        const date = moment(line[1], fDate).utc()

        data.push({
          Jour: line[0],
          DateFromCsv: line[1],
          date,
          TMini: +line[2],
          TMaxi: +line[3],
          TMoy: +line[4],
          Pluie: +line[5],
          ETP: +line[6],
          RgJoules: +line[7],
          Insolation: +line[8],
          VT: +line[9],
          UN: +line[10],
          UX: +line[11],
          UM: +line[12],
        })
      })

    const json = {
      data,
      station
    }

    cb(json)

  })
}

