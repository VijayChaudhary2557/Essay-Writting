# Essay Writing Test Platform

A modern web application for conducting essay writing tests with real-time evaluation, keyboard tracking, and intelligent feedback.

## Features

### 🎯 Core Features
- **Essay Writing Tests**: Write essays on various topics within 25 minutes
- **Real-time Evaluation**: Instant scoring and feedback
- **Keyboard Tracking**: Monitor backspace usage and typing patterns
- **Word Count Management**: Target 180-200 words for optimal scoring
- **Grammar & Spelling Check**: Automatic error detection and suggestions

### 🛠️ Admin Features (NEW!)
- **Topic Management**: Add, edit, and delete essay topics
- **Dynamic Topic System**: Topics are stored in JSON file for easy management
- **Admin Panel**: Beautiful interface for managing topics
- **Real-time Updates**: Changes reflect immediately across the platform

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd essay-writing-test
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and visit `http://localhost:3000`

## Usage

### For Students/Test Takers
1. Visit the home page
2. Click "Choose Topic & Start Test"
3. Select your preferred essay topic
4. Write your essay within 25 minutes (180-200 words)
5. Submit to get instant feedback and scoring

### For Administrators
1. Click "Manage Topics (Admin)" from the home page
2. Add new topics using the form
3. Edit existing topics by clicking the edit button
4. Delete topics using the delete button
5. All changes are automatically saved

## API Endpoints

### Admin Routes
- `GET /admin` - Admin panel interface
- `POST /admin/add-topic` - Add a new topic
- `PUT /admin/edit-topic/:index` - Edit an existing topic
- `DELETE /admin/delete-topic/:index` - Delete a topic

### Test Routes
- `GET /` - Home page
- `GET /topics` - Topic selection page
- `GET /test` - Essay writing test page
- `POST /submit-essay` - Submit essay for evaluation

## File Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── data/
│   └── topics.json        # Topics storage (auto-generated)
├── views/
│   ├── index.ejs          # Home page
│   ├── topics.ejs         # Topic selection page
│   ├── test.ejs           # Essay test page
│   └── admin.ejs          # Admin panel (NEW!)
├── public/
│   └── js/
│       └── test.js        # Test page JavaScript
└── README.md              # This file
```

## Scoring System

- **Base Score**: 100 points
- **Backspace Penalty**: -2 points per backspace
- **Word Count Deviation**: -0.5 points per word deviation from target (180-200)
- **Time Penalty**: -2 points per minute over 25 minutes
- **Grammar Errors**: Additional deductions for spelling and grammar mistakes

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, Tailwind CSS
- **Real-time**: Socket.IO
- **Data Storage**: JSON file system
- **Icons**: Font Awesome

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for educational purposes.

## Support

For questions or issues, please open an issue on the repository. 