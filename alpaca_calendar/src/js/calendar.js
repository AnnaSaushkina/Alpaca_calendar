export class Calendar {
  constructor(rootEl) {
    this.root = rootEl;
    this.state = {
      selectedRange: { start: null, end: null },
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      darkTheme: localStorage.getItem('calendarDarkTheme') === 'true' 
    };
  }

  init() {
    this.render();
    this.setupEvents();
    this.applyTheme(); 
  }

  render() {
    this.root.innerHTML = `
      <div class="controls">
        ${this.renderMonthRow()}
       <button class="theme-toggle" aria-pressed="${this.state.darkTheme}">
        ${this.state.darkTheme ? 'На светлую' : 'На темную'}
      </button>
      </div>
      <div class="calendar" role="grid">
        ${this.renderDaysGrid()}     
      </div>
    `;
    

    this.root.classList.toggle('dark-theme', this.state.darkTheme);
  }

  renderMonthRow() {
    const monthName = ["Январь"];
    return `
      <div class="month">
        <button class="nav-button previous" aria-label="Предыдущий месяц">‹</button>
        <div class="month-title" aria-live="polite">${monthName}</div>
        <button class="nav-button next" aria-label="Следующий месяц">›</button>
      </div>
    `;
  }

  renderDaysGrid() {
    const daysInMonth = new Date(this.state.currentYear, this.state.currentMonth + 1, 0).getDate();
    const { start, end } = this.state.selectedRange;
    
    let html = '';
      
   
    for (let day = 1; day <= daysInMonth; day++) {
      const isSingleSelected = start && start.day === day && !end;
      const isInRange = this.isDayInRange(day);
      const isStart = this.isStartDay(day);
      const isEnd = this.isEndDay(day);
      
      html += `
        <div class="day-container">
          <button class="day 
                  ${isSingleSelected ? 'is-selected' : ''}
                  ${isInRange ? 'in-range' : ''}
                  ${isStart && !isSingleSelected ? 'range-start' : ''}
                  ${isEnd && !isSingleSelected ? 'range-end' : ''}" 
                  data-date="${day}"
                  aria-label="${day}">
            ${day}
          </button>
        </div>
      `;
    }
  
  
    const remainingDays = 35 - daysInMonth;
    if (remainingDays > 0) {
      for (let day = 1; day <= remainingDays; day++) {
        const nextMonthDay = day + 100; 
        const isSingleSelected = start && start.day === nextMonthDay && !end;
        const isInRange = this.isDayInRange(nextMonthDay);
        const isStart = this.isStartDay(nextMonthDay);
        const isEnd = this.isEndDay(nextMonthDay);
        
        html += `
          <div class="day-container">
            <button class="day next-month
                    ${isSingleSelected ? 'is-selected' : ''}
                    ${isInRange ? 'in-range' : ''}
                    ${isStart && !isSingleSelected ? 'range-start' : ''}
                    ${isEnd && !isSingleSelected ? 'range-end' : ''}" 
                    data-date="${nextMonthDay}"
                    aria-label="Следующий месяц, день ${day}">
              ${day}
            </button>
          </div>
        `;
      }
    }
    
    return html;
  }

  isDayInRange(day) {
    const { start, end } = this.state.selectedRange;
    if (!start || !end) return false;
    
    return (day >= start.day && day <= end.day) || 
           (day >= end.day && day <= start.day);
  }

  isStartDay(day) {
    const { start, end } = this.state.selectedRange;
    if (!start) return false;
    if (!end) return false; 
    return day === Math.min(start.day, end.day);
  }
  
  isEndDay(day) {
    const { start, end } = this.state.selectedRange;
    if (!start || !end) return false;
    return day === Math.max(start.day, end.day);
  }

  applyTheme() {
    if (this.state.darkTheme) {
      this.root.classList.add('dark-theme');
    } else {
      this.root.classList.remove('dark-theme');
    }
    localStorage.setItem('calendarDarkTheme', this.state.darkTheme);


    const bg = document.body
    // Обновляем классы
    this.root.classList.toggle('dark-theme', this.state.darkTheme);
    bg.classList.toggle('dark-bg', this.state.darkTheme);
    
    // Сохраняем в localStorage
    localStorage.setItem('calendarDarkTheme', this.state.darkTheme);
  }


  setupEvents() {
    this.root.addEventListener('click', (e) => {
      if (e.target.classList.contains('day') && !e.target.disabled) {
        const day = parseInt(e.target.dataset.date);
        this.handleDaySelect(day);
      }
      

      if (e.target.classList.contains('theme-toggle')) {
        this.state.darkTheme = !this.state.darkTheme;
        this.applyTheme(); 
        this.render(); 
      }
    });

  }

  
  handleDaySelect(day) {
    const { start, end } = this.state.selectedRange;
    const selectedDate = { day };
    
    if (!start || end) {
  
      this.state.selectedRange = {
        start: selectedDate,
        end: null,
        potentialEnd: null 
      };
    } else {
      
      this.state.selectedRange.end = selectedDate;
      this.state.selectedRange.potentialEnd = null;
    }
    
    this.render();
  }


  // switchBgTheme() {
   
  // }
}

