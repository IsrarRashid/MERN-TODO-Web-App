
// pass jwt token in header
/**got to postman=>headers section=>type authorization and value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NDA4NTY0NH0.iONg5jzAlbfXDcV-RJE9bxraQr15P_nyEAkCF8o-iAA */
const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        // 401 means you didn't provide the token
        res.send(401).send("invalid credentials");
    }
    else{
        const token = authHeader.split(" ")[1]; // 1 index because at 0 index Bearer is placed and token is placed at index 1 and we want that
        console.log(token);
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
                // 403 means you provided the token but you don't have access
                res.status(403).send("invalid credentials");
            }else{
                req.userId = decoded.userId;
                next(); // this will allow router to go to next section which is in this case ./routes/todosRoute
            }
        })
    }
}