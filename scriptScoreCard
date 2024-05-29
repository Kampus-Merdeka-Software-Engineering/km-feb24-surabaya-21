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
