const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createStudents, getStudent, deleteStudent } = require('../controllers/students');

router.post('/add-students', celebrate({
    body: Joi.object().keys({
        students: Joi.array().required().items(Joi.object().keys({
            email: Joi.string().email().required(),
            key: Joi.string().required(),
            name: Joi.string().required().min(2).max(300),
        })),
    }),
}), createStudents);

router.delete('/delete-student/:email', celebrate({
    params: Joi.object().keys({
        email: Joi.string().email().required(),
    })
}), deleteStudent);

router.get('/get-student/:email', celebrate({
    params: Joi.object({
        email: Joi.string().email().required(),
    })
}), getStudent);

module.exports = router;
