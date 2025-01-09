document.addEventListener('DOMContentLoaded', () => {
    const journalDate = document.getElementById('journal-date'); // Date input field
    const journalEntry = document.getElementById('journal-entry'); // Textarea for the journal
    const addEntryBtn = document.getElementById('add-entry-btn'); // Add journal entry button
    const entriesContainer = document.getElementById('entries-container'); // Container for displaying entries

    // Load saved entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    savedEntries.forEach(entry => displayEntry(entry.date, entry.content));

    // Add new journal entry
    addEntryBtn.addEventListener('click', () => {
        const date = journalDate.value;
        const content = journalEntry.value.trim();

        // Validation: Ensure both fields are filled
        if (!date || content === '') {
            alert('Please select a date and write something in your journal!');
            return;
        }

        // Save entry in localStorage
        const newEntry = { date, content };
        savedEntries.push(newEntry);
        localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

        // Display the new entry
        displayEntry(date, content);

        // Clear the input fields after submission
        journalDate.value = '';
        journalEntry.value = '';
    });

    // Function to display a journal entry
    function displayEntry(date, content) {
        // Create a new entry card
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('card', 'mb-3');

        entryDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${date}</h5>
                <p class="card-text">${content}</p>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </div>
        `;

        // Add delete functionality
        entryDiv.querySelector('.delete-btn').addEventListener('click', () => {
            entriesContainer.removeChild(entryDiv);
            const index = savedEntries.findIndex(entry => entry.date === date && entry.content === content);
            if (index > -1) {
                savedEntries.splice(index, 1);
                localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
            }
        });

        // Append the entry to the container
        entriesContainer.appendChild(entryDiv);
    }
});
