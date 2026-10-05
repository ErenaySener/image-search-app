import{a as E,S as B,i}from"./vendor-DcHCnVjq.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const O="42859545-3b6e433e6d39afb26ff6e0778",R="https://pixabay.com/api/";async function p(t,s=1,n=40){return(await E.get(R,{params:{key:O,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:n}})).data}const m=document.querySelector(".gallery"),h=document.querySelector(".loader"),$=new B(".gallery a",{captionsData:"alt",captionDelay:250});function g(t){const s=t.map(({webformatURL:n,largeImageURL:r,tags:e,likes:o,views:a,comments:q,downloads:M})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${n}" alt="${e}" />
          <div class="info">
            <p class="info-item">
              <span class="info-title">Likes</span>
              <span class="info-value">${o}</span>
            </p>
            <p class="info-item">
              <span class="info-title">Views</span>
              <span class="info-value">${a}</span>
            </p>
            <p class="info-item">
              <span class="info-title">Comments</span>
              <span class="info-value">${q}</span>
            </p>
            <p class="info-item">
              <span class="info-title">Downloads</span>
              <span class="info-value">${M}</span>
            </p>
          </div>
        </a>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",s),$.refresh()}function x(){m.innerHTML=""}function y(){h.classList.remove("is-hidden")}function L(){h.classList.add("is-hidden")}const v=document.querySelector(".search-form"),C=document.querySelector(".search-input"),f=document.querySelector(".load-more"),w=document.querySelector(".end-message");let c="",l=1,d=0;const S=40;u();P();v.addEventListener("submit",H);f.addEventListener("click",A);async function H(t){if(t.preventDefault(),c=C.value.trim(),!c){i.warning({message:"Please enter a search term!",position:"topRight",timeout:3e3});return}l=1,d=0,x(),u(),P(),y();try{const s=await p(c,l,S);if(s.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight",timeout:4e3,maxWidth:"432px",backgroundColor:"#ef4040",messageColor:"#ffffff"});return}g(s.hits),d+=s.hits.length,b(s.totalHits)}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight",timeout:4e3})}finally{L(),v.reset()}}async function A(){l+=1,u(),y();try{const t=await p(c,l,S);g(t.hits),d+=t.hits.length,D(),b(t.totalHits)}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight",timeout:4e3})}finally{L()}}function b(t){if(d>=t){u(),_(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3});return}I()}function D(){const t=document.querySelector(".gallery-item");if(!t)return;const s=t.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}function I(){f.classList.remove("is-hidden")}function u(){f.classList.add("is-hidden")}function _(){w.classList.remove("is-hidden")}function P(){w.classList.add("is-hidden")}
//# sourceMappingURL=index-BSprzzY1.js.map
