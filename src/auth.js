import jwt from 'jsonwebtoken'

export async function login(request, response, next) {
    try {
        const {username} = request.body

        if(username) {

            const id = new Date().getDate()

            const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'15min'}) 

            //set cookie with token

            response.cookie('jwt', token, {httpOnly: true, maxAge: 15 * 60 * 1000})

            console.log(username)
            console.log(token)
            
            response.redirect('/movies')
        }
        
    } catch (error) {
        response.status(400).json({msg: error.message})
    }
}

export async function loginVerify(request, response, next) {
    //get token
    const token = request.cookies.jwt
    console.log(token)
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