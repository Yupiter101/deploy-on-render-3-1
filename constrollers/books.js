// controllers/books.js

// Сюди перенесемо анонімні функції з api/books.js

const books = require("../models/books"); // (в окремий файл) import from index.js (books.json)
const {HttpError, ctrlWrapper} = require("../helpers");

// const Joi = require("joi"); // перевіряe в (POST) чи усі поля заповнені

// // === створюємо joi схему  (в окремий файл) ===
// const addSchema = Joi.object({
//     title: Joi.string().required(),
//     author: Joi.string().required(),
// });


// const getAll = async (req, res, next) => {
//     try{
//         const result = await books.getAll();
//         res.json(result);
//     }
//     catch(error){
//         next(error);
//     }    
// }

// те саме але скорочено
const getAll = async (req, res) => {
    const result = await books.getAll();
    res.json(result);   
}



// const getById = async (req, res, next) => {
//     try{
//         const {id} = req.params;
//         const result = await books.getById(id);
//         if(!result) {
//             throw HttpError(404, "Not found");
//         }
//         res.json(result);
//     }
//     catch(error) {
//         next(error);
//     }
// }


const getById = async (req, res) => {
    const {id} = req.params;
    const result = await books.getById(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}



// const add = async (req, res, next)=> {
//     try {
//         console.log(req.body); // Читати тіло запису
        
//         const {error} = addSchema.validate(req.body); // Обэкт перевырки
//         console.log(error); // Якщо все ок то error = undefine інакше опис помилки 
//         if(error) {
//             throw HttpError(400, error.message);
//         }
//         const result = await books.add(req.body);
//         res.status(201).json(result);
//     }
//     catch(error) {
//         next(error);  
//     }
// }


const add = async (req, res)=> {
    console.log(req.body); // Читати тіло запису
    
    // const {error} = addSchema.validate(req.body); // Обэкт перевырки
    // if(error) {
    //     throw HttpError(400, error.message);
    // }
    const result = await books.add(req.body);
    res.status(201).json(result);
}

// const updateById = async(req, res, next) => {
//     try {
//         const {error} = addSchema.validate(req.body);
//         // Перевырка тіла
//         if(error) {        
//             throw HttpError(400, error.message);
//         }
//         const {id} = req.params;
//         const result = await books.updateById(id, req.body);
//         // Перевырка запиту
//         if(!result) {     
//             throw HttpError(400, "Not found");
//         }
//         res.json(result); // Повертаэм результат на фронтент
//     }
//     catch(error) {
//         next(error);
//     }
// }

const updateById = async(req, res) => {
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



// const deleteById = async (req, res, next)=> {
//     try {
//         const {id} = req.params;
//         const result = await books.deleteById(id);
//         if(!result) {
//             throw HttpError(404, "Not found");
//         }
//         res.json({message: "Delete success"}); // або Повертаэм message на фронтент
//     }
//     catch(error) {
//         next(error);
//     }
// }

const deleteById = async (req, res)=> {
    const {id} = req.params;
    const result = await books.deleteById(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json({message: "Delete success"}); // або Повертаэм message на фронтент
}



// module.exports = {
//     getAll,
//     getById,
//     add,
//     updateById,
//     deleteById,
// };

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
};