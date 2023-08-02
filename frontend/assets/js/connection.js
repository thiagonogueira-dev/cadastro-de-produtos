export function makeRequisition(endPoint, method, body) {
    if(!method) {
        return fetch(`http://localhost:3030${endPoint}`);
    }

    return fetch(`http://localhost:3030${endPoint}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: "include"
    });
}