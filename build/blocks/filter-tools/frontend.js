document.addEventListener("DOMContentLoaded",(()=>{let e=new URLSearchParams(document.location.search);const t=document.querySelector(".filter-button");e.has("s")&&("0"!==e.get("area")||"0"!==e.get("category")||"0"!==e.get("author")||"0"!==e.get("intensity")||"0"!==e.get("level")||"0"!==e.get("duration")?(t.innerHTML=" Clear Filters ",t.classList.remove("open-select"),t.classList.add("reset-select")):(t.innerHTML=" Filters ",t.classList.remove("reset-select"),t.classList.add("open-select")))}));