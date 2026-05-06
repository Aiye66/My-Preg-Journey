function calculatePregnancy() {
    const lmpInput = document.getElementById('lmp-date').value;
    if (!lmpInput) {
        alert("Please select a date");
        return;
    }

    const lmpDate = new Date(lmpInput);
    const today = new Date();
    
    // 1. Calculate Due Date (LMP + 280 days)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    
    // 2. Calculate Current Week
    const diffInMs = today - lmpDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(diffInDays / 7);
    const daysRemaining = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    
    // 3. Percentage calculation
    let progressPercent = Math.min(Math.max((diffInDays / 280) * 100, 0), 100);

    // Update UI
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('due-date').innerText = dueDate.toDateString();
    document.getElementById('current-week').innerText = `Week ${currentWeek}`;
    document.getElementById('days-remaining').innerText = daysRemaining > 0 ? daysRemaining : "Baby is here!";
    
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progressPercent + "%";
    progressBar.innerText = Math.round(progressPercent) + "%";

    updateMilestones(currentWeek);
}

function updateMilestones(week) {
    const title = document.getElementById('stage-title');
    const desc = document.getElementById('stage-desc');

    if (week < 4) {
        title.innerText = "Conception & Implantation";
        desc.innerText = "The journey begins! Your baby is a tiny cluster of cells.";
    } else if (week < 13) {
        title.innerText = "First Trimester";
        desc.innerText = "Major organs are beginning to form. You might feel extra tired!";
    } else if (week < 27) {
        title.innerText = "Second Trimester";
        desc.innerText = "The 'Golden Period'. You might start feeling those first little kicks!";
    } else {
        title.innerText = "Third Trimester";
        desc.innerText = "Getting ready for the big day. Your baby is growing hair and nails now.";
    }
}
