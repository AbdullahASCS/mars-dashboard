let store = {
    user: { name: "Student" },
    roverPhotos : {},
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let {rovers} = state
    const Greetify = Adjectify("Greetings")
    return `
        <header></header>
        <main>
            ${Greetify(store.user.name)}
            ${roverTabs(rovers)}
            ${generateContent(store,generateRoverInformation,generateRoverPhotos)}
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS
 const generateRoverInformation = (roverPhotos) =>{
    return `<p style="width: 500 px;padding: 20px;background: powderblue;"> you picked the ${roverPhotos.photos[0].rover.name} rover, it launched on ${roverPhotos.photos[0].rover.launch_date} and it landed on ${roverPhotos.photos[0].rover.landing_date} ,
                the rover's status is currently ${roverPhotos.photos[0].rover.status}
                </p>`
 }
 const generateRoverPhotos = (roverPhotos) =>{
        return  `
        <div class = "photos">
        ${roverPhotos.photos.map((rover) => (
             `<img src = ${rover.img_src} , width="200" height="200" >`
        )).join(' ')}
        
        </div>
        `

 }
 // 1st Higher Order Function
 const generateContent =  (state, infoGen,photoGen) => {
        let {roverPhotos} = state;
        if(Object.keys(roverPhotos).length === 0){
            return `
            <p> Please choose a rover </p>
            `
        }
        else{

        return `
            ${infoGen(roverPhotos)}        
            ${photoGen(roverPhotos)}    
        `}
 }
 const roverTabs = (rovers) =>{
    return `
    <div>
    ${rovers.map((rover) => (
         `<button class="button" id =${rover} onclick="roverClick(id)">${rover}  </button>`
    )).join(' ')}
    </div>
    `
 }
// 2nd High Order Function
const Adjectify = (adj) =>{
    return function (str){
        return `<h1> ${adj} ${str} </h1>`
    }
}

// ------------------------------------------------------  API CALLS
function roverClick(selectedRover){
    let roverPhotos;
    fetch(`http://localhost:3000/rovers/${selectedRover}`)
        .then(res => res.json())
        .then((response) => {
            roverPhotos = response
            updateStore(store,{roverPhotos})
        }
        )
    }
