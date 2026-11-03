# 🇰🇷 Learn Korean - Level 1 (한국어 초급 1)

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> 🌐 **Try it live:** https://learn-korean-level1.netlify.app/
> No sign-up and no API key. Progress is saved in your browser.

An interactive, modern web application designed for mastering **Korean Level 1 (Beginner / TOPIK I Foundations)**. From the Hangul alphabet and dual numbering systems to verb conjugations, grammar patterns, situational dialogues, and quizzes with native text-to-speech audio pronunciation.

---

## 🌟 Key Features

### 🔤 1. Hangul (한글) Alphabet
- Learn basic consonants, basic vowels, aspirated & tense consonants, and compound vowels.
- Visual character breakdown with romanization, pronunciation keys, and sample words.
- Native Korean Text-to-Speech (TTS) audio for every character and syllable.

### 🔢 2. Dual Number Systems & Counters
- **Sino-Korean Numbers** (일, 이, 삼...) vs. **Native Korean Numbers** (하나, 둘, 셋...).
- Clear guidelines on when to use each system (phone numbers, prices, age, counting items, clock hours vs. minutes).
- Essential Korean counting units / classifiers (개, 명, 마리, 권, 병, 잔, etc.).

### 🧭 3. Directions, Places & Time
- Common location vocabulary, spatial directions (앞, 뒤, 위, 아래, 옆, 사이, etc.).
- Days of the week (월요일 ~ 일요일), calendar time, and daily routines.
- Telling time: hours in Native Korean + minutes in Sino-Korean.

### 📖 4. 50 Essential Verbs & Conjugations
- Comprehensive reference of the 50 most frequent Korean verbs and descriptive adjectives.
- Full conjugation tables:
  - Base dictionary form (기본형)
  - Present informal polite (해요체: -아요 / -어요 / -여요)
  - Present formal high (하십시오체: -ㅂ니다 / -습니다)
  - Past tense (-았어요 / -었어요)
  - Future tense (-(으)ㄹ 거예요)
  - Honorific form (-(으)시-)

### 📐 5. Grammar 1A & 1B (32 Core Patterns)
- **Grammar 1A (Foundations - 13 points)**:
  - Subject/Topic markers (`은/는`, `이/가`)
  - Object marker (`을/를`)
  - Direction & location particles (`에`, `에서`)
  - Copula & negation (`이에요/예요`, `이/가 아닙니다`, `있어요/없어요`)
- **Grammar 1B (Expressions & Connectives - 19 points)**:
  - Connectors (`-고`, `-지만`, `-(으)서`)
  - Ability & possibility (`-(으)ㄹ 수 있다/없다`)
  - Intentions & wishes (`-고 싶다`, `-(으)려고 하다`)
  - Suggestions & imperatives (`-(으)ㅂ시다`, `-(으)세요`)

### 💬 6. Real-World Situational Conversations
- Realistic dialogues covering everyday scenarios:
  - Self-introductions & greetings (인사)
  - Ordering food & drinks at a café/restaurant (식당 & 카페)
  - Shopping & asking for prices (쇼핑)
  - Asking for directions in the city (길 찾기)
  - Making weekend plans (약속 잡기)
- Line-by-line speaker audio playback and built-in comprehension quizzes.

### 🏆 7. Interactive Quizzes & Progress Tracking
- **Topic Quizzes**: 10-question practice quizzes for Directions, Verbs, Grammar 1A, Grammar 1B, and Vocabulary.
- **Comprehensive Final Exams**: Two full 30-question final assessments testing overall Level 1 mastery.
- **Study Progress**: Automatic tracking of visited lessons, completion percentages, and best quiz scores saved to `localStorage`.

### 🎨 8. Sleek, Modern User Experience
- Responsive, mobile-first design with clean typography and Korean font support.
- Dark mode / Light mode toggle with automatic persistence.
- Built-in speech synthesis (Web Speech API) calibrated for natural Korean (`ko-KR`) pitch and speed.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Bundler & Tooling**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Web Speech API (`SpeechSynthesisUtterance` with `ko-KR` locale)
- **State & Persistence**: React Hooks + Browser `localStorage`

---

## 📁 Project Structure

```text
korean-learning-level1/
├── public/                 # Static assets & favicon
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout.jsx      # Navigation, sidebar, header, theme toggle
│   │   └── ui.jsx          # Badges, audio buttons, cards, modal components
│   ├── data/               # Structured curriculum and content
│   │   ├── content.json    # Full curriculum dataset (verbs, grammar, quizzes)
│   │   ├── index.js        # Data exports
│   │   └── nav.js          # Navigation hierarchy and quiz metadata
│   ├── lib/                # Utility functions
│   │   ├── progress.js     # LocalStorage progress & score management
│   │   ├── speak.js        # Web Speech API TTS helper
│   │   └── text.js         # Text formatting and string utilities
│   ├── pages/              # Page views
│   │   ├── Dashboard.jsx   # Learning overview, stats & quick resume
│   │   ├── Hangeul.jsx     # Hangul alphabet reference & practice
│   │   ├── Numbers.jsx     # Sino/Native numbers & counters
│   │   ├── Directions.jsx  # Directions, places, days & time
│   │   ├── Verbs.jsx       # 50 verbs with interactive conjugations
│   │   ├── Grammar.jsx     # Grammar 1A & 1B lessons
│   │   ├── Vocabulary.jsx  # Categorized vocabulary builder
│   │   ├── Conversations.jsx # Interactive dialogues & listening practice
│   │   └── Quiz.jsx        # Quiz hub and assessment runner
│   ├── App.jsx             # Top-level routing
│   ├── index.css           # Global Tailwind CSS styles and theme variables
│   └── main.jsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite build configuration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vivekprabhu13/korean-learning-level1.git
   cd korean-learning-level1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to start learning!

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| **Development** | `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| **Build** | `npm run build` | Compiles and bundles production-ready assets into `/dist`. |
| **Preview** | `npm run preview` | Locally serves the production build from `/dist`. |
| **Lint** | `npm run lint` | Runs ESLint across all JavaScript/JSX source files. |

---

## 🔊 Audio & TTS Notes

This application uses the standard browser **Web Speech API** (`window.speechSynthesis`) configured for the `ko-KR` locale. 
- For the best pronunciation experience, ensure your operating system or browser has Korean voice packs installed (e.g., Google 한국어 voice on Chrome or Microsoft Heami on Windows/Edge).
- Audio is muted or gracefully skipped if speech synthesis is unsupported in the client browser.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/vivekprabhu13/korean-learning-level1/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ for Korean language learners. 화이팅! (Hwaiting!)
</p>
