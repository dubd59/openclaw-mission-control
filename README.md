OpenClaw Mission Control
========================

A Modern Dashboard for OpenClaw AI Agent Management

https://img.shields.io/badge/license-MIT-blue.svg
https://img.shields.io/badge/version-1.0.0-green.svg
https://img.shields.io/badge/PRs-welcome-brightgreen.svg

Transform your OpenClaw experience - Mission Control provides a beautiful, intuitive dashboard for managing OpenClaw agents, monitoring API costs, and installing skills from the marketplace. Built because the official dashboard is currently non-functional.

📸 Screenshots
[Screenshots would go here]

✨ Features

- 🤖 Agent Management - Create, configure, and monitor AI agents in real-time
- 📊 Cost Monitoring - Track API usage across OpenAI, Anthropic, and other providers with visual alerts
- 🛠️ Skill Marketplace - Browse and install community skills directly from ClawHub
- 🔒 Security Scanner - Automatically scan skills for malicious code and permission issues
- 📈 Real-time Metrics - Live agent progress charts and activity feeds
- 💳 Credit Controls - Set hard limits on API spending per agent or key
- 🚦 Gateway Control - Start, stop, and restart the OpenClaw gateway
- 📝 Activity Logging - Complete audit trail of all agent actions and system events

🚀 Quick Start (Windows PowerShell)

**Prerequisites**

- Windows 10/11
- Node.js (v22.22.0 or higher)
- Git
- OpenClaw (installed globally)

**Step 1: Install OpenClaw (If Not Already Installed)**
```powershell
# Check if Node.js is installed
node --version

# If Node.js is not installed, download from https://nodejs.org/
# Then install OpenClaw globally
npm install -g openclaw@latest

# Run OpenClaw onboarding to create directory structure
openclaw onboard --install-daemon

# Verify OpenClaw is installed
openclaw --version
```

**Step 2: Download Mission Control**
```powershell
# Navigate to your documents folder (or wherever you keep projects)
cd ~\Documents\

# Clone the repository
git clone https://github.com/Dubd59/openclaw-mission-control.git

# Enter the project directory
cd openclaw-mission-control
```

**Step 3: Install Dependencies**
```powershell
# Install all required packages
npm install
```

**Step 4: Build Mission Control**
```powershell
# Create the production build
npm run build
```

**Step 5: Start Mission Control**

*Option A: Quick Start with Development Server (Best for Testing)*
```powershell
# Start the development server
npm run dev

# Your browser will automatically open to http://localhost:5173
# Keep this PowerShell window open while using Mission Control
```

*Option B: Production Mode with Simple Server (Best for Daily Use)*
```powershell
# Install a simple static server globally (one-time)
npm install -g serve

# Serve the built files
serve -s dist -p 5173

# Open your browser to http://localhost:5173
```

*Option C: Create a Desktop Shortcut (Easiest for Daily Use)*
Create a new file called `Start-MissionControl.ps1` on your desktop:
```powershell
# Start-MissionControl.ps1
Write-Host "🚀 Starting OpenClaw Gateway..." -ForegroundColor Green
Start-Process powershell -ArgumentList "openclaw gateway start" -WindowStyle Minimized

Write-Host "📊 Starting Mission Control..." -ForegroundColor Green
cd ~\Documents\openclaw-mission-control
serve -s dist -p 5173

Write-Host "✅ Mission Control is running at http://localhost:5173" -ForegroundColor Green
Start-Process "http://localhost:5173"
```
Right-click and "Run with PowerShell" anytime you want to start Mission Control.

**Step 6: Verify the Connection**
Once Mission Control is running in your browser, check that it can see your OpenClaw installation:

- Look at the top of the dashboard for the OpenClaw Status Bar
- It should show:
  - ✅ OpenClaw version
  - ✅ Gateway status (Running/Stopped)
  - ✅ Number of installed skills

If you see "OpenClaw not installed" – run the installation steps above.

📁 Project Structure
```
openclaw-mission-control/
├── src/
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── agents/          # Agent management
│   │   ├── skills/          # Skill marketplace
│   │   └── layout/          # Layout components
│   ├── store/               # State management
│   ├── types/               # TypeScript definitions
│   └── utils/               # Utilities & OpenClaw bridge
├── public/                  # Static assets
├── dist/                    # Built files (after npm run build)
└── package.json             # Dependencies
```

🔌 How It Connects to OpenClaw
Mission Control connects to your local OpenClaw installation through direct filesystem access and CLI commands:

| Mission Control Action     | What It Does Behind the Scenes                               |
|---------------------------|--------------------------------------------------------------|
| View installed skills     | Reads `C:\Users\[YourName]\.openclaw\skills\` directory   |
| Edit configuration        | Reads/writes `C:\Users\[YourName]\.openclaw\openclaw.json`|
| Install a skill           | Executes `openclaw skills install [skill-name]`               |
| Start an agent            | Executes `openclaw agent --agent [name] --message "[task]"` |
| Monitor API costs         | Reads `C:\Users\[YourName]\.openclaw\logs\api-usage.log` |
| Restart gateway           | Executes `openclaw gateway restart`                          |
| Check status              | Executes `openclaw doctor` and `openclaw gateway status`     |

⚙️ Configuration

**Adding Your First API Key**
1. Click on Settings in the sidebar
2. Go to API Keys section
3. Click Add API Key
4. Select provider (OpenAI, Anthropic, Google, Azure, AWS, HuggingFace, Microsoft, etc.)
5. Paste your API key
6. Set a monthly credit limit
7. Click Save

**Creating Your First Agent**
1. Click New Agent button on the dashboard
2. Enter agent name (e.g., "Research Assistant")
3. Select agent type
4. Configure model settings
5. Write system instructions
6. Assign API keys
7. Set credit limit
8. Click Create Agent

**Installing Skills from Marketplace**
1. Click Skill Marketplace in the sidebar
2. Browse or search for skills
3. Click Install on any skill
4. The skill will download to `~/.openclaw/skills/`
5. Mission Control will automatically scan it for security risks
6. The skill appears in Installed Skills

🐛 Troubleshooting

| Problem                      | Solution                                                                 |
|-----------------------------|--------------------------------------------------------------------------|
| "OpenClaw not installed"    | Run `npm install -g openclaw@latest` in PowerShell as Administrator      |
| Gateway not running         | Run `openclaw gateway start` in PowerShell                               |
| Can't read config files     | Check file permissions: `dir C:\Users\[YourName]\.openclaw\`         |
| Skills not showing          | Run `openclaw skills list` to verify skills are installed               |
| Port 5173 already in use    | Change port: `serve -s dist -p 5174`                                     |
| API keys not saving         | Check if `openclaw.json` is writable (not open in another program)      |

✔️ The file has been recreated successfully.