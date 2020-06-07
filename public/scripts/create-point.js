function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value
    
    citySelect.innerHTML = "<option>Selecione a cidade</option>"
    citySelect.disabled = true
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url).then(res => res.json()).then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })

}
document.querySelector("select[name=uf]").addEventListener("change", getCities)

//itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")


var selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target //item from itemList
    //add or remove an class from element
    const itemId = itemLi.dataset.id
    itemLi.classList.toggle("selected")

    const alreadySelected = selectedItems.findIndex(item => {
        return item == itemId //is item equal to itemId?
    })

    if(alreadySelected>=0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }
    else{
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}