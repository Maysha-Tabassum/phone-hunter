const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText = '';
    //display 10 phones only
    phones = phones.slice(0, 10);
    
    //display no phones found
    const noPhone = document.getElementById('no-phone-found');
    if(phones.length === 0){
      noPhone.classList.remove('d-none')
    }
    else{
      noPhone.classList.add('d-none')
    }


    //display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top p-4" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
        
        `;
        phonesContainer.appendChild(phoneDiv);
      })
      //loading end
      toggleSpinner(false);
}

//handle search button 
document.getElementById('btn-search').addEventListener('click', function(){
  //loading start
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value ;
  loadPhones(searchText);
})


//toggle spinner function

const toggleSpinner = isLoading => {
  const loadingSection = document.getElementById('loader');
  if(isLoading){
    loadingSection.classList.remove('d-none')
  }
  else{
    loadingSection.classList.add('d-none')
  }
}
// loadPhones();