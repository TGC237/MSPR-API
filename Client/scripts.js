document.addEventListener('DOMContentLoaded', () => {
    const commandesList = document.getElementById('commandesList');
    const createCommandeButton = document.getElementById('createCommandeButton');
  
    // GET all commandes
    axios.get('http://localhost:3000/api/commandes')
      .then(response => {
        response.data.forEach(commande => {
          const li = document.createElement('li');
          li.textContent = commande.client;
          commandesList.appendChild(li);
        });
      })
      .catch(error => console.error('Error:', error));
  
    createCommandeButton.addEventListener('click', () => {
      // POST a new commande
      axios.post('http://localhost:3000/api/commandes', {
        client: 'John Doe',
        articles: ['item1', 'item2'],
        status: 'En cours',
        dateCommande: '2024-06-01',
        total: 150.00
      })
        .then(response => console.log(response.data))
        .catch(error => console.error('Error:', error));
    });
  });
  