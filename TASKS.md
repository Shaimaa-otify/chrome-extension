# DevMark — Build Tasks

A sequential checklist for building the DevMark Chrome extension. Complete each task fully before moving to the next.

---
show resources as a grid with spaces in between 
add search icon to search bar
check before adding it already exists





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
