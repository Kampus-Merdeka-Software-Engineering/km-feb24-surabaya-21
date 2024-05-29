document.addEventListener('DOMContentLoaded', () => {
    fetch('pizza_sales.json')
     .then(response => response.json())
     .then(data => {
        const salesList = document.getElementById('sales-list');
        data.forEach(sale => {
          const li = document.createElement('li');
          li.textContent = `Sale: ${sale.sale} - ${sale.date}`;
          salesList.appendChild(li);
        });
      })
     .catch(error => console.error(error));
  });