// schemas/


const Joi = require("joi"); // перевіряe в (POST) чи усі поля заповнені

// === створюємо joi схему  (в окремий файл) ===
const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
});



module.exports = {
    addSchema,
}