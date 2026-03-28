import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyB4aNTSgU5wLoarKUGduLnpbwS9gI13PU4",
  authDomain: "manajemen-informasi-biomedis.firebaseapp.com",
  projectId: "manajemen-informasi-biomedis",
  storageBucket: "manajemen-informasi-biomedis.firebasestorage.app",
  messagingSenderId: "80926759256",
  appId: "1:80926759256:web:123e1e293638aa4e892d2d",
  measurementId: "G-LGT7PZFWMH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== AUTHENTICATION =====
onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.email.split('@')[0];
    document.getElementById('user-name').textContent = name + '!';
    document.getElementById('dropdown-email').textContent = user.email;
  } else {
    window.location.href = 'index.html';
  }
});

window.handleLogout = async function() {
  await signOut(auth);
  window.location.href = 'index.html';
};

window.toggleDropdown = function() {
  document.getElementById('dropdown-menu').classList.toggle('open');
};

document.addEventListener('click', (e) => {
  const wrap = document.getElementById('avatar-wrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('dropdown-menu').classList.remove('open');
  }
  const selectContainer = document.getElementById('citySelect');
  if (selectContainer && !selectContainer.contains(e.target)) {
    document.getElementById('selectItems').classList.remove('show');
    document.querySelector('.select-selected')?.classList.remove('active');
  }
});

// ===== MODAL IPFQR =====
window.closeModal = function() {
  document.getElementById('modalOverlay').classList.remove('active');
};

window.openIPFQR = function() {
  const fullText = `
    <p>The Inpatient Psychiatric Facility Quality Reporting (IPFQR) Program is a pivotal pay-for-reporting initiative established to enhance transparency regarding healthcare quality and empower stakeholders to make informed decisions in psychiatric care. Under this regulatory framework, Inpatient Psychiatric Facilities (IPFs) are mandated to report standardized quality measures to the Centers for Medicare & Medicaid Services (CMS). These metrics facilitate the comparative evaluation of care quality across inpatient settings, while non-compliance with reporting protocols may result in adjustments to Medicare reimbursement.</p><br>
    <p>This dashboard leverages IPFQR data to support the evaluation of clinical outcomes, which serve as the primary Key Performance Indicators (KPIs). Accordingly, the platform prioritizes outcome-oriented metrics, specifically: Screening for Metabolic Disorders (SMD), Follow-Up After Psychiatric Hospitalization (FAPH) at 7 and 30-day intervals, Medication Continuation (MedCont), and Readmission Rates (READM). These indicators were selected for their critical role in assessing treatment efficacy, continuity of care, and patient recovery outcomes, with a specific focus on identifying longitudinal trends and performance shifts over time.</p><br>
    <p>The data scope encompasses healthcare facilities across New York State, representing 95 facilities distributed across 57 municipalities. This enables both macro-level and regional-level analysis of psychiatric care performance, supporting data-driven decision-making in clinical quality improvement.</p>
  `;
  document.getElementById('modalTitle').innerText = 'About IPFQR Program';
  document.getElementById('modalBody').innerHTML = fullText;
  document.getElementById('modalOverlay').classList.add('active');
};

// ===== FLIP CARD =====
window.toggleFlip = function(card) {
  const allCards = document.querySelectorAll('.flip-card');
  if (card.classList.contains('flipped')) {
    card.classList.remove('flipped');
  } else {
    allCards.forEach(c => c.classList.remove('flipped'));
    card.classList.add('flipped');
  }
};

// ===== DATA 57 CITY ASLI =====
const allCityNames = [
  "ALBANY", "AMITYVILLE", "AMSTERDAM", "AUBURN", "BELLEROSE", "BINGHAMTON", "BRONX", "BROOKLYN",
  "BUFFALO", "CARMEL", "CLIFTON SPRINGS", "CORTLAND", "DIX HILLS", "EAST MEADOW", "ELMHURST",
  "ELMIRA", "FAR ROCKAWAY", "HARRIS", "HUNTINGTON", "JAMAICA", "JAMESTOWN", "KATONAH", "KINGSTON",
  "MANHASSET", "MIDDLETOWN", "MOUNT KISCO", "MOUNT VERNON", "NEW HAMPTON", "NEW HYDE PARK", "NEW YORK",
  "NYACK", "OCEANSIDE", "OGDENSBURG", "OLEAN", "ORANGEBURG", "OSWEGO", "PATCHOGUE", "PORT JEFFERSON",
  "PORT JERVIS", "QUEENS VILLAGE", "ROCHESTER", "ROCKVILLE CENTRE", "ROME", "SARANAC LAKE", "SARATOGA SPRINGS",
  "SLEEPY HOLLOW", "SMITHTOWN", "STATEN ISLAND", "STONY BROOK", "SYRACUSE", "TROY", "UTICA", "VALHALLA",
  "WARSAW", "WEST BRENTWOOD", "WEST SENECA", "YONKERS"
];

// ===== DATA 95 FACILITY ASLI =====
const healthcareFacilities = [
  { name: "ALBANY MEDICAL CENTER HOSPITAL", city: "ALBANY", address: "ALBANY, NY", website: "#" },
  { name: "CAPITAL DISTRICT PSYCH CENTER", city: "ALBANY", address: "ALBANY, NY", website: "#" },
  { name: "BRUNSWICK HOSPITAL CENTER, INC.", city: "AMITYVILLE", address: "AMITYVILLE, NY", website: "#" },
  { name: "SOUTH OAKS HOSP", city: "AMITYVILLE", address: "AMITYVILLE, NY", website: "#" },
  { name: "ST MARY'S HEALTHCARE", city: "AMSTERDAM", address: "AMSTERDAM, NY", website: "#" },
  { name: "AUBURN COMMUNITY HOSPITAL", city: "AUBURN", address: "AUBURN, NY", website: "#" },
  { name: "NEW YORK CITY CHILDRENS PSYCH CENTER", city: "BELLEROSE", address: "BELLEROSE, NY", website: "#" },
  { name: "UNITED HEALTH SERVICES HOSPITALS, INC", city: "BINGHAMTON", address: "BINGHAMTON, NY", website: "#" },
  { name: "GREATER BINGHAMTON HEALTH CENTER", city: "BINGHAMTON", address: "BINGHAMTON, NY", website: "#" },
  { name: "BRONXCARE HOSPITAL CENTER", city: "BRONX", address: "BRONX, NY", website: "#" },
  { name: "MONTEFIORE MEDICAL CENTER", city: "BRONX", address: "BRONX, NY", website: "#" },
  { name: "LINCOLN MEDICAL & MENTAL HEALTH CENTER", city: "BRONX", address: "BRONX, NY", website: "#" },
  { name: "JACOBI MEDICAL CENTER", city: "BRONX", address: "BRONX, NY", website: "#" },
  { name: "ST BARNABAS HOSPITAL", city: "BRONX", address: "BRONX, NY", website: "#" },
  { name: "BRONX PSYCHIATRIC CENTER", city: "BRONX", address: "BRONX, NY", website: "#" },
  { name: "MAIMONIDES MEDICAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "#" },
  { name: "SOUTH BROOKLYN HEALTH", city: "BROOKLYN", address: "BROOKLYN, NY", website: "#" },
  { name: "KINGS COUNTY HOSPITAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "#" },
  { name: "BROOKDALE HOSPITAL MEDICAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "#" },
  { name: "WOODHULL MEDICAL & MENTAL HEALTH CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "#" },
  { name: "KINGSBORO PSYCHIATRIC HOSPITAL", city: "BROOKLYN", address: "BROOKLYN, NY", website: "#" },
  { name: "ERIE COUNTY MEDICAL CENTER", city: "BUFFALO", address: "BUFFALO, NY", website: "#" },
  { name: "BRYLIN HOSP", city: "BUFFALO", address: "BUFFALO, NY", website: "#" },
  { name: "BUFFALO PSYCHIATRIC CENTER", city: "BUFFALO", address: "BUFFALO, NY", website: "#" },
  { name: "PUTNAM HOSPITAL CENTER", city: "CARMEL", address: "CARMEL, NY", website: "#" },
  { name: "CLIFTON SPRINGS HOSPITAL AND CLINIC", city: "CLIFTON SPRINGS", address: "CLIFTON SPRINGS, NY", website: "#" },
  { name: "GUTHRIE CORTLAND REGIONAL MEDICAL CENTER", city: "CORTLAND", address: "CORTLAND, NY", website: "#" },
  { name: "SAGAMORE CHILDREN'S PSYCHIATRIC CENTER", city: "DIX HILLS", address: "DIX HILLS, NY", website: "#" },
  { name: "NASSAU UNIVERSITY MEDICAL CENTER", city: "EAST MEADOW", address: "EAST MEADOW, NY", website: "#" },
  { name: "ELMHURST HOSPITAL CENTER", city: "ELMHURST", address: "ELMHURST, NY", website: "#" },
  { name: "ARNOT OGDEN MEDICAL CENTER", city: "ELMIRA", address: "ELMIRA, NY", website: "#" },
  { name: "ELMIRA PSYCH CENTER", city: "ELMIRA", address: "ELMIRA, NY", website: "#" },
  { name: "ST JOHN'S EPISCOPAL HOSPITAL AT SOUTH SHORE", city: "FAR ROCKAWAY", address: "FAR ROCKAWAY, NY", website: "#" },
  { name: "GARNET HEALTH MEDICAL CENTER CATSKILLS", city: "HARRIS", address: "HARRIS, NY", website: "#" },
  { name: "NS/LIJ HS HUNTINGTON HOSPITAL", city: "HUNTINGTON", address: "HUNTINGTON, NY", website: "#" },
  { name: "JAMAICA HOSPITAL MEDICAL CENTER", city: "JAMAICA", address: "JAMAICA, NY", website: "#" },
  { name: "QUEENS HOSPITAL CENTER", city: "JAMAICA", address: "JAMAICA, NY", website: "#" },
  { name: "UPMC CHAUTAUQUA AT WCA", city: "JAMESTOWN", address: "JAMESTOWN, NY", website: "#" },
  { name: "FOUR WINDS", city: "KATONAH", address: "KATONAH, NY", website: "#" },
  { name: "HEALTHALLIANCE HOSPITAL MARYS AVENUE CAMPUS", city: "KINGSTON", address: "KINGSTON, NY", website: "#" },
  { name: "NORTH SHORE UNIVERSITY HOSPITAL", city: "MANHASSET", address: "MANHASSET, NY", website: "#" },
  { name: "GARNET HEALTH MEDICAL CENTER", city: "MIDDLETOWN", address: "MIDDLETOWN, NY", website: "#" },
  { name: "NORTHERN WESTCHESTER HOSPITAL", city: "MOUNT KISCO", address: "MOUNT KISCO, NY", website: "#" },
  { name: "MONTEFIORE MOUNT VERNON HOSPITAL", city: "MOUNT VERNON", address: "MOUNT VERNON, NY", website: "#" },
  { name: "MID HUDSON FORENSIC PSYCHIATRIC CTR", city: "NEW HAMPTON", address: "NEW HAMPTON, NY", website: "#" },
  { name: "LONG ISLAND JEWISH MEDICAL CENTER", city: "NEW HYDE PARK", address: "NEW HYDE PARK, NY", website: "#" },
  { name: "MOUNT SINAI HOSPITAL", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "MOUNT SINAI WEST", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "NEW YORK-PRESBYTERIAN HOSPITAL", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "LENOX HILL HOSPITAL", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "MOUNT SINAI BETH ISRAEL", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "METROPOLITAN HOSPITAL CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "BELLEVUE HOSPITAL CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "NYU LANGONE HOSPITALS", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "HARLEM HOSPITAL CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "NEW YORK STATE PSYCHIATRIC INSTITUTE", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "GRACIE SQUARE HOSP", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "MANHATTAN PSYCHIATRIC CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "KIRBY FORENSIC PSYCHIATRIC CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "#" },
  { name: "NYACK HOSPITAL", city: "NYACK", address: "NYACK, NY", website: "#" },
  { name: "MOUNT SINAI SOUTH NASSAU", city: "OCEANSIDE", address: "OCEANSIDE, NY", website: "#" },
  { name: "ST LAWRENCE PSYCHIATRIC CENTER", city: "OGDENSBURG", address: "OGDENSBURG, NY", website: "#" },
  { name: "CLAXTON-HEPBURN MEDICAL CENTER", city: "OGDENSBURG", address: "OGDENSBURG, NY", website: "#" },
  { name: "OLEAN GENERAL HOSPITAL", city: "OLEAN", address: "OLEAN, NY", website: "#" },
  { name: "ROCKLAND PSYCH CTR", city: "ORANGEBURG", address: "ORANGEBURG, NY", website: "#" },
  { name: "ROCKLAND CHILDREN'S PSYCHIATRIC CENTER", city: "ORANGEBURG", address: "ORANGEBURG, NY", website: "#" },
  { name: "OSWEGO HOSPITAL", city: "OSWEGO", address: "OSWEGO, NY", website: "#" },
  { name: "LONG ISLAND COMMUNITY HOSPITAL", city: "PATCHOGUE", address: "PATCHOGUE, NY", website: "#" },
  { name: "JOHN T MATHER MEMORIAL HOSPITAL OF PORT JEFFERSON", city: "PORT JEFFERSON", address: "PORT JEFFERSON, NY", website: "#" },
  { name: "BON SECOURS COMMUNITY HOSPITAL", city: "PORT JERVIS", address: "PORT JERVIS, NY", website: "#" },
  { name: "CREEDMOOR PSYCHIATRIC CENTER", city: "QUEENS VILLAGE", address: "QUEENS VILLAGE, NY", website: "#" },
  { name: "ROCHESTER GENERAL HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "#" },
  { name: "UNITY HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "#" },
  { name: "STRONG MEMORIAL HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "#" },
  { name: "ROCHESTER PSYCHIATRIC CENTER", city: "ROCHESTER", address: "ROCHESTER, NY", website: "#" },
  { name: "MERCY MEDICAL CENTER", city: "ROCKVILLE CENTRE", address: "ROCKVILLE CENTRE, NY", website: "#" },
  { name: "ROME MEMORIAL HOSPITAL, INC", city: "ROME", address: "ROME, NY", website: "#" },
  { name: "ADIRONDACK MEDICAL CENTER - SARANAC LAKE", city: "SARANAC LAKE", address: "SARANAC LAKE, NY", website: "#" },
  { name: "FOUR WINDS OF SARATOGA", city: "SARATOGA SPRINGS", address: "SARATOGA SPRINGS, NY", website: "#" },
  { name: "PHELPS HOSPITAL", city: "SLEEPY HOLLOW", address: "SLEEPY HOLLOW, NY", website: "#" },
  { name: "ST CATHERINE OF SIENA HOSPITAL", city: "SMITHTOWN", address: "SMITHTOWN, NY", website: "#" },
  { name: "RICHMOND UNIVERSITY MEDICAL CENTER", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "#" },
  { name: "STATEN ISLAND UNIVERSITY HOSPITAL", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "#" },
  { name: "SOUTH BEACH PSYCHIATRIC CENTER", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "#" },
  { name: "SUNY/STONY BROOK UNIVERSITY HOSPITAL", city: "STONY BROOK", address: "STONY BROOK, NY", website: "#" },
  { name: "ST JOSEPH'S HOSPITAL HEALTH CENTER", city: "SYRACUSE", address: "SYRACUSE, NY", website: "#" },
  { name: "UNIVERSITY HOSPITAL S U N Y HEALTH SCIENCE CENTER", city: "SYRACUSE", address: "SYRACUSE, NY", website: "#" },
  { name: "HUTCHINGS PSYCHIATRIC CTR", city: "SYRACUSE", address: "SYRACUSE, NY", website: "#" },
  { name: "SAMARITAN HOSPITAL OF TROY, NEW YORK", city: "TROY", address: "TROY, NY", website: "#" },
  { name: "MOHAWK VALLEY PSYCHIATRIC CENTER", city: "UTICA", address: "UTICA, NY", website: "#" },
  { name: "WESTCHESTER MEDICAL CENTER", city: "VALHALLA", address: "VALHALLA, NY", website: "#" },
  { name: "WYOMING COUNTY", city: "WARSAW", address: "WARSAW, NY", website: "#" },
  { name: "PILGRIM PSYCHIATRIC CENTER", city: "WEST BRENTWOOD", address: "WEST BRENTWOOD, NY", website: "#" },
  { name: "WESTERN NY CHILDRENS PSYCHIATRIC CENTER", city: "WEST SENECA", address: "WEST SENECA, NY", website: "#" },
  { name: "ST JOSEPH'S MEDICAL CENTER", city: "YONKERS", address: "YONKERS, NY", website: "#" }
];

// ===== MOCK DATA KPI (Sementara) =====
const kpiData = {
  SMD: Array.from({length: 57}, () => (Math.random() * 20 + 5).toFixed(1)),
  FAPH: Array.from({length: 57}, () => (Math.random() * 25 + 10).toFixed(1)),
  MedCont: Array.from({length: 57}, () => (Math.random() * 30 + 15).toFixed(1)),
  READM: Array.from({length: 57}, () => (Math.random() * 15 + 8).toFixed(1))
};

const nyAverages = { SMD: 12.8, FAPH: 18.5, MedCont: 24.2, READM: 13.5 };

function getDataForKPI(kpi) {
  if (kpi === 'ALL') return allCityNames.map((_, idx) => ((parseFloat(kpiData.SMD[idx]) + parseFloat(kpiData.FAPH[idx]) + parseFloat(kpiData.MedCont[idx]) + parseFloat(kpiData.READM[idx])) / 4).toFixed(1));
  return kpiData[kpi];
}

function getNYAvgValue(kpi) {
  if (kpi === 'ALL') return ((nyAverages.SMD + nyAverages.FAPH + nyAverages.MedCont + nyAverages.READM) / 4).toFixed(1);
  return nyAverages[kpi];
}

function getTop10(kpi) { 
  const data = getDataForKPI(kpi).map((v,i)=> ({name:allCityNames[i], value:parseFloat(v)})); 
  return data.sort((a,b)=>b.value-a.value).slice(0,10); 
}

function getBottom10(kpi) { 
  const data = getDataForKPI(kpi).map((v,i)=> ({name:allCityNames[i], value:parseFloat(v)})); 
  return data.sort((a,b)=>a.value-b.value).slice(0,10); 
}

// ===== CHART 1 =====
let currentPage = 1, citiesPerPage = 10, totalPages = Math.ceil(57/citiesPerPage), chart1, currentKPI = 'ALL';

function updateChart1() {
  const start = (currentPage-1)*citiesPerPage, end = start+citiesPerPage;
  const labels = allCityNames.slice(start,end), data = getDataForKPI(currentKPI).slice(start,end), nyAvg = getNYAvgValue(currentKPI);
  
  document.getElementById('nyAvgDisplay').innerHTML = `NY State Avg: ${nyAvg}`;
  document.getElementById('pageIndicator').innerHTML = `Page ${currentPage} / ${totalPages}`;
  document.getElementById('prevBtn').disabled = currentPage===1; 
  document.getElementById('nextBtn').disabled = currentPage===totalPages;
  
  if(chart1) chart1.destroy();
  
  const ctx = document.getElementById('cityChart').getContext('2d');
  chart1 = new Chart(ctx, { 
    type:'bar', 
    data:{ 
      labels, 
      datasets:[
        { label: currentKPI==='ALL'?'Average of All KPIs':currentKPI, data:data.map(v=>parseFloat(v)), backgroundColor:'rgba(108,39,217,0.7)', borderColor:'#6C27D9', borderWidth:2, borderRadius:6 },
        { label:'NY State Benchmark', data:Array(labels.length).fill(parseFloat(nyAvg)), type:'line', borderColor:'#FF6B6B', borderWidth:3, borderDash:[8,6], fill:false, pointRadius:0 }
      ] 
    }, 
    options:{ 
      responsive:true, 
      maintainAspectRatio:true, 
      plugins:{ 
        legend:{ position:'top', labels:{ boxWidth:15, padding:15 } }, 
        tooltip:{ callbacks:{ label:(ctx)=>`${ctx.dataset.label}: ${ctx.raw}%` } } 
      }, 
      scales:{ 
        y:{ title:{ display:true, text:'Percentage (%)', font:{size:12} }, min:0, max:50, ticks:{ stepSize:5, callback:(v)=>v+'%', font:{size:11} } }, 
        x:{ ticks:{ maxRotation:0, minRotation:0, font:{size:11} } } 
      } 
    } 
  });
  
  setTimeout(() => lucide.createIcons(), 100);
}

window.changeKPI = function() { 
  currentKPI = document.getElementById('kpiSelect').value; 
  currentPage=1; 
  updateChart1(); 
};

window.previousPage = function() { 
  if(currentPage>1){ 
    currentPage--; 
    updateChart1(); 
  } 
};

window.nextPage = function() { 
  if(currentPage<totalPages){ 
    currentPage++; 
    updateChart1(); 
  } 
};

// ===== CHART HIGHEST =====
let chartHighest, currentKPIHighest = 'ALL';

window.updateHighestChart = function() {
  currentKPIHighest = document.getElementById('kpiSelectHighest').value;
  const top10 = getTop10(currentKPIHighest), nyAvg = getNYAvgValue(currentKPIHighest);
  document.getElementById('nyAvgHighestDisplay').innerHTML = `NY State Avg: ${nyAvg}`;
  if(chartHighest) chartHighest.destroy();
  const ctx = document.getElementById('highestChart').getContext('2d');
  chartHighest = new Chart(ctx, { 
    type:'bar', 
    data:{ 
      labels:top10.map(c=>c.name), 
      datasets:[
        { label: currentKPIHighest==='ALL'?'Average of All KPIs':currentKPIHighest, data:top10.map(c=>c.value), backgroundColor:'rgba(108,39,217,0.7)', borderColor:'#6C27D9', borderWidth:2, borderRadius:6 },
        { label:'NY State Benchmark', data:Array(top10.length).fill(parseFloat(nyAvg)), type:'line', borderColor:'#FF6B6B', borderWidth:3, borderDash:[8,6], fill:false, pointRadius:0 }
      ] 
    }, 
    options:{ 
      responsive:true, 
      maintainAspectRatio:true, 
      plugins:{ 
        legend:{ position:'top', labels:{ boxWidth:15, padding:15 } }, 
        tooltip:{ callbacks:{ label:(ctx)=>`${ctx.dataset.label}: ${ctx.raw}%` } } 
      }, 
      scales:{ 
        y:{ title:{ display:true, text:'Percentage (%)', font:{size:12} }, min:0, max:50, ticks:{ stepSize:5, callback:(v)=>v+'%', font:{size:11} } }, 
        x:{ ticks:{ maxRotation:0, minRotation:0, font:{size:11} } } 
      } 
    } 
  });
  setTimeout(() => lucide.createIcons(), 100);
};

// ===== CHART LOWEST =====
let chartLowest, currentKPILowest = 'ALL';

window.updateLowestChart = function() {
  currentKPILowest = document.getElementById('kpiSelectLowest').value;
  const bottom10 = getBottom10(currentKPILowest), nyAvg = getNYAvgValue(currentKPILowest);
  document.getElementById('nyAvgLowestDisplay').innerHTML = `NY State Avg: ${nyAvg}`;
  if(chartLowest) chartLowest.destroy();
  const ctx = document.getElementById('lowestChart').getContext('2d');
  chartLowest = new Chart(ctx, { 
    type:'bar', 
    data:{ 
      labels:bottom10.map(c=>c.name), 
      datasets:[
        { label: currentKPILowest==='ALL'?'Average of All KPIs':currentKPILowest, data:bottom10.map(c=>c.value), backgroundColor:'rgba(108,39,217,0.7)', borderColor:'#6C27D9', borderWidth:2, borderRadius:6 },
        { label:'NY State Benchmark', data:Array(bottom10.length).fill(parseFloat(nyAvg)), type:'line', borderColor:'#FF6B6B', borderWidth:3, borderDash:[8,6], fill:false, pointRadius:0 }
      ] 
    }, 
    options:{ 
      responsive:true, 
      maintainAspectRatio:true, 
      plugins:{ 
        legend:{ position:'top', labels:{ boxWidth:15, padding:15 } }, 
        tooltip:{ callbacks:{ label:(ctx)=>`${ctx.dataset.label}: ${ctx.raw}%` } } 
      }, 
      scales:{ 
        y:{ title:{ display:true, text:'Percentage (%)', font:{size:12} }, min:0, max:50, ticks:{ stepSize:5, callback:(v)=>v+'%', font:{size:11} } }, 
        x:{ ticks:{ maxRotation:0, minRotation:0, font:{size:11} } } 
      } 
    } 
  });
  setTimeout(() => lucide.createIcons(), 100);
};

// ===== SPECIFIC CITY FUNCTIONS =====
let selectedCity = null;
let cityOptions = [...allCityNames];

function renderCityOptions(filter = '') {
  const filtered = cityOptions.filter(city => city.toLowerCase().includes(filter.toLowerCase()));
  const container = document.getElementById('cityOptionsList');
  container.innerHTML = filtered.map(city => `<div class="select-option" onclick="selectCityOption('${city}')">${city}</div>`).join('');
  if (filtered.length === 0) {
    container.innerHTML = '<div class="select-option" style="color: #888;">No cities found</div>';
  }
}

window.toggleSelect = function() {
  const items = document.getElementById('selectItems');
  const selected = document.querySelector('.select-selected');
  items.classList.toggle('show');
  selected.classList.toggle('active');
  if (items.classList.contains('show')) {
    document.getElementById('citySearchInput').value = '';
    renderCityOptions();
    document.getElementById('citySearchInput').focus();
  }
};

window.filterCities = function() {
  const searchTerm = document.getElementById('citySearchInput').value;
  renderCityOptions(searchTerm);
};

window.selectCityOption = function(cityName) {
  selectedCity = cityName;
  document.getElementById('selectedCityText').innerText = cityName;
  document.getElementById('selectItems').classList.remove('show');
  document.querySelector('.select-selected').classList.remove('active');
  document.getElementById('goToCityBtn').style.display = 'inline-block';
  setTimeout(() => lucide.createIcons(), 100);
};

window.goToCityPage = function() {
  if (selectedCity) {
    window.location.href = `${selectedCity.toLowerCase()}.html`;
  }
};

// ===== HEALTHCARE FACILITIES PAGINATION =====
let healthcareCurrentPage = 1;
const healthcarePerPage = 8;
const healthcareTotalPages = Math.ceil(healthcareFacilities.length / healthcarePerPage);

function renderHealthcareGrid() {
  const start = (healthcareCurrentPage - 1) * healthcarePerPage;
  const end = start + healthcarePerPage;
  const pageFacilities = healthcareFacilities.slice(start, end);
  
  const container = document.getElementById('healthcareGrid');
  container.innerHTML = pageFacilities.map(facility => `
    <a href="${facility.website}" target="_blank" class="healthcare-card">
      <div class="healthcare-image">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9-4-18-3 9H2"/></svg>
      </div>
      <div class="healthcare-info">
        <div class="healthcare-name">${facility.name.substring(0, 35)}${facility.name.length > 35 ? '...' : ''}</div>
        <div class="healthcare-address">${facility.address}</div>
      </div>
    </a>
  `).join('');
  
  document.getElementById('healthcarePageIndicator').innerHTML = `Page ${healthcareCurrentPage} / ${healthcareTotalPages}`;
  document.getElementById('healthcarePrevBtn').disabled = healthcareCurrentPage === 1;
  document.getElementById('healthcareNextBtn').disabled = healthcareCurrentPage === healthcareTotalPages;
  setTimeout(() => lucide.createIcons(), 100);
}

window.prevHealthcarePage = function() {
  if (healthcareCurrentPage > 1) {
    healthcareCurrentPage--;
    renderHealthcareGrid();
  }
};

window.nextHealthcarePage = function() {
  if (healthcareCurrentPage < healthcareTotalPages) {
    healthcareCurrentPage++;
    renderHealthcareGrid();
  }
};

// ===== INITIAL RENDER =====
setTimeout(() => {
  lucide.createIcons();
  updateChart1();
  window.updateHighestChart();
  window.updateLowestChart();
  renderCityOptions();
  renderHealthcareGrid();
}, 500);