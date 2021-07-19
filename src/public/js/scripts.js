const botonLike = document.getElementById('btn-like');
const botonDelete =  document.getElementById('btn-delete');

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

botonDelete.addEventListener('click',(e)=>{
    e.preventDefault();
    const response = confirm('¿Estas seguro de querer eliminar esta imagen?');
    if(response){
        let imgId =  botonDelete.dataset.id;
        fetch(`http://localhost:3000/images/${imgId}`,{
            method:'DELETE'
        })
        .then((res)=>res.json())
        .then((data)=>{
            botonDelete.classList.remove('btn-danger');
            botonDelete.classList.add('btn-success');
            botonDelete.innerText='Borrado!'
        })
    }
})