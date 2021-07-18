const botonLike = document.getElementById('btn-like');

botonLike.addEventListener('click', (e)=>{
    e.preventDefault();
    let imgId = botonLike.dataset.id;
    fetch(`http://localhost:3000/images/${imgId}/like`,{
        method:'POST'
    })
    .then((res) => res.json())
    .then((data) =>{
        document.querySelector('.likes-count').innerHTML=data.likes
    })
});