
//  === V4 === 

const mongoose = require("mongoose");

const app = require("./app.js");

// const URI = "***";
// console.log(process.env); // обэкт налаштування мого пк
const {URI, PORT = 3000} = process.env;


mongoose.connect(URI)
    .then(()=> {
        console.log("Database Connected secsess!!!");
        app.listen(PORT, () => {
            console.log("Server L3_1_serv 3000 run")
        })
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1); // примусове закриття фонових прграм
    });



//  === V3 === 

// const mongoose = require("mongoose");

// const app = require("./app.js");

// const {URI} = require("./config.js");

// mongoose.connect(URI)
//     .then(()=> {
//         console.log("Database Connected secsess!!!");
//         app.listen(3000, () => {
//             console.log("Server L3_1_serv 3000 run")
//         })
//     })
//     .catch(error => {
//         console.log(error.message);
//         process.exit(1); // примусове закриття фонових прграм
//     });



// === V2 ===

// const mongoose = require("mongoose");

// const app = require("./app.js");

// const URI = "mongodb+srv://Yupiter:Jwg3Pwfpx9XQLEYn@cluster0.b743s.mongodb.net/books_reader?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(URI)
//     .then(()=> {
//         console.log("Database Connected secsess!!!");
//         app.listen(3000, () => {
//             console.log("Server L3_1_serv 3000 run")
//         })
//     })
//     .catch(error => {
//         console.log(error.message);
//         process.exit(1); // примусове закриття фонових прграм
//     });


//  === V1 === 

// const app = require("./app.js");

// app.listen(3000, () => {
//     console.log("Server Git-3_1 3000 run")
// })