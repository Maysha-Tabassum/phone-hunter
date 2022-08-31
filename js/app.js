const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url)
  const data = await res.json()
  displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.innerText = '';
  //display 10 phones only

  const showAll = document.getElementById('show-all');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none')
  }
  else {
    showAll.classList.add('d-none')
  }
  //display no phones found
  const noPhone = document.getElementById('no-phone-found');
  if (phones.length === 0) {
    noPhone.classList.remove('d-none')
  }
  else {
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
                      <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                    </div>
                  </div>
        
        `;
    phonesContainer.appendChild(phoneDiv);
  });

  //loading end
  toggleSpinner(false);
}

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
}

//handle search button 
document.getElementById('btn-search').addEventListener('click', function () {
  //loading start
  processSearch(10);
})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
  
  if(e.key === 'Enter'){
    processSearch(10);
  }
});

//toggle spinner function

const toggleSpinner = isLoading => {
  const loadingSection = document.getElementById('loader');
  if (isLoading) {
    loadingSection.classList.remove('d-none')
  }
  else {
    loadingSection.classList.add('d-none')
  }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch()
})

const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
   console.log(phone);
   const modalTitle = document.getElementById('phoneDetailModalLabel')
   modalTitle.innerText = phone.name;
   const phoneDetails = document.getElementById('phone-details');
   phoneDetails.innerHTML = `
   <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'NO Release Date Found'}</p>
   <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Information Found'} </p>
   <p>ChipSet : ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No Chipset Information Found'} </p>
   <p>displaySize : ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No displaySize Information Found'} </p>
   <p>Others : ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information Found'}</p>

   `
}
// loadPhones('apple');