// Additional utility functions for the essay test

// Auto-save functionality
function autoSave() {
    const essay = document.getElementById('essayText').value;
    localStorage.setItem('essayDraft', essay);
    localStorage.setItem('essayTimestamp', Date.now());
}

// Load auto-saved essay
function loadAutoSaved() {
    const savedEssay = localStorage.getItem('essayDraft');
    const timestamp = localStorage.getItem('essayTimestamp');
    
    if (savedEssay && timestamp) {
        const timeDiff = Date.now() - parseInt(timestamp);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        // Only load if saved within last 2 hours
        if (hoursDiff < 2) {
            if (confirm('Found a saved draft. Would you like to load it?')) {
                document.getElementById('essayText').value = savedEssay;
                // Trigger input event to update word count
                document.getElementById('essayText').dispatchEvent(new Event('input'));
            }
        }
    }
}

// Clear auto-saved data
function clearAutoSaved() {
    localStorage.removeItem('essayDraft');
    localStorage.removeItem('essayTimestamp');
}

// Enhanced error checking
function enhancedErrorCheck(text) {
    const errors = [];
    
    // Check for repeated words
    const words = text.toLowerCase().split(/\s+/);
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    Object.keys(wordCount).forEach(word => {
        if (wordCount[word] > 3 && word.length > 3) {
            errors.push(`Word "${word}" is repeated too many times`);
        }
    });
    
    // Check for sentence length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentences.forEach((sentence, index) => {
        const wordCount = sentence.trim().split(/\s+/).length;
        if (wordCount > 25) {
            errors.push(`Sentence ${index + 1} is too long (${wordCount} words)`);
        }
    });
    
    return errors;
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+S to save
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        autoSave();
        showNotification('Essay saved!', 'success');
    }
    
    // Ctrl+Enter to submit
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        submitEssay();
    }
});

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize auto-save every 30 seconds
setInterval(autoSave, 30000);

// Load auto-saved essay on page load
document.addEventListener('DOMContentLoaded', loadAutoSaved);

// Clear auto-saved data when test is submitted
window.addEventListener('beforeunload', function() {
    if (isTestActive) {
        autoSave();
    }
}); 