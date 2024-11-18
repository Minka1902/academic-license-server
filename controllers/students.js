const Student = require('../models/student');
const { handleError } = require('../errors/ErrorHandler')

module.exports.createStudents = (req, res) => {
    const { students } = req.body;
    let isAllOk = true;
    for (const { key, name, email } of students) {
        if (email && key) {

        }
        Student.create({ key, name, email })
            .catch((err) => {
                isAllOk = false;
                handleError(err, req, res);
            });
    }
    res.send({ message: isAllOk ? 'Successfully created' : 'Something wen`t wrong' });
};
module.exports.getStudent = (req, res, next) => {
    const { email } = req.params;

    Student.findOneAndDelete({ email })
        .then((student) => {
            if (!student) {
                throw new NotFoundError(`No source with this - '${email}' EMAIL, was found.`);
            } else {
                return res.send({ name: student.name, key: student.key });
            }
        })
        .catch(next);
};

module.exports.deleteStudent = (req, res) => {
    const { email } = req.params;

    Student.findOneAndDelete({ email })
        .then((student) => {
            if (!student) {
                throw new NotFoundError(`No key for this ${email} was found.`);
            } else {
                return res.send({ message: `Student with this Email '${email}' email was successfully deleted.` });
            }
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(400).send(err);
            }
        });
};
