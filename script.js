
// NAVIGATION
// =====================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

if(navToggle){
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('show-icon');
  });
}

// Close menu when clicking nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    navToggle.classList.remove('show-icon');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if(window.scrollY > 50){
    header.classList.remove('transparent');
    header.classList.add('solid');
  } else {
    header.classList.add('transparent');
    header.classList.remove('solid');
  }
});

// =====================
// HERO SLIDER
// =====================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');

// Create dots
if(slides.length > 0 && dotsContainer) {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if(index === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });
}

function showSlide(n) {
  if(slides.length === 0) return;
  
  slides.forEach(slide => slide.classList.remove('active'));
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if(dots[currentSlide]) dots[currentSlide].classList.add('active');
  
  // Animate text
  const slideText = slides[currentSlide].querySelector('.slide-text');
  if(slideText) {
    slideText.style.animation = 'none';
    setTimeout(() => {
      slideText.style.animation = 'textUp 0.8s ease-out forwards';
    }, 10);
  }
}

function changeSlide(n) {
  showSlide(currentSlide + n);
}

function goToSlide(n) {
  showSlide(n);
}

// Auto slide
if(slides.length > 0) {
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// =====================
// ASSESSMENT TOOLS
// =====================

// PHQ-9 (Depression)
// const phq9Questions = [
//   "Kurang minat atau kesenangan dalam melakukan sesuatu",
//   "Merasa sedih, tertekan, atau putus asa",
//   "Kesulitan tidur atau tidur terlalu banyak",
//   "Merasa lelah atau kurang energi",
//   "Nafsu makan berkurang atau makan berlebihan",
//   "Merasa buruk tentang diri sendiri atau merasa gagal",
//   "Kesulitan berkonsentrasi",
//   "Bergerak atau berbicara sangat lambat, atau sebaliknya gelisah",
//   "Pikiran bahwa Anda lebih baik mati atau menyakiti diri sendiri"
// ];

// const phq9Options = [
//   { value: 0, label: "Tidak sama sekali" },
//   { value: 1, label: "Beberapa hari" },
//   { value: 2, label: "Lebih dari seminggu" },
//   { value: 3, label: "Hampir setiap hari" }
// ];

// const gad7Questions = [
//   "Merasa gugup, cemas, atau tegang",
//   "Tidak dapat menghentikan atau mengontrol kekhawatiran",
//   "Terlalu khawatir tentang berbagai hal",
//   "Kesulitan untuk rileks",
//   "Sangat gelisah sehingga sulit untuk duduk diam",
//   "Mudah terganggu atau mudah marah",
//   "Merasa takut seolah-olah sesuatu yang mengerikan akan terjadi"
// ];

// const gad7Options = [
//   { value: 0, label: "Tidak sama sekali" },
//   { value: 1, label: "Beberapa hari" },
//   { value: 2, label: "Lebih dari seminggu" },
//   { value: 3, label: "Hampir setiap hari" }
// ];

// const stressQuestions = [
//   "Merasa kewalahan dengan tugas-tugas kuliah",
//   "Sulit tidur karena memikirkan kuliah/tugas",
//   "Merasa tegang atau sakit kepala karena tekanan",
//   "Kesulitan mengatur waktu dan prioritas",
//   "Merasa tidak punya waktu untuk diri sendiri",
//   "Sering merasa lelah meski sudah istirahat",
//   "Mudah marah atau frustrasi dengan hal kecil",
//   "Kesulitan berkonsentrasi saat belajar"
// ];

// const stressOptions = [
//   { value: 0, label: "Tidak pernah" },
//   { value: 1, label: "Kadang-kadang" },
//   { value: 2, label: "Sering" },
//   { value: 3, label: "Sangat sering" }
// ];

// function renderAssessment(formId, questions, options) {
//   const form = document.getElementById(formId);
//   if(!form) return;
  
//   let html = '';
//   questions.forEach((question, index) => {
//     html += `
//       <div class=\"question\">
//         <p>${index + 1}. ${question}</p>
//         <div class=\"options\">
//           ${options.map((opt, optIndex) => `
//             <input type=\"radio\" id=\"${formId}_q${index}_opt${optIndex}\" 
//                    name=\"${formId}_q${index}\" value=\"${opt.value}\">
//             <label for=\"${formId}_q${index}_opt${optIndex}\">${opt.label}</label>
//           `).join('')}
//         </div>
//       </div>
//     `;
//   });
  
//   html += `<button type=\"button\" onclick=\"calculate${formId.charAt(0).toUpperCase() + formId.slice(1)}()\">Hitung Hasil</button>`;
//   form.innerHTML = html;
// }

// function calculatePhqForm() {
//   const form = document.getElementById('phqForm');
//   const result = document.getElementById('phqResult');
//   let total = 0;
//   let allAnswered = true;
  
//   for(let i = 0; i < phq9Questions.length; i++) {
//     const selected = form.querySelector(`input[name=\"phqForm_q${i}\"]:checked`);
//     if(selected) {
//       total += parseInt(selected.value);
//     } else {
//       allAnswered = false;
//     }
//   }
  
//   if(!allAnswered) {
//     alert('Mohon jawab semua pertanyaan terlebih dahulu.');
//     return;
//   }
  
//   let interpretation = '';
//   let severity = '';
  
//   if(total >= 0 && total <= 4) {
//     severity = 'Normal';
//     interpretation = 'Anda menunjukkan gejala depresi yang minimal. Terus jaga kesehatan mental dengan kebiasaan positif.';
//   } else if(total >= 5 && total <= 9) {
//     severity = 'Ringan';
//     interpretation = 'Anda menunjukkan gejala depresi ringan. Pertimbangkan untuk berbicara dengan teman dekat atau konselor.';
//   } else if(total >= 10 && total <= 14) {
//     severity = 'Sedang';
//     interpretation = 'Anda menunjukkan gejala depresi sedang. Sangat disarankan untuk berkonsultasi dengan profesional kesehatan mental.';
//   } else if(total >= 15 && total <= 19) {
//     severity = 'Cukup Berat';
//     interpretation = 'Anda menunjukkan gejala depresi cukup berat. Penting untuk segera mencari bantuan profesional.';
//   } else {
//     severity = 'Berat';
//     interpretation = 'Anda menunjukkan gejala depresi berat. Sangat penting untuk segera mendapatkan bantuan profesional.';
//   }
  
//   result.innerHTML = `
//     <h4>📊 Hasil PHQ-9</h4>
//     <p><strong>Skor:</strong> ${total}/27</p>
//     <p><strong>Tingkat:</strong> ${severity}</p>
//     <p>${interpretation}</p>
//     <p style=\"margin-top: 1rem; font-size: 0.9rem; color: #64748b;\">
//       ⚠️ Hasil ini bersifat edukatif dan bukan diagnosis medis. 
//       Konsultasikan dengan profesional untuk evaluasi lebih lanjut.
//     </p>
//   `;
//   result.classList.remove('hidden');
//   result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// }

// function calculateGadForm() {
//   const form = document.getElementById('gadForm');
//   const result = document.getElementById('gadResult');
//   let total = 0;
//   let allAnswered = true;
  
//   for(let i = 0; i < gad7Questions.length; i++) {
//     const selected = form.querySelector(`input[name=\"gadForm_q${i}\"]:checked`);
//     if(selected) {
//       total += parseInt(selected.value);
//     } else {
//       allAnswered = false;
//     }
//   }
  
//   if(!allAnswered) {
//     alert('Mohon jawab semua pertanyaan terlebih dahulu.');
//     return;
//   }
  
//   let interpretation = '';
//   let severity = '';
  
//   if(total >= 0 && total <= 4) {
//     severity = 'Minimal';
//     interpretation = 'Anda menunjukkan gejala kecemasan yang minimal. Lanjutkan kebiasaan sehat Anda.';
//   } else if(total >= 5 && total <= 9) {
//     severity = 'Ringan';
//     interpretation = 'Anda menunjukkan gejala kecemasan ringan. Coba teknik relaksasi atau mindfulness.';
//   } else if(total >= 10 && total <= 14) {
//     severity = 'Sedang';
//     interpretation = 'Anda menunjukkan gejala kecemasan sedang. Pertimbangkan untuk berbicara dengan konselor atau psikolog.';
//   } else {
//     severity = 'Berat';
//     interpretation = 'Anda menunjukkan gejala kecemasan berat. Sangat disarankan untuk mencari bantuan profesional segera.';
//   }
  
//   result.innerHTML = `
//     <h4>📊 Hasil GAD-7</h4>
//     <p><strong>Skor:</strong> ${total}/21</p>
//     <p><strong>Tingkat:</strong> ${severity}</p>
//     <p>${interpretation}</p>
//     <p style=\"margin-top: 1rem; font-size: 0.9rem; color: #64748b;\">
//       ⚠️ Hasil ini bersifat edukatif dan bukan diagnosis medis. 
//       Konsultasikan dengan profesional untuk evaluasi lebih lanjut.
//     </p>
//   `;
//   result.classList.remove('hidden');
//   result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// }

// function calculateStressForm() {
//   const form = document.getElementById('stressForm');
//   const result = document.getElementById('stressResult');
//   let total = 0;
//   let allAnswered = true;
  
//   for(let i = 0; i < stressQuestions.length; i++) {
//     const selected = form.querySelector(`input[name=\"stressForm_q${i}\"]:checked`);
//     if(selected) {
//       total += parseInt(selected.value);
//     } else {
//       allAnswered = false;
//     }
//   }
  
//   if(!allAnswered) {
//     alert('Mohon jawab semua pertanyaan terlebih dahulu.');
//     return;
//   }
  
//   let interpretation = '';
//   let severity = '';
  
//   if(total >= 0 && total <= 8) {
//     severity = 'Rendah';
//     interpretation = 'Tingkat stres Anda rendah. Anda mengelola stres dengan baik. Pertahankan!';
//   } else if(total >= 9 && total <= 16) {
//     severity = 'Sedang';
//     interpretation = 'Tingkat stres Anda sedang. Perhatikan kesehatan mental dan coba teknik manajemen stres.';
//   } else {
//     severity = 'Tinggi';
//     interpretation = 'Tingkat stres Anda tinggi. Penting untuk mencari dukungan dan menerapkan strategi manajemen stres segera.';
//   }
  
//   result.innerHTML = `
//     <h4>📊 Hasil Tes Stres</h4>
//     <p><strong>Skor:</strong> ${total}/24</p>
//     <p><strong>Tingkat:</strong> ${severity}</p>
//     <p>${interpretation}</p>
//     <p style=\"margin-top: 1rem; font-size: 0.9rem; color: #64748b;\">
//       💡 Tip: Cobalah teknik pernapasan, olahraga teratur, dan tidur cukup untuk mengurangi stres.
//     </p>
//   `;
//   result.classList.remove('hidden');
//   result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// }

// Initialize assessments
// if(document.getElementById('phqForm')) {
//   renderAssessment('phqForm', phq9Questions, phq9Options);
// }
// if(document.getElementById('gadForm')) {
//   renderAssessment('gadForm', gad7Questions, gad7Options);
// }
// if(document.getElementById('stressForm')) {
//   renderAssessment('stressForm', stressQuestions, stressOptions);
// }

/* =====================================================
   DATA PERTANYAAN
===================================================== */

// PHQ-9 (Depresi)
const phq9Questions = [
  "Kurang minat atau kesenangan dalam melakukan sesuatu",
  "Merasa sedih, tertekan, atau putus asa",
  "Kesulitan tidur atau tidur terlalu banyak",
  "Merasa lelah atau kurang energi",
  "Nafsu makan berkurang atau makan berlebihan",
  "Merasa buruk tentang diri sendiri atau merasa gagal",
  "Kesulitan berkonsentrasi",
  "Bergerak atau berbicara sangat lambat, atau sebaliknya gelisah",
  "Pikiran bahwa Anda lebih baik mati atau menyakiti diri sendiri"
];

// GAD-7 (Kecemasan)
const gad7Questions = [
  "Merasa gugup, cemas, atau tegang",
  "Tidak dapat menghentikan atau mengontrol kekhawatiran",
  "Terlalu khawatir tentang berbagai hal",
  "Kesulitan untuk rileks",
  "Sangat gelisah sehingga sulit untuk duduk diam",
  "Mudah terganggu atau mudah marah",
  "Merasa takut seolah-olah sesuatu yang mengerikan akan terjadi"
];

// Stres Akademik
const stressQuestions = [
  "Merasa kewalahan dengan tugas-tugas kuliah",
  "Sulit tidur karena memikirkan kuliah/tugas",
  "Merasa tegang atau sakit kepala karena tekanan",
  "Kesulitan mengatur waktu dan prioritas",
  "Merasa tidak punya waktu untuk diri sendiri",
  "Sering merasa lelah meski sudah istirahat",
  "Mudah marah atau frustrasi dengan hal kecil",
  "Kesulitan berkonsentrasi saat belajar"
];

/* =====================================================
   SKALA JAWABAN (LIKERT)
===================================================== */

// Untuk PHQ & GAD
const likertPHQ = [
  { value: 1, label: "Tidak sama sekali" },
  { value: 2, label: "Kadang / jarang" },
  { value: 3, label: "Lumayan sering" },
  { value: 4, label: "Hampir tiap hari" }
];

// Untuk Stres
const likertStress = [
  { value: 1, label: "Sangat tidak setuju" },
  { value: 2, label: "Tidak setuju" },
  { value: 3, label: "Netral" },
  { value: 4, label: "Setuju" },
  { value: 5, label: "Sangat setuju" }
];

/* =====================================================
   RENDER FORM (FIX HOVER & CHECKED)
===================================================== */

function renderAssessment({ formId, questions, options }) {
  const form = document.getElementById(formId);
  if (!form) return;

  let html = "";

  questions.forEach((q, i) => {
    html += `
      <div class="question">
        <p>${i + 1}. ${q}</p>
        <div class="options">
          ${options.map(opt => `
            <div class="option">
              <input
                type="radio"
                id="${formId}_${i}_${opt.value}"
                name="${formId}_q${i}"
                value="${opt.value}"
              >
              <label for="${formId}_${i}_${opt.value}">
                ${opt.label}
              </label>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  });

  html += `
    <button type="button"
      onclick="calculateAssessment({
        formId: '${formId}',
        questions: ${formId === 'phqForm'
          ? 'phq9Questions'
          : formId === 'gadForm'
          ? 'gad7Questions'
          : 'stressQuestions'},
        options: ${formId === 'stressForm'
          ? 'likertStress'
          : 'likertPHQ'},
        resultId: '${formId.replace('Form', 'Result')}'
      })">
      Hitung Hasil
    </button>
  `;

  form.innerHTML = html;
}

/* =====================================================
   INTERPRETASI BERDASARKAN RATA-RATA
===================================================== */

function getInterpretation(avg) {
  if (avg < 1.8) return ["Sangat Rendah", "Gejala hampir tidak dirasakan."];
  if (avg < 2.6) return ["Rendah", "Gejala ringan dan masih terkendali."];
  if (avg < 3.4) return ["Sedang", "Gejala cukup terasa dan perlu perhatian."];
  if (avg < 4.2) return ["Tinggi", "Gejala sering dirasakan, disarankan mencari dukungan."];
  return ["Sangat Tinggi", "Gejala sangat sering dirasakan, segera cari bantuan profesional."];
}

/* =====================================================
   FUNGSI HITUNG UNIVERSAL
===================================================== */

function calculateAssessment({ formId, questions, options, resultId }) {
  const form = document.getElementById(formId);
  const result = document.getElementById(resultId);

  let total = 0;

  for (let i = 0; i < questions.length; i++) {
    const selected = form.querySelector(
      `input[name="${formId}_q${i}"]:checked`
    );

    if (!selected) {
      alert("Mohon jawab semua pertanyaan terlebih dahulu.");
      return;
    }

    total += Number(selected.value);
  }

  const average = total / questions.length;
  const [level, description] = getInterpretation(average);

  result.innerHTML = `
    <h4>📊 Hasil Assessment</h4>
    <p><strong>Rata-rata Skor:</strong> ${average.toFixed(2)} / ${options.length}.00</p>
    <p><strong>Tingkat:</strong> ${level}</p>
    <p>${description}</p>
    <p style="margin-top:1rem;font-size:0.9rem;color:#64748b;">
      ⚠️ Hasil ini bersifat edukatif dan bukan diagnosis medis.
    </p>
  `;

  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* =====================================================
   INISIALISASI
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderAssessment({
    formId: "phqForm",
    questions: phq9Questions,
    options: likertPHQ
  });

  renderAssessment({
    formId: "gadForm",
    questions: gad7Questions,
    options: likertPHQ
  });

  renderAssessment({
    formId: "stressForm",
    questions: stressQuestions,
    options: likertStress
  });
});



// =====================
// MOOD TRACKER
// =====================
function saveMood(emoji) {
  const today = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const jam = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const moodLog = document.getElementById('moodLog');
  const moodData = localStorage.getItem('moodData');
  let moods = moodData ? JSON.parse(moodData) : [];
  
  // Add new mood
  moods.unshift({ emoji, date: today , clock: jam});
  
  // Keep only last 7 days
  moods = moods.slice(0, 7);
  
  localStorage.setItem('moodData', JSON.stringify(moods));
  
  displayMoodLog();
  
  // Show confirmation
  alert(`Mood ${emoji} berhasil disimpan untuk hari ini!`);
}

function displayMoodLog() {
  const moodLog = document.getElementById('moodLog');
  if(!moodLog) return;
  
  const moodData = localStorage.getItem('moodData');
  if(!moodData) {
    moodLog.innerHTML = 'Belum ada catatan mood. Mulai catat mood Anda hari ini!';
    return;
  }
  
  const moods = JSON.parse(moodData);
  let html = '<strong>Riwayat Mood Hari Ini:</strong><br><br>';
  
  moods.forEach(mood => {
    html += `${mood.emoji} ${mood.date} ${mood.clock}<br>`;
  });
  
  moodLog.innerHTML = html;
}

// Display mood log on page load
if(document.getElementById('moodLog')) {
  displayMoodLog();
}

// =====================
// QUIZ SECTION
// =====================
const quizQuestions = [
  {
    question: "Dalam 2 minggu terakhir, seberapa sering Anda merasa sedih atau tertekan?",
    options: ["Tidak pernah", "Kadang-kadang", "Sering", "Hampir setiap hari"]
  },
  {
    question: "Apakah Anda mengalami kehilangan minat pada aktivitas yang biasanya Anda nikmati?",
    options: ["Tidak", "Sedikit", "Cukup banyak", "Sangat banyak"]
  },
  {
    question: "Bagaimana kualitas tidur Anda akhir-akhir ini?",
    options: ["Sangat baik", "Baik", "Buruk", "Sangat buruk"]
  },
  {
    question: "Seberapa sering Anda merasa lelah tanpa alasan yang jelas?",
    options: ["Tidak pernah", "Kadang-kadang", "Sering", "Selalu"]
  },
  {
    question: "Apakah Anda merasa sulit berkonsentrasi pada tugas kuliah?",
    options: ["Tidak", "Sedikit", "Cukup sulit", "Sangat sulit"]
  },
  {
    question: "Bagaimana perasaan Anda tentang masa depan?",
    options: ["Optimis", "Cukup optimis", "Pesimis", "Sangat pesimis"]
  },
  {
    question: "Apakah Anda merasa terisolasi atau kesepian?",
    options: ["Tidak", "Kadang-kadang", "Sering", "Selalu"]
  },
  {
    question: "Seberapa sering Anda mengalami perubahan nafsu makan yang signifikan?",
    options: ["Tidak pernah", "Kadang-kadang", "Sering", "Sangat sering"]
  },
  {
    question: "Apakah Anda pernah merasa putus asa dalam sebulan terakhir?",
    options: ["Tidak pernah", "Jarang", "Kadang-kadang", "Sering"]
  },
  {
    question: "Bagaimana Anda menilai kesehatan mental Anda saat ini?",
    options: ["Sangat baik", "Baik", "Buruk", "Sangat buruk"]
  }
];

let currentQuestion = 0;
let quizAnswers = [];

function initQuiz() {
  if(!document.getElementById('quiz-container')) return;
  
  currentQuestion = 0;
  quizAnswers = [];
  showQuestion();
  updateProgress();
}

function showQuestion() {
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  if(!questionText || !optionsContainer) return;
  
  const q = quizQuestions[currentQuestion];
  questionText.textContent = q.question;
  
  optionsContainer.innerHTML = '';
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => selectOption(index);
    
    if(quizAnswers[currentQuestion] === index) {
      btn.classList.add('selected');
    }
    
    optionsContainer.appendChild(btn);
  });
  
  // Button visibility
  prevBtn.style.display = currentQuestion === 0 ? 'none' : 'block';
  
  if(currentQuestion === quizQuestions.length - 1) {
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
  }
  
  updateProgress();
}

function selectOption(index) {
  quizAnswers[currentQuestion] = index;
  
  const options = document.querySelectorAll('.option-btn');
  options.forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });
  
  document.getElementById('warning').classList.add('hidden');
}

function prevQuestion() {
  if(currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function nextQuestion() {
  if(quizAnswers[currentQuestion] === undefined) {
    document.getElementById('warning').classList.remove('hidden');
    return;
  }
  
  if(currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

function submitQuiz() {
  if(quizAnswers[currentQuestion] === undefined) {
    document.getElementById('warning').classList.remove('hidden');
    return;
  }
  
  // Calculate score
  const totalScore = quizAnswers.reduce((sum, answer) => sum + answer, 0);
  const maxScore = quizQuestions.length * 3;
  const percentage = (totalScore / maxScore) * 100;
  
  let interpretation = '';
  let severity = '';
  
  if(percentage <= 25) {
    severity = 'Baik';
    interpretation = 'Kesehatan mental Anda dalam kondisi baik. Pertahankan kebiasaan positif dan jaga keseimbangan hidup Anda.';
  } else if(percentage <= 50) {
    severity = 'Cukup Baik';
    interpretation = 'Kondisi mental Anda cukup baik, namun ada beberapa area yang perlu perhatian. Pertimbangkan untuk menerapkan lebih banyak self-care.';
  } else if(percentage <= 75) {
    severity = 'Perlu Perhatian';
    interpretation = 'Anda menunjukkan tanda-tanda yang memerlukan perhatian. Sangat disarankan untuk berbicara dengan konselor atau psikolog.';
  } else {
    severity = 'Perlu Bantuan Segera';
    interpretation = 'Hasil menunjukkan Anda mungkin mengalami kesulitan yang signifikan. Penting untuk segera mencari bantuan profesional.';
  }
  
  // Show result
  document.getElementById('quiz-container').classList.add('hidden');
  const resultDiv = document.getElementById('quiz-result');
  resultDiv.classList.remove('hidden');
  
  document.getElementById('scoreText').textContent = `Skor Anda: ${totalScore}/${maxScore} (${Math.round(percentage)}%)`;
  document.getElementById('interpretation').innerHTML = `
    <strong>Status:</strong> ${severity}<br><br>
    ${interpretation}<br><br>
    <em>Catatan: Hasil ini bersifat edukatif dan bukan diagnosis medis profesional. 
    Jika Anda merasa membutuhkan bantuan, jangan ragu untuk menghubungi layanan kesehatan mental.</em>
  `;
  
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  initQuiz();
}

function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  if(!progressBar) return;
  
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progress + '%';
}

// Initialize quiz on page load
if(document.getElementById('quiz-app')) {
  initQuiz();
}

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});