// --- قاعدة البيانات الكاملة لجميع شاشات وقوائم البيوس ---
const biosData = {
    // 1. الشاشة الرئيسية (مقسومة عمودين)
    main: {
        type: 'main',
        title: 'CMOS Setup Utility - Copyright (C) 1985-2008, American Megatrends, Inc.',
        columns: [
            // العمود اليساري
            [
                { text: 'System Information', target: 'sys_info', desc: 'Configure Time and Date. Display System Information...' },
                { text: 'Advanced BIOS Features', target: 'boot_priority', desc: 'Advanced BIOS Features Settings...' },
                { text: 'Fox Central Control Unit', target: 'fox_control', desc: 'Fox Central Control Unit configurations...' },
                { text: 'Advanced Chipset Features', target: 'chipset_features', desc: 'Advanced Chipset Features and settings...' },
                { text: 'Integrated Peripherals', target: 'integrated_peripherals', desc: 'Configure integrated peripherals and ports...' },
                { text: 'Power Management Setup', target: 'power_management', desc: 'Power Management Setup Options...' }
            ],
            // العمود اليميني
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
    // شاشة معلومات النظام
    sys_info: {
        type: 'sub',
        title: 'System Information',
        help: 'Display System Information and configurations.',
        items: [
            { text: 'BIOS Version', value: '08.00.15', editable: false, desc: 'Core BIOS Version.' },
            { text: 'Build Date', value: '10/14/2008', editable: false, desc: 'BIOS Release Build Date.' },
            { text: 'System Memory', value: '2048 MB', editable: false, desc: 'Total installed system memory.' }
        ]
    },
    // شاشة البوت (ترتيب الإقلاع) - مع ميزة التبديل (Swap)
    boot_priority: {
        type: 'sub',
        title: 'Boot Device Priority',
        help: 'Specifies the boot sequence from the available devices.\n\nA device enclosed in parenthesis has been disabled in the corresponding type menu.',
        items: [
            { id: 'boot1', text: '1st Boot Device', value: 'CD/DVD:PM-HL-DT-ST', editable: true, options: ['CD/DVD:PM-HL-DT-STDVD-RAM GH22N', 'SATA:4S-WDC WD5000AVDS-63U7B1', '1st FLOPPY DRIVE', 'Disabled'], desc: 'Select the first boot device.' },
            { id: 'boot2', text: '2nd Boot Device', value: 'SATA:4S-WDC WD5000', editable: true, options: ['CD/DVD:PM-HL-DT-STDVD-RAM GH22N', 'SATA:4S-WDC WD5000AVDS-63U7B1', '1st FLOPPY DRIVE', 'Disabled'], desc: 'Select the second boot device.' },
            { id: 'boot3', text: '3rd Boot Device', value: '1st FLOPPY DRIVE', editable: true, options: ['CD/DVD:PM-HL-DT-STDVD-RAM GH22N', 'SATA:4S-WDC WD5000AVDS-63U7B1', '1st FLOPPY DRIVE', 'Disabled'], desc: 'Select the third boot device.' },
            { id: 'boot_try', text: 'Try Other Boot Devices', value: 'No', editable: true, options: ['Yes', 'No'], desc: 'Try booting from other devices if main fails.' }
        ]
    },
    // شاشة وحدة التحكم فوكس (المعالج)
    fox_control: {
        type: 'sub',
        title: 'Fox Central Control Unit',
        help: 'Smart BIOS and Frequency settings for performance tweaking.',
        items: [
            { text: 'Smart BIOS', value: 'Press Enter', editable: true, options: ['Press Enter'], desc: 'Enter Smart BIOS Submenu.' },
            { text: 'Spread Spectrum', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enable or Disable Spread Spectrum.' },
            { text: 'Auto Detect PCI CLK', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Automatically detect PCI Clock.' },
            { text: 'CPU Frequency Setting', value: '266', editable: true, options: ['200', '266', '333', '400'], desc: 'Set CPU Host Frequency.' },
            { text: 'PCI Express Clock', value: '100', editable: true, options: ['100', '105', '110'], desc: 'Set PCI Express Clock Frequency.' }
        ]
    }
}; 
// تكملة قاعدة البيانات (الصق هذا الجزء مباشرة أسفل الجزء أ)
Object.assign(biosData, {
    // شاشة الشيبسيت المتميزة بنص التحذير في الأعلى
    chipset_features: {
        type: 'sub',
        title: 'Advanced Chipset Features',
        subtitle: 'Advanced Chipset Settings',
        warning: 'WARNING: Setting wrong values in below sections may cause system to malfunction.',
        help: 'Configure North Bridge features.',
        items: [
            { text: 'North Bridge Configuration', value: 'Press Enter', editable: true, options: ['Press Enter'], desc: 'Configure North Bridge parameters.' },
            { text: 'South Bridge Configuration', value: 'Press Enter', editable: true, options: ['Press Enter'], desc: 'Configure South Bridge parameters.' }
        ]
    },
    // شاشة المكونات المدمجة
    integrated_peripherals: {
        type: 'sub',
        title: 'Integrated Peripherals',
        help: 'Configure onboard devices and controller settings.',
        items: [
            { text: 'IDE Configuration', value: 'Press Enter', editable: true, options: ['Press Enter'], desc: 'Configure IDE Devices.' },
            { text: 'OnBoard Configuration', value: 'Press Enter', editable: true, options: ['Press Enter'], desc: 'Configure Onboard Devices.' },
            { text: 'SuperIO Configuration', value: 'Press Enter', editable: true, options: ['Press Enter'], desc: 'Configure Super IO Chipset.' },
            { text: 'USB Configuration', target: 'usb_config', value: 'Press Enter', editable: true, desc: 'USB Devices Configuration Submenu.' }
        ]
    },
    // الشاشة الفرعية لـ USB Configuration (ميزة إخفاء USB 2.0)
    usb_config: {
        type: 'sub',
        title: 'USB Configuration',
        headerLines: ['Module Version - 2.24.3-13.4', 'USB Devices Enabled :', 'None'],
        help: 'Enables support for legacy USB. AUTO option disables legacy support if no USB devices are connected.',
        items: [
            { text: 'Legacy USB Support', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enables support for legacy USB devices.' },
            { id: 'usb11', text: 'USB 1.1 Controller', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enable or Disable USB 1.1 Controller.' },
            { id: 'usb20', text: 'USB 2.0 Controller', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enable or Disable USB 2.0 Controller.' },
            { text: 'USB Keyboard Legacy Support', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enables legacy support for USB Keyboards.' },
            { text: 'USB Mouse Legacy Support', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enables legacy support for USB Mice.' },
            { text: 'USB Storage Device Support', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enables support for USB Storage Devices.' }
        ]
    },
    // شاشة إدارة الطاقة
    power_management: {
        type: 'sub',
        title: 'Power Management Setup',
        help: 'Select the ACPI state used for System Suspend.',
        items: [
            { text: 'ACPI Suspend Type', value: 'S3 (STR)', editable: true, options: ['S1 (POS)', 'S3 (STR)'], desc: 'Select ACPI Suspend State.' },
            { text: 'Power On after Power Fail', value: 'Power Off', editable: true, options: ['Power Off', 'Power On', 'Last State'], desc: 'Configure power status after failure.' },
            { text: 'HPET', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'High Precision Event Timer configuration.' },
            { text: 'Resume by Ring', value: 'Disabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enable or Disable Wake on Ring.' },
            { text: 'Resume by LAN', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Enable or Disable Wake on LAN.' },
            { text: 'Resume by PCIE PME', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Wake system via PCIE PME devices.' },
            { text: 'Resume by PCI Card', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Wake system via PCI Cards.' },
            { text: 'Resume by USB Devices', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Wake system via USB connected devices.' },
            { text: 'Resume by PS2 Keyboard', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Wake system via PS2 Keyboard.' },
            { text: 'Resume by PS2 Mouse', value: 'Enabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Wake system via PS2 Mouse.' },
            { text: 'Resume by RTC', value: 'Disabled', editable: true, options: ['Enabled', 'Disabled'], desc: 'Wake system via Real Time Clock Alarm.' }
        ]
    },
    // شاشة الحساسات وصحة الجهاز (تخطي الأسهم للسنسورات)
    pc_health: {
        type: 'sub',
        title: 'PC Health Status',
        help: 'Monitor system temperatures, fan speeds, and core hardware voltages.',
        items: [
            { text: 'Warning Temperature', value: 'Disabled', editable: true, options: ['Disabled', '50 °C/122 °F', '55 °C/131 °F', '60 °C/140 °F', '65 °C/149 °F', '70 °C/158 °F', '75 °C/167 °F', '80 °C/176 °F', '85 °C/185 °F', '90 °C/194 °F'], desc: 'Set temperature alarm threshold.' },
            { text: 'Shutdown Temperature', value: 'Disabled', editable: true, options: ['Disabled', '70 °C/158 °F', '80 °C/176 °F', '90 °C/194 °F'], desc: 'Set critical shutdown temperature.' },
            { text: 'Case Open Warning', value: 'Disabled', editable: true, options: ['Disabled', 'Enabled', 'Clear'], desc: 'Enable case intrusion warning alert.' },
            { text: 'CPU Temperature', value: '44°C/111°F', isSensor: true },
            { text: 'System Temperature', value: '33°C/91°F', isSensor: true },
            { text: 'CPU Fan Speed', value: '2303 RPM', isSensor: true },
            { text: 'System Fan Speed', value: 'N/A', isSensor: true },
            { text: 'CPU Core', value: '1.248 V', isSensor: true },
            { text: 'DRAM Voltage', value: '1.648 V', isSensor: true },
            { text: '+3.30V', value: '3.392 V', isSensor: true },
            { text: '+5.00V', value: '5.134 V', isSensor: true },
            { text: '+12.00V', value: '12.032 V', isSensor: true },
            { text: 'UBAT', value: '2.880 V', isSensor: true },
            { text: 'CPU Smart Fan Control', value: 'Disabled', editable: true, options: ['Disabled', 'Enabled'], desc: 'Enable dynamic CPU fan speed control.' }
        ]
    }
});// --- متغيرات الحالة ووظائف التنقل والتفاعل ---
let currentScreenKey = 'main';
let historyStack = [];
let activeCol = 0;     
let activeRow = 0;     
let popupActive = false;
let activePopupIndex = 0;

const mainContent = document.getElementById('bios-main-content');
const subheaderText = document.getElementById('bios-subheader-text');
const descText = document.getElementById('desc-text');
const popup = document.getElementById('options-popup');
const popupList = document.getElementById('popup-options-list');

function renderScreen() {
    const screen = biosData[currentScreenKey];
    mainContent.innerHTML = '';

    if (screen.type === 'main') {
        subheaderText.style.display = 'none';
       
        const mainScreenDiv = document.createElement('div');
        mainScreenDiv.className = 'main-screen';

        screen.columns.forEach((colItems, colIdx) => {
            const colDiv = document.createElement('div');
            colDiv.className = `column ${colIdx === 0 ? 'column-left' : ''}`;
            colDiv.id = `col-${colIdx}`;

            colItems.forEach((item, rowIdx) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'menu-item';
                itemDiv.textContent = item.text;

                if (colIdx === activeCol && rowIdx === activeRow) {
                    itemDiv.classList.add('active');
                    descText.textContent = item.desc;
                }
                colDiv.appendChild(itemDiv);
            });
            mainScreenDiv.appendChild(colDiv);
        });
        mainContent.appendChild(mainScreenDiv);

    } else if (screen.type === 'sub') {
        subheaderText.style.display = 'block';
        subheaderText.textContent = screen.subtitle ? screen.subtitle : screen.title;

        const subScreenDiv = document.createElement('div');
        subScreenDiv.className = 'sub-screen';

        const leftDiv = document.createElement('div');
        leftDiv.className = 'sub-left';

        if (screen.warning) {
            const warnDiv = document.createElement('div');
            warnDiv.className = 'warning-text';
            warnDiv.textContent = screen.warning;
            leftDiv.appendChild(warnDiv);
        }

        if (screen.headerLines) {
            screen.headerLines.forEach(line => {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'static-info';
                lineDiv.textContent = line;
                leftDiv.appendChild(lineDiv);
            });
        }

        let itemsToRender = screen.items;
        if (currentScreenKey === 'usb_config') {
            const usb11Item = screen.items.find(i => i.id === 'usb11');
            if (usb11Item && usb11Item.value === 'Disabled') {
                itemsToRender = screen.items.filter(i => i.id !== 'usb20');
            }
        }

        itemsToRender.forEach((item, rowIdx) => {
            const itemDiv = document.createElement('div');
           
            if (item.isSensor) {
                itemDiv.className = 'sensor-item';
                itemDiv.innerHTML = `<span>${item.text}</span><span>:${item.value}</span>`;
            } else {
                itemDiv.className = 'menu-item';
                const formattedVal = `[${item.value}]`;
                itemDiv.innerHTML = `<span>${item.text}</span><span class="value-text">${formattedVal}</span>`;

                if (rowIdx === activeRow) {
                    itemDiv.classList.add('active');
                    descText.textContent = item.desc || 'No description available.';
                }
            }
            leftDiv.appendChild(itemDiv);
        });

        const rightDiv = document.createElement('div');
        rightDiv.className = 'sub-right';
        rightDiv.innerHTML = `<div class="help-title">Help Item</div><div class="help-body">${screen.help}</div>`;

        subScreenDiv.appendChild(leftDiv);
        subScreenDiv.appendChild(rightDiv);
        mainContent.appendChild(subScreenDiv);
    }
}

function renderPopup() {
    if (!popupActive) {
        popup.style.display = 'none';
        return;
    }
    const screen = biosData[currentScreenKey];
   
    let items = screen.items;
    if (currentScreenKey === 'usb_config') {
        const usb11Item = screen.items.find(i => i.id === 'usb11');
        if (usb11Item && usb11Item.value === 'Disabled') {
            items = screen.items.filter(i => i.id !== 'usb20');
        }
    }
   
    const activeItem = items[activeRow];
    popupList.innerHTML = '';

    if (activeItem && activeItem.options) {
        activeItem.options.forEach((opt, idx) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'popup-item';
            optDiv.textContent = opt;
            if (idx === activePopupIndex) {
                optDiv.classList.add('selected');
            }
            popupList.appendChild(optDiv);
        });
        popup.style.display = 'flex';
    } else {
        popupActive = false;
        popup.style.display = 'none';
    }
}

document.addEventListener('keydown', (e) => {
    const screen = biosData[currentScreenKey];
   
    let currentItems = screen.items || [];
    if (currentScreenKey === 'usb_config') {
        const usb11Item = screen.items.find(i => i.id === 'usb11');
        if (usb11Item && usb11Item.value === 'Disabled') {
            currentItems = screen.items.filter(i => i.id !== 'usb20');
        }
    }

    if (popupActive) {
        const activeItem = currentItems[activeRow];
        if (e.key === 'ArrowDown') {
            if (activePopupIndex < activeItem.options.length - 1) {
                activePopupIndex++;
                renderPopup();
            }
        } else if (e.key === 'ArrowUp') {
            if (activePopupIndex > 0) {
                activePopupIndex--;
                renderPopup();
            }
        } else if (e.key === 'Escape') {
            popupActive = false;
            renderPopup();
        } else if (e.key === 'Enter') {
            const selectedValue = activeItem.options[activePopupIndex];
           
            if (activeItem.id && activeItem.id.startsWith('boot') && selectedValue !== 'Disabled') {
                screen.items.forEach(item => {
                    if (item.id && item.id.startsWith('boot') && item.id !== activeItem.id) {
                        if (item.value === selectedValue) {
                            item.value = activeItem.value;
                        }
                    }
                });
            }

            activeItem.value = selectedValue;
            popupActive = false;
            renderPopup();
            renderScreen();
        }
        return;
    }

    if (screen.type === 'main') {
        if (e.key === 'ArrowDown') {
            if (activeRow < screen.columns[activeCol].length - 1) {
                activeRow++;
                renderScreen();
            }
        } else if (e.key === 'ArrowUp') {
            if (activeRow > 0) {
                activeRow--;
                renderScreen();
            }
        } else if (e.key === 'ArrowRight' && activeCol === 0) {
            activeCol = 1;
            if (activeRow >= screen.columns[activeCol].length) {
                activeRow = screen.columns[activeCol].length - 1;
            }
            renderScreen();
        } else if (e.key === 'ArrowLeft' && activeCol === 1) {
            activeCol = 0;
            if (activeRow >= screen.columns[activeCol].length) {
                activeRow = screen.columns[activeCol].length - 1;
            }
            renderScreen();
        } else if (e.key === 'Enter') {
            const selectedItem = screen.columns[activeCol][activeRow];
            if (selectedItem.target) {
                historyStack.push(currentScreenKey);
                currentScreenKey = selectedItem.target;
                activeRow = 0;
                adjustActiveRowForSensors(currentScreenKey, 1);
                renderScreen();
            } else if (selectedItem.text === 'Exit Without Saving' || selectedItem.text === 'Save & Exit Setup') {
                alert('Simulation Finished: ' + selectedItem.text);
            }
        }

    } else if (screen.type === 'sub') {
        if (e.key === 'ArrowDown') {
            if (activeRow < currentItems.length - 1) {
                activeRow++;
                adjustActiveRowForSensors(currentItems, 1);
                renderScreen();
            }
        } else if (e.key === 'ArrowUp') {
            if (activeRow > 0) {
                activeRow--;
                adjustActiveRowForSensors(currentItems, -1);
                renderScreen();
            }
        } else if (e.key === 'Escape') {
            if (historyStack.length > 0) {
                currentScreenKey = historyStack.pop();
                activeCol = 0;
                activeRow = 0;
                renderScreen();
            }
        } else if (e.key === 'Enter') {
            const activeItem = currentItems[activeRow];
            if (activeItem.editable) {
                if (activeItem.target) {
                    historyStack.push(currentScreenKey);
                    currentScreenKey = activeItem.target;
                    activeRow = 0;
                    renderScreen();
                } else if (activeItem.options) {
                    popupActive = true;
                    activePopupIndex = activeItem.options.indexOf(activeItem.value);
                    if (activePopupIndex === -1) activePopupIndex = 0;
                    renderPopup();
                }
            }
        }
    }
});

function adjustActiveRowForSensors(itemsList, direction) {
    let items = Array.isArray(itemsList) ? itemsList : biosData[itemsList].items;
    if (currentScreenKey === 'usb_config' && !Array.isArray(itemsList)) {
        const usb11Item = biosData.usb_config.items.find(i => i.id === 'usb11');
        if (usb11Item && usb11Item.value === 'Disabled') {
            items = biosData.usb_config.items.filter(i => i.id !== 'usb20');
        }
    }

    while (activeRow >= 0 && activeRow < items.length && items[activeRow].isSensor) {
        activeRow += direction;
    }
   
    if (activeRow < 0) {
        activeRow = 0;
        while (activeRow < items.length && items[activeRow].isSensor) activeRow++;
    } else if (activeRow >= items.length) {
        activeRow = items.length - 1;
        while (activeRow >= 0 && items[activeRow].isSensor) activeRow--;
    }
}
// دالة لتشغيل وتحديث الوقت والتاريخ بشكل حي ومباشر
function updateLiveTimeAndDate() {
    setInterval(() => {
        const now = new Date();
       
        // البحث عن عناصر الوقت والتاريخ داخل شاشة المعلومات
        const rows = document.querySelectorAll('.bios-main div');
        rows.forEach(row => {
            if (row.textContent.includes('System Time')) {
                const hrs = String(now.getHours()).padStart(2, '0');
                const mins = String(now.getMinutes()).padStart(2, '0');
                const secs = String(now.getSeconds()).padStart(2, '0');
               
                // تحديث قيمة الوقت داخل الـ span الثاني
                const spans = row.querySelectorAll('span');
                if (spans.length >= 2) spans[1].textContent = `[${hrs}:${mins}:${secs}]`;
            }
            if (row.textContent.includes('System Date')) {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const dayName = days[now.getDay()];
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const date = String(now.getDate()).padStart(2, '0');
                const year = now.getFullYear();
               
                // تحديث قيمة التاريخ داخل الـ span الثاني
                const spans = row.querySelectorAll('span');
                if (spans.length >= 2) spans[1].textContent = `[${dayName} ${month}/${date}/${year}]`;
            }
        });
    }, 1000);
}

// تشغيل دالة التحديث التلقائي للوقت فوراً
updateLiveTimeAndDate();

