(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();class u{constructor(t){this.root=t,this.state={selectedRange:{start:null,end:null},currentMonth:new Date().getMonth(),currentYear:new Date().getFullYear(),darkTheme:localStorage.getItem("calendarDarkTheme")==="true"}}init(){this.render(),this.setupEvents(),this.applyTheme()}render(){this.root.innerHTML=`
      <div class="controls">
        ${this.renderMonthRow()}
       <button class="theme-toggle" aria-pressed="${this.state.darkTheme}">
        ${this.state.darkTheme?"На светлую":"На темную"}
      </button>
      </div>
      <div class="calendar" role="grid">
        ${this.renderDaysGrid()}     
      </div>
    `,this.root.classList.toggle("dark-theme",this.state.darkTheme)}renderMonthRow(){return`
      <div class="month">
        <button class="nav-button previous" aria-label="Предыдущий месяц">‹</button>
        <div class="month-title" aria-live="polite">${["Январь"]}</div>
        <button class="nav-button next" aria-label="Следующий месяц">›</button>
      </div>
    `}renderDaysGrid(){const t=new Date(this.state.currentYear,this.state.currentMonth+1,0).getDate(),{start:s,end:n}=this.state.selectedRange;let e="";for(let a=1;a<=t;a++){const i=s&&s.day===a&&!n,o=this.isDayInRange(a),d=this.isStartDay(a),l=this.isEndDay(a);e+=`
        <div class="day-container">
          <button class="day 
                  ${i?"is-selected":""}
                  ${o?"in-range":""}
                  ${d&&!i?"range-start":""}
                  ${l&&!i?"range-end":""}" 
                  data-date="${a}"
                  aria-label="${a}">
            ${a}
          </button>
        </div>
      `}const r=35-t;if(r>0)for(let a=1;a<=r;a++){const i=a+100,o=s&&s.day===i&&!n,d=this.isDayInRange(i),l=this.isStartDay(i),h=this.isEndDay(i);e+=`
          <div class="day-container">
            <button class="day next-month
                    ${o?"is-selected":""}
                    ${d?"in-range":""}
                    ${l&&!o?"range-start":""}
                    ${h&&!o?"range-end":""}" 
                    data-date="${i}"
                    aria-label="Следующий месяц, день ${a}">
              ${a}
            </button>
          </div>
        `}return e}isDayInRange(t){const{start:s,end:n}=this.state.selectedRange;return!s||!n?!1:t>=s.day&&t<=n.day||t>=n.day&&t<=s.day}isStartDay(t){const{start:s,end:n}=this.state.selectedRange;return!s||!n?!1:t===Math.min(s.day,n.day)}isEndDay(t){const{start:s,end:n}=this.state.selectedRange;return!s||!n?!1:t===Math.max(s.day,n.day)}applyTheme(){this.state.darkTheme?this.root.classList.add("dark-theme"):this.root.classList.remove("dark-theme"),localStorage.setItem("calendarDarkTheme",this.state.darkTheme);const t=document.body;this.root.classList.toggle("dark-theme",this.state.darkTheme),t.classList.toggle("dark-bg",this.state.darkTheme),localStorage.setItem("calendarDarkTheme",this.state.darkTheme)}setupEvents(){this.root.addEventListener("click",t=>{if(t.target.classList.contains("day")&&!t.target.disabled){const s=parseInt(t.target.dataset.date);this.handleDaySelect(s)}t.target.classList.contains("theme-toggle")&&(this.state.darkTheme=!this.state.darkTheme,this.applyTheme(),this.render())})}handleDaySelect(t){const{start:s,end:n}=this.state.selectedRange,e={day:t};!s||n?this.state.selectedRange={start:e,end:null,potentialEnd:null}:(this.state.selectedRange.end=e,this.state.selectedRange.potentialEnd=null),this.render()}}const g=document.getElementById("app"),m=new u(g);m.init();
