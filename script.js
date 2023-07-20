  document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataJson = {};
    formData.forEach((value, key) => {
      formDataJson[key] = value;
    });

    fetch('/enviar_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataJson)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  });

