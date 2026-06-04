// script.js — main page interactions

// Smooth scroll for navigation and action buttons
function setupSmoothScroll() {
  const links = document.querySelectorAll('[data-action="scroll-to-reservation"], [data-action="scroll-to-destinations"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const action = link.dataset.action;

      if (action === 'scroll-to-reservation') {
        const section = document.getElementById('reservation');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (action === 'scroll-to-destinations') {
        const section = document.getElementById('destinations');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Destination card exploration - updates reservation form
function setupDestinationCards() {
  const cards = document.querySelectorAll('.destination-explore');
  const destinationSelect = document.getElementById('destination-select');

  cards.forEach(button => {
    button.addEventListener('click', () => {
      const destination = button.dataset.destination;

      // Map display names to select values
      const valueMap = {
        'Paris 1889': 'paris-1889',
        'Période Crétacé': 'cretace',
        'Florence 1504': 'florence-1504'
      };

      const value = valueMap[destination];
      if (value && destinationSelect) {
        destinationSelect.value = value;
      }

      // Scroll to reservation form
      const reservationSection = document.getElementById('reservation');
      if (reservationSection) {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Form submission handler
function setupReservationForm() {
  const form = document.getElementById('reservation-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const destination = form.querySelector('#destination-select')?.value;
    const departureDate = form.querySelector('#departure-date')?.value;
    const travelers = form.querySelector('#travelers-select')?.value;
    const fullName = form.querySelector('#full-name')?.value;
    const email = form.querySelector('#email')?.value;

    // Validate
    if (!destination || !departureDate || !travelers || !fullName || !email) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    // Show confirmation
    const confirmationMessage = `Merci ${fullName}!\n\nVotre réservation a été enregistrée:\n- Destination: ${destination}\n- Date: ${departureDate}\n- Voyageurs: ${travelers}\n\nUn email de confirmation a été envoyé à ${email}.`;
    alert(confirmationMessage);

    // Reset form
    form.reset();
  });
}

// Initialize all interactions
function init() {
  setupSmoothScroll();
  setupDestinationCards();
  setupReservationForm();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
