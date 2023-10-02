const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createStudent, getStudent } = require('../controllers/students');

router.post('/add-student', celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        key: Joi.string().required(),
        name: Joi.string().required().min(2).max(200),
    }),
}), createStudent);

router.get('/get-student/:email', celebrate({
    params: Joi.object({
        email: Joi.string().email().required(),
    })
}), getStudent);

module.exports = router;
