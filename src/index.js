const calendarEl = document.getElementById('calendar');
let events = JSON.parse(localStorage.getItem('events')) || [];
let selectedDate = null;
let isEditMode = false;
let editEventId = null;

const eventModal = document.getElementById('event-modal');
const closeModalButton = document.getElementById('close-modal');
const eventForm = document.getElementById('event-form');
const eventTitleInput = document.getElementById('event-title');
const eventDateInput = document.getElementById('event-date');

// Função para abrir o modal com a data selecionada
function openModal(date) {
  selectedDate = date;
  eventDateInput.value = selectedDate;
  eventModal.style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
  eventModal.style.display = 'none';
  eventForm.reset();
  isEditMode = false;
}

// Função para salvar ou atualizar o evento
function saveEvent(event) {
  event.preventDefault();

  const eventTitle = eventTitleInput.value;
  const eventDate = eventDateInput.value;

  if (isEditMode) {
    const eventIndex = events.findIndex(ev => ev.id === editEventId);
    events[eventIndex] = { ...events[eventIndex], title: eventTitle, date: eventDate };
  } else {
    const newEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      date: eventDate,
    };
    events.push(newEvent);
  }

  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
  renderCalendar();
}

// Função para excluir um evento
function deleteEvent(eventId) {
  events = events.filter(event => event.id !== eventId);
  localStorage.setItem('events', JSON.stringify(events));
  renderCalendar();
}

// Função para entrar no modo de edição de um evento
function editEvent(eventId) {
  isEditMode = true;
  editEventId = eventId;

  const eventToEdit = events.find(event => event.id === eventId);
  openModal(eventToEdit.date);
  eventTitleInput.value = eventToEdit.title;
}

// Função para renderizar o calendário
function renderCalendar() {
  calendarEl.innerHTML = '';

  for (let i = 1; i <= 31; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.textContent = i;

    const dayEvents = events.filter(event => new Date(event.date).getDate() === i);

    dayEvents.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.classList.add('event');
      eventElement.textContent = event.title;
      eventElement.draggable = true;

      eventElement.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', event.id));
      eventElement.addEventListener('dblclick', () => editEvent(event.id));
      eventElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        deleteEvent(event.id);
      });

      day.appendChild(eventElement);
    });

    day.addEventListener('click', () => openModal(`2024-08-${i.toString().padStart(2, '0')}`));
    day.addEventListener('dragover', (e) => e.preventDefault());
    day.addEventListener('drop', (e) => {
      const eventId = e.dataTransfer.getData('text/plain');
      const eventIndex = events.findIndex(ev => ev.id === eventId);
      events[eventIndex].date = `2024-08-${i.toString().padStart(2, '0')}`;
      localStorage.setItem('events', JSON.stringify(events));
      renderCalendar();
    });

    calendarEl.appendChild(day);
  }
}

// Adiciona eventos aos botões e ao formulário
closeModalButton.addEventListener('click', closeModal);
eventForm.addEventListener('submit', saveEvent);

renderCalendar(); // Renderiza o calendário inicial

// Lógica para alternar entre modo escuro e claro
const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDarkMode = document.body.classList.contains('dark-theme');
  themeToggleButton.textContent = isDarkMode ? 'Light theme' : 'Dark theme';

  // Ajuste no estilo do calendário
  calendarEl.classList.toggle('dark-theme-calendar', isDarkMode);
});
