let myResources = {
    id: "",
    title: "",
    url: "",
    tags: [],
    read: false,
    savedAt: Date.now()
}
const tagEl = document.getElementById("tag-input-el")
const chipsEl = document.getElementById("chips-el")
const ulEl = document.getElementById("ul-el")
const showResourcesBtn = document.getElementById("show-resources-btn")
const saveBtn = document.getElementById("save-btn")
const deleteAllBtn = document.getElementById("delete-all-btn")
let isShowing = false


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


saveBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const resource = {
            id: Date.now().toString(),
            title: tabs[0].title,
            url: tabs[0].url,
            tags: tagEl.value.split(",").map(t => t.trim()).filter(Boolean),
            read: document.querySelector('input[name="read"]:checked').value === "yes",
            savedAt: Date.now()
        }
        console.log("Resource saved:", resource)
        saveResource(resource)
    })
})
 
function render(resources) {
    let listHeader = `
            <li class="resource-item">            
                <a >Linked Title</a>
                <p>Tags</p>                
                <p>Read</p>                
                <p>Saved At</p>
                <p>Delete</p>
            </li>`
    let listItems = ""    
    resources.forEach(resource => {
        listItems += `
            <li class="resource-item">            
                <a target='_blank' href='${resource.url}'>
                    ${resource.title}
                </a>
                <p>${resource.tags.join(", ")}</p>                
                <p>${resource.read ? "Yes" : "No"}</p>                
                <p>${new Date(resource.savedAt).toLocaleString()}</p>
                <button class="delete-btn" data-id="${resource.id}">-</button>
            </li>
        `
    })  
    ulEl.innerHTML = listHeader + listItems
}

showResourcesBtn.addEventListener("click", async function() {
    if (isShowing) {
        ulEl.innerHTML = ""
        showResourcesBtn.textContent = "SHOW ALL"
        isShowing = false
        return
    }
    const resources = await loadResources()
    if (resources && resources.length > 0) {
        render(resources)
        showResourcesBtn.textContent = "HIDE ALL"
        isShowing = true
    } else {
        console.log("No resources found")
    }
})



loadResources().then(resources => {
    if (resources.length) {
        render(resources)
        renderTagFilters(resources)
        isShowing = true
        showResourcesBtn.textContent = "HIDE ALL"
    }
})


deleteAllBtn.addEventListener("dblclick", async function() {
    await chrome.storage.sync.set({ "myResources": JSON.stringify([]) })
    render([])
})

ulEl.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
        await deleteResource(event.target.dataset.id)
        const resources = await loadResources()
        render(resources)
    }
})


function renderTagFilters(resources) {
    const uniqueTags = new Set()
    resources.forEach(resource => {
        resource.tags.forEach(tag => uniqueTags.add(tag))
    })

    const tagChips = Array.from(uniqueTags).map(tag => {
        return `<button class="tag-chip" data-tag="${tag}">${tag}</button>`
    }).join("")

    chipsEl.innerHTML = tagChips

    let activeTag = null

    chipsEl.addEventListener("click", async (event) => {
        if (event.target.classList.contains("tag-chip")) {
            const clickedTag = event.target.dataset.tag
            if (activeTag === clickedTag) {
                activeTag = null
            } else {
                activeTag = clickedTag
            }

            const resources = await loadResources()
            const filteredResources = activeTag ? resources.filter(resource => resource.tags.includes(activeTag)) : resources
            render(filteredResources)
            isShowing = true
            showResourcesBtn.textContent = "HIDE ALL"
            document.querySelectorAll(".tag-chip").forEach(chip => {
                chip.classList.toggle("active", chip.dataset.tag === activeTag)
            })
        }
    })
}

