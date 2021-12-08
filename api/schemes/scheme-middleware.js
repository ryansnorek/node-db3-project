const Schemes = require('./scheme-model.js')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  next()
  const { id } = req.params;
  try {
    const schemeExists = await Schemes.findById(id);
    if (!schemeExists) {
      next({ status: 404, message: `scheme with scheme_id ${id} not found` })
    } else {
      next();
    }
  } catch (e) {
    next(e)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
