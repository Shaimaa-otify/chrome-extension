# DevMark — Build Tasks

A sequential checklist for building the DevMark Chrome extension. Complete each task fully before moving to the next.

---

## Task 1 — Foundation: Manifest & HTML Structure

**Goal:** Update the extension metadata and lay out the full popup HTML skeleton.

**What to do:**
- Update `manifest.json`: change `name`, add a `description`, add `"storage"` to `permissions`
- Rewrite `index.html` with:
  - A header with the extension name
  - A "Save Tab" button
  - A manual entry form: title input, URL input, tag input, submit button
  - A search bar input
  - An empty `<div>` for tag filter chips
  - An empty `<ul>` or `<div>` for the resource list

**How to test:**
- Load the unpacked extension in `chrome://extensions`
- Click the extension icon — the popup should open without errors
- All form elements should be visible (unstyled is fine)
- No console errors in the popup's DevTools (`right-click popup → Inspect`)

---

## Task 2 — Data Model & Storage

**Goal:** Define the shape of a saved resource and set up `chrome.storage.sync` as the data layer.

**What to do:**
- Define a resource object shape: `{ id, title, url, tags, read, savedAt }`
- Write `saveResource(resource)` — loads existing array, appends new item, saves back
- Write `loadResources(callback)` — retrieves the array from storage and passes it to a callback
- Write `deleteResource(id)` — filters out the item with the matching id and saves

**How to test:**
- In `index.js`, temporarily call `saveResource({ id: '1', title: 'Test', url: 'https://test.com', tags: ['JS'], read: false, savedAt: Date.now() })`
- Open the popup, then open its DevTools console and run:
  ```js
  chrome.storage.sync.get('resources', (data) => console.log(data))
  ```
- You should see the test resource in the output
- Call `deleteResource('1')` and run the same check — the array should be empty

---

## Task 3 — Save & Render

**Goal:** Wire up both save methods and display saved resources as cards.

**What to do:**
- **Save Tab button**: use `chrome.tabs.query` to get the active tab's `url` and `title`, then call `saveResource()`
- **Manual save form**: on submit, read the three input values, build a resource object, call `saveResource()`, clear the form
- Write `renderList(resources)` to build a card for each resource showing: title, URL (as a clickable link), and tags as inline chips
- Call `loadResources()` on popup open and pass results to `renderList()`

**How to test:**
- Navigate to any webpage (e.g. `https://developer.mozilla.org`) and open the popup
- Click **Save Tab** — a card for that page should appear in the list
- Fill in the manual form and submit — a second card should appear
- Close and reopen the popup — both cards should still be there (persisted in storage)

---

## Task 4 — Delete Individual Resources

**Goal:** Let the user remove a single resource without affecting others.

**What to do:**
- Add a delete button to each card rendered by `renderList()`
- Attach a click listener that calls `deleteResource(id)` then re-renders the list
- Remove any leftover "Delete All" button and its event listener

**How to test:**
- Save two or three resources
- Click the delete button on the middle card — only that card should disappear
- The remaining cards should still appear and persist after reopening the popup
- Confirm there is no "Delete All" button visible

---

## Task 5 — Tag Filtering

**Goal:** Allow the user to filter the list by clicking a tag chip.

**What to do:**
- Write `renderTagFilters(resources)` — collects all unique tags across saved resources and renders each as a clickable chip
- Track a `activeTag` variable (default `null`)
- Clicking a chip sets `activeTag` to that tag and re-renders only matching resources
- Clicking the active chip again clears the filter (shows all)
- Call `renderTagFilters()` whenever the list is re-rendered

**How to test:**
- Save three resources: one tagged `CSS`, one tagged `JavaScript`, one tagged `CSS`
- Three tag chips should appear: `CSS` and `JavaScript`
- Click `CSS` — only the two CSS resources should show; the chip should look selected
- Click `CSS` again — all three should show again
- Delete one of the CSS resources — the tag chips should update automatically

---

## Task 6 — Live Search

**Goal:** Filter the list in real time as the user types in the search box.

**What to do:**
- Add an `input` event listener to the search bar
- On each keystroke, filter the loaded resources array where the title or URL contains the search string (case-insensitive)
- Pass the filtered array to `renderList()`
- Search and tag filter must work together: if a tag is active, search filters within that tag's results

**How to test:**
- Save resources for `https://css-tricks.com` (titled "CSS Tricks") and `https://javascript.info` (titled "JS Info")
- Type `css` in the search box — only the CSS Tricks card should show
- Clear the search — both cards reappear
- Select the `CSS` tag filter, then type `tricks` — only CSS Tricks should show
- Type something with no matches — the list should be empty (no errors)

---

## Task 7 — Read / Unread Toggle

**Goal:** Let users mark a resource as read and visually distinguish read from unread.

**What to do:**
- Add a toggle button or checkbox to each card (e.g. "Mark as read" / "✓ Read")
- On click, find the resource by `id` in storage, flip its `read` boolean, save back, and re-render
- Apply a CSS class to read cards (e.g. reduced opacity or a strikethrough on the title)

**How to test:**
- Save a resource — it should appear as unread by default
- Click the read toggle — the card should visually change (dimmed, checked, etc.)
- Reopen the popup — the card should still appear in its read state
- Click the toggle again — it should revert to unread, visually and in storage

---

## Task 8 — Styling & Polish

**Goal:** Make the popup look clean and presentable.

**What to do:**
- Set popup width (e.g. `380px`) and max-height with `overflow-y: scroll` on the list
- Style the header, form inputs, and save buttons
- Style resource cards: padding, border/shadow, title bold, URL muted color, tags as colored chips
- Style tag filter chips: outlined default, filled/colored when active
- Style the read state: e.g. `opacity: 0.5` and a subtle strikethrough on the title
- Add an **empty state** message when no resources are saved or no results match

**How to test:**
- Open the popup with no saved resources — an empty state message should show (not a blank white box)
- Save several resources with different tags — cards should be visually distinct and well-spaced
- The popup should not overflow the screen or feel cramped
- All interactive elements (buttons, chips, toggles) should have visible hover/focus states
- Resize nothing should break — the popup stays within its fixed width

---

## Task 9 — Final Cleanup

**Goal:** Polish, test end-to-end, and update project metadata.

**What to do:**
- Update `manifest.json` `version` to `"1.0"` and ensure `description` is filled in
- Test every feature together in sequence (save tab, manual save, tag filter + search combined, toggle read, delete)
- Handle edge cases:
  - Submitting the manual form with empty fields (should do nothing or show inline feedback)
  - Saving the same URL twice (allow it, or show a warning)
  - Very long titles or URLs (should truncate gracefully in the card)
- Add the extension icon if not already present
- Take screenshots for the README

**How to test:**
- Reload the unpacked extension fresh (`chrome://extensions → reload`)
- Go through the full user flow from scratch with no saved data
- Submit the empty form — nothing should break
- Confirm storage is clean: `chrome.storage.sync.clear()` in the console, reopen popup — empty state shown
- Confirm everything still works after Chrome is restarted (storage persists)
