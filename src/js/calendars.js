// Calendar View Switcher
document.addEventListener('DOMContentLoaded', () => {
  const viewButtons = document.querySelectorAll('.calendar-view-btn');
  const todayBtn = document.querySelector('.calendar-today-btn');
  const navButtons = document.querySelectorAll('.calendar-nav-btn');
  const monthView = document.getElementById('monthView');
  const weekView = document.getElementById('weekView');
  const dayView = document.getElementById('dayView');
  const calendarTitle = document.getElementById('calendarTitle');

  // Today's actual date (for highlighting)
  const TODAY = new Date(2026, 0, 22); // January 22, 2026

  // Current date tracking (for navigation)
  let currentDate = new Date(TODAY);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Sample events data
  const events = [
    { date: '2026-01-01', title: "New Year's Day", color: 'primary' },
    { date: '2026-01-05', title: 'Team standup', color: 'success' },
    { date: '2026-01-06', title: 'Design review', color: 'secondary' },
    { date: '2026-01-08', title: 'Sprint planning', color: 'warning' },
    { date: '2026-01-12', title: 'Team standup', color: 'success' },
    { date: '2026-01-12', title: '1:1 with Sarah', color: 'pink' },
    { date: '2026-01-13', title: 'Product sync', color: 'teal' },
    { date: '2026-01-15', title: 'Deadline: Q1 Report', color: 'error' },
    { date: '2026-01-19', title: 'Team standup', color: 'success' },
    { date: '2026-01-19', title: 'Client call', color: 'orange' },
    { date: '2026-01-20', title: 'Design review', color: 'secondary' },
    { date: '2026-01-22', title: 'Team lunch', color: 'primary' },
    { date: '2026-01-22', title: 'Review meeting', color: 'gray' },
    { date: '2026-01-22', title: 'Design sync', color: 'secondary' },
    { date: '2026-01-22', title: 'Engineering retro', color: 'teal' },
    { date: '2026-01-26', title: 'Team standup', color: 'success' },
    { date: '2026-01-27', title: 'All hands', color: 'teal' },
    { date: '2026-02-02', title: 'Team standup', color: 'success' },
    { date: '2026-02-09', title: 'Team standup', color: 'success' },
    { date: '2026-02-14', title: "Valentine's Day", color: 'pink' },
    { date: '2026-02-16', title: 'Team standup', color: 'success' },
    { date: '2026-02-23', title: 'Team standup', color: 'success' },
  ];

  // Helper: format date as YYYY-MM-DD
  function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // Helper: check if two dates are the same day
  function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  // Get events for a specific date
  function getEventsForDate(date) {
    const key = formatDateKey(date);
    return events.filter(e => e.date === key);
  }

  // Format title based on view
  function formatTitle(view) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    if (view === 'month') {
      return `${monthNames[month]} ${year}`;
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(day - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const startMonth = monthNamesShort[startOfWeek.getMonth()];
      const endMonth = monthNamesShort[endOfWeek.getMonth()];
      const endYear = endOfWeek.getFullYear();

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startMonth} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${year}`;
      } else {
        return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${endYear}`;
      }
    } else if (view === 'day') {
      return `${monthNames[month]} ${day}, ${year}`;
    }
  }

  // Render month view
  function renderMonthView() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of month
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();

    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    let html = `
      <div class="calendar-month">
        <div class="calendar-weekday">Sun</div>
        <div class="calendar-weekday">Mon</div>
        <div class="calendar-weekday">Tue</div>
        <div class="calendar-weekday">Wed</div>
        <div class="calendar-weekday">Thu</div>
        <div class="calendar-weekday">Fri</div>
        <div class="calendar-weekday">Sat</div>
    `;

    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      html += `<div class="calendar-day other-month"><div class="calendar-day-number">${day}</div></div>`;
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const isToday = isSameDay(date, TODAY);
      const dayEvents = getEventsForDate(date);

      html += `<div class="calendar-day${isToday ? ' today' : ''}">`;
      html += `<div class="calendar-day-number">${day}</div>`;

      if (dayEvents.length > 0) {
        html += '<div class="calendar-day-events">';
        const showEvents = dayEvents.slice(0, 2);
        showEvents.forEach(event => {
          html += `<div class="calendar-event calendar-event-${event.color}">${event.title}</div>`;
        });
        if (dayEvents.length > 2) {
          html += `<span class="calendar-more">+${dayEvents.length - 2} more</span>`;
        }
        html += '</div>';
      }

      html += '</div>';
    }

    // Next month days
    const totalCells = startingDay + totalDays;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainingCells; i++) {
      html += `<div class="calendar-day other-month"><div class="calendar-day-number">${i}</div></div>`;
    }

    html += '</div>';
    monthView.innerHTML = html;
  }

  // Render week view
  function renderWeekView() {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    let html = '<div class="calendar-week">';

    // Header row
    html += '<div class="calendar-time-spacer"></div>';
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const isToday = isSameDay(date, TODAY);

      html += `<div class="calendar-week-day-header${isToday ? ' today' : ''}">
        <div class="calendar-week-day-name">${dayNamesShort[i]}</div>
        <div class="calendar-week-day-number">${date.getDate()}</div>
      </div>`;
    }

    // Time slots (8 AM to 6 PM)
    for (let hour = 8; hour <= 18; hour++) {
      const hourLabel = hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
      html += `<div class="calendar-time-slot">${hourLabel}</div>`;

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dayEvents = getEventsForDate(date);

        html += '<div class="calendar-week-cell">';

        // Show events at specific hours (simplified positioning)
        if (hour === 9) {
          const event = dayEvents.find(e => e.title.includes('standup'));
          if (event) {
            html += `<div class="calendar-week-event calendar-event-${event.color}" style="top: 0; height: 30px;">
              ${event.title}
              <div class="calendar-week-event-time">9:00 - 9:30</div>
            </div>`;
          }
        }
        if (hour === 10) {
          const event = dayEvents.find(e => e.title.includes('lunch') || e.title.includes('Client') || e.title.includes('Design review'));
          if (event) {
            html += `<div class="calendar-week-event calendar-event-${event.color}" style="top: 0; height: 60px;">
              ${event.title}
              <div class="calendar-week-event-time">10:00 - 11:00</div>
            </div>`;
          }
        }
        if (hour === 14) {
          const event = dayEvents.find(e => e.title.includes('sync') || e.title.includes('meeting'));
          if (event) {
            html += `<div class="calendar-week-event calendar-event-${event.color}" style="top: 0; height: 60px;">
              ${event.title}
              <div class="calendar-week-event-time">2:00 - 3:00</div>
            </div>`;
          }
        }

        html += '</div>';
      }
    }

    html += '</div>';
    weekView.innerHTML = html;
  }

  // Render day view
  function renderDayView() {
    const dayEvents = getEventsForDate(currentDate);
    const isToday = isSameDay(currentDate, TODAY);

    let html = `<div class="calendar-day-view">
      <div class="calendar-day-header${isToday ? ' today' : ''}">
        <div class="calendar-day-header-date">${currentDate.getDate()}</div>
        <div class="calendar-day-header-weekday">${dayNames[currentDate.getDay()]}</div>
      </div>`;

    // Time slots (8 AM to 6 PM)
    for (let hour = 8; hour <= 18; hour++) {
      const hourLabel = hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
      html += `<div class="calendar-day-time-slot">${hourLabel}</div>`;
      html += '<div class="calendar-day-cell">';

      // Show events at specific hours
      if (hour === 9) {
        const event = dayEvents.find(e => e.title.includes('standup'));
        if (event) {
          html += `<div class="calendar-day-event calendar-event-${event.color}" style="top: 0; height: 30px;">
            <div class="calendar-day-event-title">${event.title}</div>
            <div class="calendar-day-event-time">9:00 - 9:30 AM</div>
          </div>`;
        }
      }
      if (hour === 10) {
        const event = dayEvents.find(e => e.title.includes('lunch'));
        if (event) {
          html += `<div class="calendar-day-event calendar-event-${event.color}" style="top: 30px; height: 90px;">
            <div class="calendar-day-event-title">${event.title}</div>
            <div class="calendar-day-event-time">10:30 AM - 12:00 PM</div>
          </div>`;
        }
      }
      if (hour === 13) {
        const event = dayEvents.find(e => e.title.includes('meeting') || e.title.includes('1:1'));
        if (event) {
          html += `<div class="calendar-day-event calendar-event-${event.color}" style="top: 30px; height: 60px;">
            <div class="calendar-day-event-title">${event.title}</div>
            <div class="calendar-day-event-time">1:30 - 2:30 PM</div>
          </div>`;
        }
      }
      if (hour === 15) {
        const event = dayEvents.find(e => e.title.includes('sync') || e.title.includes('Design review'));
        if (event) {
          html += `<div class="calendar-day-event calendar-event-${event.color}" style="top: 0; height: 60px;">
            <div class="calendar-day-event-title">${event.title}</div>
            <div class="calendar-day-event-time">3:00 - 4:00 PM</div>
          </div>`;
        }
      }
      if (hour === 16) {
        const event = dayEvents.find(e => e.title.includes('retro') || e.title.includes('All hands'));
        if (event) {
          html += `<div class="calendar-day-event calendar-event-${event.color}" style="top: 30px; height: 60px;">
            <div class="calendar-day-event-title">${event.title}</div>
            <div class="calendar-day-event-time">4:30 - 5:30 PM</div>
          </div>`;
        }
      }

      html += '</div>';
    }

    html += '</div>';
    dayView.innerHTML = html;
  }

  // Update calendar title
  function updateTitle() {
    const view = getActiveView();
    calendarTitle.textContent = formatTitle(view);
  }

  // Render current view
  function renderCurrentView() {
    const view = getActiveView();
    updateTitle();

    if (view === 'month') {
      renderMonthView();
    } else if (view === 'week') {
      renderWeekView();
    } else if (view === 'day') {
      renderDayView();
    }
  }

  // Navigate previous
  function navigatePrev() {
    const view = getActiveView();
    if (view === 'month') {
      currentDate.setMonth(currentDate.getMonth() - 1);
    } else if (view === 'week') {
      currentDate.setDate(currentDate.getDate() - 7);
    } else if (view === 'day') {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    renderCurrentView();
  }

  // Navigate next
  function navigateNext() {
    const view = getActiveView();
    if (view === 'month') {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (view === 'week') {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (view === 'day') {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    renderCurrentView();
  }

  // Go to today
  function goToToday() {
    currentDate = new Date(TODAY);
    renderCurrentView();
  }

  // Get current active view
  function getActiveView() {
    const activeBtn = document.querySelector('.calendar-view-btn.active');
    return activeBtn ? activeBtn.dataset.view : 'month';
  }

  // View switching
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;

      // Update active button
      viewButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide all views
      monthView.style.display = 'none';
      weekView.style.display = 'none';
      dayView.style.display = 'none';

      // Show selected view
      if (view === 'month') {
        monthView.style.display = 'block';
      } else if (view === 'week') {
        weekView.style.display = 'block';
      } else if (view === 'day') {
        dayView.style.display = 'block';
      }

      // Render the view
      renderCurrentView();
    });
  });

  // Navigation buttons
  navButtons[0].addEventListener('click', navigatePrev);
  navButtons[1].addEventListener('click', navigateNext);

  // Today button - reset date, scroll to today and flash highlight
  todayBtn.addEventListener('click', () => {
    goToToday();
    const view = getActiveView();
    let todayElement;

    if (view === 'month') {
      todayElement = monthView.querySelector('.calendar-day.today');
    } else if (view === 'week') {
      todayElement = weekView.querySelector('.calendar-week-day-header.today');
    } else if (view === 'day') {
      todayElement = dayView.querySelector('.calendar-day-header');
    }

    if (todayElement) {
      // Scroll into view
      todayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Flash highlight effect
      todayElement.style.transition = 'background-color 0.3s ease';
      const originalBg = todayElement.style.backgroundColor;
      todayElement.style.backgroundColor = '#dbeafe';

      setTimeout(() => {
        todayElement.style.backgroundColor = originalBg;
      }, 600);
    }
  });

  // Initial render
  renderCurrentView();
});
