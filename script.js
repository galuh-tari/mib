window.handleLogout = async function() { await signOut(auth); window.location.href = 'index.html'; };
window.toggleDropdown = function() { document.getElementById('dropdown-menu').classList.toggle('open'); };

let currentPage = 1, citiesPerPage = 10, totalPages = Math.ceil(57 / citiesPerPage), chart1, currentKPI = 'ALL';

document.addEventListener('click', (e) => {

    const wrap = document.getElementById('avatar-wrap');

    if (wrap && !wrap.contains(e.target)) document.getElementById('dropdown-menu').classList.remove('open');

    const selectContainer = document.getElementById('citySelect');

    if (selectContainer && !selectContainer.contains(e.target)) {

      document.getElementById('selectItems').classList.remove('show');

      document.querySelector('.select-selected').classList.remove('active');

    }

  });

function updateChart1() {

    const start = (currentPage - 1) * citiesPerPage, end = start + citiesPerPage;

    const labels = allCityNames.slice(start, end), data = getDataForKPI(currentKPI).slice(start, end), nyAvg = getNYAvgValue(currentKPI);

    document.getElementById('nyAvgDisplay').innerHTML = `NY State Avg: ${nyAvg}`;

    document.getElementById('pageIndicator').innerHTML = `Page ${currentPage} / ${totalPages}`;

    document.getElementById('prevBtn').disabled = currentPage === 1; document.getElementById('nextBtn').disabled = currentPage === totalPages;

    if (chart1) chart1.destroy();

    const ctx = document.getElementById('cityChart').getContext('2d');

    chart1 = new Chart(ctx, {
        type: 'bar', data: {
            labels, datasets: [

                { label: currentKPI === 'ALL' ? 'Average of All KPIs' : currentKPI, data: data.map(v => parseFloat(v)), backgroundColor: 'rgba(108,39,217,0.7)', borderColor: '#6C27D9', borderWidth: 2, borderRadius: 6 },

                { label: 'NY State Benchmark', data: Array(labels.length).fill(parseFloat(nyAvg)), type: 'line', borderColor: '#FF6B6B', borderWidth: 3, borderDash: [8, 6], fill: false, pointRadius: 0 }

            ]
        }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top', labels: { boxWidth: 15, padding: 15 } }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%` } } }, scales: { y: { title: { display: true, text: 'Percentage (%)', font: { size: 12 } }, min: 0, max: 50, ticks: { stepSize: 5, callback: (v) => v + '%', font: { size: 11 } } }, x: { ticks: { maxRotation: 0, minRotation: 0, font: { size: 11 } } } } }
    });

    setTimeout(() => lucide.createIcons(), 100);

}

window.changeKPI = function () { currentKPI = document.getElementById('kpiSelect').value; currentPage = 1; updateChart1(); };

window.previousPage = function () { if (currentPage > 1) { currentPage--; updateChart1(); } };

window.nextPage = function () { if (currentPage < totalPages) { currentPage++; updateChart1(); } };


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