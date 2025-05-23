import '../styles/css/style.css'
import '../styles/css/themes.css'
import '../styles/css/_variables.css'

import { Calendar } from './calendar.js';


const calendarContainer = document.getElementById('app'); 
const calendar = new Calendar(calendarContainer);
calendar.init(); 


