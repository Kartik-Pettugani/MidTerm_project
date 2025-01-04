const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')
if(bar){
    bar.addEventListener('click',function(){
        console.log("hi")
        nav.style.right = "0px"
    })
}
if(close){
    close.addEventListener('click',function(){
        nav.style.right = '-300px'
    })
}

const cartButtons = document.querySelectorAll("#addtocart"); 
cartButtons.forEach(button => {
    button.addEventListener('click', function() {
        button.style.display = "none"; 
    });
});

