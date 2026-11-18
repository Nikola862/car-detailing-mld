// Preloader logika
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 700);
    }
});

// Mobilni meni toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Pre & Posle interaktivni klizač
const slider = document.getElementById('slider');
const imgBefore = document.getElementById('imgBefore');
const sliderButton = document.getElementById('sliderButton');

if (slider && imgBefore && sliderButton) {
    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        imgBefore.style.width = `${value}%`;
        sliderButton.style.left = `${value}%`;
    });
}

// Dinamički brojači (Counting Animation) unutar Zašto mi sekcije
const counterSection = document.getElementById('counterSection');
let counted = false;

if (counterSection) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;

                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.getAttribute('data-suffix') || '';
                    let current = 0;

                    // Brzina brojanja
                    const increment = target / 40;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + suffix;
                            setTimeout(updateCounter, 40);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };

                    updateCounter();
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
}

// Animacije pri skrolovanju (Intersection Observer)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .why-item, .booking-card-modern, .section-header, .trust-item').forEach(el => {
    observer.observe(el);
});

// Obrada moderne kontakt forme za zakazivanje termina i slanje na WhatsApp
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm && formSuccess) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const ime = document.getElementById('ime').value.trim();
        const telefon = document.getElementById('telefon').value.trim();
        const izabranaUsluga = document.querySelector('input[name="usluga"]:checked');
        const usluga = izabranaUsluga ? izabranaUsluga.value : 'Dubinsko pranje';
        const poruka = document.getElementById('poruka').value.trim();

        // Prikaži poruku potvrde na ekranu
        formSuccess.style.display = 'flex';

        // Formatiranje poruke za WhatsApp
        let tekstPoruke = `Pozdrav Car Detailing MLD! Želim da zakažem termin:%0A%0A`;
        tekstPoruke += `✨ Usluga: ${usluga}%0A`;
        tekstPoruke += `👤 Ime: ${ime}%0A`;
        tekstPoruke += `📞 Telefon: ${telefon}%0A`;
        if (poruka) {
            tekstPoruke += `📝 Napomena: ${poruka}%0A`;
        }

        const whatsappUrl = `https://wa.me/381616732863?text=${tekstPoruke}`;
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 800);

        bookingForm.reset();
    });
}