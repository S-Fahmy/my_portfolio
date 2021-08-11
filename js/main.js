let activeTabId = '#langs' //default

async function displayTab(e, tabName){

  //remove active class from the tabs menu old element
  document.querySelector('.tech-tabs .active').classList.remove('active');

  //hide old content
  document.querySelector(activeTabId).classList.add('hidden');

  //add active class to the tabs menu element and display new content
  e.target.classList.add('active');

  document.querySelector(tabName).classList.remove('hidden');

  activeTabId = tabName



}


async function copyEmail(){
  
  await navigator.clipboard.writeText('saleh.fahmy2@gmail.com');

  const copyBtn = document.querySelector('.copy-btn');
  
  copyBtn.textContent = 'Copied!'

  setTimeout(() =>  copyBtn.textContent = 'Copy' , 2000);


}