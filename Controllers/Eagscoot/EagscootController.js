const excelToJson = require('convert-excel-to-json')
const moment = require('moment')
const fsExtra = require('fs-extra')
const fs = require('fs')
const headfees = JSON.parse(fs.readFileSync('./headfees.json'))
const playerCount = JSON.parse(fs.readFileSync('./playersCount.json'))
const xl = require('excel4node')
const wb = new xl.Workbook()
const ws = wb.addWorksheet('EAGSCOOT')
const JSONdb = require('simple-json-db')
const db = new JSONdb('./Controllers/Eagscoot/db.json')
const db1 = new JSONdb('./Controllers/Eagscoot/db1.json')
const db2 = new JSONdb('./Controllers/Eagscoot/db2.json')
const db3 = new JSONdb('./Controllers/Eagscoot/db3.json')

exports.getIndex = (req,res) => {
    res.render("eagscoot")
}

exports.getCalculatedData = (req,res) => {

    const datePeriod = `${moment(req.body.startDate).format("MM/DD")} - ${moment(req.body.endDate).format("MM/DD")}`

    // Getting Data from DB
    const dbData = db.JSON().data !== '' ? JSON.parse(db.JSON().data) : null

    // Getting Data from DB for Barcoon50
    const dbData1 = db1.JSON().data !== '' ? JSON.parse(db1.JSON().data) : null
    
    const result1 = excelToJson({
        sourceFile: `./uploads/${req.files.file1[0].originalname}`
    })

    const totalAmountOfWeek1 = result1[Object.keys(result1)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const scooterTotal1 = totalAmountOfWeek1 / 2
    const awhaleTotal = totalAmountOfWeek1 / 2
    const scooterNet1 = scooterTotal1

    const data1 = {
        "date": datePeriod.toString(),
        "total": totalAmountOfWeek1,
        "scooterTotal": scooterTotal1,
        "awhaleTotal": awhaleTotal,
        "scooterNet": scooterNet1
    }

    // Persisting data on DB
    if (dbData1) db1.set('data', JSON.stringify([...dbData1, data1]))
    else db1.set('data', JSON.stringify([data1]))

    // Getting Data from DB For Nictex
    const dbData2 = db2.JSON().data !== '' ? JSON.parse(db2.JSON().data) : null
        
    const result2 = excelToJson({
        sourceFile: `./uploads/${req.files.file2[0].originalname}`
    })

    const totalAmountOfWeek2 = result2[Object.keys(result2)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const scooterTotal2 = totalAmountOfWeek2 / 2
    const highrollerTotal = totalAmountOfWeek2 / 2
    const scooterNet2 = scooterTotal2

    const data2 = {
        "date": datePeriod.toString(),
        "total": totalAmountOfWeek2,
        "scooterTotal": scooterTotal2,
        "highrollerTotal": highrollerTotal,
        "scooterNet": scooterNet2
    }

    // Persisting data on DB
    if (dbData2) db2.set('data', JSON.stringify([...dbData2, data2]))
    else db2.set('data', JSON.stringify([data2]))


    // Getting Data from DB For Ticonico
    const dbData3 = db3.JSON().data !== '' ? JSON.parse(db3.JSON().data) : null
        
    const result3 = excelToJson({
        sourceFile: `./uploads/${req.files.file3[0].originalname}`
    })

    const totalAmountOfWeek3 = result3[Object.keys(result3)[0]].filter((x, i) => i !== 0).map((y) => y["F"]).reduce((a, b) => a + b, 0)
    const scooterTotal3 = totalAmountOfWeek3 / 2
    const lowrollerTotal = totalAmountOfWeek3 / 2
    const scooterNet3 = scooterTotal3

    const data3 = {
        "date": datePeriod.toString(),
        "total": totalAmountOfWeek3,
        "scooterTotal": scooterTotal3,
        "lowrollerTotal": lowrollerTotal,
        "scooterNet": scooterNet3
    }

    // Persisting data on DB
    if (dbData3) db3.set('data', JSON.stringify([...dbData3, data3]))
    else db3.set('data', JSON.stringify([data3]))

    const headFees = (playerCount.find((x) => x.agentName === "EAGSCOOT") && headfees.hasOwnProperty("EAGSCOOT")) ? parseFloat(headfees["EAGSCOOT"] * playerCount.find((x) => x.agentName === "EAGSCOOT")["playersCount"]).toFixed(2) : 0
    const eagscootHF = (playerCount.find((x) => x.agentName === "EAGSCOOT") && headfees["AgentsPPH"].hasOwnProperty("EAGSCOOT")) ? parseFloat(headfees["AgentsPPH"]["EAGSCOOT"] * playerCount.find((x) => x.agentName === "EAGSCOOT")["playersCount"]).toFixed(2) : 0

    const headingColumnNames = [
        "Date",
        "Total",
        "Scooter Total",
        "Awhale Total",
        "Scooter Net",
        "",
        "EagScoot HF",
        "Head Fees",
        "Combined Scooter Net",
        "",
        "Date",
        "Total",
        "Scooter Total",
        "HighRoller Total",
        "Scooter Net",
        "",
        "Date",
        "Total",
        "Scooter Total",
        "LowRoller Total",
        "Scooter Net",
    ]

    const data = {
        "date": datePeriod.toString(),
        "total": totalAmountOfWeek1,
        "scooterTotal": scooterTotal1,
        "awhaleTotal": awhaleTotal,
        "scooterNet": scooterNet1,
        "null": "",
        "eagscootHF": eagscootHF,
        "headFees": headFees,
        "combinedScooterNet": (parseInt(scooterNet1) + parseInt(scooterNet2) + parseInt(scooterNet3) - headFees).toFixed(2),
        "null1": "",
        "date1": datePeriod.toString(),
        "total1": totalAmountOfWeek2,
        "scooterTotal1": scooterTotal2,
        "highrollerTotal": highrollerTotal,
        "scooterNet1": scooterNet2,
        "null2": "",
        "date2": datePeriod.toString(),
        "total2": totalAmountOfWeek3,
        "scooterTotal2": scooterTotal3,
        "lowrollerTotal": lowrollerTotal,
        "scooterNet2": scooterNet3
    }

    // Persisting data on DB
    if (dbData) db.set('data', JSON.stringify([...dbData, data]))
    else db.set('data', JSON.stringify([data]))


    const dataToBeWrittenToExcel = dbData !== null ? [...dbData, data] : [data]


    // Setting style for Woddy19 Data
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
        if (i === 0) ws.column(i + 1).setWidth(12)
        else if (i === 1) ws.column(i + 1).setWidth(12)
        else if (i === 7) ws.column(i + 1).setWidth(12)
        else if (i === 8) ws.column(i + 1).setWidth(25)
        else if (i === 10) ws.column(i + 1).setWidth(12)
        else if (i === 11) ws.column(i + 1).setWidth(12)
        else if (i === 16) ws.column(i + 1).setWidth(12)
        else if (i === 17) ws.column(i + 1).setWidth(12)
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
            if (![1, 6, 10, 11, 16, 17].includes(columnIndex)) {
                if (parseInt(record[columnName]) >= 0) ws.cell(rowIndex, columnIndex).style({ font: { color: "#2a753e" } })
                else ws.cell(rowIndex, columnIndex).style({ font: { color: "#ff2626" } })
            }
            if (columnName === "date" || columnName === "date1" || columnName === "date2" || columnName === "null" || columnName === "null1" || columnName === "null2") ws.cell(rowIndex,columnIndex++).string(record[columnName])
            else ws.cell(rowIndex,columnIndex++).number(parseFloat(record[columnName]))
        })
        rowIndex++
    }) 

    wb.write('./uploads/eagscoot.xlsx', (err, stat) => {
        res.download('./uploads/eagscoot.xlsx', (err) => {
            fsExtra.removeSync("./uploads/eagscoot.xlsx")
            fsExtra.removeSync(`./uploads/${req.files.file1[0].originalname}`)
            fsExtra.removeSync(`./uploads/${req.files.file2[0].originalname}`)
            fsExtra.removeSync(`./uploads/${req.files.file3[0].originalname}`)
        })
    })

}