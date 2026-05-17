const biosData = {
    main: {
        type: 'main',
        title: 'CMOS Setup Utility - Copyright (C) 1985-2008, American Megatrends, Inc.',
        columns: [
            [
                { text: 'Standard CMOS Features', target: 'sys_info', desc: 'Standard CMOS Features Setup including Time, Date, Hard Disk...' },
                { text: 'Advanced BIOS Features', target: 'boot_priority', desc: 'Advanced BIOS Features Settings including Boot Sequence...' },
                { text: 'Advanced Chipset Features', target: 'chipset_features', desc: 'Advanced Chipset Features and settings...' },
                { text: 'Integrated Peripherals', target: 'integrated_peripherals', desc: 'Configure integrated peripherals and ports...' },
                { text: 'Power Management Setup', target: 'power_management', desc: 'Power Management Setup Options...' }
            ],
            [
                { text: 'PC Health Status', target: 'pc_health', desc: 'Monitor PC Health Status, Temperature, Fan Speed and Voltage...' },
                { text: 'Load Optimal Defaults', target: 'load_defaults', desc: 'Load Optimal Default configurations...' },
                { text: 'Save & Exit Setup', target: 'save_exit', desc: 'Save all changes to CMOS and Exit...' },
                { text: 'Exit Without Saving', target: 'exit_no_save', desc: 'Exit Utility without saving any changes...' }
            ]
        ]
    },
    sys_info: {
        type: 'sub',
        title: 'Standard CMOS Features',
        items: [
            { text: 'Date (mm:dd:yy)', value: '[Sun 01/01/2026]', editable: true, id: 'system-date' },
            { text: 'Time (hh:mm:ss)', value: '[00:00:00]', editable: true, id: 'system-time' },
            { text: '  IDE Channel 0 Master', value: '[None]', editable: false },
            { text: '  IDE Channel 0 Slave', value: '[None]', editable: false },
            { text: '  IDE Channel 1 Master', value: '[None]', editable: false },
            { text: '  IDE Channel 1 Slave', value: '[None]', editable: false },
            { text: '  SATA Channel 1', value: '[None]', editable: false },
            { text: '  SATA Channel 2', value: '[None]', editable: false },
            { text: '  SATA Channel 3', value: '[None]', editable: false },
            { text: '  SATA Channel 4', value: '[WDC WD5000AAKS-00YGA0]', editable: false },
            { text: 'Drive A', value: '[1.44M, 3.5 in.]', editable: true },
            { text: 'Halt On', value: '[All Errors]', editable: true }
        ]
    },
    boot_priority: {
        type: 'sub',
        title: 'Advanced BIOS Features',
        help: 'Specifies the boot sequence from the available devices.',
        items: [
            { id: 'boot1', text: '1st Boot Device', value: '[CDROM]', editable: true },
            { id: 'boot2', text: '2nd Boot Device', value: '[Hard Disk]', editable: true },
            { id: 'boot3', text: '3rd Boot Device', value: '[Disabled]', editable: true },
            { text: 'Boot Up NumLock Status', value: '[On]', editable: true },
            { text: 'Security Option', value: '[Setup]', editable: true }
        ]
    },
    chipset_features: {
        type: 'sub',
        title: 'Advanced Chipset Features',
        items: [
            { text: 'System BIOS Cacheable', value: '[Enabled]', editable: true },
            { text: 'Video BIOS Cacheable', value: '[Disabled]', editable: true }
        ]
    },
    integrated_peripherals: {
        type: 'sub',
        title: 'Integrated Peripherals',
        items: [
            { text: 'On-Chip Primary PCI IDE', value: '[Enabled]', editable: true },
            { text: 'Onboard LAN Controller', value: '[Enabled]', editable: true },
            { text: 'Onboard Audio Controller', value: '[Enabled]', editable: true },
            { text: 'USB Controller', value: '[Enabled]', editable: true },
            { text: 'USB Keyboard Support', value: '[Enabled]', editable: true }
        ]
    },
    power_management: {
        type: 'sub',
        title: 'Power Management Setup',
        items: [
            { text: 'ACPI Suspend Type', value: '[S3(STR)]', editable: true },
            { text: 'Soft-Off by PWR-BTTN', value: '[Instant-Off]', editable: true },
            { text: 'Restore on AC Power Loss', value: '[Power Off]', editable: true }
        ]
    },
    pc_health: {
        type: 'sub',
        title: 'PC Health Status',
        items: [
            { text: 'Shutdown Temperature', value: '[Disabled]', editable: true },
            { text: 'CPU Temperature', value: '40 °C / 104 °F', editable: false },
            { text: 'System Temperature', value: '33 °C / 91 °F', editable: false },
            { text: 'CPU Fan Speed', value: '2295 RPM', editable: false },
            { text: 'Vcore', value: '1.248 V', editable: false },
            { text: '3.3V Voltage', value: '3.328 V', editable: false },
            { text: '5V Voltage', value: '5.043 V', editable: false },
            { text: '12V Voltage', value: '12.032 V', editable: false }
        ]
    },
    load_defaults: { type: 'sub', title: 'Load Optimal Defaults', items: [{ text: 'Load Optimal Defaults (Y/N)?', value: '[Y]', editable: true }] },
    save_exit: { type: 'sub', title: 'Save & Exit Setup', items: [{ text: 'SAVE to CMOS and EXIT (Y/N)?', value: '[Y]', editable: true }] },
    exit_no_save: { type: 'sub', title: 'Exit Without Saving', items: [{ text: 'Quit without saving (Y/N)?', value: '[Y]', editable: true }] }
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
            rowDiv.className = `sub-menu-row ${activeRow === rowIdx ? 'active' : ''}`;
            rowDiv.style.display = 'flex';
            rowDiv.style.padding = '2px 8px';
           
            if (activeRow === rowIdx) {
                rowDiv.style.backgroundColor = '#aa0000';
                rowDiv.style.color = '#fff';
            }

            const textSpan = document.createElement('span');
            textSpan.textContent = item.text;
            textSpan.style.width = '320px';

            const valSpan = document.createElement('span');
            valSpan.textContent = item.value || '';
           
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

renderScreen();
