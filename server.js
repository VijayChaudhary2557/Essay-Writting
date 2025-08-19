const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Topics file path
const topicsFilePath = path.join(__dirname, 'data', 'topics.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Load topics from file or use default
function loadTopics() {
    try {
        if (fs.existsSync(topicsFilePath)) {
            const data = fs.readFileSync(topicsFilePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading topics:', error);
    }
    
    // Default topics if file doesn't exist
    const defaultTopics = [
        "First Campus Interview Experience",
        "My Best Friend",
        "Are we too dependent on Computers",
        "Digitization and its benefits",
        "My last vacation with Parents",
        "Social media has made it easier to misuse one's right to freedom of expression.",
        "Violent video games affect children negatively.",
        "Success comes to those who take risks.",
        "People today are more materialistic and less satisfied as compared to previous generations.",
        "Do you think progress is always good? Cite examples to support your view.",
        "At least one form of physical training should be mandatory across education institutes",
        "Social media has made us less social.",
        "The winner stands alone.",
        "Do ethics or moral principles matter in business?",
        "The impact of technology on human relationships",
        "Should social media platforms be regulated?",
        "The importance of mental health awareness",
        "Climate change: Individual responsibility vs government action",
        "The future of education in the digital age",
        "Work-life balance in the modern world"
    ];
    
    // Save default topics to file
    saveTopics(defaultTopics);
    return defaultTopics;
}

// Save topics to file
function saveTopics(topics) {
    try {
        fs.writeFileSync(topicsFilePath, JSON.stringify(topics, null, 2));
    } catch (error) {
        console.error('Error saving topics:', error);
    }
}

// Load topics
let essayTopics = loadTopics();

// Store active sessions
const activeSessions = new Map();

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/topics', (req, res) => {
    res.render('topics', { 
        topics: essayTopics,
        getTopicTagsForEJS: function(topic) {
            const tagMap = {
                'Technology': ['tech', 'modern'],
                'Climate': ['environment', 'global'],
                'Mental Health': ['health', 'wellness'],
                'Social Media': ['digital', 'communication'],
                'Remote Work': ['business', 'future'],
                'Artificial Intelligence': ['tech', 'future'],
                'Leadership': ['business', 'society'],
                'Sustainable': ['environment', 'lifestyle'],
                'Reading': ['education', 'personal'],
                'Privacy': ['digital', 'security'],
                'Education': ['learning', 'academic'],
                'Business': ['corporate', 'professional'],
                'Environment': ['nature', 'green'],
                'Health': ['wellness', 'medical'],
                'Society': ['community', 'social']
            };

            for (const [key, tags] of Object.entries(tagMap)) {
                if (topic.toLowerCase().includes(key.toLowerCase())) {
                    return tags;
                }
            }
            return ['general'];
        }
    });
});

// Admin routes for managing topics
app.get('/admin', (req, res) => {
    res.render('admin', { topics: essayTopics });
});

app.post('/admin/add-topic', (req, res) => {
    const { topic } = req.body;
    
    if (!topic || topic.trim().length === 0) {
        return res.status(400).json({ error: 'Topic cannot be empty' });
    }
    
    const newTopic = topic.trim();
    
    // Check if topic already exists
    if (essayTopics.includes(newTopic)) {
        return res.status(400).json({ error: 'Topic already exists' });
    }
    
    // Add new topic
    essayTopics.push(newTopic);
    saveTopics(essayTopics);
    
    res.json({ success: true, message: 'Topic added successfully', topics: essayTopics });
});

app.delete('/admin/delete-topic/:index', (req, res) => {
    const index = parseInt(req.params.index);
    
    if (isNaN(index) || index < 0 || index >= essayTopics.length) {
        return res.status(400).json({ error: 'Invalid topic index' });
    }
    
    const deletedTopic = essayTopics.splice(index, 1)[0];
    saveTopics(essayTopics);
    
    res.json({ success: true, message: 'Topic deleted successfully', deletedTopic, topics: essayTopics });
});

app.put('/admin/edit-topic/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { topic } = req.body;
    
    if (isNaN(index) || index < 0 || index >= essayTopics.length) {
        return res.status(400).json({ error: 'Invalid topic index' });
    }
    
    if (!topic || topic.trim().length === 0) {
        return res.status(400).json({ error: 'Topic cannot be empty' });
    }
    
    const newTopic = topic.trim();
    
    // Check if topic already exists (excluding current index)
    const existingIndex = essayTopics.findIndex((t, i) => i !== index && t === newTopic);
    if (existingIndex !== -1) {
        return res.status(400).json({ error: 'Topic already exists' });
    }
    
    // Update topic
    essayTopics[index] = newTopic;
    saveTopics(essayTopics);
    
    res.json({ success: true, message: 'Topic updated successfully', topics: essayTopics });
});

app.get('/test', (req, res) => {
    const topicIndex = req.query.topic;
    let selectedTopic;
    
    if (topicIndex && topicIndex >= 0 && topicIndex < essayTopics.length) {
        selectedTopic = essayTopics[parseInt(topicIndex)];
    } else {
        // Fallback to random topic if no valid topic selected
        selectedTopic = essayTopics[Math.floor(Math.random() * essayTopics.length)];
    }
    
    res.render('test', { topic: selectedTopic });
});

app.post('/submit-essay', (req, res) => {
    const { essay, backspaceCount, timeTaken, wordCount } = req.body;
    
    // Calculate score based on various factors
    let score = 100;
    
    // Deduct points for backspace usage (2 points per backspace)
    score -= backspaceCount * 2;
    
    // Deduct points for word count deviation
    const targetWords = 190; // Target between 180-200
    const wordDeviation = Math.abs(wordCount - targetWords);
    score -= wordDeviation * 0.5;
    
    // Deduct points for time overrun
    const maxTime = 25 * 60; // 25 minutes in seconds
    if (timeTaken > maxTime) {
        score -= (timeTaken - maxTime) / 60 * 2; // 2 points per minute over
    }
    
    // Ensure score doesn't go below 0
    score = Math.max(0, Math.round(score));
    
    // Basic grammar and spelling check
    const errors = checkEssayErrors(essay);
    
    res.json({
        score,
        errors,
        backspaceCount,
        timeTaken,
        wordCount,
        feedback: generateFeedback(score, errors, backspaceCount, wordCount, timeTaken)
    });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('start-test', (data) => {
        activeSessions.set(socket.id, {
            startTime: Date.now(),
            backspaceCount: 0,
            lastActivity: Date.now()
        });
    });
    
    socket.on('backspace-pressed', () => {
        const session = activeSessions.get(socket.id);
        if (session) {
            session.backspaceCount++;
            session.lastActivity = Date.now();
        }
    });
    
    socket.on('disconnect', () => {
        activeSessions.delete(socket.id);
        console.log('User disconnected:', socket.id);
    });
});

// Helper functions
function checkEssayErrors(essay) {
    const errors = [];
    
    // Check for common spelling mistakes
    const commonMistakes = {
        'teh': 'the',
        'recieve': 'receive',
        'seperate': 'separate',
        'definately': 'definitely',
        'occured': 'occurred',
        'begining': 'beginning',
        'beleive': 'believe',
        'neccessary': 'necessary',
        'accomodate': 'accommodate',
        'embarass': 'embarrass'
    };
    
    Object.keys(commonMistakes).forEach(mistake => {
        const regex = new RegExp(`\\b${mistake}\\b`, 'gi');
        if (regex.test(essay)) {
            errors.push(`Spelling: "${mistake}" should be "${commonMistakes[mistake]}"`);
        }
    });
    
    // Check for sentence structure
    const sentences = essay.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentences.forEach((sentence, index) => {
        const trimmed = sentence.trim();
        if (trimmed.length > 0 && !trimmed[0].match(/[A-Z]/)) {
            errors.push(`Sentence ${index + 1}: Should start with capital letter`);
        }
    });
    
    return errors;
}

function generateFeedback(score, errors, backspaceCount, wordCount, timeTaken) {
    let feedback = [];
    
    if (score >= 90) {
        feedback.push("Excellent work! Your essay demonstrates strong writing skills.");
    } else if (score >= 80) {
        feedback.push("Good work! There's room for improvement but overall well done.");
    } else if (score >= 70) {
        feedback.push("Fair attempt. Focus on reducing errors and improving structure.");
    } else {
        feedback.push("Needs improvement. Practice more to enhance your writing skills.");
    }
    
    if (backspaceCount > 20) {
        feedback.push(`You used backspace ${backspaceCount} times. Try to think before writing to reduce corrections.`);
    }
    
    if (wordCount < 180) {
        feedback.push(`Your essay has ${wordCount} words. Aim for 180-200 words for better coverage.`);
    } else if (wordCount > 200) {
        feedback.push(`Your essay has ${wordCount} words. Try to stay within the 180-200 word limit.`);
    }
    
    if (errors.length > 0) {
        feedback.push(`Found ${errors.length} error(s). Review grammar and spelling.`);
    }
    
    return feedback;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to start the essay test`);
}); 