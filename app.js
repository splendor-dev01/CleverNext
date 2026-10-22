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
{id:"spin-scrubber",name:"Electric Spin Scrubber",category:"cleaning",categoryLabel:"Cleaning",descriptor:"A powered helper for your cleaning routine.",image:"Electric_Spin-S/Images/Image1.jpg",video:"Hero-Section-Videos/Spin_scrubber_cleaning_bathroom.mp4",badge:"Clean smarter"},
{id:"mini-chopper",name:"Electric Mini Food Chopper",category:"kitchen",categoryLabel:"Kitchen",descriptor:"A compact companion for everyday prep.",image:"Electric_Mini%20FC/Images/Image1.png",video:"Hero-Section-Videos/Person_operating_mini_food_chopper.mp4",badge:"Kitchen essential"},
{id:"microfiber-duster",name:"Extendable Microfiber Duster",category:"cleaning",categoryLabel:"Cleaning",descriptor:"A practical reach for hard-to-dust places.",image:"Extendable%20Microfiber%20Duster/Images/Image1.jpg",video:"Hero-Section-Videos/Person_cleaning_ceiling_fan_blade.mp4",badge:"Reach further"},
{id:"cordless-vacuum",name:"Compact Cordless Car & Chair Vacuum",category:"cleaning",categoryLabel:"Cleaning",descriptor:"A handy clean-up tool for seats and interiors.",image:"Compact%20Cordless%20CCV/Images/Image1.png",video:"Hero-Section-Videos/Handheld_vacuum_cleaning_car_seat.mp4",badge:"On-the-go clean"},
{id:"dish-brush",name:"Soap-Dispensing Dish Brush",category:"kitchen",categoryLabel:"Kitchen",descriptor:"A useful extra for your dishwashing routine.",image:"Soap_Dispensing-DW/images/Image1.png",video:"Hero-Section-Videos/Hand_scrubbing_plate_with_brush.mp4",badge:"Kitchen essential"},
{id:"pet-hair-roller",name:"Reusable Pet-Hair Remover Roller",category:"home",categoryLabel:"Home & pets",descriptor:"Help lift pet hair from everyday soft furnishings.",image:"Reusable%20Pet-Hair%20RR/Images/Image1.png",video:"Hero-Section-Videos/Hand_removing_pet_hair_sofa.mp4",badge:"Home helper"}];
const grid=document.querySelector("#product-grid"),searchInput=document.querySelector("#product-search"),toast=document.querySelector("#toast");
let activeFilter="all",sortMode="featured",query="",toastTimer,heroIndex=0,sequencePaused=false;
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);}
function renderProducts(){let list=PRODUCTS.filter(p=>(activeFilter==="all"||p.category===activeFilter)&&(!query||(p.name+" "+p.categoryLabel+" "+p.descriptor).toLowerCase().includes(query.toLowerCase())));if(sortMode==="az")list.sort((a,b)=>a.name.localeCompare(b.name));if(sortMode==="za")list.sort((a,b)=>b.name.localeCompare(a.name));grid.innerHTML=list.length?list.map((p,i)=>`<article class="product-card"><div class="product-image-wrap"><a class="product-image-link" href="product.html?id=${p.id}" aria-label="View details for ${esc(p.name)}"><img class="product-image" src="${p.image}" alt="${esc(p.name)}" loading="${i<3?"eager":"lazy"}" decoding="async" onerror="this.style.display='none'"></a><video class="product-hover-video" muted playsinline loop preload="none" aria-hidden="true" tabindex="-1"><source src="${p.video}" type="video/mp4"></video><span class="product-badge">${esc(p.badge)}</span><button class="product-add" type="button" data-enquire="${p.id}" aria-label="Enquire about ${esc(p.name)}">+</button></div><div class="product-info"><div class="product-meta"><span>${esc(p.categoryLabel)}</span><span>CN / 0${i+1}</span></div><h3><a class="product-title-link" href="product.html?id=${p.id}">${esc(p.name)}</a></h3><p class="product-description">${esc(p.descriptor)}</p><div class="product-bottom"><span class="price-note">Price on request</span><a class="enquire-link" href="#contact" data-enquire="${p.id}">Ask about this ↗</a></div></div></article>`).join(""):`<div class="empty-state"><strong>No matches just yet.</strong>Try another search or choose a different category.</div>`;document.querySelectorAll(".filter-chip").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));}

const reviewExamples=[
["Amara O.","Lagos","A practical little find that makes a daily chore feel less tedious.","https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"],
["Tunde A.","Abuja","I like the focus on useful things, not just products that look good in a picture.","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"],
["Zainab M.","Ibadan","Simple everyday essentials are exactly what I look for when shopping for my home.","https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&h=120&q=80"],
["Daniel E.","Port Harcourt","The collection feels focused. It is easy to browse and understand what each item is for.","https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80"],
["Chioma N.","Enugu","I appreciate practical descriptions and being able to ask questions before deciding.","https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80"],
["Ibrahim S.","Kano","Useful home and kitchen tools in one place. That is the kind of shopping experience I prefer.","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"],
["Nneka P.","Warri","A clean, straightforward way to discover little things that can make a routine easier.","https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80"],
["Michael K.","Benin City","I want everyday products to be useful and easy to understand. This collection gets that idea.","https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=120&h=120&q=80"]
];
function renderReviews(){const target=document.querySelector("#reviews-grid");if(!target)return;target.innerHTML=reviewExamples.map(r=>'<article class="review-card"><div class="review-stars" aria-hidden="true">★★★★★</div><p class="review-quote">“'+esc(r[2])+'”</p><div class="review-person"><img src="'+r[3]+'" alt="" loading="lazy" referrerpolicy="no-referrer"><div><strong>'+esc(r[0])+'</strong><small>'+esc(r[1])+' · Sample profile</small></div></div></article>').join("");}
function setupProductVideoHover(){document.querySelectorAll(".product-card").forEach(card=>{const v=card.querySelector(".product-hover-video");if(!v)return;const start=()=>{if(reducedMotion.matches)return;card.classList.add("is-video-playing");v.play().catch(()=>{});};const stop=()=>{v.pause();try{v.currentTime=0;}catch{}card.classList.remove("is-video-playing");};card.addEventListener("mouseenter",start);card.addEventListener("mouseleave",stop);card.addEventListener("focusin",start);card.addEventListener("focusout",e=>{if(!card.contains(e.relatedTarget))stop();});});}
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
function loadHero(i){const item=HERO_VIDEOS[i];video.classList.remove("is-ready");document.querySelector("#hero-product-title").textContent=item.title;const tags=document.querySelector("#hero-tags");tags.innerHTML=item.tags.map(tag=>`<span>${esc(tag)}</span>`).join("");const overlay=document.querySelector(".hero-product-overlay");overlay.classList.remove("is-switching");void overlay.offsetWidth;overlay.classList.add("is-switching");document.querySelector("#media-counter").textContent=String(i+1).padStart(2,"0")+" / 06";if(reducedMotion.matches){video.pause();video.removeAttribute("src");return;}video.src=item.src;video.load();video.play().catch(()=>{sequencePaused=true;document.querySelector("#media-toggle").textContent="▶";document.querySelector("#media-toggle").setAttribute("aria-label","Play video sequence");});}
video.addEventListener("loadeddata",()=>video.classList.add("is-ready"));
video.addEventListener("ended",()=>{if(!sequencePaused){heroIndex=(heroIndex+1)%HERO_VIDEOS.length;loadHero(heroIndex);}});
video.addEventListener("error",()=>video.classList.remove("is-ready"));
document.querySelector("#media-toggle").addEventListener("click",()=>{sequencePaused=!sequencePaused;const b=document.querySelector("#media-toggle");if(sequencePaused){video.pause();b.textContent="▶";b.setAttribute("aria-label","Play video sequence");}else{b.textContent="Ⅱ";b.setAttribute("aria-label","Pause video sequence");if(video.ended){heroIndex=(heroIndex+1)%HERO_VIDEOS.length;loadHero(heroIndex);}else if(!video.src)loadHero(heroIndex);else video.play().catch(()=>{});}});
reducedMotion.addEventListener?.("change",()=>{if(reducedMotion.matches){video.pause();video.removeAttribute("src");video.classList.remove("is-ready");}else if(!sequencePaused)loadHero(heroIndex);});
renderProducts();setupProductVideoHover();renderReviews();if(!reducedMotion.matches)loadHero(heroIndex);
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
