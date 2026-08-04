let myResources = {
    id: "",
    title: "",
    url: "",
    tags: [],
    read: false,
    savedAt: Date.now()
}
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const resourcesFromLocalStorage = JSON.parse( localStorage.getItem("myResources") )
const showResourcesBtn = document.getElementById("show-resources-btn")
const saveBtn = document.getElementById("save-btn")
const deleteAllBtn = document.getElementById("delete-all-btn")


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
            tags: [],
            read: false,
            savedAt: Date.now()
        }
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
    const resources = await loadResources()
    resources ? render(resources) : console.log("No resources found")
})












if (resourcesFromLocalStorage) {
    myResources = resourcesFromLocalStorage
    render(myResources)
}





deleteAllBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myResources = []
    render(myResources)
})

ulEl.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
        await deleteResource(event.target.dataset.id)
        const resources = await loadResources()
        render(resources)
    }
})





