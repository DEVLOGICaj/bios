const biosData = {
    main: {
        type: 'main',
        title: 'CMOS Setup Utility - Copyright (C) 1985-2008, American Megatrends, Inc.',
        columns: [
            [
                { text: 'System Information', target: 'sys_info', desc: 'Configure Time and Date. Display System Information...' },
                { text: 'Advanced BIOS Features', target: 'boot_priority', desc: 'Advanced BIOS Features Settings...' },
                { text: 'Fox Central Control Unit', target: 'fox_control', desc: 'Fox Central Control Unit configurations...' },
                { text: 'Advanced Chipset Features', target: 'chipset_features', desc: 'Advanced Chipset Features and settings...' },
                { text: 'Integrated Peripherals', target: 'integrated_peripherals', desc: 'Configure integrated peripherals and ports...' },
                { text: 'Power Management Setup', target: 'power_management', desc: 'Power Management Setup Options...' }
            ],
            [
                { text: 'PC Health Status', target: 'pc_health', desc: 'Monitor PC Health Status, Temperature and Fan Speed...' },
                { text: 'Set Supervisor Password', target: 'supervisor_pwd', desc: 'Set or change Supervisor Password...' },
                { text: 'Set User Password', target: 'user_pwd', desc: 'Set or change User Password...' },
                { text: 'Load Optimal Defaults', target: 'load_defaults', desc: 'Load Optimal Default configurations...' },
                { text: 'Save & Exit Setup', target: 'save_exit', desc: 'Save all changes to CMOS and Exit...' },
                { text: 'Exit Without Saving', target: 'exit_no_save', desc: 'Exit Utility without saving any changes...' }
            ]
        ]
    },
    sys_info: {
        type: 'sub',
        title: 'System Information',
        items: [
            { text: 'System Time', value: '[00:00:00]', editable: true, id: 'system-time' },
            { text: 'System Date', value: '[Sun 01/01/2026]', editable: true, id: 'system-date' },
            { text: 'Primary IDE Master', value: '[ATAPI CDROM]', editable: false },
            { text: 'Primary IDE Slave', value: '[Not Detected]', editable: false },
            { text: 'SATA Channel 1 Master', value: '[Not Detected]', editable: false },
            { text: 'SATA Channel 2 Master', value: '[Not Detected]', editable: false },
            { text: 'BIOS Version', value: '[08.00.15]', editable: false },
            { text: 'Build Date', value: '[10/14/2008]', editable: false },
            { text: 'System Memory', value: '[2048 MB]', editable: false }
        ]
    },
    boot_priority: {
        type: 'sub',
        title: 'Boot Device Priority',
        help: 'Specifies the boot sequence from the available devices.\\n\\nA device enclosed in parenthesis has been disabled in the corresponding type menu.',
        items: [
            { id: 'boot1', text: '1st Boot Device', value: '[CD/DVD:PM-HL-DT-ST]', editable: true, options: ['CD/DVD:PM-HL-DT-ST', 'SATA:4S-WDC WD5000', '1st FLOPPY DRIVE', 'Disabled'] },
            { id: 'boot2', text: '2nd Boot Device', value: '[SATA:4S-WDC WD5000]', editable: true, options: ['CD/DVD:PM-HL-DT-ST', 'SATA:4S-WDC WD5000', '1st FLOPPY DRIVE', 'Disabled'] },
            { id: 'boot3', text: '3rd Boot Device', value: '[1st FLOPPY DRIVE]', editable: true, options: ['CD/DVD:PM-HL-DT-ST', 'SATA:4S-WDC WD5000', '1st FLOPPY DRIVE', 'Disabled'] },
            { id: 'boot_try', text: 'Try Other Boot Devices', value: '[Yes]', editable: true, options: ['Yes', 'No'] }
        ]
    },
    fox_control: {
        type: 'sub',
        title: 'Fox Central Control Unit',
        items: [
            { text: 'Fox Intelligent Stepping', value: '[Disabled]', editable: true },
            { text: 'CPU Clock Ratio', value: '[9x]', editable: true }
        ]
    },
    chipset_features: {
        type: 'sub',
        title: 'Advanced Chipset Features',
        items: [
            { text: 'North Bridge Configuration', value: '[Press Enter]', editable: false },
            function renderScreen() {
    const mainContent = document.getElementById('bios-main-content');
    const subheader = document.getElementById('bios-subheader-text');
    const descText = document.getElementById('desc-text');
   
    if (!mainContent) return;
    mainContent.innerHTML = '';

    const menu = biosData[currentMenu];
   
    // تحديث الهيدر العلوي بالتسمية الصحيحة
    if (subheader && menu.title) {
        subheader.textContent = menu.title;
    }

    if (menu.type === 'main') {
        mainContent.className = 'bios-main main-layout';
        mainContent.style.display = 'flex';
        mainContent.style.justifyContent = 'space-between';
       
        menu.columns.forEach((col, colIdx) => {
            const colDiv = document.createElement('div');
            colDiv.className = 'menu-column';
            colDiv.style.width = '45%';
            col.forEach((item, rowIdx) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = `menu-item ${activeCol === colIdx && activeRow === rowIdx ? 'active' : ''}`;
                itemDiv.style.padding = '4px 8px';
                itemDiv.textContent = (colIdx === 0 ? '▶ ' : '  ') + item.text;
                colDiv.appendChild(itemDiv);
            });
            mainContent.appendChild(colDiv);
        });
       
        const activeItem = menu.columns[activeCol][activeRow];
        if (descText) descText.textContent = activeItem ? activeItem.desc : '';
       
    } else if (menu.type === 'sub') {
        mainContent.className = 'bios-main sub-layout';
        mainContent.style.display = 'block';
       
        menu.items.forEach((item, rowIdx) => {
            const rowDiv = document.createElement('div');
            // السطر بياخد كلاس active بس إذا كان مو label وأنت واقف عليه
            rowDiv.className = `sub-menu-row ${activeRow === rowIdx && item.editable !== false ? 'active' : ''}`;
            rowDiv.style.display = 'flex';
            rowDiv.style.padding = '2px 8px';
           
            if (activeRow === rowIdx && item.editable !== false) {
                rowDiv.style.backgroundColor = '#aa0000'; // خلفية حمراء كلاسيكية للبيوس عند التحديد
                rowDiv.style.color = '#fff';
            }

            const textSpan = document.createElement('span');
            textSpan.textContent = item.text;
            textSpan.style.width = '280px';

            const valSpan = document.createElement('span');
            valSpan.textContent = item.value || '';
           
            // ربط الـ IDs القديمة تبعك بالـ Spans عشان العداد لقطهم
            if (item.id) {
                valSpan.id = item.id;
            }

            rowDiv.appendChild(textSpan);
            rowDiv.appendChild(valSpan);
            mainContent.appendChild(rowDiv);
        });
       
        if (descText) {
            descText.textContent = menu.help || 'Use [ENTER], [TAB] or [SHIFT-TAB] to select a field. Use [+] or [-] to configure system Time/Date.';
        }
    }
}

// معالجة ضغطات الكيبورد والتنقل الكامل بالأسهم والدخول والخروج
document.addEventListener('keydown', (e) => {
    const menu = biosData[currentMenu];
    if (menu.type === 'main') {
        if (e.key === 'ArrowUp') activeRow = (activeRow - 1 + menu.columns[activeCol].length) % menu.columns[activeCol].length;
        if (e.key === 'ArrowDown') activeRow = (activeRow + 1) % menu.columns[activeCol].length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            activeCol = activeCol === 0 ? 1 : 0;
            activeRow = Math.min(activeRow, menu.columns[activeCol].length - 1);
        }
        if (e.key === 'Enter') {
            const target = menu.columns[activeCol][activeRow].target;
            if (target && biosData[target]) {
                currentMenu = target;
                activeRow = 0;
                activeCol = 0;
            }
        }
    } else if (menu.type === 'sub') {
        if (e.key === 'ArrowUp') activeRow = (activeRow - 1 + menu.items.length) % menu.items.length;
        if (e.key === 'ArrowDown') activeRow = (activeRow + 1) % menu.items.length;
        if (e.key === 'Escape') {
            currentMenu = 'main';
            activeRow = 0;
            activeCol = 0;
        }
    }
    renderScreen();
});

// تشغيل العداد الحي للوقت والتاريخ ثانية بثانية بدون تعليق الـ DOM
setInterval(() => {
    const clockEl = document.getElementById('system-time');
    const dateEl = document.getElementById('system-date');
    const now = new Date();

    if (clockEl) {
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `[${hrs}:${mins}:${secs}]`;
    }
    if (dateEl) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = days[now.getDay()];
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        dateEl.textContent = `[${dayName} ${month}/${date}/${year}]`;
    }
}, 1000);

// الإقلاع والرسم المباشر فور تشغيل السكريبت
renderScreen();
