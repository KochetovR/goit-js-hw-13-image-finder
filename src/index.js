import './sass/main.scss';

const { alert, notice, info, success, error } = require('@pnotify/core');

import ApiService from './apiService';
import makeCard from './template/card.hbs';

var debounce = require('lodash.debounce');

const listContent = document.querySelector('[data="list-content"]')
const formSearch = document.querySelector('[name="query"]')
const observBox = document.querySelector('#beacon')
const popap = document.querySelector('.js-lightbox')
const originImgInModal = document.querySelector('.lightbox__image');
const backdropDiv = document.querySelector('.lightbox__overlay')
const closeBtn = document.querySelector('[data-action="close-lightbox"]')
// document.querySelector('[data="load-more"]').addEventListener('click', getMoreImg)

const newApi = new ApiService ();

formSearch.addEventListener('input', debounce(onSearch, 500))

function onSearch(e) {
    newApi.searchQ = e.target.value.trim();
    clearListContainer();
    if(newApi.searchQ === '') {
        error({
            text: "Not found, enter the correct request",
        });
    } 
        if(newApi.searchQ !== ''){   
        newApi.page = 1;
        newApi.fetchImg().then(res => {
        listContent.insertAdjacentHTML('beforeend',makeCard(res));
        })
    }
    
}

function getMoreImg () {
    newApi.fetchImg().then(res => {
        listContent.insertAdjacentHTML('beforeend',makeCard(res))
    })
}

function clearListContainer() {
    listContent.innerHTML = '';
}

const onEntry = entries => {
    entries.forEach(e => {
        if(e.isIntersecting && newApi.searchQ !== '') {
            getMoreImg();
        }   
    })
}

const observer = new IntersectionObserver(onEntry, {
    rootMargin:'150px'
});

observer.observe(observBox)

// open popap

listContent.addEventListener('click', onOpenModal)

function onOpenModal(e) {
    window.addEventListener('keydown', onEscKeyPress)
    if(e.target.nodeName !== 'IMG') { 
        return
    }
    popap.classList.add('is-open');

    originImgInModal.src=`${e.target.dataset.source}`;
    originImgInModal.alt=`${e.target.alt}`;
}



closeBtn.addEventListener('click', onCloseBtnClick);
function onCloseBtnClick() {
    closeModal()
}

function closeModal() {
    popap.classList.remove('is-open')
    originImgInModal.src=''
    originImgInModal.alt=''
    window.removeEventListener('keydown', onEscKeyPress)
}

backdropDiv.addEventListener('click', onBackdropClick)
function onBackdropClick(ev) {
    if(ev.currentTarget === ev.target) {
        closeModal()
    }
}

function onEscKeyPress (event) {
    if(event.code === 'Escape') {
        closeModal() 
    }
}

