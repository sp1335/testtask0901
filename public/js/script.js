$(document).ready(()=>{
    console.log("Jquery ready")

    $('#button').click(()=>{
        let requestString = $('#input').val()
        const requestOption = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({title:'Fetch POST request'})
        }
        fetch('/exec?command='+requestString, requestOption)
            .then(async response =>{
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if(!response.ok){
                    const err = (data && data.message) || response.status;
                    return Promise.reject(err)
                }else{
                    console.log(data)
                    $('#output').val('')
                    $('#output').val(JSON.stringify(data))
                }
            }).catch(error => {
                alert('Error: ' + error)
        })
    })
})