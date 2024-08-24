/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const calendar = document.getElementById('calendar');\r\nlet events = JSON.parse(localStorage.getItem('events')) || [];\r\nlet selectedDate = null;\r\nlet isEditMode = false;\r\nlet editEventId = null;\r\n\r\nconst eventModal = document.getElementById('event-modal');\r\nconst closeModalButton = document.getElementById('close-modal');\r\nconst eventForm = document.getElementById('event-form');\r\nconst eventTitleInput = document.getElementById('event-title');\r\nconst eventDateInput = document.getElementById('event-date');\r\n\r\nfunction openModal(date) {\r\n  selectedDate = date;\r\n  eventDateInput.value = selectedDate;\r\n  eventModal.style.display = 'block';\r\n}\r\n\r\nfunction closeModal() {\r\n  eventModal.style.display = 'none';\r\n  eventForm.reset();\r\n  isEditMode = false;\r\n}\r\n\r\nfunction saveEvent(event) {\r\n  event.preventDefault();\r\n\r\n  const eventTitle = eventTitleInput.value;\r\n  const eventDate = eventDateInput.value;\r\n\r\n  if (isEditMode) {\r\n    const eventIndex = events.findIndex(ev => ev.id === editEventId);\r\n    events[eventIndex].title = eventTitle;\r\n    events[eventIndex].date = eventDate;\r\n  } else {\r\n    const newEvent = {\r\n      id: Date.now().toString(),\r\n      title: eventTitle,\r\n      date: eventDate,\r\n    };\r\n    events.push(newEvent);\r\n  }\r\n\r\n  localStorage.setItem('events', JSON.stringify(events));\r\n  closeModal();\r\n  renderCalendar();\r\n}\r\n\r\nfunction deleteEvent(eventId) {\r\n  events = events.filter(event => event.id !== eventId);\r\n  localStorage.setItem('events', JSON.stringify(events));\r\n  renderCalendar();\r\n}\r\n\r\nfunction editEvent(eventId) {\r\n  isEditMode = true;\r\n  editEventId = eventId;\r\n  const eventToEdit = events.find(event => event.id === eventId);\r\n  openModal(eventToEdit.date);\r\n  eventTitleInput.value = eventToEdit.title;\r\n}\r\n\r\nfunction renderCalendar() {\r\n  calendar.innerHTML = '';\r\n  for (let i = 1; i <= 31; i++) {\r\n    const day = document.createElement('div');\r\n    day.classList.add('day');\r\n    day.textContent = i;\r\n\r\n    const dayEvents = events.filter(event => new Date(event.date).getDate() === i);\r\n    dayEvents.forEach(event => {\r\n      const eventElement = document.createElement('div');\r\n      eventElement.classList.add('event');\r\n      eventElement.textContent = event.title;\r\n      eventElement.draggable = true;\r\n      eventElement.addEventListener('dragstart', (e) => {\r\n        e.dataTransfer.setData('text/plain', event.id);\r\n      });\r\n\r\n      eventElement.addEventListener('dblclick', () => editEvent(event.id));\r\n      eventElement.addEventListener('contextmenu', (e) => {\r\n        e.preventDefault();\r\n        deleteEvent(event.id);\r\n      });\r\n\r\n      day.appendChild(eventElement);\r\n    });\r\n\r\n    day.addEventListener('click', () => openModal(`2024-08-${i < 10 ? '0' : ''}${i}`));\r\n    day.addEventListener('dragover', (e) => {\r\n      e.preventDefault();\r\n    });\r\n    day.addEventListener('drop', (e) => {\r\n      const eventId = e.dataTransfer.getData('text/plain');\r\n      const eventIndex = events.findIndex(ev => ev.id === eventId);\r\n      events[eventIndex].date = `2024-08-${i < 10 ? '0' : ''}${i}`;\r\n      localStorage.setItem('events', JSON.stringify(events));\r\n      renderCalendar();\r\n    });\r\n\r\n    calendar.appendChild(day);\r\n  }\r\n}\r\n\r\ncloseModalButton.addEventListener('click', closeModal);\r\neventForm.addEventListener('submit', saveEvent);\r\n\r\nrenderCalendar();\r\n\r\nconst themeToggleButton = document.getElementById('theme-toggle');\r\nconst currentTheme = localStorage.getItem('theme') || 'light';\r\n\r\ndocument.body.classList.add(currentTheme);\r\n\r\nthemeToggleButton.addEventListener('click', () => {\r\n  document.body.classList.toggle('dark');\r\n  const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';\r\n  localStorage.setItem('theme', newTheme);\r\n});\r\n\n\n//# sourceURL=webpack://my/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;