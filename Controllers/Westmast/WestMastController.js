const excelToJson = require('convert-excel-to-json')
const moment = require('moment')
const fsExtra = require('fs-extra')
const fs = require('fs')
const headfees = JSON.parse(fs.readFileSync('./headfees.json'))
const playerCount = JSON.parse(fs.readFileSync('./playersCount.json'))
const xl = require('excel4node')
const wb = new xl.Workbook()
const ws = wb.addWorksheet('WESTMAST')
const JSONdb = require('simple-json-db')
const db = new JSONdb('./Controllers/Westmast/db.json')

exports.getIndex = (req,res) => {
    res.render("westmast")
}

exports.getCalculatedData = (req,res) => {

    // const datePeriod = `${moment(req.body.startDate).format("MM/DD")} - ${moment(req.body.endDate).format("MM/DD")}`
    const datePeriod = `${moment().startOf("isoweek").add(1, "day").format("MM/DD")} - ${moment().startOf("isoweek").add(7, "days").format("MM/DD")}`

    // Getting Data from DB
    const dbData = db.JSON().data !== '' ? JSON.parse(db.JSON().data) : null
    
    const result = excelToJson({
        sourceFile: `./uploads/${req.file.originalname}`
    })

    const totalAmountOfWeek = result[Object.keys(result)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const scooterTotal = totalAmountOfWeek / 2
    const westMastTotal = totalAmountOfWeek / 2
    const headFees = (playerCount.find((x) => x.agentName === "WESTMAST") && headfees.hasOwnProperty("WESTMAST")) ? parseFloat(headfees["WESTMAST"] * playerCount.find((x) => x.agentName === "WESTMAST")["playersCount"]).toFixed(2) : 0
    const scooterNet = scooterTotal - headFees
    const westMastHF = (playerCount.find((x) => x.agentName === "WESTMAST") && headfees["AgentsPPH"].hasOwnProperty("WESTMAST")) ? parseFloat(headfees["AgentsPPH"]["WESTMAST"] * playerCount.find((x) => x.agentName === "WESTMAST")["playersCount"]).toFixed(2) : 0
    const westMastNet = westMastTotal - westMastHF

    const data = {
        "date": datePeriod.toString(),
        "total": totalAmountOfWeek,
        "scooterTotal": scooterTotal,
        "westMastTotal": westMastTotal,
        "westMastHF": westMastHF,
        "westMastNet": westMastNet,
        "headFees": headFees,
        "scooterNet": scooterNet
    }

    // Persisting data on DB
    if (dbData) db.set('data', JSON.stringify([...dbData, data]))
    else db.set('data', JSON.stringify([data]))


    const headingColumnNames = [
        "Date",
        "Total",
        "Scooter Total",
        "WestMast Total",
        "WestMast HF",
        "WestMast Net",
        "Head Fees",
        "Scooter Net"
    ]

    const dataToBeWrittenToExcel = dbData !== null ? [...dbData, data] : [data]

    // Setting style for data
    for (let i = 1; i <= dataToBeWrittenToExcel.length; i++) {
        headingColumnNames.forEach((x, j) => {
            ws.cell(i + 1, j + 1).style({ alignment: { horizontal: "center" } })
        })
    }
    dataToBeWrittenToExcel.forEach((x, i) => {
        ws.cell(1, i + 1).style({ font: { size: 13, bold: true, }, alignment: { horizontal: "center" } })
    })

    // Setting Heading Column Style
    ws.row(1).setHeight(20)
    headingColumnNames.forEach((x, i) => {
        ws.cell(1, i + 1).style({ font: { size: 13, bold: true, }, alignment: { horizontal: "center" } })
    })

    // Setting width for excel file
    headingColumnNames.forEach((x, i) => {
        if (i === 0) ws.column(i + 1).setWidth(25)
        else ws.column(i + 1).setWidth(20)
    })


    //Write Column Title in Excel file
    let headingColumnIndex = 1
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++)
            .string(heading)
    })

    //Write Data in Excel file
    let rowIndex = 2
    dataToBeWrittenToExcel.forEach( record => {
        let columnIndex = 1
        Object.keys(record ).forEach(columnName => {
            if (columnIndex !== 1) {
                if (parseInt(record[columnName]) >= 0) ws.cell(rowIndex, columnIndex).style({ font: { color: "#2a753e" } })
                else ws.cell(rowIndex, columnIndex).style({ font: { color: "#ff2626" } })
            }
            if (columnName !== "date") ws.cell(rowIndex,columnIndex++).number(parseFloat(record[columnName]))
            else ws.cell(rowIndex,columnIndex++).string(record[columnName])
        })
        rowIndex++
    }) 

    wb.write('./uploads/westmast.xlsx', (err, stat) => {
        res.download('./uploads/westmast.xlsx', (err) => {
            fsExtra.removeSync("./uploads/westmast.xlsx")
            fsExtra.removeSync(`./uploads/${req.file.originalname}`)
        })
    })

}
  