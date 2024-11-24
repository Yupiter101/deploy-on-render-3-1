


const mongoose = require("mongoose");

const app = require("./app.js");



// const {URI} = require("./config.js");

const {URI} = process.env;
// const URI = myURI;
// const URI = "mongodb+srv://Yupiter:Jwg3Pwfpx9XQLEYn@cluster0.b743s.mongodb.net/books_reader?retryWrites=true&w=majority&appName=Cluster0";


// console.log(process.env); // обэкт налаштування мого пк

mongoose.connect(URI)
    .then(()=> {
        console.log("Database Connected secsess!!!");
        app.listen(3000, () => {
            console.log("Server L3_1_serv 3000 run")
        })
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1); // примусове закриття фонових прграм
    });






// app.listen(3000, () => {
//     console.log("Server Git-3_1 3000 run")
// })