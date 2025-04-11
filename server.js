const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Here you would typically integrate with an AI service like OpenAI
        // For now, we'll use a simple response system
        const response = await generateResponse(message);
        
        res.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Simple response generation (replace with actual AI integration)
async function generateResponse(message) {
    // This is a placeholder. Replace with actual AI integration
    const responses = {
        'hello': 'Hi! How can I help you with your career today?',
        'help': 'I can help you with career advice, job search tips, resume building, and professional development. What would you like to know?',
        'resume': 'I can help you create a professional resume. Would you like to start building your resume?',
        'job search': 'For job searching, I recommend: 1) Update your resume 2) Use job boards like LinkedIn and Indeed 3) Network with professionals 4) Prepare for interviews. What specific aspect would you like to know more about?',
        'interview': 'For interviews, remember to: 1) Research the company 2) Prepare STAR method responses 3) Dress professionally 4) Ask thoughtful questions. Need help with any of these aspects?',
        'skills': 'Some valuable skills for today\'s job market include: 1) Digital literacy 2) Communication 3) Problem-solving 4) Adaptability 5) Leadership. Which skills would you like to develop?'
    };

    // Check for keywords in the message
    const lowerMessage = message.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }

    // Default response
    return "I'm here to help with your career journey. You can ask me about resume building, job searching, interview preparation, or skill development. What would you like to know?";
}

// Start the server
app.listen(port, () => {
    console.log(`Career Website by AI is running at http://localhost:${port}`);
}); 