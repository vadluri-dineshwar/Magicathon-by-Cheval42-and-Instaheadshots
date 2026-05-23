import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '<OPENROUTER_API_KEY>',
  defaultHeaders: {
    'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    'X-OpenRouter-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
  },
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: '~openai/gpt-latest',
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of life?',
      },
    ],
  });

  console.log(completion.choices[0].message);
}

main();



import { OpenRouter } from '@openrouter/sdk';

const client = new OpenRouter({
  apiKey: '<OPENROUTER_API_KEY>',
  httpReferer: '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
  appTitle: '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
});

const completion = await client.chat.send({
  model: '~openai/gpt-latest',
  messages: [
    {
      role: 'user',
      content: 'What is the meaning of life?',
    },
  ],
});


import { callModel, tool } from '@openrouter/agent';
import { z } from 'zod';

const weatherTool = tool({
  name: 'get_weather',
  description: 'Get the current weather for a location',
  inputSchema: z.object({
    location: z.string().describe('City name'),
  }),
  execute: async ({ location }) => {
    return { temperature: 72, condition: 'sunny', location };
  },
});

const result = await callModel({
  model: '~anthropic/claude-sonnet-latest',
  messages: [
    { role: 'user', content: 'What is the weather in San Francisco?' },
  ],
  tools: [weatherTool],
});

const text = await result.getText();
console.log(text);


console.log(completion.choices[0].message.content);

async function callOpenRouter(userPrompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer YOUR_API_KEY_HERE`, // Keep this secret!
      "HTTP-Referer": "http://localhost:3000",      // Your site URL
      "X-Title": "HackFuel",                        // Your app name
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "google/gemini-2.0-flash-exp", 
      "messages": [
        { "role": "user", "content": userPrompt }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content; // This is your AI's response
}


import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '<OPENROUTER_API_KEY>',
  defaultHeaders: {
    'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    'X-OpenRouter-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
  },
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: '~openai/gpt-latest',
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of life?',
      },
    ],
  });

  console.log(completion.choices[0].message);
}

main();




import React, { useState } from 'react';

const ChatCopilot = () => {
  // 1. Create state to track if building has started
  const [isBuilding, setIsBuilding] = useState(false);

  const handleBuildClick = () => {
    // 2. This function triggers the UI change
    setIsBuilding(true);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
      {!isBuilding ? (
        // Initial state
        <>
          <p className="mb-4">Awesome! Here's a quick plan to get you started:</p>
          <ul className="space-y-2 mb-6">
            <li>✅ Select a meme template or let AI suggest one</li>
            <li>✅ Add custom text & style</li>
          </ul>
          <div className="flex gap-3">
            <button 
              onClick={handleBuildClick} 
              className="bg-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-purple-500 transition"
            >
              Yes, build it!
            </button>
          </div>
        </>
      ) : (
        // State after clicking the button
        <div className="text-center py-4">
          <p className="text-xl font-bold text-green-400">🚀 Building your Meme Generator...</p>
          <p className="text-sm text-gray-400 mt-2">Setting up your environment and templates.</p>
        </div>
      )}
    </div>
  );
};

export default ChatCopilot;




import React, { useState } from 'react';

const CommunityFeed = () => {
  const [showAll, setShowAll] = useState(false);
  const fullList = [/* your data array here */];

  return (
    <div className="bg-gray-900 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Community Feed</h3>
        {/* Toggle function */}
        <button onClick={() => setShowAll(!showAll)} className="text-blue-400 text-sm">
          {showAll ? "Show Less" : "View all"}
        </button>
      </div>
      
      {/* Map through the list based on state */}
      {(showAll ? fullList : fullList.slice(0, 3)).map((item, index) => (
        <div key={index} className="p-2">{item.name}</div>
      ))}
    </div>
  );
};



// const ChatInterface =java scrip () =>
     {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hey! I'm your copilot." }
  ]);

  const handleBuildClick = () => {
    setMessages([...messages, { sender: 'user', text: "Yes, build it!" }, { sender: 'bot', text: "Starting project..." }]);
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
          {msg.text}
        </div>
      ))}
      <button onClick={handleBuildClick}>Yes, build it!</button>
    </div>
  );
};

function updateStudio() {
    const tool = document.getElementById('toolSelector').value;
    const inputDiv = document.getElementById('dynamic-input');
    const title = document.getElementById('studio-title');
    
    if(tool === 'copilot') {
        title.innerText = "AI Copilot";
        inputDiv.innerHTML = `<textarea id="userInput" class="w-full h-32 bg-slate-800 p-4 rounded-lg" placeholder="Ask anything about your code..."></textarea>`;
    } else {
        title.innerText = "Meme/Media Studio";
        inputDiv.innerHTML = `<input type="file" id="mediaInput" class="block w-full text-slate-400 mb-6 file:bg-blue-600 file:rounded-lg">`;
    }
}

async function runTool() {
    const tool = document.getElementById('toolSelector').value;
    const output = document.getElementById('output');
    output.innerText = "Connecting to AI... ⚡";
    
    // In a real hackathon, you send this to your Flask app
    // Example for Copilot:
    const prompt = tool === 'copilot' ? document.getElementById('userInput').value : "Analyze this image";
    
    const response = await fetch('/api/run', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ tool: tool, prompt: prompt })
    });
    
    const data = await response.json();
    output.innerText = data.result;
}

// TemplateCard.jsx
const TemplateCard = ({ title, description }) => (
  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/15 border border-white/10 rounded-[24px] p-6 h-[220px] flex flex-col justify-end transition-all hover:scale-105">
    <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
    <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
  </div>
);

// In your main page:
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <TemplateCard title="Meme Generator" description="Create funny and trending memes in seconds." />
  <TemplateCard title="AI Copilot" description="Your smart coding assistant for workflow." />
  {/* Add more cards here easily */}
</div>


// // FooterCTA.jsx
// export const FooterCTA = () => (
//   <section className="bg-black/40 p-10 rounded-[20px] flex justify-between items-center border border-white/5">
//     <div>
//       <p className="text-gray-400">Built with ❤️ during the hackathon.</p>
//     </div>
//     <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl text-center">
//       <h2 className="text-2xl font-bold">Ready. Set. Build! 🚀</h2>
//       <button className="bg-white text-black px-6 py-2 mt-2 rounded-lg font-bold">Start Your Project</button>
//     </div>
//   </section>
// );


// App.js
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);


// Function to handle the Execute button
document.querySelector('.execute-btn')?.addEventListener('click', () => {
    const input = document.querySelector('textarea').value;
    const chatDisplay = document.getElementById('chat-messages');
    
    // Simple UI update
    chatDisplay.innerHTML += `<p>You: ${input}</p>`;
    // Here you would trigger your AI API call
});