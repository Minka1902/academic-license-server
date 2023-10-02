const Student = require('../models/student');
// get's an article ID and deletes the article
// POST /articles
// ! request structure
// ? req.body={keyword, author, title, content, publishedAt:(DATE), source, url:(URL), urlToImage:(URL), ownerId:(ID)}
module.exports.createStudent = (req, res) => {
    const { key, name, email } = req.body;

    Student.create({ key, name, email })
        .then((student) => {
            res.send(student);
        })
        .catch((err) => {
            handleError(err, req, res);
        });
};
module.exports.getStudent = (req, res, next) => {
    const { email } = req.params;

    Student.findOne({ email })
        .then((student) => {
            if (!student) {
                throw new NotFoundError(`No source with this - '${email}' EMAIL, was found.`);
            } else {
                return res.send(`Your access key is: ${student.key}.`);
            }
        })
        .catch(next);
};
