// MedConnect - Doctor Appointment Booking Application

// Application State
let appState = {
    currentUser: null,
    userRole: null,
    hospitals: [],
    doctors: [],
    patients: [],
    appointments: [],
    notifications: [],
    selectedDoctor: null,
    filteredDoctors: []
};

// Initialize application data
const initData = {
    hospitals: [
        {
            id: 1,
            name: "City General Hospital",
            address: "123 Healthcare Ave, Mumbai, Maharashtra, 400001",
            city: "Mumbai",
            phone: "+91 98765 43210",
            departments: ["Cardiology", "Neurology", "Orthopedics", "General Medicine"]
        },
        {
            id: 2,
            name: "Metro Medical Center",
            address: "456 Wellness Street, Delhi, 110001",
            city: "Delhi", 
            phone: "+91 87654 32109",
            departments: ["Dermatology", "Pediatrics", "Gynecology", "ENT"]
        },
        {
            id: 3,
            name: "Rainbow Children's Hospital",
            address: "789 Care Road, Bangalore, Karnataka, 560001",
            city: "Bangalore",
            phone: "+91 76543 21098",
            departments: ["Pediatrics", "Neonatology", "Child Psychology"]
        }
    ],
    doctors: [
        {
            id: 1,
            name: "Dr. Rajesh Kumar",
            email: "rajesh.kumar@hospital.com",
            password: "doctor123",
            phone: "+91 98765 43211",
            specialization: "Cardiologist",
            qualification: "MD Cardiology, AIIMS Delhi",
            experience: "15 years",
            hospitalId: 1,
            hospital: "City General Hospital",
            fees: 800,
            rating: 4.8,
            availability: {
                monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
                tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
                wednesday: ["09:00", "10:00", "11:00"],
                thursday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
                friday: ["09:00", "10:00", "11:00", "14:00", "15:00"]
            }
        },
        {
            id: 2,
            name: "Dr. Priya Sharma",
            email: "priya.sharma@hospital.com",
            password: "doctor123",
            phone: "+91 87654 32110",
            specialization: "Dermatologist",
            qualification: "MD Dermatology, PGI Chandigarh",
            experience: "12 years",
            hospitalId: 2,
            hospital: "Metro Medical Center",
            fees: 600,
            rating: 4.6,
            availability: {
                monday: ["10:00", "11:00", "12:00", "15:00", "16:00"],
                tuesday: ["10:00", "11:00", "12:00", "15:00", "16:00"],
                thursday: ["10:00", "11:00", "12:00", "15:00", "16:00"],
                friday: ["10:00", "11:00", "12:00", "15:00", "16:00"],
                saturday: ["10:00", "11:00", "12:00"]
            }
        },
        {
            id: 3,
            name: "Dr. Amit Patel",
            email: "amit.patel@hospital.com",
            password: "doctor123",
            phone: "+91 76543 21099",
            specialization: "Pediatrician",
            qualification: "MD Pediatrics, KEM Hospital",
            experience: "18 years",
            hospitalId: 3,
            hospital: "Rainbow Children's Hospital",
            fees: 700,
            rating: 4.9,
            availability: {
                monday: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
                tuesday: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
                wednesday: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
                thursday: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
                friday: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
                saturday: ["09:00", "10:00", "11:00"]
            }
        },
        {
            id: 4,
            name: "Dr. Sunita Verma",
            email: "sunita.verma@hospital.com",
            password: "doctor123",
            phone: "+91 65432 10987",
            specialization: "Neurologist",
            qualification: "DM Neurology, NIMHANS",
            experience: "20 years",
            hospitalId: 1,
            hospital: "City General Hospital",
            fees: 1000,
            rating: 4.7,
            availability: {
                tuesday: ["09:00", "10:00", "11:00", "14:00"],
                wednesday: ["09:00", "10:00", "11:00", "14:00"],
                thursday: ["09:00", "10:00", "11:00", "14:00"],
                friday: ["09:00", "10:00", "11:00", "14:00"],
                saturday: ["09:00", "10:00", "11:00"]
            }
        }
    ],
    patients: [
        {
            id: 1,
            name: "Ravi Singh",
            email: "ravi@email.com",
            password: "patient123",
            phone: "+91 98765 43212",
            age: 35,
            gender: "Male",
            address: "123 Patient Street, Mumbai, 400002"
        }
    ],
    appointments: [
        {
            id: 1,
            patientId: 1,
            doctorId: 1,
            date: "2025-10-15",
            time: "10:00",
            problem: "Chest pain and shortness of breath",
            status: "confirmed",
            createdAt: "2025-10-07T15:30:00Z"
        },
        {
            id: 2,
            patientId: 1,
            doctorId: 2,
            date: "2025-10-20",
            time: "11:00",
            problem: "Skin rash and itching",
            status: "pending",
            createdAt: "2025-10-07T16:45:00Z"
        }
    ],
    notifications: [
        {
            id: 1,
            userId: 2,
            userType: "doctor",
            title: "New Appointment Request",
            message: "Ravi Singh has requested an appointment for Oct 20, 2025",
            type: "appointment_request",
            read: false,
            createdAt: "2025-10-07T16:45:00Z",
            appointmentId: 2
        },
        {
            id: 2,
            userId: 1,
            userType: "patient",
            title: "Appointment Confirmed",
            message: "Your appointment with Dr. Rajesh Kumar has been confirmed for Oct 15, 2025",
            type: "appointment_confirmed",
            read: false,
            createdAt: "2025-10-07T15:35:00Z"
        }
    ]
};

// Initialize app state with data
function initializeApp() {
    appState = { ...appState, ...initData };
    appState.filteredDoctors = [...appState.doctors];
    
    // Setup event listeners
    setupEventListeners();
    
    // Show landing page
    showLanding();
}

// Clear forms when navigating between pages
function clearForms() {
    ['loginForm', 'registerForm', 'bookingForm', 'doctorProfileForm'].forEach(formId => {
        const form = document.getElementById(formId);
        if (form) form.reset();
    });
    // Also clear date field and time slots in booking modal
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        dateInput.value = '';
    }
    const timeSlots = document.getElementById('timeSlots');
    if (timeSlots) {
        timeSlots.innerHTML = '<p>Please select a date first</p>';
    }
}

// Event Listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Doctor profile form
    document.getElementById('doctorProfileForm').addEventListener('submit', updateDoctorProfile);
    
    // Booking form
    document.getElementById('bookingForm').addEventListener('submit', handleBooking);
    
    // Search and filters
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('cityFilter').addEventListener('change', handleFilter);
    document.getElementById('specializationFilter').addEventListener('change', handleFilter);
    
    // Date change for booking
    document.getElementById('appointmentDate').addEventListener('change', updateTimeSlots);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Notification badge clicks - use event delegation to handle both dashboards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.notification-badge')) {
            openNotificationModal();
        }
    });
}

// Navigation Functions
function showLanding() {
    hideAllPages();
    clearForms();
    document.getElementById('landingPage').classList.remove('hidden');
    document.getElementById('navMenu').classList.add('hidden');
}

function showLogin(role = 'patient') {
    hideAllPages();
    clearForms();
    document.getElementById('loginPage').classList.remove('hidden');
    
    appState.userRole = role;
    document.getElementById('loginTitle').textContent = `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
}

function showRegister() {
    hideAllPages();
    clearForms();
    document.getElementById('registerPage').classList.remove('hidden');
    
    const role = appState.userRole || 'patient';
    document.getElementById('registerTitle').textContent = `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
    
    // Show/hide role-specific fields
    if (role === 'doctor') {
        document.getElementById('patientFields').classList.add('hidden');
        document.getElementById('doctorFields').classList.remove('hidden');
        populateHospitalDropdown('regHospital');
    } else {
        document.getElementById('patientFields').classList.remove('hidden');
        document.getElementById('doctorFields').classList.add('hidden');
    }
}

function showDashboard() {
    hideAllPages();
    document.getElementById('navMenu').classList.remove('hidden');
    
    if (appState.userRole === 'doctor') {
        document.getElementById('doctorDashboard').classList.remove('hidden');
        loadDoctorDashboard();
    } else {
        document.getElementById('patientDashboard').classList.remove('hidden');
        loadPatientDashboard();
    }
    
    updateNotificationCounts();
}

function hideAllPages() {
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    let user = null;
    if (appState.userRole === 'doctor') {
        user = appState.doctors.find(d => d.email === email && d.password === password);
    } else {
        user = appState.patients.find(p => p.email === email && p.password === password);
    }
    
    if (user) {
        appState.currentUser = user;
        showMessage('Login successful!', 'success');
        setTimeout(() => showDashboard(), 1000);
    } else {
        showMessage('Invalid email or password!', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        phone: document.getElementById('regPhone').value,
        password: document.getElementById('regPassword').value
    };
    
    // Check if email already exists
    const emailExists = [...appState.doctors, ...appState.patients].some(user => user.email === userData.email);
    if (emailExists) {
        showMessage('Email already registered!', 'error');
        return;
    }
    
    if (appState.userRole === 'doctor') {
        const doctorData = {
            ...userData,
            id: appState.doctors.length + 1,
            specialization: document.getElementById('regSpecialization').value,
            qualification: document.getElementById('regQualification').value,
            experience: document.getElementById('regExperience').value,
            hospitalId: parseInt(document.getElementById('regHospital').value),
            hospital: appState.hospitals.find(h => h.id === parseInt(document.getElementById('regHospital').value))?.name || '',
            fees: parseInt(document.getElementById('regFees').value),
            rating: 0,
            availability: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: []
            }
        };
        
        appState.doctors.push(doctorData);
        appState.currentUser = doctorData;
    } else {
        const patientData = {
            ...userData,
            id: appState.patients.length + 1,
            age: parseInt(document.getElementById('regAge').value) || 0,
            gender: document.getElementById('regGender').value,
            address: document.getElementById('regAddress').value
        };
        
        appState.patients.push(patientData);
        appState.currentUser = patientData;
    }
    
    showMessage('Registration successful!', 'success');
    setTimeout(() => showDashboard(), 1000);
}

function handleLogout() {
    appState.currentUser = null;
    appState.userRole = null;
    clearForms();
    showLanding();
}

// Dashboard Loading
function loadPatientDashboard() {
    displayDoctors();
    displayPatientAppointments();
}

function loadDoctorDashboard() {
    populateDoctorProfile();
    populateHospitalDropdown('doctorHospital');
    displayAvailabilityManager();
    displayAppointmentRequests();
    displayConfirmedAppointments();
}

// Doctor Display and Search
function displayDoctors(doctorsToShow = appState.filteredDoctors) {
    const grid = document.getElementById('doctorsGrid');
    
    if (doctorsToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-md"></i>
                <p>No doctors found matching your criteria</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = doctorsToShow.map(doctor => {
        const hospital = appState.hospitals.find(h => h.id === doctor.hospitalId);
        return `
            <div class="doctor-card">
                <div class="doctor-header">
                    <div class="doctor-avatar">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div class="doctor-info">
                        <h3>${doctor.name}</h3>
                        <span class="doctor-specialization">${doctor.specialization}</span>
                    </div>
                </div>
                <div class="doctor-details">
                    <div class="doctor-detail">
                        <i class="fas fa-hospital"></i>
                        <span>${doctor.hospital}</span>
                    </div>
                    <div class="doctor-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${hospital ? hospital.city : 'N/A'}</span>
                    </div>
                    <div class="doctor-detail">
                        <i class="fas fa-graduation-cap"></i>
                        <span>${doctor.qualification}</span>
                    </div>
                    <div class="doctor-detail">
                        <i class="fas fa-clock"></i>
                        <span>${doctor.experience}</span>
                    </div>
                    <div class="doctor-detail rating">
                        <i class="fas fa-star"></i>
                        <span class="stars">★★★★★</span>
                        <span>${doctor.rating}</span>
                    </div>
                </div>
                <div class="doctor-actions">
                    <span class="fees">₹${doctor.fees}</span>
                    <button class="btn btn--primary btn--sm" onclick="openBookingModal(${doctor.id})">
                        Book Appointment
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    applyFilters(query);
}

function handleFilter() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    applyFilters(query);
}

function applyFilters(searchQuery = '') {
    const cityFilter = document.getElementById('cityFilter').value;
    const specializationFilter = document.getElementById('specializationFilter').value;
    
    appState.filteredDoctors = appState.doctors.filter(doctor => {
        const hospital = appState.hospitals.find(h => h.id === doctor.hospitalId);
        const matchesSearch = searchQuery === '' || 
            doctor.name.toLowerCase().includes(searchQuery) ||
            doctor.specialization.toLowerCase().includes(searchQuery) ||
            doctor.hospital.toLowerCase().includes(searchQuery) ||
            (hospital && hospital.city.toLowerCase().includes(searchQuery));
        
        const matchesCity = cityFilter === '' || (hospital && hospital.city === cityFilter);
        const matchesSpecialization = specializationFilter === '' || doctor.specialization === specializationFilter;
        
        return matchesSearch && matchesCity && matchesSpecialization;
    });
    
    displayDoctors();
}

function searchDoctors() {
    handleSearch();
}

// Appointment Booking
function openBookingModal(doctorId) {
    const doctor = appState.doctors.find(d => d.id === doctorId);
    if (!doctor) return;
    
    appState.selectedDoctor = doctor;
    const hospital = appState.hospitals.find(h => h.id === doctor.hospitalId);
    
    document.getElementById('selectedDoctorInfo').innerHTML = `
        <h4>${doctor.name}</h4>
        <div class="doctor-meta">
            <span>${doctor.specialization}</span>
            <span>${doctor.hospital}</span>
            <span>₹${doctor.fees}</span>
        </div>
    `;
    
    // Set minimum date to today and ensure proper date input
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('appointmentDate');
    dateInput.min = today;
    dateInput.value = '';
    dateInput.type = 'date'; // Ensure it's set as date type
    
    // Clear time slots
    document.getElementById('timeSlots').innerHTML = '<p>Please select a date first</p>';
    
    document.getElementById('bookingModal').classList.remove('hidden');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    document.getElementById('bookingForm').reset();
    appState.selectedDoctor = null;
}

function updateTimeSlots() {
    const dateInput = document.getElementById('appointmentDate');
    if (!dateInput.value) {
        document.getElementById('timeSlots').innerHTML = '<p>Please select a date first</p>';
        return;
    }
    
    const selectedDate = new Date(dateInput.value);
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[selectedDate.getDay()];
    
    const doctor = appState.selectedDoctor;
    if (!doctor || !doctor.availability[dayName] || doctor.availability[dayName].length === 0) {
        document.getElementById('timeSlots').innerHTML = '<p>No slots available for selected date</p>';
        return;
    }
    
    const availableSlots = doctor.availability[dayName];
    const bookedSlots = appState.appointments
        .filter(apt => apt.doctorId === doctor.id && apt.date === dateInput.value && apt.status !== 'cancelled')
        .map(apt => apt.time);
    
    const slotsHTML = availableSlots.map(slot => {
        const isBooked = bookedSlots.includes(slot);
        return `
            <button type="button" class="time-slot ${isBooked ? 'disabled' : ''}" 
                    ${isBooked ? 'disabled' : ''} 
                    onclick="selectTimeSlot('${slot}', this)">
                ${slot}
            </button>
        `;
    }).join('');
    
    document.getElementById('timeSlots').innerHTML = slotsHTML;
}

function selectTimeSlot(time, element) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selection to clicked slot
    element.classList.add('selected');
    element.dataset.selectedTime = time;
}

function handleBooking(e) {
    e.preventDefault();
    
    const selectedSlot = document.querySelector('.time-slot.selected');
    if (!selectedSlot) {
        showMessage('Please select a time slot!', 'error');
        return;
    }
    
    const appointmentData = {
        id: appState.appointments.length + 1,
        patientId: appState.currentUser.id,
        doctorId: appState.selectedDoctor.id,
        date: document.getElementById('appointmentDate').value,
        time: selectedSlot.dataset.selectedTime,
        problem: document.getElementById('problemDescription').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    appState.appointments.push(appointmentData);
    
    // Create notification for doctor
    const notification = {
        id: appState.notifications.length + 1,
        userId: appState.selectedDoctor.id,
        userType: 'doctor',
        title: 'New Appointment Request',
        message: `${appState.currentUser.name} has requested an appointment for ${appointmentData.date}`,
        type: 'appointment_request',
        read: false,
        createdAt: new Date().toISOString(),
        appointmentId: appointmentData.id
    };
    
    appState.notifications.push(notification);
    
    showMessage('Appointment request sent successfully!', 'success');
    closeBookingModal();
    displayPatientAppointments();
    updateNotificationCounts();
}

// Appointments Display
function displayPatientAppointments() {
    const container = document.getElementById('patientAppointments');
    const patientAppointments = appState.appointments.filter(apt => apt.patientId === appState.currentUser.id);
    
    if (patientAppointments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-alt"></i>
                <p>No appointments found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = patientAppointments.map(appointment => {
        const doctor = appState.doctors.find(d => d.id === appointment.doctorId);
        return `
            <div class="appointment-card">
                <div class="appointment-header">
                    <div class="appointment-info">
                        <h4>Dr. ${doctor ? doctor.name : 'Unknown'}</h4>
                        <div class="appointment-datetime">
                            <i class="fas fa-calendar"></i>
                            <span>${appointment.date}</span>
                            <i class="fas fa-clock"></i>
                            <span>${appointment.time}</span>
                        </div>
                    </div>
                    <span class="status status--${appointment.status}">${appointment.status.toUpperCase()}</span>
                </div>
                <div class="appointment-problem">
                    <strong>Problem:</strong> ${appointment.problem}
                </div>
            </div>
        `;
    }).join('');
}

function displayAppointmentRequests() {
    const container = document.getElementById('appointmentRequests');
    const requests = appState.appointments.filter(apt => 
        apt.doctorId === appState.currentUser.id && apt.status === 'pending'
    );
    
    if (requests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-check"></i>
                <p>No pending requests</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = requests.map(appointment => {
        const patient = appState.patients.find(p => p.id === appointment.patientId);
        return `
            <div class="appointment-card">
                <div class="appointment-header">
                    <div class="appointment-info">
                        <h4>${patient ? patient.name : 'Unknown Patient'}</h4>
                        <div class="appointment-datetime">
                            <i class="fas fa-calendar"></i>
                            <span>${appointment.date}</span>
                            <i class="fas fa-clock"></i>
                            <span>${appointment.time}</span>
                        </div>
                    </div>
                    <span class="status status--${appointment.status}">${appointment.status.toUpperCase()}</span>
                </div>
                <div class="appointment-problem">
                    <strong>Problem:</strong> ${appointment.problem}
                </div>
                <div class="appointment-actions">
                    <button class="btn btn--sm btn--secondary" onclick="handleAppointmentAction(${appointment.id}, 'declined')">
                        Decline
                    </button>
                    <button class="btn btn--sm btn--primary" onclick="handleAppointmentAction(${appointment.id}, 'confirmed')">
                        Confirm
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function displayConfirmedAppointments() {
    const container = document.getElementById('confirmedAppointments');
    const confirmed = appState.appointments.filter(apt => 
        apt.doctorId === appState.currentUser.id && apt.status === 'confirmed'
    );
    
    if (confirmed.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-check"></i>
                <p>No confirmed appointments</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = confirmed.map(appointment => {
        const patient = appState.patients.find(p => p.id === appointment.patientId);
        return `
            <div class="appointment-card">
                <div class="appointment-header">
                    <div class="appointment-info">
                        <h4>${patient ? patient.name : 'Unknown Patient'}</h4>
                        <div class="appointment-datetime">
                            <i class="fas fa-calendar"></i>
                            <span>${appointment.date}</span>
                            <i class="fas fa-clock"></i>
                            <span>${appointment.time}</span>
                        </div>
                    </div>
                    <span class="status status--${appointment.status}">${appointment.status.toUpperCase()}</span>
                </div>
                <div class="appointment-problem">
                    <strong>Problem:</strong> ${appointment.problem}
                </div>
                <div class="appointment-actions">
                    <button class="btn btn--sm btn--secondary" onclick="handleAppointmentAction(${appointment.id}, 'completed')">
                        Mark Complete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function handleAppointmentAction(appointmentId, action) {
    const appointment = appState.appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;
    
    appointment.status = action;
    
    // Create notification for patient
    const patient = appState.patients.find(p => p.id === appointment.patientId);
    if (patient) {
        let message = '';
        switch (action) {
            case 'confirmed':
                message = `Your appointment with Dr. ${appState.currentUser.name} has been confirmed for ${appointment.date}`;
                break;
            case 'declined':
                message = `Your appointment request with Dr. ${appState.currentUser.name} has been declined`;
                break;
            case 'completed':
                message = `Your appointment with Dr. ${appState.currentUser.name} has been completed`;
                break;
        }
        
        const notification = {
            id: appState.notifications.length + 1,
            userId: patient.id,
            userType: 'patient',
            title: `Appointment ${action.charAt(0).toUpperCase() + action.slice(1)}`,
            message: message,
            type: `appointment_${action}`,
            read: false,
            createdAt: new Date().toISOString()
        };
        
        appState.notifications.push(notification);
    }
    
    showMessage(`Appointment ${action} successfully!`, 'success');
    displayAppointmentRequests();
    displayConfirmedAppointments();
    updateNotificationCounts();
}

// Doctor Profile Management
function populateDoctorProfile() {
    if (appState.userRole !== 'doctor') return;
    
    const doctor = appState.currentUser;
    document.getElementById('doctorName').value = doctor.name;
    document.getElementById('doctorSpecialization').value = doctor.specialization;
    document.getElementById('doctorQualification').value = doctor.qualification;
    document.getElementById('doctorExperience').value = doctor.experience;
    document.getElementById('doctorHospital').value = doctor.hospitalId;
    document.getElementById('doctorFees').value = doctor.fees;
}

function updateDoctorProfile(e) {
    e.preventDefault();
    
    appState.currentUser.specialization = document.getElementById('doctorSpecialization').value;
    appState.currentUser.qualification = document.getElementById('doctorQualification').value;
    appState.currentUser.experience = document.getElementById('doctorExperience').value;
    appState.currentUser.hospitalId = parseInt(document.getElementById('doctorHospital').value);
    appState.currentUser.hospital = appState.hospitals.find(h => h.id === appState.currentUser.hospitalId)?.name || '';
    appState.currentUser.fees = parseInt(document.getElementById('doctorFees').value);
    
    showMessage('Profile updated successfully!', 'success');
}

function populateHospitalDropdown(selectId) {
    const select = document.getElementById(selectId);
    const options = appState.hospitals.map(hospital => 
        `<option value="${hospital.id}">${hospital.name}</option>`
    ).join('');
    select.innerHTML = `<option value="">Select Hospital</option>${options}`;
}

// Availability Management
function displayAvailabilityManager() {
    const container = document.getElementById('availabilityManager');
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    
    const availability = appState.currentUser.availability || {};
    
    container.innerHTML = days.map(day => {
        const daySlots = availability[day] || [];
        return `
            <div class="day-availability">
                <div class="day-header">
                    <span class="day-name">${day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    <label class="day-toggle">
                        <input type="checkbox" ${daySlots.length > 0 ? 'checked' : ''} 
                               onchange="toggleDayAvailability('${day}', this)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="time-slots" id="slots-${day}" style="display: ${daySlots.length > 0 ? 'flex' : 'none'}">
                    ${timeSlots.map(slot => `
                        <button type="button" class="time-slot ${daySlots.includes(slot) ? 'selected' : ''}"
                                onclick="toggleTimeSlot('${day}', '${slot}', this)">
                            ${slot}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function toggleDayAvailability(day, checkbox) {
    const slotsContainer = document.getElementById(`slots-${day}`);
    if (checkbox.checked) {
        slotsContainer.style.display = 'flex';
    } else {
        slotsContainer.style.display = 'none';
        // Clear all slots for this day
        appState.currentUser.availability[day] = [];
        slotsContainer.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
    }
}

function toggleTimeSlot(day, time, element) {
    if (!appState.currentUser.availability[day]) {
        appState.currentUser.availability[day] = [];
    }
    
    const slots = appState.currentUser.availability[day];
    const index = slots.indexOf(time);
    
    if (index > -1) {
        slots.splice(index, 1);
        element.classList.remove('selected');
    } else {
        slots.push(time);
        element.classList.add('selected');
    }
    
    // Sort slots
    appState.currentUser.availability[day].sort();
}

function updateAvailability() {
    showMessage('Availability updated successfully!', 'success');
}

// Notifications
function updateNotificationCounts() {
    const userNotifications = appState.notifications.filter(n => 
        n.userId === appState.currentUser.id && 
        n.userType === appState.userRole && 
        !n.read
    );
    
    const countElement = document.getElementById(
        appState.userRole === 'doctor' ? 'doctorNotificationCount' : 'patientNotificationCount'
    );
    
    if (countElement) {
        countElement.textContent = userNotifications.length;
        countElement.style.display = userNotifications.length > 0 ? 'block' : 'none';
    }
}

function openNotificationModal() {
    const userNotifications = appState.notifications.filter(n => 
        n.userId === appState.currentUser.id && 
        n.userType === appState.userRole
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const container = document.getElementById('notificationsList');
    
    if (userNotifications.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bell"></i>
                <p>No notifications</p>
            </div>
        `;
    } else {
        container.innerHTML = userNotifications.map(notification => `
            <div class="notification-item ${!notification.read ? 'unread' : ''}">
                <div class="notification-header">
                    <h4 class="notification-title">${notification.title}</h4>
                    <span class="notification-time">${formatDate(notification.createdAt)}</span>
                </div>
                <p class="notification-message">${notification.message}</p>
            </div>
        `).join('');
        
        // Mark all notifications as read
        userNotifications.forEach(n => n.read = true);
        updateNotificationCounts();
    }
    
    document.getElementById('notificationModal').classList.remove('hidden');
}

function closeNotificationModal() {
    document.getElementById('notificationModal').classList.add('hidden');
}

// Utility Functions
function showMessage(message, type) {
    // Remove existing messages
    document.querySelectorAll('.message').forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message--${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Insert after navbar
    const navbar = document.querySelector('.navbar');
    navbar.insertAdjacentElement('afterend', messageDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initializeApp);