let myResources = {
    id: "",
    title: "",
    url: "",
    tags: [],
    read: false,
    savedAt: Date.now()
}
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const resourcesFromLocalStorage = JSON.parse( localStorage.getItem("myResources") )
const tabBtn = document.getElementById("tab-btn")
const showResourcesBtn = document.getElementById("show-resources-btn")


// retrieves the array from storage
async function loadResources() {
    const data = await chrome.storage.sync.get("myResources")
    return data.myResources ? JSON.parse(data.myResources) : []
}

// loads existing array, appends new item, saves back
async function saveResource(resource) {
    const resources = await loadResources()
    resources.push(resource)
    await chrome.storage.sync.set({ "myResources": JSON.stringify(resources) })
}

// filters out the item with the matching id and saves
async function deleteResource(id) {
    const resources = await loadResources()
    const updatedResources = resources.filter(resource => resource.id !== id)
    await chrome.storage.sync.set({ "myResources": JSON.stringify(updatedResources) })
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const resource = {
            id: Date.now().toString(),
            title: tabs[0].title,
            url: tabs[0].url,
            tags: [],
            read: false,
            savedAt: Date.now()
        }
        saveResource(resource)
    })
})

function render(resources) {
    let listItems = ""    
    resources.forEach(resource => {
        listItems += `
            <li>
                <a target='_blank' href='${resource.url}'>
                    ${resource.title}
                </a>
            </li>
        `
    })  
    ulEl.innerHTML = listItems
}

showResourcesBtn.addEventListener("click", async function() {
    const resources = await loadResources()
    resources ? render(resources) : console.log
})

/* 
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
*/











if (resourcesFromLocalStorage) {
    myResources = resourcesFromLocalStorage
    render(myResources)
}





deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myResources = []
    render(myResources)
})

inputBtn.addEventListener("click", function() {
    myResources.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myResources", JSON.stringify(myResources) )
    render(myResources)
})




