var jwt = require('jsonwebtoken');
class JWT{


    constructor(){

    }

    createJWT(data){
        return jwt.sign(data, 'hehehe', {expiresIn: 2});
    }

    validate(req,res,next){
        console.log('Validating Token')
        // Header names in Express are auto-converted to lowercase
        let token = req.headers['x-access-token'] || req.headers['authorization']; 

        // Remove Bearer from string
        token = token.replace(/^Bearer\s+/, "");

        if (token) {
        jwt.verify(token, 'hehehe', (err, decoded) => {
            if (err) {
            return res.json({
                success: false,
                message: 'Token is not valid'
            });
            }
            req.decoded = decoded;
            next();
        });
        } else {
            return res.json({
                success: false,
                message: 'Token not provided'
            });
        }
    }
}
module.exports = JWT;