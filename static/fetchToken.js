document.querySelector('.login-form').addEventListener('submit', (e) => {

    const username = document.querySelector('.login-form__input')

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username:username
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.token)
        localStorage.setItem('jwt', data.token)
    })
    .catch((error) => {
        console.log(error.message)
    })
})