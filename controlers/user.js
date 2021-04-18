const usermodel = require("../model/user");

// USER AGENCY //
exports.userHomepage = (req, res) => {
    usermodel.userHomepage(req, res);
};

exports.adminHomepage = (req, res) => {
    usermodel.adminHomepage(req, res);
}