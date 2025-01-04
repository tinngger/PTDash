
const holidays = {
    "01-26": "Republic Day",
    "03-10": "Holi",
    "08-15": "Independence Day",
    "10-02": "Gandhi Jayanti",
    "11-12": "Diwali",
};

const reminders = {};

function createCalendar() {
    const container = document.getElementById("calendar-container");
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Layout for months as per description
    const layout = [
        [0, 1],       // Top-left row (two months)
        [2, 3],       // Top-right row (two months below top-left)
        [4, 5],       // Middle-left row (two months below top-right)
        [6, 7, 8, 9], // Four months row
        [10, 11],     // Bottom row (two months)
    ];

    layout.forEach((row) => {
        const rowContainer = document.createElement("div");
        rowContainer.style.display = "flex";
        rowContainer.style.justifyContent = "space-between";
        rowContainer.style.width = "100%";
        rowContainer.style.marginBottom = "20px";

        row.forEach((monthIndex) => {
            const monthDiv = document.createElement("div");
            monthDiv.classList.add("month");

            const title = document.createElement("h3");
            title.textContent = monthNames[monthIndex];
            monthDiv.appendChild(title);

            const daysDiv = document.createElement("div");
            daysDiv.classList.add("days");

            // Add days of the week
            daysOfWeek.forEach((day) => {
                const dayDiv = document.createElement("div");
                dayDiv.textContent = day;
                dayDiv.classList.add("day", "blank");
                daysDiv.appendChild(dayDiv);
            });

            // Add blank days to align the 1st day correctly
            const firstDay = new Date(2025, monthIndex, 1).getDay();
            for (let i = 0; i < firstDay; i++) {
                const blankDiv = document.createElement("div");
                blankDiv.classList.add("day", "blank");
                daysDiv.appendChild(blankDiv);
            }

            // Add the actual days
            for (let day = 1; day <= daysInMonth[monthIndex]; day++) {
                const dayDiv = document.createElement("div");
                dayDiv.textContent = day;
                dayDiv.classList.add("day");
                const dateKey = `${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                if (holidays[dateKey]) {
                    dayDiv.style.backgroundColor = "rgba(255, 200, 200, 0.8)";
                    dayDiv.title = holidays[dateKey];
                }

                dayDiv.onclick = () => openModal(dateKey);
                daysDiv.appendChild(dayDiv);
            }

            monthDiv.appendChild(daysDiv);
            rowContainer.appendChild(monthDiv);
        });

        container.appendChild(rowContainer);
    });
}

// Modal functions
function openModal(date) {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    const dateText = document.getElementById("dateText");
    const reminderInput = document.getElementById("reminderInput");

    dateText.textContent = `Date: ${date} ${holidays[date] ? `(${holidays[date]})` : ""}`;
    reminderInput.value = reminders[date] || "";
    modal.classList.add("active");
    overlay.classList.add("active");
    modal.dataset.date = date;
}

function closeModal() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

function saveReminder() {
    const modal = document.getElementById("modal");
    const date = modal.dataset.date;
    const reminderInput = document.getElementById("reminderInput");

    reminders[date] = reminderInput.value;
    alert(`Reminder set for ${date}: ${reminders[date]}`);
    closeModal();
}

// Initialize calendar
createCalendar();
    