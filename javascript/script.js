// function fetchJSONData() {
//     fetch('pizza_sales.json')
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error
//                     (`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then((data) => 
//               console.log(data))
//         .catch((error) => 
//                console.error("Unable to fetch data:", error));
// }
// fetchJSONData(); 

// Scorecard Function

// Charts Function
function fetchJSONData() {
    fetch('pizza_sales.json')
       .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
       .then((data) => {
            const ctx = document.getElementById('top-five').getContext('2d');
            const labels = data.map((sale) => sale.date);
            const sales = data.map((sale) => sale.sale);
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Pizza Sales',
                        data: sales,
                        borderColor: '#333',
                        fill: '#FFF'
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Top 5 Pizza Sales Over Time'
                    },
                    scales: {
                        x: {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        },
                        y: {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Sales'
                            }
                        }
                    }
                }
            });
        })
       .catch((error) => 
               console.error("Unable to fetch data:", error));
}

fetchJSONData();

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('pizza_sales.json')
//      .then(response => response.json())
//      .then(data => {
//         const salesList = document.getElementById('sales-list');
//         data.forEach(sale => {
//           const li = document.createElement('li');
//           li.textContent = `Sale: ${sale.sale} - ${sale.date}`;
//           salesList.appendChild(li);
//         });
//       })
//      .catch(error => console.error(error));
//   })

// const sample = required('./script');
// console.log(sample)
