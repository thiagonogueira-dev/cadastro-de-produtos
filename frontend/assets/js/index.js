import { makeRequisition } from './connection.js';

function setAuthorization(token) {
    window.sessionStorage.setItem('authorization', token);
}

document.getElementById('login').addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const resp = await makeRequisition('/auth/authenticate', 'POST', { username, password });

    if(resp.ok) {
        const respData = await resp.json();
        setAuthorization(respData.token);
        location.href = './usuario/home.html'

    } else {
        console.log(resp.status, await resp.json());
        alert('Usuário ou senha incorreta.')
    }
})