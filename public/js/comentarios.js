let form = document.getElementById('form');
let textArea = document.querySelector('textarea')
let input = document.querySelector('input')

             form.addEventListener('submit',(e)=>{
            e.preventDefault();
            const valor = textArea.value
            const valorInput = input.value
            axios.post('http://localhost:3000/posts/' + valorInput + '/comentarios', {texto:valor})
        
             })