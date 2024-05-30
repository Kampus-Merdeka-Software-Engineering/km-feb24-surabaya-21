document.addEventListener('DOMContentLoaded', () => {
    const totalSalesEl = document.getElementById('total-revenue');
    const totalOrdersEl = document.getElementById('total-orders');
    const totalPizzasEl = document.getElementById('total-pizzas');
    const averageSalesEl = document.getElementById('average-sales');

    fetch('./pizza.json')
        .then(response => response.json())
        .then(data => {
            let totalSales = 0;
            let totalPizzas = 0;
            const orderIds = new Set(); //for calculate pizza types
            const monthlySales = {};

            data.forEach(order => {
                const quantity = parseInt(order.quantity, 10);
                const price = parseFloat(order.price);
                const date = new Date(order.date);
                
                if (!isNaN(quantity) && !isNaN(price)) {
                    totalSales += price * quantity;
                    totalPizzas += quantity;
                    orderIds.add(order.pizza_type_id); // Track unique order IDs

                    const month = date.getMonth();
                    if (!monthlySales[month]) {
                        monthlySales[month] = 0;
                    }
                    monthlySales[month] += price * quantity;
                }
            });
            
            const totalOrders = orderIds.size;
            const changeTotalSales = (Math.floor(totalSales.toFixed(2)/100)/10);
            const months = Object.keys(monthlySales).length;
            const averageSales = (Math.floor(totalSales / 12) /100) /10;

            totalSalesEl.textContent = `$${changeTotalSales.toFixed(2)}K`;
            totalPizzasEl.textContent = `${totalOrders}`;
            totalOrdersEl.textContent = `${totalPizzas/1000}`;
            averageSalesEl.textContent = `$${averageSales.toFixed(2)}K`;
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

// Size Sold
document.addEventListener('DOMContentLoaded', () => {
    const sizectx = document.getElementById('size').getContext('2d');

    fetch('./pizza.json')
        .then(response => response.json())
        .then(data => {
            const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
            const sizeCounts = [0, 0, 0, 0, 0]; // Update to include XXL

            // Count the occurrences of each size
            data.forEach(order => {
                const sizeIndex = sizes.indexOf(order.size);
                if (sizeIndex !== -1) {
                    sizeCounts[sizeIndex]++;
                }
            });

            // Create the pie chart
            new Chart(sizectx, {
                type: 'pie',
                data: {
                    labels: sizes,
                    datasets: [{
                        data: sizeCounts,
                        backgroundColor: [
                            '#FF4206',
                            '#FF6106',
                            '#F48C50',
                            '#FFA877',
                            '#FED1B7'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value}`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching pizza data:', error));
});

// Top Five Sales Pizza
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('top-five').getContext('2d');
    fetch('./pizza.json')
        .then(response => response.json())
        .then(data => {
            // Create a dictionary to count the occurrences of each pizza name
            const pizzaCounts = {};

            // Count each pizza name occurrence
            data.forEach(order => {
                if (pizzaCounts[order.name]) {
                    pizzaCounts[order.name]++;
                } else {
                    pizzaCounts[order.name] = 1;
                }
            });

            // Convert the pizzaCounts object to an array of [name, count] pairs
            const pizzaArray = Object.entries(pizzaCounts);

            // Sort the array by count in descending order
            pizzaArray.sort((a, b) => b[1] - a[1]);

            // Get the top 5 pizzas
            const topFive = pizzaArray.slice(0, 5);

            // Separate the names and counts for the chart data
            const topFiveNames = topFive.map(pizza => pizza[0]);
            const topFiveCounts = topFive.map(pizza => pizza[1]);

            // Create the bar chart
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: topFiveNames,
                    datasets: [{
                        label: 'Top 5 Pizza Sales',
                        data: topFiveCounts,
                        backgroundColor: [
                            '#FF4206',
                            '#FF4206',
                            '#FF4206',
                            '#FF4206',
                            '#FF4206'
                        ],
                        borderColor: [
                            '#FF4206',
                            '#FF4206',
                            '#FF4206',
                            '#FF4206',
                            '#FF4206'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching pizza data:', error));
});

// Bottom Five Sales Pizza
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('bottom-five').getContext('2d');
    
    fetch('./pizza.json')
        .then(response => response.json())
        .then(data => {
            // Count occurrences of each pizza name
            const pizzaCounts = {};
            data.forEach(order => {
                const name = order.name;
                if (pizzaCounts[name]) {
                    pizzaCounts[name]++;
                } else {
                    pizzaCounts[name] = 1;
                }
            });

            // Convert pizzaCounts object to an array of [name, count] pairs
            const pizzaCountsArray = Object.entries(pizzaCounts);

            // Sort the array by count (ascending)
            pizzaCountsArray.sort((a, b) => a[1] - b[1]);

            // Get the bottom 5 pizza names and counts
            const bottomFive = pizzaCountsArray.slice(0, 5);
            const names = bottomFive.map(item => item[0]);
            const counts = bottomFive.map(item => item[1]);

            // Create the bar chart
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: names,
                    datasets: [{
                        label: 'Sales Count',
                        data: counts,
                        backgroundColor: '#FF4206',
                        borderColor: '#FF4206',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching pizza data:', error));
});




