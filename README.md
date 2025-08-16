# Essay Writing Test Website

एक advanced essay writing test website जो real-time keyboard tracking, AI-powered error detection, और comprehensive evaluation प्रदान करती है।

## 🚀 Features

### Core Features
- **Essay Writing Test** - 180-200 words का essay लिखना
- **Time Management** - 25 minutes का time limit
- **Keyboard Tracking** - Backspace usage को real-time track करना
- **Point System** - Backspace के लिए points deduction
- **AI Evaluation** - Grammar, spelling, और structure analysis
- **Real-time Feedback** - Instant error detection और suggestions

### Advanced Features
- **Auto-save** - हर 30 seconds में essay automatically save होता है
- **Keyboard Shortcuts** - Ctrl+S (save), Ctrl+Enter (submit)
- **Progress Tracking** - Word count progress bar
- **Error Highlighting** - Common spelling mistakes detection
- **Responsive Design** - Mobile और desktop friendly
- **Beautiful UI** - Modern design with Tailwind CSS

## 🛠️ Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone या download करें:**
```bash
git clone <repository-url>
cd essay-writing-test
```

2. **Dependencies install करें:**
```bash
npm install
```

3. **Server start करें:**
```bash
npm start
```

4. **Development mode में run करें:**
```bash
npm run dev
```

5. **Browser में जाएं:**
```
http://localhost:3000
```

## 📁 Project Structure

```
essay-writing-test/
├── package.json          # Project dependencies
├── server.js            # Main server file
├── README.md            # Project documentation
├── views/
│   ├── index.ejs        # Landing page
│   └── test.ejs         # Test interface
└── public/
    └── js/
        └── test.js      # Frontend utilities
```

## 🎯 How It Works

### Test Flow
1. **Landing Page** - User को test के बारे में information
2. **Topic Assignment** - Random topic generate होता है
3. **Writing Interface** - Real-time word count और error detection
4. **Keyboard Tracking** - Backspace usage monitor होता है
5. **Submission** - Essay evaluate होता है
6. **Results** - Detailed feedback और score

### Scoring System
- **Base Score**: 100 points
- **Backspace Penalty**: -2 points per backspace
- **Word Count Penalty**: -0.5 points per word deviation from 190
- **Time Penalty**: -2 points per minute over 25 minutes

### Error Detection
- Common spelling mistakes
- Sentence structure issues
- Word repetition
- Sentence length analysis

## 🎨 UI Features

### Landing Page
- Beautiful gradient background
- Feature highlights
- Test rules and guidelines
- Responsive design

### Test Interface
- Real-time statistics display
- Progress tracking
- Error highlighting
- Writing tips
- Auto-save functionality

### Results Modal
- Comprehensive score breakdown
- Detailed feedback
- Error analysis
- Performance statistics

## 🔧 Technical Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, JavaScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.IO
- **Icons**: Font Awesome

## 📱 Responsive Design

Website सभी devices पर perfectly work करती है:
- Desktop computers
- Tablets
- Mobile phones
- Different screen sizes

## 🎮 Keyboard Shortcuts

- **Ctrl + S**: Save essay draft
- **Ctrl + Enter**: Submit essay
- **Backspace**: Tracked for scoring

## 🔒 Auto-save Feature

- हर 30 seconds में automatic save
- Browser refresh के बाद भी data safe
- 2 hours तक draft available
- User confirmation before loading

## 🚀 Future Enhancements

- User authentication
- Multiple essay topics
- Advanced grammar checking
- Plagiarism detection
- Performance analytics
- Export results

## 📞 Support

अगर कोई issue या question है तो:
- GitHub issues create करें
- Documentation check करें
- Code review करें

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ for better writing skills assessment** 