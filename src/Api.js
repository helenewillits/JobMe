const reqHeaders = {
    'Content-Type': 'application/json'
 };

export function fetchCheckError () {}

// REST functions 
export function post(url, request) {
    const res = fetch(url, {
       method: 'POST',
       headers: reqHeaders,
       body: JSON.stringify(request)
    })
    .then((response) => {
        if(response.ok) {
            console.log("Request sent")
            Promise.resolve(response)
        }
        else if(response.status === 400) {
            return Promise.reject(response)
        }
    });
    return res;
 }
 
 export function put(url, request) {
    return fetch(url, {
       method: 'PUT',
       headers: reqHeaders,
       body: JSON.stringify(request)
    });
 }
 
 export function get(url, request) {
    return fetch(url, {
       method: 'GET',
       headers: reqHeaders,
       body: JSON.stringify(request)
    });
 }
 
 export function remove(url, request) {
    return fetch(url, {
       method: 'DELETE',
       headers: reqHeaders,
       body: JSON.stringify(request)
    });
 }