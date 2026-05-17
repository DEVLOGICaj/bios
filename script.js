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
                { text: 'Set Supervisor Password', target: null, desc: 'Set or change Supervisor Password...' },
                { text: 'Set User Password', target: null, desc: 'Set or change User Password...' },
                { text: 'Load Optimal Defaults', target: null, desc: 'Load Optimal Default configurations...' },
                { text: 'Save & Exit Setup', target: null, desc: 'Save all changes to CMOS and Exit...' },
                { text: 'Exit Without Saving', target: null, desc: 'Exit Utility without saving any changes...' }
            ]
        ]
    },
    sys_info: {
        type: 'sub',
        title: 'CMOS Setup Utility - Copyright (C) 1985-2008, American Megatrends, Inc.\nSystem Information',
        columns: [
            { text: 'System Time', value: '[00:00:00]', isClock: true },
            { text: 'System Date', value: '[Sun 01/01/2026]', isDate: true },
            { text: 'Primary IDE Master', value: '[ATAPI CDROM]' },
            { text: 'Primary IDE Slave', value: '[Not Detected]' },
            { text: 'SATA Channel 1 Master', value: '[Not Detected]' },
            { text: 'SATA Channel 2 Master', value: '[Not Detected]' },
            { text: 'SATA Channel 3 Master', value: '[Not Detected]' },
            { text: 'SATA Channel 4 Master', value: '[Hard Disk]' },
            { text: 'Floppy A', value: '[1.44 MB 3½"]' },
            { text: 'Halt On', value: '[No Errors]' },
            { text: 'Model Name', value: ': G41MXE', isLabel: true },
            { text: 'BIOS Version', value: ': L08', isLabel: true },
            { text: 'System Memory', value: ': 2048MB', isLabel: true },
            { text: 'CPUID', value: ': 1067A', isLabel: true }
        ]
    },
    boot_priority: {
        type: 'sub',
        title: 'Advanced BIOS Features',
        columns: [
            { text: '1st Boot Device', value: '[CD/DVD:PM-HL-DT-ST]' },
            { text: '2nd Boot Device', value: '[SATA:4S-WDC WD5000]' },
            { text: '3rd Boot Device', value: '[1st FLOPPY DRIVE]' },
            { text: 'Try Other Boot Devices', value: '[Yes]' }
        ]
    },
    fox_control: {
        type: 'sub',
        title: 'Fox Central Control Unit',
        columns: [
            { text: 'Fox Intelligent Stepping', value: '[Disabled]' },
            { text: 'CPU Clock Ratio', value: '[9x]' },
            { text: 'Target CPU Frequency', value: '2.70 GHz', isLabel: true }
        ]
    },
    chipset_features: {
        type: 'sub',
        title: 'Advanced Chipset Features',
        columns: [
            { text: 'North Bridge Configuration', value: '[Press Enter]' },
            { text: 'South Bridge Configuration', value: '[Press Enter]' }
        ]
    },
    integrated_peripherals: {
        type: 'sub',
        title: 'Integrated Peripherals',
        columns: [
            { text: 'Onboard LAN Controller', value: '[Enabled]' },
            { text: 'Onboard Audio Controller', value: '[Enabled]' }
        ]
    },
    power_management: {
        type: 'sub',
        title: 'Power Management Setup',
        columns: [
            { text: 'ACPI Suspend Type', value: '[S3(STR)]' },
            { text: 'Restore on AC Power Loss', value: '[Power Off]' }
        ]
    },
    pc_health: {
        type: 'sub',
        title: 'PC Health Status',
        columns: [
            { text: 'CPU Temperature', value: '42 °C / 107 °F', isLabel: true },
            { text: 'CPU Fan Speed', value: '2150 RPM', isLabel: true },
            { text: 'Vcore', value: '1.248 V', isLabel: true }
        ]
    }
};

let currentMenu = 'main';
let activeCol = 0;
let activeRow = 0;
function renderScreen() {
    const mainContent = document.getElementById('bios-main-content');
    const subheader = document.getElementById('bios-subheader-text');
    const descText = document.getElementById('desc-text');
   
    if (!mainContent) return;
    mainContent.innerHTML = '';

    const menu = biosData[currentMenu];
   
    // تحديث العناوين العلوية
    if (subheader) {
        if (currentMenu === 'sys_info') {
            subheader.innerHTML = `CMOS Setup Utility - Copyright (C) 1985-2008, American Megatrends, Inc.<br><span style="display:block; text-align:center;">System Information</span>`;
        } else {
            subheader.textContent = menu.title;
        }
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
                itemDiv.style.cursor = 'pointer';
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
       
        menu.columns.forEach((item, rowIdx) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'sub-menu-row';
            rowDiv.style.display = 'flex';
            rowDiv.style.padding = '2px 8px';
           
            if (item.isLabel) {
                rowDiv.style.color = '#aaa';
                if (item.text === 'Model Name') rowDiv.style.marginTop = '20px';
            } else if (activeRow === rowIdx) {
                rowDiv.style.backgroundColor = '#aa0000'; // اللون الأحمر النشط للبيوس
                rowDiv.style.color = '#fff';
            }

            const textSpan = document.createElement('span');
            textSpan.textContent = item.text;
            textSpan.style.width = '280px';

            const valSpan = document.createElement('span');
            valSpan.textContent = item.value || '';
            if (item.isClock) valSpan.id = 'live-bios-clock';
            if (item.isDate) valSpan.id = 'live-bios-date';

            rowDiv.appendChild(textSpan);
            rowDiv.appendChild(valSpan);
            mainContent.appendChild(rowDiv);
        });
        if (descText) descText.textContent = 'Use [ENTER], [TAB] or [SHIFT-TAB] to select a field. Use [+] or [-] to configure system Time/Date.';
    }
}

// كود التحكم بالأزرار والتنقل الكامل
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
        const selectableCount = menu.columns.filter(i => !i.isLabel).length;
        if (e.key === 'ArrowUp') activeRow = (activeRow - 1 + selectableCount) % selectableCount;
        if (e.key === 'ArrowDown') activeRow = (activeRow + 1) % selectableCount;
        if (e.key === 'Escape') {
            currentMenu = 'main';
            activeRow = 0;
            activeCol = 0;
        }
    }
    renderScreen();
});

// تشغيل العداد الحي بدون أي تعليق
setInterval(() => {
    const clockEl = document.getElementById('live-bios-clock');
    const dateEl = document.getElementById('live-bios-date');
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

// التشغيل المباشر فور تحميل الصفحة
renderScreen();
