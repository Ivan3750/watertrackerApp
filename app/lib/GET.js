export const GetUserData = ()=>{ fetch('/api/profil', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.token}`
    }
})
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        return error;
    });

}
