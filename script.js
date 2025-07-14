// Loading Overlay functionality
const loadingOverlay = document.getElementById('loadingOverlay');

window.addEventListener('load', () => {
    // Sembunyikan overlay loading setelah semua dimuat
    loadingOverlay.classList.add('hidden');
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Perbarui aria-expanded untuk aksesibilitas
    const isExpanded = navLinks.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    mobileMenuBtn.innerHTML = isExpanded ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for Anchor Links and active nav link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Tutup menu mobile jika terbuka
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }

        const targetId = this.getAttribute('href');
        let scrollTargetTop = 0; // Default untuk gulir ke paling atas

        if (targetId !== '#') { // Jika bukan hanya '#' (yaitu, ada ID bagian)
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                scrollTargetTop = targetElement.offsetTop - 80; // Offset untuk fixed header
            }
        }
        
        window.scrollTo({
            top: scrollTargetTop,
            behavior: 'smooth'
        });
        

        // Hapus kelas 'active' dari semua tautan navigasi
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        // Tambahkan kelas 'active' ke tautan yang diklik
        this.classList.add('active');
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinksElements = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        // Pastikan section memiliki ID sebelum mencoba mengaksesnya
        if (section.id) {
            const sectionTop = section.offsetTop - 90; // Offset untuk header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        }
    });

    navLinksElements.forEach(link => {
        link.classList.remove('active');
        // Hanya tambahkan kelas 'active' jika link memiliki href yang cocok dengan ID bagian
        if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// Modal Handling
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const registerLink = document.getElementById('registerLink');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLoginLink');
const backToLoginFromForgotLink = document.getElementById('backToLoginFromForgotLink');

const privacyPolicyLink = document.getElementById('privacyPolicyLink');
const privacyPolicyModal = document.getElementById('privacyPolicyModal');
const termsOfServiceLink = document.getElementById('termsOfServiceLink');
const termsOfServiceModal = document.getElementById('termsOfServiceModal');
const closeModals = document.querySelectorAll('.close-modal');
const paymentModal = document.getElementById('paymentModal');
const exploreBigDataBtn = document.getElementById('exploreBigDataBtn');
const bigDataInfoModal = document.getElementById('bigDataInfoModal');

function openModal(modalElement) {
    modalElement.classList.add('show');
    modalElement.setAttribute('aria-hidden', 'false'); // Untuk aksesibilitas
    document.body.style.overflow = 'hidden'; // Mencegah scrolling background
    // Fokus pada modal pertama yang dapat difokuskan untuk aksesibilitas
    const focusableElements = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeModal(modalElement) {
    modalElement.classList.remove('show');
    modalElement.setAttribute('aria-hidden', 'true'); // Untuk aksesibilitas
    document.body.style.overflow = 'auto'; // Mengembalikan scrolling
}

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(registerModal);
});

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(forgotPasswordModal);
});

backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(registerModal);
    openModal(loginModal);
});

backToLoginFromForgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(forgotPasswordModal);
    openModal(loginModal);
});

privacyPolicyLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(privacyPolicyModal);
});

termsOfServiceLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(termsOfServiceModal);
});

if (exploreBigDataBtn) {
    exploreBigDataBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(bigDataInfoModal);
    });
}

closeModals.forEach(button => {
    button.addEventListener('click', (e) => {
        const modalId = button.dataset.modalId;
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            closeModal(modalElement);
        }
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Tutup modal dengan tombol ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => closeModal(modal));
    }
});


// Form Submission
const contactForm = document.getElementById('contactForm');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const paymentForm = document.getElementById('paymentForm');

// Fungsi untuk menampilkan kotak pesan kustom
function showMessageBox(message, type = 'info') { // Default ke 'info' (warna primary)
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', type);
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.opacity = 1;
    }, 10);

    setTimeout(() => {
        messageBox.style.opacity = 0;
        messageBox.addEventListener('transitionend', () => messageBox.remove());
    }, 3000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validasi sederhana untuk formulir kontak
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        showMessageBox('Harap isi semua kolom formulir kontak.', 'error');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessageBox('Format email tidak valid.', 'error');
        return;
    }

    showMessageBox('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.', 'success');
    contactForm.reset();
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (email && password) {
        showMessageBox('Berhasil masuk! Selamat datang kembali.', 'success');
        loginForm.reset();
        closeModal(loginModal);
    } else {
        showMessageBox('Email dan kata sandi diperlukan.', 'error');
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showMessageBox('Kata sandi tidak cocok!', 'error');
        return;
    }
    if (password.length < 8) {
        showMessageBox('Kata sandi minimal 8 karakter!', 'error');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessageBox('Format email tidak valid.', 'error');
        return;
    }

    if (name && email && password) {
        showMessageBox('Pendaftaran berhasil! Silakan masuk.', 'success');
        registerForm.reset();
        closeModal(registerModal);
        openModal(loginModal);
    } else {
        showMessageBox('Semua kolom harus diisi.', 'error');
    }
});

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    if (email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessageBox('Format email tidak valid.', 'error');
            return;
        }
        showMessageBox(`Tautan reset kata sandi telah dikirim ke ${email}.`, 'info');
        forgotPasswordForm.reset();
        closeModal(forgotPasswordModal);
    } else {
        showMessageBox('Email diperlukan untuk reset kata sandi.', 'error');
    }
});

// Handle pricing button clicks to open payment modal
const selectPlanButtons = document.querySelectorAll('.select-plan-btn');
const selectedPlanInput = document.getElementById('selectedPlan');
const selectedPriceInput = document.getElementById('selectedPrice');

selectPlanButtons.forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.dataset.plan;
        const price = button.dataset.price;
        selectedPlanInput.value = plan;
        selectedPriceInput.value = price;
        openModal(paymentModal);
    });
});

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const plan = selectedPlanInput.value;
    const price = selectedPriceInput.value;
    const paymentMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
    
    if (!paymentMethodRadio) {
        showMessageBox('Silakan pilih metode pembayaran.', 'error');
        return;
    }
    const paymentMethod = paymentMethodRadio.value;
    
    let accountNumberInfo = '';
    if (paymentMethod === 'transfer_bank') {
        accountNumberInfo = 'Nomor Rekening: BCA 1234567890 an. D\'CORPS';
    } else if (paymentMethod === 'dana') {
        accountNumberInfo = 'Nomor DANA: 0812-3456-7890 an. D\'CORPS';
    } else if (paymentMethod === 'ovo') {
        accountNumberInfo = 'Nomor OVO: 0812-9876-5432 an. D\'CORPS';
    }

    showMessageBox(`Anda telah memilih paket ${plan} seharga ${price} dengan pembayaran melalui ${paymentMethod}. Silakan transfer ke ${accountNumberInfo}. Ini adalah simulasi pembayaran.`, 'success');
    paymentForm.reset();
    closeModal(paymentModal);
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    let startTime = null;

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = easeOutQuad(progress);
        element.textContent = Math.floor(start + easedProgress * (target - start));

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = target;
        }
    }
    requestAnimationFrame(animate);
}

const statsSection = document.querySelector('.stats');
let counted = false;

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            const clientsCount = document.getElementById('clientsCount');
            const projectsCount = document.getElementById('projectsCount');
            const teamCount = document.getElementById('teamCount');
            const countriesCount = document.getElementById('countriesCount');

            animateCounter(clientsCount, parseInt(clientsCount.dataset.target));
            animateCounter(projectsCount, parseInt(projectsCount.dataset.target));
            animateCounter(teamCount, parseInt(teamCount.dataset.target));
            animateCounter(countriesCount, parseInt(countriesCount.dataset.target));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (statsSection) {
    observer.observe(statsSection);
}

// Service Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false'); // Untuk aksesibilitas
        });
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('aria-hidden', 'true'); // Untuk aksesibilitas
        });
        
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true'); // Untuk aksesibilitas
        const activeContent = document.getElementById(tabId + '-panel'); // Menggunakan ID panel
        activeContent.classList.add('active');
        activeContent.setAttribute('aria-hidden', 'false'); // Untuk aksesibilitas

        const serviceContent = activeContent.querySelector('.service-content');
        serviceContent.classList.remove('content-visible');
        void serviceContent.offsetWidth; // Trigger reflow to restart animation
        serviceContent.classList.add('content-visible');
    });
});

// Charts
let charts = {}; // Objek untuk menyimpan instance chart

function createChart(ctx, type, data, options, chartId) {
    // Hancurkan chart yang ada jika sudah ada untuk mencegah masalah inisialisasi ulang
    if (charts[chartId]) {
        charts[chartId].destroy();
    }
    charts[chartId] = new Chart(ctx, {
        type: type,
        data: data,
        options: options
    });
}

// Web Development Chart
const webDevCtx = document.getElementById('webDevChart').getContext('2d');
createChart(webDevCtx, 'bar', {
    labels: ['Perencanaan', 'Desain', 'Pengembangan', 'Pengujian', 'Peluncuran'],
    datasets: [{
        label: 'Linimasa Proyek',
        data: [10, 20, 40, 20, 10],
        backgroundColor: 'rgba(74, 103, 110, 0.7)', /* Updated to primary color */
        borderColor: 'rgba(74, 103, 110, 1)', /* Updated to primary color */
        borderWidth: 1
    }]
}, {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
}, 'webDevChart');

// Mobile App Chart
const mobileAppCtx = document.getElementById('mobileAppChart').getContext('2d');
createChart(mobileAppCtx, 'doughnut', {
    labels: ['iOS', 'Android', 'Lintas Platform'],
    datasets: [{
        data: [35, 45, 20],
        backgroundColor: [
            'rgba(74, 103, 110, 0.7)', /* Updated to primary color */
            'rgba(16, 185, 129, 0.7)',
            'rgba(224, 216, 176, 0.7)' /* Updated to secondary color */
        ],
        borderColor: [
            'rgba(74, 103, 110, 1)', /* Updated to primary color */
            'rgba(16, 185, 129, 1)',
            'rgba(224, 216, 176, 1)' /* Updated to secondary color */
        ],
        borderWidth: 1
    }]
}, {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom'
        }
    }
}, 'mobileAppChart');

// Cloud Chart
const cloudCtx = document.getElementById('cloudChart').getContext('2d');
createChart(cloudCtx, 'line', {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [{
        label: 'Pertumbuhan Adopsi Cloud',
        data: [20, 30, 45, 60, 75, 90],
        fill: true,
        backgroundColor: 'rgba(74, 103, 110, 0.2)', /* Updated to primary color */
        borderColor: 'rgba(74, 103, 110, 1)', /* Updated to primary color */
        tension: 0.4
    }]
}, {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
}, 'cloudChart');

// Marketing Chart
const marketingCtx = document.getElementById('marketingChart').getContext('2d');
createChart(marketingCtx, 'radar', {
    labels: ['SEO', 'Media Sosial', 'Konten', 'PPC', 'Email', 'Analisis'],
    datasets: [{
        label: 'Strategi Pemasaran',
        data: [85, 75, 90, 70, 80, 95],
        backgroundColor: 'rgba(224, 216, 176, 0.2)', /* Updated to secondary color */
        borderColor: 'rgba(224, 216, 176, 1)', /* Updated to secondary color */
        pointBackgroundColor: 'rgba(224, 216, 176, 1)', /* Updated to secondary color */
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(224, 216, 176, 1)' /* Updated to secondary color */
    }]
}, {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            angleLines: {
                display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
}, 'marketingChart');

// Big Data Chart (New Chart)
const bigDataCtx = document.getElementById('bigDataChart').getContext('2d');
createChart(bigDataCtx, 'line', {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [{
        label: 'Volume Data (Zettabyte)',
        data: [59, 74, 97, 120, 149, 181],
        fill: true,
        backgroundColor: 'rgba(74, 103, 110, 0.2)', /* Updated to primary color */
        borderColor: 'rgba(74, 103, 110, 1)', /* Updated to primary color */
        tension: 0.4,
        pointBackgroundColor: 'rgba(74, 103, 110, 1)', /* Updated to primary color */
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(74, 103, 110, 1)' /* Updated to primary color */
    }]
}, {
    label: 'Pertumbuhan Analisis (Indeks)',
    data: [30, 40, 55, 70, 85, 100],
    fill: false,
    borderColor: 'rgba(224, 216, 176, 1)', /* Updated to secondary color */
    tension: 0.4,
    pointBackgroundColor: 'rgba(224, 216, 176, 1)', /* Updated to secondary color */
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(224, 216, 176, 1)' /* Updated to secondary color */
}, {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Volume / Indeks'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Tahun'
            }
        }
    },
    plugins: {
        legend: {
            display: true,
            position: 'top'
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.dataset.label === 'Volume Data (Zettabyte)') {
                        label += context.raw + ' ZB';
                    } else {
                        label += context.raw + ' Indeks';
                    }
                    return label;
                }
            }
        }
    }
}, 'bigDataChart');


// Scroll Animation for content within sections
const elementsToAnimate = document.querySelectorAll(
    '.stats .container, ' +
    '.about-content, ' +
    '.features-grid, ' +
    '.service-content, ' +
    '.bigdata-content, ' +
    '.testimonial-grid, ' +
    '.pricing-grid, ' +
    '.team-grid, ' +
    '.client-logos, ' +
    '.contact-info, ' +
    '.contact-form, ' +
    '.cta-section .container'
);

const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('content-visible');
            contentObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

elementsToAnimate.forEach(element => {
    element.classList.add('content-hidden');
    contentObserver.observe(element);
});

// Navbar Scroll Behavior (Transparency and Hide/Show)
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    // Tambah/hapus kelas scrolled untuk background dan shadow
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

    // Sembunyikan/tampilkan saat scroll
    if (window.scrollY > lastScrollY && window.scrollY > 150) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
});

// Load More Testimonials functionality
const testimonialCards = document.querySelectorAll('#testimonialGrid .testimonial-card');
const loadMoreTestimonialsButton = document.getElementById('loadMoreTestimonials');
const initialTestimonialDisplayCount = 3;
const loadMoreTestimonialStep = 3;

let currentlyDisplayedTestimonials = initialTestimonialDisplayCount;

function updateTestimonialVisibility() {
    testimonialCards.forEach((card, index) => {
        if (index < currentlyDisplayedTestimonials) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });

    if (currentlyDisplayedTestimonials >= testimonialCards.length) {
        loadMoreTestimonialsButton.style.display = 'none';
    } else {
        loadMoreTestimonialsButton.style.display = 'inline-block';
    }
}

if (loadMoreTestimonialsButton) {
    loadMoreTestimonialsButton.addEventListener('click', () => {
        currentlyDisplayedTestimonials += loadMoreTestimonialStep;
        updateTestimonialVisibility();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateTestimonialVisibility();
});

// Load More Features functionality
const featureCards = document.querySelectorAll('#featuresGrid .feature-card');
const loadMoreFeaturesButton = document.getElementById('loadMoreFeatures');
const initialFeatureDisplayCount = 3;
const loadMoreFeatureStep = 3;

let currentlyDisplayedFeatures = initialFeatureDisplayCount;

function updateFeatureVisibility() {
    featureCards.forEach((card, index) => {
        if (index < currentlyDisplayedFeatures) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });

    if (currentlyDisplayedFeatures >= featureCards.length) {
        loadMoreFeaturesButton.style.display = 'none';
    } else {
        loadMoreFeaturesButton.style.display = 'inline-block';
    }
}

if (loadMoreFeaturesButton) {
    loadMoreFeaturesButton.addEventListener('click', () => {
        currentlyDisplayedFeatures += loadMoreFeatureStep;
        updateFeatureVisibility();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateFeatureVisibility();
});

// Load More Team functionality
const teamCards = document.querySelectorAll('#teamGrid .team-member');
const loadMoreTeamButton = document.getElementById('loadMoreTeam');
const initialTeamDisplayCount = 4;
const loadMoreTeamStep = 4;

let currentlyDisplayedTeam = initialTeamDisplayCount;

function updateTeamVisibility() {
    teamCards.forEach((card, index) => {
        if (index < currentlyDisplayedTeam) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });

    if (currentlyDisplayedTeam >= teamCards.length) {
        loadMoreTeamButton.style.display = 'none';
    } else {
        loadMoreTeamButton.style.display = 'inline-block';
    }
}

if (loadMoreTeamButton) {
    loadMoreTeamButton.addEventListener('click', () => {
        currentlyDisplayedTeam += loadMoreTeamStep;
        updateTeamVisibility();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateTeamVisibility();
});
