
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
    const positions = [
        { month: 1, day: 26, left: "15%", top: "10%" },
        { month: 3, day: 10, left: "30%", top: "25%" },
        { month: 8, day: 15, left: "50%", top: "50%" },
        { month: 10, day: 2, left: "70%", top: "70%" },
        { month: 11, day: 12, left: "85%", top: "85%" },
    ];

    positions.forEach(pos => {
        const dayDiv = document.createElement('div');
        const dateKey = `${String(pos.month).padStart(2, '0')}-${String(pos.day).padStart(2, '0')}`;

        dayDiv.classList.add('date');
        dayDiv.textContent = pos.day;
        dayDiv.style.left = pos.left;
        dayDiv.style.top = pos.top;

        if (holidays[dateKey]) {
            dayDiv.classList.add('holiday');
            dayDiv.title = holidays[dateKey];
        }

        dayDiv.onclick = () => openModal(dateKey);
        calendar.appendChild(dayDiv);
    });
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
    