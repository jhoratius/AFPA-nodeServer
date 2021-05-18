// CONSTANTES //
const contentmodel = require('../model/content');

// EXPORTS //
    // GET VIEWS //
    exports.getpost = (req, res) => {
    contentmodel.post(req, res);
    };

    exports.getSolopost = (req, res) => {
    contentmodel.solopost(req, res);
    };

    // POST FORMS //

    exports.post = (req, res) => {
    contentmodel.modelpost(req, res);
    };

    exports.solopost = (req, res) => {
    contentmodel.modelsolopost(req, res);
    }
