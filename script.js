document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar-container');
    const year = 2026;
    
    // Hari libur nasional 2026 (Perkiraan)
    const holidays2026 = {
        "1-1": "Tahun Baru 2026 Masehi",
        "2-18": "Isra Mikraj Nabi Muhammad SAW",
        "3-20": "Hari Raya Idul Fitri",
        "3-21": "Cuti Bersama Idul Fitri",
        "4-3": "Wafat Isa Al Masih",
        "5-1": "Hari Buruh Internasional",
        "5-14": "Kenaikan Isa Al Masih",
        "5-24": "Hari Raya Waisak",
        "5-27": "Hari Raya Idul Adha",
        "6-1": "Hari Lahir Pancasila",
        "6-16": "Tahun Baru Islam 1448 H",
        "8-17": "Hari Kemerdekaan RI",
        "8-25": "Maulid Nabi Muhammad SAW",
        "12-25": "Hari Raya Natal"
    };
    
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const generateCalendar = () => {
        calendarContainer.innerHTML = '';
        
        for (let month = 0; month < 12; month++) {
            const monthCard = document.createElement('div');
            monthCard.className = `month-card`;
            monthCard.setAttribute('data-month-index', month);
            
            // Animation for entry
            monthCard.style.animation = `fadeUpCards 0.6s ease-out forwards ${month * 0.08}s`;
            monthCard.style.opacity = '0'; // Hidden initially
            
            // Generate HTML for Month Header
            let cardHTML = `
                <div class="month-title">
                    ${monthNames[month]}
                    <div style="display: flex; align-items: center;">
                        <button class="card-close-btn" title="Tutup" data-action="close-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
                <div class="days-header">
                    <div class="sunday">Min</div>
                    <div>Sen</div>
                    <div>Sel</div>
                    <div>Rab</div>
                    <div>Kam</div>
                    <div>Jum</div>
                    <div>Sab</div>
                </div>
                <div class="days-grid">
            `;
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Check today logic (if user looks at it in 2026)
            const today = new Date();
            const isCurrentMonthContent = today.getFullYear() === year && today.getMonth() === month;
            
            // Fill empty days before 1st day of month
            for (let i = 0; i < firstDay; i++) {
                cardHTML += `<div class="day empty"></div>`;
            }
            
            // Rentang Tanggal Akademik dari Local Storage
            let savedRanges = JSON.parse(localStorage.getItem('eventRanges2026'));
            
            // Purge legacy UTS/UAS defaults if they are stuck in memory
            if (savedRanges && savedRanges.length > 0) {
                savedRanges = savedRanges.filter(r => r.name !== "Ujian Tengah Semester (UTS)" && r.name !== "Ujian Akhir Semester (UAS)");
                localStorage.setItem('eventRanges2026', JSON.stringify(savedRanges));
            }

            if (!savedRanges) {
                savedRanges = [];
                localStorage.setItem('eventRanges2026', JSON.stringify(savedRanges));
            }

            const parseLocal = (ymd) => {
                const [y, m, d] = ymd.split('-');
                return new Date(y, m - 1, d);
            };

            const eventRanges = savedRanges.map(r => ({
                start: parseLocal(r.start),
                end: parseLocal(r.end),
                name: r.name,
                color: r.color
            }));

            // Fill actual days
            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = new Date(year, month, day);
                const currentDayOfWeek = currentDate.getDay();
                const isSunday = currentDayOfWeek === 0;
                const isToday = isCurrentMonthContent && today.getDate() === day;
                
                const holidayKey = `${month + 1}-${day}`;
                const holidayName = holidays2026[holidayKey];
                
                const dateString = `${day} ${monthNames[month]} ${year}`;
                const savedAgenda = localStorage.getItem(dateString);
                
                let dayClasses = ['day'];
                if (isSunday || holidayName) dayClasses.push('sunday'); // Red color for sunday and holidays
                if (isToday) dayClasses.push('today');
                if (holidayName) dayClasses.push('holiday');
                if (savedAgenda) dayClasses.push('has-agenda');
                
                // Cek apakah tanggal masuk dalam rentang event
                let rangeName = '';
                for (let r of eventRanges) {
                    if (currentDate >= r.start && currentDate <= r.end) {
                        rangeName = r.name;
                        const isStart = currentDate.getTime() === r.start.getTime() || currentDayOfWeek === 0 || day === 1;
                        const isEnd = currentDate.getTime() === r.end.getTime() || currentDayOfWeek === 6 || day === daysInMonth;
                        
                        dayClasses.push(`range-event-${r.color}`);
                        if (isStart && isEnd) {
                            dayClasses.push('range-single');
                        } else if (isStart) {
                            dayClasses.push('range-start');
                        } else if (isEnd) {
                            dayClasses.push('range-end');
                        } else {
                            dayClasses.push('range-mid');
                        }
                        break;
                    }
                }

                let displayTitle = holidayName ? holidayName : '';
                if (rangeName) {
                    displayTitle += displayTitle ? ` | ${rangeName}` : `${rangeName}`;
                }
                if (savedAgenda) {
                    displayTitle += displayTitle ? ` | Agenda: ${savedAgenda}` : `Agenda: ${savedAgenda}`;
                }
                let titleAttr = displayTitle ? `title="${displayTitle}"` : '';
                
                const infoText = displayTitle ? displayTitle : 'Tidak ada keterangan libur/acara.';
                
                cardHTML += `<div class="${dayClasses.join(' ')}" ${titleAttr} data-date="${dateString}" data-info="${infoText}">${day}</div>`;
            }
            
            cardHTML += `</div>`; // Close days-grid
            monthCard.innerHTML = cardHTML;
            calendarContainer.appendChild(monthCard);
        }
    };
    
    generateCalendar();

    // Month Selector Event
    const monthSelector = document.getElementById('month-selector');

    monthSelector.addEventListener('change', (e) => {
        const selectedMonth = e.target.value;
        const allCards = document.querySelectorAll('.month-card');
        
        if (selectedMonth === 'all') {
            calendarContainer.classList.remove('single-view');
            allCards.forEach(card => card.style.display = 'flex');
        } else {
            calendarContainer.classList.add('single-view');
            allCards.forEach(card => {
                if (card.getAttribute('data-month-index') === selectedMonth) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });

    // Handle clicking a month card to focus it
    calendarContainer.addEventListener('click', (e) => {
        // If clicking the close button inside the card
        if (e.target.closest('.card-close-btn')) {
            monthSelector.value = 'all';
            monthSelector.dispatchEvent(new Event('change'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const card = e.target.closest('.month-card');
        // If clicking a card, but NOT clicking a specific day modal trigger
        if (card && !e.target.classList.contains('day')) {
            const monthIndex = card.getAttribute('data-month-index');
            if (monthSelector.value !== monthIndex) {
                monthSelector.value = monthIndex;
                monthSelector.dispatchEvent(new Event('change'));
                
                // Scroll smoothly to top
                setTimeout(() => {
                    const headerOffset = 100;
                    const elementPosition = calendarContainer.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }, 50);
            }
        }
    });

    // Modal Events
    const modal = document.getElementById('info-modal');
    const modalClose = document.getElementById('modal-close');
    const modalDate = document.getElementById('modal-date');
    const modalInfo = document.getElementById('modal-info');
    const agendaInput = document.getElementById('agenda-input');
    const saveAgendaBtn = document.getElementById('save-agenda-btn');
    let currentSelectedDate = '';

    calendarContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('day') && !e.target.classList.contains('empty')) {
            const dateText = e.target.getAttribute('data-date');
            const infoText = e.target.getAttribute('data-info');
            currentSelectedDate = dateText;
            
            modalDate.textContent = dateText;
            modalInfo.textContent = infoText;
            
            const savedAgenda = localStorage.getItem(currentSelectedDate);
            agendaInput.value = savedAgenda || '';
            
            modal.classList.add('active');
        }
    });

    saveAgendaBtn.addEventListener('click', () => {
        const text = agendaInput.value.trim();
        if (text) {
            localStorage.setItem(currentSelectedDate, text);
        } else {
            localStorage.removeItem(currentSelectedDate);
        }
        modal.classList.remove('active');
        
        // Re-generate calendar to apply the cyan dot UI instantly
        // Preserve current month selector state
        const currentMonthVal = document.getElementById('month-selector').value;
        generateCalendar();
        const monthSelectorRef = document.getElementById('month-selector');
        monthSelectorRef.value = currentMonthVal;
        monthSelectorRef.dispatchEvent(new Event('change'));
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Event Manager Logic
    const eventManagerModal = document.getElementById('event-manager-modal');
    const openEventManagerBtn = document.getElementById('open-event-manager-btn');
    const closeEventManagerBtn = document.getElementById('event-manager-close');
    const addEventBtn = document.getElementById('add-event-btn');
    const eventListContainer = document.getElementById('event-list-container');

    const renderEventList = () => {
        let savedEventRanges = JSON.parse(localStorage.getItem('eventRanges2026')) || [];
        eventListContainer.innerHTML = '';
        if (savedEventRanges.length === 0) {
            eventListContainer.innerHTML = '<div style="color: var(--text-secondary); font-size: 0.85rem;">Belum ada acara.</div>';
            return;
        }

        savedEventRanges.forEach((range, index) => {
            const item = document.createElement('div');
            item.className = 'event-item';
            const borderLeft = `4px solid ${range.color === 'violet' ? 'var(--violet-primary)' : 'var(--cyan-primary)'}`;
            item.style.borderLeft = borderLeft;
            
            item.innerHTML = `
                <div class="event-info">
                    <span class="event-title">${range.name}</span>
                    <span class="event-dates">${range.start} s.d. ${range.end}</span>
                </div>
                <button class="delete-event-btn" data-index="${index}" title="Hapus">&times;</button>
            `;
            eventListContainer.appendChild(item);
        });

        document.querySelectorAll('.delete-event-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                savedEventRanges.splice(idx, 1);
                localStorage.setItem('eventRanges2026', JSON.stringify(savedEventRanges));
                renderEventList();
                
                // Preserve current month selector state and regenerate
                const currentMonthVal = document.getElementById('month-selector').value;
                generateCalendar();
                const monthSelectorRef = document.getElementById('month-selector');
                monthSelectorRef.value = currentMonthVal;
                monthSelectorRef.dispatchEvent(new Event('change'));
            });
        });
    };

    openEventManagerBtn.addEventListener('click', () => {
        renderEventList();
        eventManagerModal.classList.add('active');
    });

    closeEventManagerBtn.addEventListener('click', () => {
        eventManagerModal.classList.remove('active');
    });

    eventManagerModal.addEventListener('click', (e) => {
        if (e.target === eventManagerModal) eventManagerModal.classList.remove('active');
    });

    addEventBtn.addEventListener('click', () => {
        const start = document.getElementById('event-start').value;
        const end = document.getElementById('event-end').value;
        const name = document.getElementById('event-name').value;
        const color = document.getElementById('event-color').value;

        if (!start || !end || !name) {
            alert('Harap isi semua kolom!');
            return;
        }

        if (start > end) {
            alert('Tanggal mulai tidak boleh lebih dari tanggal selesai!');
            return;
        }

        let savedEventRanges = JSON.parse(localStorage.getItem('eventRanges2026')) || [];
        savedEventRanges.push({ start, end, name, color });
        localStorage.setItem('eventRanges2026', JSON.stringify(savedEventRanges));
        
        document.getElementById('event-name').value = '';
        renderEventList();
        
        const currentMonthVal = document.getElementById('month-selector').value;
        generateCalendar();
        const monthSelectorRef = document.getElementById('month-selector');
        monthSelectorRef.value = currentMonthVal;
        monthSelectorRef.dispatchEvent(new Event('change'));
    });

    // Auto-focus current month on load
    const currentMonthIndex = new Date().getMonth();
    const initMonthSelectorRef = document.getElementById('month-selector');
    initMonthSelectorRef.value = currentMonthIndex.toString();
    initMonthSelectorRef.dispatchEvent(new Event('change'));
});
