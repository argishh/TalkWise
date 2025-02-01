# 🤖🎙️ TalkWise: Your AI-Powered Meeting Genius! 

In the fast-paced world of virtual meetings and high-stakes conferences, TalkWise is your ultimate real-time AI assistant, ensuring you never miss a crucial detail! Whether it's a critical boardroom discussion or an intense brainstorming session, TalkWise listens, understands, and instantly delivers precise answers to any question—the moment it's asked.

⚡ Powered by cutting-edge AI, TalkWise supercharges your meetings, providing instant, context-aware insights drawn from your documents, databases, and knowledge sources. No more scrambling for answers, no more awkward silences—just lightning-fast, pinpoint-accurate responses that keep your discussions sharp, informed, and ahead of the game.

Say goodbye to confusion and hello to clarity. With TalkWise, every meeting, every video you watch, every podcast/audiobook you listen, becomes a powerhouse of productivity as you can instantly chat with it! 🚀🔥

## ✨ Features
✅ **Live transcription** for speaker & microphone audio  
✅ **Deepgram WebSocket API** integration  
✅ **Secure API key handling** via environment variables  
✅ **Optimized for Next.js App Router** (`src/app/`)  
✅ **Responsive UI with Tailwind CSS**  
✅ **Error handling & WebSocket reconnection**  


## 🚀 Live Demo
Coming soon


## 📌 Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/argishh/TalkWise.git
cd talkWise
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Get a Deepgram API Key**
1. Sign up at [Deepgram](https://deepgram.com/).
2. Go to **API Keys** and generate a **WebSocket-enabled** key.

### **4️⃣ Configure Environment Variables**
Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_DEEPGRAM_API_KEY=your-deepgram-api-key-here
```

### **5️⃣ Start the Development Server**
```bash
npm run dev
```

Now, open **`http://localhost:3000`** in your browser! 🚀


## 🎨 UI Overview
The app consists of two panels:
- **Left Panel**: Displays real-time transcription of **speaker audio**.
- **Right Panel**: Displays real-time transcription of **microphone audio**.


## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router)
- **WebSockets**: Deepgram API
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (`useState`, `useEffect`)


## 📂 Project Structure
```
talkwise/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── TranscriptionPanel.js  # Handles real-time transcription
│   │   ├── layout.js  # Global layout and metadata
│   │   ├── page.js  # Home page with both transcription panels
│   │   ├── globals.css  # Tailwind CSS styles
│── .env.local  # API key (DO NOT SHARE)
│── tailwind.config.js  # Tailwind configuration
│── package.json  # Dependencies & scripts
│── README.md  # Documentation
```


## ⚡ How It Works
1. **Captures audio input** from either the **speaker or microphone**.
2. **Sends audio data** to **Deepgram WebSockets** for transcription.
3. **Receives transcribed text** and displays it live in the UI.
4. **Users can start & stop transcription** using buttons.


## 📌 Deploying to Vercel
You can deploy this Next.js app easily on [Vercel](https://vercel.com/).

1. Push your project to GitHub.
2. Go to **Vercel Dashboard** → **Import Project**.
3. Set up the environment variable in Vercel:
   ```
   NEXT_PUBLIC_DEEPGRAM_API_KEY=your-deepgram-api-key-here
   ```
4. Deploy! 🚀


## ❓ Troubleshooting
### **WebSocket Connection Fails**
- Ensure **your API key is correct** and has **WebSocket access**.
- Check **Deepgram API status** at [status.deepgram.com](https://status.deepgram.com/).
- Try **restarting the server** (`npm run dev`).

### **Tailwind CSS Not Working**
- Make sure `globals.css` includes:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Restart Next.js:  
  ```bash
  rm -rf .next
  npm run dev
  ```


## 📜 License
This project is **open-source** under the **MIT License**. Feel free to modify and improve it.


## 💡 Future Improvements
✅ Support for **multiple languages**  
✅ Improved **UI with animations**  
✅ Add **speaker diarization** (who is speaking)  
✅ **Download transcripts** as a text file  


## 🤝 Contributing
1. **Fork this repo**
2. **Create a new branch**: `git checkout -b feature-name`
3. **Commit your changes**: `git commit -m "Added new feature"`
4. **Push to GitHub**: `git push origin feature-name`
5. **Create a pull request** 🎉


## 🛠️ Maintainer
👤 **Argish**  
GitHub: [@argishh](https://github.com/argishh)  
Twitter: [@argishh](https://twitter.com/argishh)  

---

### 💙 **Happy Coding!**

