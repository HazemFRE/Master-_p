// تهيئة الأحداث
function initializeEvents() {
    // زر إضافة عميل جديد
    const addCustomerBtn = document.getElementById('add-customer');
    if (addCustomerBtn) {
        addCustomerBtn.addEventListener('click', showAddCustomerModal);
    }

    // أزرار الإجراءات في جدول العملاء
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionButton);
    });

    // البحث في جدول العملاء
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // الفلاتر
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    const dateFrom = document.getElementById('date-from');
    const dateTo = document.getElementById('date-to');

    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    if (dateFilter) {
        dateFilter.addEventListener('change', handleDateFilter);
    }
    if (dateFrom && dateTo) {
        dateFrom.addEventListener('change', applyFilters);
        dateTo.addEventListener('change', applyFilters);
    }

    // تحديد الكل في جدول العملاء
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }

    // إجراءات جماعية
    const bulkActionSelect = document.getElementById('bulk-action');
    const applyBulkActionBtn = document.getElementById('apply-bulk-action');

    if (bulkActionSelect && applyBulkActionBtn) {
        applyBulkActionBtn.addEventListener('click', handleBulkAction);
    }

    // أزرار النوافذ المنبثقة
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', hideAllModals);
    });

    const cancelEditBtn = document.getElementById('cancel-edit');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', hideAllModals);
    }

    const saveCustomerBtn = document.getElementById('save-customer');
    if (saveCustomerBtn) {
        saveCustomerBtn.addEventListener('click', saveCustomer);
    }
}

// عرض نافذة إضافة عميل جديد
function showAddCustomerModal() {
    const modal = document.getElementById('edit-customer-modal');
    const modalTitle = document.getElementById('edit-modal-title');
    const form = document.getElementById('edit-customer-form');

    if (modal && modalTitle && form) {
        modalTitle.textContent = 'إضافة عميل جديد';
        form.reset();
        modal.style.display = 'block';
    }
}

// معالجة أزرار الإجراءات
function handleActionButton(e) {
    const button = e.currentTarget;
    const action = button.classList.contains('view') ? 'عرض' :
        button.classList.contains('edit') ? 'تعديل' :
            button.classList.contains('delete') ? 'حذف' : '';

    const row = button.closest('tr');
    const customerId = row.getAttribute('data-customer-id');

    switch (action) {
        case 'عرض':
            viewCustomer(customerId);
            break;
        case 'تعديل':
            editCustomer(customerId);
            break;
        case 'حذف':
            deleteCustomer(customerId);
            break;
    }
}

// عرض تفاصيل العميل
function viewCustomer(customerId) {
    const modal = document.getElementById('customer-modal');
    const modalTitle = document.getElementById('modal-title');

    if (modal && modalTitle) {
        modalTitle.textContent = `تفاصيل العميل: ${customerId}`;
        modal.style.display = 'block';

        // هنا يمكن إضافة كود لتحميل بيانات العميل من الخادم
        // وتعبئة النموذج بالبيانات
    }
}

// تعديل العميل
function editCustomer(customerId) {
    const modal = document.getElementById('edit-customer-modal');
    const modalTitle = document.getElementById('edit-modal-title');

    if (modal && modalTitle) {
        modalTitle.textContent = `تعديل بيانات العميل: ${customerId}`;
        modal.style.display = 'block';

        // هنا يمكن إضافة كود لتحميل بيانات العميل من الخادم
        // وتعبئة النموذج بالبيانات
    }
}

// حذف العميل
function deleteCustomer(customerId) {
    if (confirm(`هل أنت متأكد من حذف العميل "${customerId}"؟`)) {
        // هنا يمكن إضافة كود لحذف العميل من الخادم
        alert(`تم حذف العميل: ${customerId}`);

        // تحديث جدول العملاء
        // في التطبيق الحقيقي، سيتم تحديث البيانات من الخادم
        location.reload();
    }
}

// إخفاء جميع النوافذ المنبثقة
function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// حفظ بيانات العميل
function saveCustomer() {
    const form = document.getElementById('edit-customer-form');
    if (!form) return;

    // التحقق من صحة النموذج
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // جمع بيانات النموذج
    const formData = new FormData(form);
    const customerData = {};

    for (const [key, value] of formData.entries()) {
        customerData[key] = value;
    }

    // هنا يمكن إضافة كود لإرسال البيانات إلى الخادم
    console.log('Customer Data:', customerData);

    // عرض رسالة نجاح
    alert('تم حفظ بيانات العميل بنجاح!');

    // إغلاق النافذة المنبثقة
    hideAllModals();

    // تحديث جدول العملاء
    // في التطبيق الحقيقي، سيتم تحديث البيانات من الخادم
    location.reload();
}

// معالجة تحديد الكل
function handleSelectAll(e) {
    const checkboxes = document.querySelectorAll('.customer-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
    });
}

// معالجة البحث
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tableRows = document.querySelectorAll('.admin-table tbody tr');

    tableRows.forEach(row => {
        const customerName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const customerEmail = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const customerPhone = row.querySelector('td:nth-child(4)').textContent.toLowerCase();

        if (customerName.includes(searchTerm) ||
            customerEmail.includes(searchTerm) ||
            customerPhone.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// معالجة فلتر التاريخ
function handleDateFilter(e) {
    const dateRange = document.querySelector('.date-range');
    if (e.target.value === 'custom') {
        dateRange.style.display = 'flex';
    } else {
        dateRange.style.display = 'none';
        applyFilters();
    }
}

// تطبيق الفلاتر
function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;

    const tableRows = document.querySelectorAll('.admin-table tbody tr');

    tableRows.forEach(row => {
        const customerStatus = row.querySelector('.status').classList.contains('active') ? 'active' :
            row.querySelector('.status').classList.contains('inactive') ? 'inactive' :
                row.querySelector('.status').classList.contains('blocked') ? 'blocked' : '';

        const registerDate = row.querySelector('td:nth-child(5)').textContent;

        const statusMatch = !statusFilter || customerStatus === statusFilter;

        let dateMatch = true;
        if (dateFilter === 'custom' && dateFrom && dateTo) {
            // تحويل التاريخ إلى كائن Date للمقارنة
            const registerDateObj = parseDate(registerDate);
            const fromDateObj = new Date(dateFrom);
            const toDateObj = new Date(dateTo);

            dateMatch = registerDateObj >= fromDateObj && registerDateObj <= toDateObj;
        } else if (dateFilter) {
            // تطبيق الفلاتر المحددة مسبقًا (اليوم، أمس، هذا الأسبوع، هذا الشهر)
            const registerDateObj = parseDate(registerDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const thisWeekStart = new Date(today);
            thisWeekStart.setDate(today.getDate() - today.getDay());

            const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

            switch (dateFilter) {
                case 'today':
                    dateMatch = registerDateObj.toDateString() === today.toDateString();
                    break;
                case 'yesterday':
                    dateMatch = registerDateObj.toDateString() === yesterday.toDateString();
                    break;
                case 'this-week':
                    dateMatch = registerDateObj >= thisWeekStart && registerDateObj <= today;
                    break;
                case 'this-month':
                    dateMatch = registerDateObj >= thisMonthStart && registerDateObj <= today;
                    break;
            }
        }

        if (statusMatch && dateMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// تحويل نص التاريخ إلى كائن Date
function parseDate(dateStr) {
    // تنسيق التاريخ: DD/MM/YYYY
    const parts = dateStr.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

// معالجة الإجراءات الجماعية
function handleBulkAction() {
    const bulkAction = document.getElementById('bulk-action').value;
    const selectedCustomers = document.querySelectorAll('.customer-checkbox:checked');

    if (!bulkAction) {
        alert('الرجاء اختيار إجراء');
        return;
    }

    if (selectedCustomers.length === 0) {
        alert('الرجاء اختيار عميل واحد على الأقل');
        return;
    }

    switch (bulkAction) {
        case 'activate':
            if (confirm(`هل أنت متأكد من تفعيل ${selectedCustomers.length} عميل؟`)) {
                // هنا يمكن إضافة كود لتفعيل العملاء المحددين
                alert(`تم تفعيل ${selectedCustomers.length} عميل`);
                location.reload();
            }
            break;
        case 'deactivate':
            if (confirm(`هل أنت متأكد من تعطيل ${selectedCustomers.length} عميل؟`)) {
                // هنا يمكن إضافة كود لتعطيل العملاء المحددين
                alert(`تم تعطيل ${selectedCustomers.length} عميل`);
                location.reload();
            }
            break;
        case 'block':
            if (confirm(`هل أنت متأكد من حظر ${selectedCustomers.length} عميل؟`)) {
                // هنا يمكن إضافة كود لحظر العملاء المحددين
                alert(`تم حظر ${selectedCustomers.length} عميل`);
                location.reload();
            }
            break;
        case 'delete':
            if (confirm(`هل أنت متأكد من حذف ${selectedCustomers.length} عميل؟`)) {
                // هنا يمكن إضافة كود لحذف العملاء المحددين
                alert(`تم حذف ${selectedCustomers.length} عميل`);
                location.reload();
            }
            break;
    }
} 