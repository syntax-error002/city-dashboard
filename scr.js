particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    },
    retina_detect: true
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Live Weather Updates
function updateWeather() {
    const temperatures = [19, 20, 21, 22, 23];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
    const winds = [10, 12, 15, 8, 11];
    
    setInterval(() => {
        const temp = temperatures[Math.floor(Math.random() * temperatures.length)];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const wind = winds[Math.floor(Math.random() * winds.length)];
        
        document.querySelector('.weather-temp').textContent = `${temp}°C`;
        document.querySelector('.weather-card p').textContent = condition;
        document.querySelector('.weather-detail p').textContent = `${wind} km/h`;
    }, 5000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Card Animations on Scroll
const cards = document.querySelectorAll('.card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach(card => observer.observe(card));

// Add this CSS
const style = document.createElement('style');
style.textContent = `
    .dark-mode-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .dark-mode-toggle:hover {
        transform: scale(1.1);
    }

    .dark-mode {
        --primary: #917FB3;
        --secondary: #2A2F4F;
        --accent: #E5BEEC;
        --background: #1a1a1a;
        --card-bg: rgba(40, 40, 40, 0.9);
        --text: #ffffff;
    }

    .card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-visible {
        opacity: 1;
        transform: translateY(0);
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .live-indicator {
        animation: pulse 2s infinite;
        display: inline-block;
        padding: 4px 8px;
        background: rgba(255,255,255,0.2);
        border-radius: 12px;
        font-size: 0.8rem;
    }

    /* Chart Styles */
    .chart-container {
        position: relative;
        height: 200px;
        margin-top: 1rem;
    }

    /* Tooltip Styles */
    [data-tooltip] {
        position: relative;
        cursor: help;
    }

    [data-tooltip]:before {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px;
        background: rgba(0,0,0,0.8);
        color: white;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    [data-tooltip]:hover:before {
        opacity: 1;
        visibility: visible;
    }
`;

document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateWeather();
    
    // Add loading animation
    const loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    }, 1500);
});

// Add Chart.js for data visualization
const addCharts = () => {
    const ctx = document.createElement('canvas');
    ctx.id = 'cityStats';
    document.querySelector('.stats-card').appendChild(ctx);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Tourism Growth',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
};


const loadMoreContent = () => {
    const loadMore = document.createElement('button');
    loadMore.classList.add('load-more');
    loadMore.textContent = 'Load More';
    document.querySelector('.dashboard').appendChild(loadMore);
    
    loadMore.addEventListener('click', () => {
        // Add new card with animation
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <h2>New Updates</h2>
            <p>no currently avaliable</p>
        `;
        document.querySelector('.dashboard').insertBefore(newCard, loadMore);
        setTimeout(() => newCard.classList.add('card-visible'), 100);
    });
};

// Initialize additional features
loadMoreContent();
if (typeof Chart !== 'undefined') {
    addCharts();
}
// Time and Date Update
function updateDateTime() {
const now = new Date();
const timeElement = document.getElementById('current-time');
const dateElement = document.getElementById('current-date');

timeElement.textContent = now.toLocaleTimeString();
dateElement.textContent = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});
}

setInterval(updateDateTime, 1000);
updateDateTime();