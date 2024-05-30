function fetchJSONData() {
  fetch('pizza_data.json')
      .then((res) => {
          if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
      })
      .then((data) => {
          // Calculate total orders, total revenue, total types, and average revenue per month
          const totalOrders = data.length;
          const totalRevenue = data.reduce((acc, sale) => acc + (parseFloat(sale.price) * parseInt(sale.quantity)), 0);
          const totalTypes = new Set(data.map((sale) => sale.pizza_type_id)).size;
          const numberOfMonths = Object.keys(data.reduce((acc, sale) => {
              const date = new Date(sale.date);
              const key = `${date.getFullYear()}-${date.getMonth()}`;
              acc[key] = (acc[key] || 0) + (parseFloat(sale.price) * parseInt(sale.quantity));
              return acc;
          }, {})).length;
          const averageRevenuePerMonth = totalRevenue / numberOfMonths;

          // Calculate the count of pizzas sold by size
          const sizes = data.reduce((acc, sale) => {
              acc[sale.size] = (acc[sale.size] || 0) + 1;
              return acc;
          }, {});

          // Render the pie chart
          renderPieChart(Object.keys(sizes), Object.values(sizes));

          // Render the bar chart for top 5 sales pizza
          renderTopFiveChart(data);

          // Render the bar chart for bottom 5 sales pizza
          renderBottomFiveChart(data);

          renderMonthlyChart(data);

          // Update the DOM elements with the calculated values
          document.getElementById('total-order').innerText = totalOrders;
          document.getElementById('total-revenue').innerText = `$${Math.floor(totalRevenue)/1000}K`;
          document.getElementById('total-avg').innerText = `$${Math.floor(averageRevenuePerMonth)/1000}K`;
          document.getElementById('total-types').innerText = totalTypes;
      })
      .catch((error) => console.error("Unable to fetch data:", error));
}

function renderPieChart(labels, dataCount) {
  const ctx = document.getElementById('size').getContext('2d');
  new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: labels,
          datasets: [{
              label: 'Pizza Sold by Size',
              data: dataCount,
              backgroundColor: [
                  '#B54200',
                  '#FF5D00',
                  '#FFC69F',
                  '#FF956E',
                  '#FAEED6',
                  '#FF9F40'
              ],
              borderWidth: 0
          }]
      },
      options: {
          responsive: true,
          legend: {
              position: 'bottom',
              labels: {
                  fontColor: '#FAEED6',
                  fontSize: 14,
                  padding: 20
              }
          }
      }
  });
}

function renderTopFiveChart(data) {
  // Count the sales of each pizza type
  const salesByPizzaType = data.reduce((acc, sale) => {
      acc[sale.pizza_type_id] = (acc[sale.pizza_type_id] || 0) + parseInt(sale.quantity);
      return acc;
  }, {});

  // Sort the pizza types by their sales count
  const sortedSales = Object.entries(salesByPizzaType)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5); // Get the top 5 sales

  const labels = sortedSales.map(([id]) => id);
  const dataCount = sortedSales.map(([, count]) => count);

  const ctx = document.getElementById('top-five').getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'quantity',
              data: dataCount,
              backgroundColor: [
                  '#FAEED6',
                  '#FAEED6',
                  '#FAEED6',
                  '#FAEED6',
                  '#FAEED6'
              ],
            //   borderColor: '#fff',
              borderWidth: 0
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  grid: {
                      color: '#FFC69F'
                  },
                  ticks: {
                      fontColor: '#333',
                      fontSize: 14,
                      stepSize: 1
                  }
              },
              x: {
                  grid: {
                      color: '#FFC69F'
                  },
                  ticks: {
                      fontColor: '#333',
                      fontSize: 14
                  }
              }
          },
          legend: {
              display: false
          }
      }
  });
}

function renderBottomFiveChart(data) {
  // Count the sales of each pizza type
  const salesByPizzaType = data.reduce((acc, sale) => {
      acc[sale.pizza_type_id] = (acc[sale.pizza_type_id] || 0) + parseInt(sale.quantity);
      return acc;
  }, {});

  // Sort the pizza types by their sales count in ascending order
  const sortedSales = Object.entries(salesByPizzaType)
      .sort(([, a], [, b]) => a - b)
      .slice(0, 5); // Get the bottom 5 sales

  const labels = sortedSales.map(([id]) => id);
  const dataCount = sortedSales.map(([, count]) => count);

  const ctx = document.getElementById('bottom-five').getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'quantity',
              data: dataCount,
              backgroundColor: [
                  '#FAEED6',
                  '#FAEED6',
                  '#FAEED6',
                  '#FAEED6',
                  '#FAEED6'
              ],
            //   borderColor: '#fff',
              borderWidth: 0
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  grid: {
                      color: '#FFC69F'
                  },
                  ticks: {
                      fontColor: '#333',
                      fontSize: 14,
                      stepSize: 1
                  }
              },
              x: {
                  grid: {
                      color: '#FFC69F'
                  },
                  ticks: {
                      fontColor: '#333',
                      fontSize: 14
                  }
              }
          },
          legend: {
              display: false
          }
      }
  });
}

function renderMonthlyChart(data) {
  // Calculate total sales for each month
  const monthlySales = data.reduce((acc, sale) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const date = new Date(sale.date);
      const monthIndex = date.getMonth();
      const monthName = months[monthIndex];
      acc[monthName] = (acc[monthName] || 0) + (parseFloat(sale.price) * parseInt(sale.quantity));
      return acc;
  }, {});

  // Extract labels (months) and data (total sales) for the chart
  const labels = Object.keys(monthlySales);
  const dataCount = Object.values(monthlySales);

  const ctx = document.getElementById('monthly').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Monthly Sales',
              data: dataCount,
              backgroundColor: '#FAEED6',
              borderColor: '#FAEED6',
              borderWidth: 1,
              pointBackgroundColor: '#FAEED6',
              pointBorderColor: '#FAEED6',
              pointHoverBackgroundColor: '#B54250',
              pointHoverBorderColor: '#B54250',
              pointRadius: 3,
              pointHoverRadius: 5,
              fill: false
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  grid: {
                      color: '#FFC69F'
                  },
                  ticks: {
                      fontColor: '#333',
                      fontSize: 14
                  }
              },
              x: {
                  grid: {
                      color: '#FFC69F'
                  },
                  ticks: {
                      fontColor: '#333',
                      fontSize: 14
                  }
              }
          },
          legend: {
              display: false
          }
      }
  });
}

fetchJSONData();
