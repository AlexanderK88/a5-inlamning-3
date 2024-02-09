export async function login(request, response) {
    try {
        const {username, password} = request.body
        const user = {
            username: username,
            password: password,

        }
        if(username && password) {
            console.log(username, password, user)
            response.status(200).redirect('/movies')
        }
    } catch (error) {
        response.status(400).json({msg: error.message})
    }
}