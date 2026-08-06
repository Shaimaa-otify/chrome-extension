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

- **Save current tab** — captures the active tab's URL and title automatically with one click
- **Tagging** — label resources by topic (e.g. `CSS`, `React`, `Algorithms`) before saving
- **Read status** — mark a resource as read or unread before saving via radio buttons
- **Filter by tag** — click a tag chip to show only matching resources; click again to clear
- **Live search** — filter the list by title or URL in real time
- **Read / unread toggle** — toggle read status directly on any saved resource
- **Delete individual resources** — remove a single entry with the delete button
- **Delete all** — double-click the Delete All button to wipe all saved resources
- **Show / Hide list** — toggle the resource list with a single button; label updates to reflect state
- **Duplicate prevention** — saving a URL that already exists shows an alert instead of duplicating
- **Empty state** — a message is shown when no resources are saved or no results match
- **Persistent storage** — data saved in `chrome.storage.sync` and syncs across devices

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

1. **Save a tab** — navigate to any coding resource, fill in tags and read status, then click **Save Tab**
2. **Tag it** — type comma-separated tags (e.g. `JavaScript, CSS`) in the Tags field before saving
3. **Mark read** — select Yes or No in the Read field before saving; toggle it later directly on the card
4. **Show list** — click **Show All** to reveal saved resources; click **Hide All** to collapse
5. **Filter by tag** — click any tag chip to show only resources with that tag; click again to clear
6. **Search** — type in the search bar to filter by title or URL in real time
7. **Delete one** — click the **-** button on any card to remove that resource
8. **Delete all** — double-click the **Delete All** button to clear everything

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
- [ ] group pages in the same website

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
