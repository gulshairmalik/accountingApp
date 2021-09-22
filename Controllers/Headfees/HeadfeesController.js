const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const fsExtra = require('fs-extra')

exports.getIndex = (req,res) => {
    res.render("headfees")
}

exports.getHeadFeesCalculated = (req,res) => {

    const result = excelToJson({
        sourceFile: `./uploads/${req.file.originalname}`
    })

    const playersCount = result[Object.keys(result)[0]].filter((x, i) => i !== 0).map((y) => { return { agentName: y["A"], playersCount: y["H"] } })
    fs.writeFile('playersCount.json', JSON.stringify(playersCount), 'utf8', () => {
        fsExtra.removeSync(`./uploads/${req.file.originalname}`)
        res.sendStatus(200)
    })
}
  