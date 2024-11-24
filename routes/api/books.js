// 2. Треба перевіряти в (POST) чи усі поля заповнені (title, author ...) npm install joi
// 2.1 Створити joi схему
console.log("run api/books.js");

const express = require("express");
const  router = express.Router();
// const Joi = require("joi"); // перевіряe в (POST) чи усі поля заповнені


const books = require("../../models/books"); // import from index.js (books.json)
const {HttpError} = require("../../helpers");
// const  router = express.Router();

const Joi = require("joi"); // перевіряe в (POST) чи усі поля заповнені
// === створюємо joi схему ===
const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
});


// === Отримати усе
router.get("/", async (req, res, next) => {
    try{
        const result = await books.getAll();
        res.json(result);
    }
    catch(error){
        // res.status(500).json({
        //     message: "Server error"
        // })
         // або
        next(error); // Шукай далі але не просто а обробник помилок
    } 
      
});

// === Отримати по id
router.get("/:id", async (req, res, next) => {
    try{
        // console.log(req.params);
        const {id} = req.params;
        const result = await books.getById(id);
        if(!result) {
            // return res.status(404).json({
            //     message: "Not found"
            // })
                    // == або примусово перекидаємо її в catch
                    // == або виносимо її в окремий файл helpers/HttpError.js
            // const error = new Error("Not found");
            // error.status = 404;
            // throw error; // Перекидаэмо error в cetch
                    // або
            throw HttpError(404, "Not found");
        }
        res.json(result);
    }
    catch(error) {
        // res.status(500).json({
        //     message: "Server error"
        // })
            // або
        // const {status = 500, message = "Server error"} = error;
        // res.status(status).json({
        //     message,
        // })
        // або
        next(error); // Шукай далі але не просто а обробник помилок
    }
})

// === Запушити ще одне (без ід)
router.post("/", async (req, res, next)=> {
    try {
        console.log(req.body); // Читати тіло запису
        
        const {error} = addSchema.validate(req.body); // Обэкт перевырки
        console.log(error); // Якщо все ок то error = undefine інакше опис помилки 
        if(error) {
            throw HttpError(400, error.message);
        }
        // Якщо все ок то додаємо книги
        const result = await books.add(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        next(error);   // Шукай далі але не просто а обробник помилок
    }
});


// === Змінити щось одне по ід і запушити
router.put("/:id", async(req, res, next) => {
    try {
        const {error} = addSchema.validate(req.body);
        // Перевырка тіла
        if(error) {        
            throw HttpError(400, error.message);
        }
        const {id} = req.params;
        const result = await books.updateById(id, req.body);
        // Перевырка запиту
        if(!result) {     
            throw HttpError(400, "Not found");
        }
        res.json(result); // Повертаэм результат на фронтент
    }
    catch(error) {
        next(error); // Шукай далі але не просто а обробник помилок 
    }
});

router.delete("/:id", async (req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await books.deleteById(id);
        if(!result) {
            throw HttpError(404, "Not found");
        }
        // res.json(result); // Повертаэм результат (Обєкт) на фронтент
        // або
        res.json({message: "Delete success"}); // або Повертаэм message на фронтент
        // або
        // res.status(204).json(); // Тут вже тіло не відправиться того можна його не писать

    }
    catch(error) {
        next(error);
    }
});

module.exports = router;