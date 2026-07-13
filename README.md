# 🔖 DevMark

A Chrome extension to save, tag, and organize the websites that help you learn coding — so your best resources are always one click away.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Planned Improvements](#planned-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## About

**DevMark** is a Chrome extension built for developers who collect coding tutorials, docs, and references while learning. Instead of a flat list of bookmarks, DevMark lets you tag each resource by topic, filter by tag, search by title, and track which resources you've already gone through.

---

## Features

- **Save current tab** — captures the page URL and title automatically with one click
- **Manual entry** — add any URL with a custom title and tags
- **Tagging** — label resources by topic (e.g. `CSS`, `React`, `Algorithms`, `Reference`)
- **Filter by tag** — click a tag chip to show only matching resources
- **Live search** — filter the list by title or URL in real time
- **Read / unread toggle** — mark resources as read to track your progress
- **Delete individual resources** — remove a single entry without clearing everything
- **Persistent storage** — data saved in `chrome.storage.sync` and follows you across devices

---

## Demo

> Load the extension locally in Chrome via **chrome://extensions → Load unpacked**, then click the extension icon in the toolbar.

---

## Screenshots

> _Add screenshots here_

---

## Getting Started

### Prerequisites

- Google Chrome (or any Chromium-based browser)
- No Node.js, build tools, or server required

### Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/devmark-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the project folder

The DevMark icon will appear in your Chrome toolbar.

---

## Usage

1. **Save a tab** — navigate to any coding resource and click **Save Tab** in the popup
2. **Add manually** — type a URL and title into the input fields and click **Save**
3. **Tag it** — select or type a tag (e.g. `JavaScript`, `CSS`) before saving
4. **Filter** — click any tag chip in the list to show only resources with that tag
5. **Search** — type in the search box to filter by title or URL
6. **Mark as read** — click the read indicator on a card to toggle its read status
7. **Delete** — click the delete icon on any card to remove that single resource

---

## Project Structure

```
chrome extension/
├── index.html      # Popup markup
├── index.css       # Popup styles
├── index.js        # Extension logic, storage, DOM manipulation
├── manifest.json   # Chrome extension manifest (v3)
└── README.md
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Popup structure |
| CSS3 | Popup styling & tag chips |
| JavaScript (ES6+) | DOM manipulation, filtering, storage |
| Chrome Extensions API (v3) | `chrome.tabs`, `chrome.storage.sync` |

---

## Planned Improvements

- [ ] Import / export resources as JSON
- [ ] Sort by date saved or read status
- [ ] Favicon display next to each resource
- [ ] Drag-to-reorder list
- [ ] Keyboard shortcuts for saving the current tab
- [ ] Notes field per resource

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please keep changes focused and include a clear description in your PR.

---

## License

This project is open source and available under the [MIT License](LICENSE).
