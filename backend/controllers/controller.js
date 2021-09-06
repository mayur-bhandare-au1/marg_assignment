const fs = require("fs");
const csv = require('fast-csv');
let Medicines = require('../models/model');
const index = (req, res) => {
    res.send("Hello");
}

const uploadCSV = (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send({

                message: "Please Upload CSV file"
            })
        }

        let csvData = [];
        let filePath = __basedir + '/uploads/' + req.file.filename;
        console.log(filePath)
        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                csvData.push(row);
            })
            .on("end", () => {
                Medicines.collection.insertMany(csvData, function(err, docs) {
                    if (docs) {
                        res.status(200).send({

                            message: "Uploading CSV Sucess"
                        });
                    } else {
                        res.status(500).send({
                            message: "Uploading CSV Failed"
                        })
                    }

                });

            })

    } catch (err) {
        console.log(err)
    }

}

const getAll = (req, res) => {

    Medicines.find({}, function(err, results) {
        if (results) {
            res.status(200).send(results);
        } else {

            res.status(400).send({ message: "Unable to fecth medicnes" })
        }

    });
}

module.exports = {
    index,
    uploadCSV,
    getAll
}