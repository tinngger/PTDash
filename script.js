
const holidays = {
    "01-26": "Republic Day",
    "03-10": "Holi",
    "08-15": "Independence Day",
    "10-02": "Gandhi Jayanti",
    "11-12": "Diwali",
};

const reminders = {};

// Create a calendar for the entire year
function createCalendar() {
    const calendar = document.getElementById('calendar');
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let currentTop = 5; // Starting top position (relative percentage)
    let currentLeft = 2; // Starting left position (relative percentage)
    const daySpacing = 3; // Space between dates (in %)
    const rowSpacing = 5; // Space between rows (in %)

    for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= daysInMonth[month]; day++) {
            const dateKey = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayDiv = document.createElement('div');

            dayDiv.classList.add('date');
            dayDiv.textContent = day;
            dayDiv.style.left = `${currentLeft}%`;
            dayDiv.style.top = `${currentTop}%`;

            if (holidays[dateKey]) {
                dayDiv.classList.add('holiday');
                dayDiv.title = holidays[dateKey];
            }

            dayDiv.onclick = () => openModal(dateKey);
            calendar.appendChild(dayDiv);

            // Update positions
            currentLeft += daySpacing;
            if (currentLeft > 90) { // Move to the next row if beyond container
                currentLeft = 2;
                currentTop += rowSpacing;
            }
        }
    }
}

// Open modal to set reminders
function openModal(date) {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const dateText = document.getElementById('dateText');
    const reminderInput = document.getElementById('reminderInput');

    dateText.textContent = `Date: ${date} ${holidays[date] ? `(${holidays[date]})` : ''}`;
    reminderInput.value = reminders[date] || '';
    modal.classList.add('active');
    overlay.classList.add('active');
    modal.dataset.date = date;
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Save the reminder
function saveReminder() {
    const modal = document.getElementById('modal');
    const date = modal.dataset.date;
    const reminderInput = document.getElementById('reminderInput');

    reminders[date] = reminderInput.value;
    alert(`Reminder set for ${date}: ${reminders[date]}`);
    closeModal();
}

// Initialize the calendar
createCalendar();
    