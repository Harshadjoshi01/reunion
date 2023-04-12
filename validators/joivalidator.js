const JoiValidator = (schema) => {
    try {
        return (req, res, next) => {
            const {error} = schema.validate(req.body);
            if(error){
                return res.status(422).json({success: false, message: error.details[0].message});
            }
            next();
        }
        
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong", result: err});
    }

}

module.exports = {JoiValidator};