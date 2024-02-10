import jwt from 'jsonwebtoken'

export async function login(request, response) {
    try {
        //Get username
        const {username} = request.body

        //If no username this doesnt run
        if(username) {

            //just giving id a value 
            const id = new Date().getDate()

            //creating a token that is valid for 15 mins
            const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'15min'}) 

            //set cookie with token
            response.cookie('jwt', token, {httpOnly: true, maxAge: 15 * 60 * 1000})
            
            //Redirecting to other page
            response.redirect('/movies')
        }else {
            response.status(400).json({msg: 'Username is required'});
        }
   
    //Error
    } catch (error) {
        response.status(400).json({msg: error.message})
    }
}

export async function loginVerify(request, response, next) {
    //get token
    const token = request.cookies.jwt
    //if no token
    if(!token) {
        return response.status(403).json({ message: 'No token provided' });
    }

    //verify

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if(error) {
            request.jwtIsVerified = false
        } else {
          
            //if verified, verified = true in builder
            request.jwtIsVerified = true
            request.user = user;
        }
          
          next();
    })
}