const input = document.getElementById("searchinput");

input.addEventListener("keyup", function () {
    const keyword = input.value.toLowerCase();
    const items = document.querySelectorAll(".smd-card");

    items.forEach(item => {
        const text = item.textContent.toLowerCase();

        if (text.includes(keyword)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});


async function loadChart() {
    try {
        const response = await fetch('API_URL_KAMU');
        const result = await response.json();

        const labels = result.map(item => item.month);
        const data = result.map(item => item.value);

        const ctx = document.getElementById('smdChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'SMD Score',
                    data: data,
                }]
            },
            options: {
                responsive: true
            }
        });

    } catch (error) {
        console.error('Error ambil data:', error);
    }
}

// jalankan
loadChart();