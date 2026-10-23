// CleverNext storefront. Configure only verified business details before accepting orders.
const WHATSAPP_NUMBER = "2347036820201";
const HERO_VIDEOS=[
{src:"Hero-Section-Videos/Spin_scrubber_cleaning_bathroom.mp4",title:"Electric Spin Scrubber",tags:["POWERFUL CLEAN","LESS SCRUBBING","EVERYDAY ESSENTIAL"]},
{src:"Hero-Section-Videos/Person_operating_mini_food_chopper.mp4",title:"Electric Mini Food Chopper",tags:["QUICK PREP","COMPACT DESIGN","KITCHEN ESSENTIAL"]},
{src:"Hero-Section-Videos/Person_cleaning_ceiling_fan_blade.mp4",title:"Extendable Microfiber Duster",tags:["REACH HIGHER","DUST WITH EASE","CLEAN EVERY CORNER"]},
{src:"Hero-Section-Videos/Handheld_vacuum_cleaning_car_seat.mp4",title:"Compact Cordless Vacuum",tags:["QUICK CLEAN-UPS","CORDLESS CONVENIENCE","FRESHEN YOUR SPACE"]},
{src:"Hero-Section-Videos/Hand_scrubbing_plate_with_brush.mp4",title:"Soap-Dispensing Dish Brush",tags:["SOAP WHEN YOU NEED IT","EASY DISH CARE","KITCHEN ESSENTIAL"]},
{src:"Hero-Section-Videos/Hand_removing_pet_hair_sofa.mp4",title:"Reusable Pet-Hair Remover",tags:["LIFT PET HAIR","REUSABLE DESIGN","SOFA-FRIENDLY CLEAN"]}];
const PRODUCTS=[
{id:"spin-scrubber",name:"9in1 Electric Spin Scrubber Rechargeable Cordless Power Cleaning Brush",category:"cleaning",categoryLabel:"Cleaning",descriptor:"Rechargeable cordless cleaning brush with 9-in-1 positioning.",image:"Electric_Spin-S/Images/Image1.jpg",video:"Hero-Section-Videos/Spin_scrubber_cleaning_bathroom.mp4",badge:"Clean smarter",price:31200},
{id:"mini-chopper",name:"Rechargeable Mini Food Processor Chopper",category:"kitchen",categoryLabel:"Kitchen",descriptor:"A compact rechargeable food chopper for everyday kitchen prep.",image:"Electric_Mini%20FC/Images/Image1.png",video:"Hero-Section-Videos/Person_operating_mini_food_chopper.mp4",badge:"Kitchen essential",price:28900},
{id:"microfiber-duster",name:"Extendable Microfiber Duster",category:"cleaning",categoryLabel:"Cleaning",descriptor:"A practical reach for hard-to-dust places.",image:"Extendable%20Microfiber%20Duster/Images/Image1.jpg",video:"Hero-Section-Videos/Person_cleaning_ceiling_fan_blade.mp4",badge:"Reach further",price:10500},
{id:"cordless-vacuum",name:"Compact Cordless Car & Chair Vacuum",category:"cleaning",categoryLabel:"Cleaning",descriptor:"A handy clean-up tool for seats and interiors.",image:"Compact%20Cordless%20CCV/Images/Image1.png",video:"Hero-Section-Videos/Handheld_vacuum_cleaning_car_seat.mp4",badge:"On-the-go clean",price:16700},
{id:"dish-brush",name:"Soap-Dispensing Dish Brush",category:"kitchen",categoryLabel:"Kitchen",descriptor:"A useful extra for your dishwashing routine.",image:"Soap_Dispensing-DW/images/Image1.png",video:"Hero-Section-Videos/Hand_scrubbing_plate_with_brush.mp4",badge:"Kitchen essential",price:50000},
{id:"pet-hair-roller",name:"Reusable Pet-Hair Remover Roller",category:"home",categoryLabel:"Home & pets",descriptor:"Help lift pet hair from everyday soft furnishings.",image:"Reusable%20Pet-Hair%20RR/Images/Image1.png",video:"Hero-Section-Videos/Hand_removing_pet_hair_sofa.mp4",badge:"Home helper",price:50000}];
const grid=document.querySelector("#product-grid"),searchInput=document.querySelector("#product-search"),toast=document.querySelector("#toast");
let activeFilter="all",sortMode="featured",query="",toastTimer,heroIndex=0,sequencePaused=false;
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);}
function renderProducts(){let list=PRODUCTS.filter(p=>(activeFilter==="all"||p.category===activeFilter)&&(!query||(p.name+" "+p.categoryLabel+" "+p.descriptor).toLowerCase().includes(query.toLowerCase())));if(sortMode==="az")list.sort((a,b)=>a.name.localeCompare(b.name));if(sortMode==="za")list.sort((a,b)=>b.name.localeCompare(a.name));grid.innerHTML=list.length?list.map((p,i)=>`<article class="product-card"><div class="product-image-wrap"><a class="product-image-link" href="product.html?id=${p.id}" aria-label="View details for ${esc(p.name)}"><img class="product-image" src="${p.image}" alt="${esc(p.name)}" loading="${i===0?"eager":"lazy"}" decoding="async" fetchpriority="${i===0?"high":"auto"}" onerror="this.style.display='none'"></a><video class="product-hover-video" muted playsinline loop preload="${i<2?"metadata":"none"}" aria-hidden="true" tabindex="-1"><source src="${p.video}" type="video/mp4"></video><span class="product-badge">${esc(p.badge)}</span><span class="product-stock-badge">In Stock</span><button class="product-add" type="button" data-enquire="${p.id}" aria-label="Enquire about ${esc(p.name)}">+</button></div><div class="product-info"><div class="product-meta"><span>${esc(p.categoryLabel)}</span><span>CN / 0${i+1}</span></div><h3><a class="product-title-link" href="product.html?id=${p.id}">${esc(p.name)}</a></h3><div class="product-bottom"><span class="price-note"><strong>₦${p.price.toLocaleString("en-NG")}</strong></span></div></div></article>`).join(""):`<div class="empty-state"><strong>No matches just yet.</strong>Try another search or choose a different category.</div>`;document.querySelectorAll(".filter-chip").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));}

function setupProductVideoHover(){document.querySelectorAll(".product-card").forEach(card=>{const v=card.querySelector(".product-hover-video");if(!v)return;const start=()=>{if(reducedMotion.matches)return;card.classList.add("is-video-playing");if(v.preload==="none"){v.preload="metadata";v.load();}v.play().catch(()=>{});};const stop=()=>{v.pause();try{v.currentTime=0;}catch{}card.classList.remove("is-video-playing");};card.addEventListener("mouseenter",start,{passive:true});card.addEventListener("mouseleave",stop,{passive:true});card.addEventListener("focusin",start);card.addEventListener("focusout",e=>{if(!card.contains(e.relatedTarget))stop();});});}
function enquiry(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;const message=`Hi CleverNext, I'd like to ask about the ${p.name}. Please confirm the current price, availability and delivery options for my location.`;if(WHATSAPP_NUMBER){window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");}else{notify("Official contact details are not configured yet. Please confirm the business WhatsApp number to enable enquiries.");document.querySelector("#contact").scrollIntoView({behavior:reducedMotion.matches?"auto":"smooth"});}}
document.addEventListener("click",e=>{const t=e.target.closest("[data-enquire]");if(t){e.preventDefault();enquiry(t.dataset.enquire);}});
document.querySelectorAll(".filter-chip").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;renderProducts();}));
document.querySelector("#sort-products").addEventListener("change",e=>{sortMode=e.target.value;renderProducts();});
document.querySelector("#search-toggle").addEventListener("click",()=>{const p=document.querySelector("#search-panel");p.hidden=!p.hidden;if(!p.hidden)searchInput.focus();});
document.querySelector("#search-close").addEventListener("click",()=>{document.querySelector("#search-panel").hidden=true;searchInput.value="";query="";renderProducts();});
searchInput.addEventListener("input",()=>{query=searchInput.value.trim();activeFilter="all";renderProducts();});
document.querySelector("#menu-toggle").addEventListener("click",e=>{const n=document.querySelector(".desktop-nav"),open=n.classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",String(open));e.currentTarget.setAttribute("aria-label",open?"Close menu":"Open menu");});
document.querySelectorAll(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>{document.querySelector(".desktop-nav").classList.remove("open");document.querySelector("#menu-toggle").setAttribute("aria-expanded","false");}));
document.querySelector("#year").textContent=new Date().getFullYear();
const video=document.querySelector("#hero-video");
let heroPreloadedIndex=-1;
function preloadNextHeroVideo(){const next=(heroIndex+1)%HERO_VIDEOS.length;if(next===heroPreloadedIndex||reducedMotion.matches)return;heroPreloadedIndex=next;const warmVideo=document.createElement("video");warmVideo.preload="metadata";warmVideo.muted=true;warmVideo.playsInline=true;warmVideo.src=HERO_VIDEOS[next].src;warmVideo.load();}
function loadHero(i){const item=HERO_VIDEOS[i];video.classList.remove("is-ready");document.querySelector("#hero-product-title").textContent=item.title;const tags=document.querySelector("#hero-tags");tags.innerHTML=item.tags.map(tag=>`<span>${esc(tag)}</span>`).join("");const overlay=document.querySelector(".hero-product-overlay");overlay.classList.remove("is-switching");void overlay.offsetWidth;overlay.classList.add("is-switching");document.querySelector("#media-counter").textContent=String(i+1).padStart(2,"0")+" / 06";if(reducedMotion.matches){video.pause();video.removeAttribute("src");return;}video.preload="auto";video.src=item.src;video.load();video.play().catch(()=>{sequencePaused=true;document.querySelector("#media-toggle").textContent="▶";document.querySelector("#media-toggle").setAttribute("aria-label","Play video sequence");});}
video.addEventListener("loadeddata",()=>{video.classList.add("is-ready");preloadNextHeroVideo();});
video.addEventListener("canplay",()=>{video.classList.add("is-ready");if(!sequencePaused&&video.paused)video.play().catch(()=>{});});
video.addEventListener("ended",()=>{if(!sequencePaused){heroIndex=(heroIndex+1)%HERO_VIDEOS.length;loadHero(heroIndex);}});
video.addEventListener("error",()=>video.classList.remove("is-ready"));
document.querySelector("#media-prev").addEventListener("click",()=>{heroIndex=(heroIndex-1+HERO_VIDEOS.length)%HERO_VIDEOS.length;sequencePaused=false;document.querySelector("#media-toggle").textContent="Ⅱ";document.querySelector("#media-toggle").setAttribute("aria-label","Pause video sequence");loadHero(heroIndex);});
document.querySelector("#media-next").addEventListener("click",()=>{heroIndex=(heroIndex+1)%HERO_VIDEOS.length;sequencePaused=false;document.querySelector("#media-toggle").textContent="Ⅱ";document.querySelector("#media-toggle").setAttribute("aria-label","Pause video sequence");loadHero(heroIndex);});
document.querySelector("#media-toggle").addEventListener("click",()=>{sequencePaused=!sequencePaused;const b=document.querySelector("#media-toggle");if(sequencePaused){video.pause();b.textContent="▶";b.setAttribute("aria-label","Play video sequence");}else{b.textContent="Ⅱ";b.setAttribute("aria-label","Pause video sequence");if(video.ended){heroIndex=(heroIndex+1)%HERO_VIDEOS.length;loadHero(heroIndex);}else if(!video.src)loadHero(heroIndex);else video.play().catch(()=>{});}});
reducedMotion.addEventListener?.("change",()=>{if(reducedMotion.matches){video.pause();video.removeAttribute("src");video.classList.remove("is-ready");}else if(!sequencePaused)loadHero(heroIndex);});
renderProducts();setupProductVideoHover();if(!reducedMotion.matches)loadHero(heroIndex);
if(!reducedMotion.matches&&"IntersectionObserver" in window){const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});const observeReveal=()=>document.querySelectorAll(".section-heading,.manifesto-main,.how-heading,.faq-intro,.faq-list,.contact-intro,.contact-form,.value-point,.steps-grid article,.product-card,.info-hero,.info-content h2,.info-content .info-callout").forEach(el=>{if(!el.classList.contains("reveal-item")){el.classList.add("reveal-item");revealObserver.observe(el);}});observeReveal();new MutationObserver(observeReveal).observe(grid,{childList:true});}
const contactForm=document.querySelector("#contact-form-fields");
if(contactForm){
 contactForm.addEventListener("submit",event=>{
  event.preventDefault();
  const error=document.querySelector("#contact-error");
  error.textContent="";
  if(!contactForm.reportValidity())return;
  const data=new FormData(contactForm);
  const name=String(data.get("name")||"").trim();
  const email=String(data.get("email")||"").trim();
  const phone=String(data.get("phone")||"").trim();
  const message=String(data.get("message")||"").trim();
  if(!name||!email||!phone||!message){error.textContent="Please complete every required field.";return;}
  const body="Hello CleverNext, I’d like to get in touch.\n\nName: "+name+"\nEmail: "+email+"\nPhone: "+phone+"\n\nMessage:\n"+message;
  const url="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(body);
  const opened=window.open(url,"_blank");
  if(opened){opened.opener=null;}else{error.textContent="Your browser blocked the new tab. Please allow pop-ups and try again.";}
 });
}
