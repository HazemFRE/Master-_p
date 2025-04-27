

// تهيئة الأحداث
function initializeEvents() {
    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // زر إضافة تقييم جديد
    document.getElementById('add-review').addEventListener('click', () => {
        showModal('edit-review-modal');
        document.getElementById('edit-modal-title').textContent = 'إضافة تقييم جديد';
        document.getElementById('edit-review-form').reset();
    });

    // أزرار الإجراءات
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionButton);
    });

    // البحث
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // الفلاتر
    const filters = document.querySelectorAll('.filter-group select');
    filters.forEach(filter => {
        filter.addEventListener('change', handleFilter);
    });

    // تحديد الكل
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }

    // الإجراءات الجماعية
    const bulkActionBtn = document.getElementById('apply-bulk-action');
    if (bulkActionBtn) {
        bulkActionBtn.addEventListener('click', handleBulkAction);
    }

    // أزرار إغلاق النوافذ المنبثقة
    const modalCloseButtons = document.querySelectorAll('.close-modal');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideAllModals();
        });
    });

    // حفظ التقييم
    document.getElementById('save-review').addEventListener('click', saveReview);

    // أزرار اعتماد/رفض التقييم
    const approveReviewBtn = document.getElementById('approve-review');
    const rejectReviewBtn = document.getElementById('reject-review');
    if (approveReviewBtn) {
        approveReviewBtn.addEventListener('click', () => handleReviewStatus('approved'));
    }
    if (rejectReviewBtn) {
        rejectReviewBtn.addEventListener('click', () => handleReviewStatus('rejected'));
    }
}


// معالجة أزرار الإجراءات
function handleActionButton(e) {
    const button = e.currentTarget;
    const action = button.classList.contains('view') ? 'view' :
        button.classList.contains('edit') ? 'edit' :
            button.classList.contains('delete') ? 'delete' : null;

    if (!action) return;

    const row = button.closest('tr');
    const reviewId = row.dataset.id;

    switch (action) {
        case 'view':
            showReviewDetails(reviewId);
            break;
        case 'edit':
            editReview(reviewId);
            break;
        case 'delete':
            deleteReview(reviewId);
            break;
    }
}

// عرض تفاصيل التقييم
function showReviewDetails(reviewId) {
    const modal = document.getElementById('review-modal');
    if (modal) {
        // هنا يمكنك إضافة كود لجلب بيانات التقييم من الخادم
        modal.style.display = 'block';
    }
}

// تعديل التقييم
function editReview(reviewId) {
    // هنا يمكنك إضافة كود لتعديل التقييم
    console.log('تعديل التقييم:', reviewId);
}

// حذف التقييم
function deleteReview(reviewId) {
    if (confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
        // هنا يمكنك إضافة كود لحذف التقييم من الخادم
        console.log('حذف التقييم:', reviewId);
    }
}

// معالجة البحث
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.admin-table tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// معالجة الفلاتر
function handleFilter() {
    const productFilter = document.getElementById('product-filter').value;
    const ratingFilter = document.getElementById('rating-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    const rows = document.querySelectorAll('.admin-table tbody tr');

    rows.forEach(row => {
        const product = row.querySelector('td:nth-child(3)').textContent;
        const rating = row.querySelector('.rating').children.length;
        const date = row.querySelector('td:nth-child(6)').textContent;
        const status = row.querySelector('.status').classList[1];

        const matchesProduct = !productFilter || product === productFilter;
        const matchesRating = !ratingFilter || rating === parseInt(ratingFilter);
        const matchesDate = !dateFilter || isDateInRange(date, dateFilter);
        const matchesStatus = !statusFilter || status === statusFilter;

        row.style.display = (matchesProduct && matchesRating && matchesDate && matchesStatus) ? '' : 'none';
    });
}

// التحقق من نطاق التاريخ
function isDateInRange(date, range) {
    const reviewDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - reviewDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    switch (range) {
        case 'today':
            return diffDays === 0;
        case 'week':
            return diffDays <= 7;
        case 'month':
            return diffDays <= 30;
        case 'year':
            return diffDays <= 365;
        default:
            return true;
    }
}

// معالجة تحديد الكل
function handleSelectAll(e) {
    const checkboxes = document.querySelectorAll('.review-select');
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
    });
}

// معالجة الإجراءات الجماعية
function handleBulkAction() {
    const action = document.getElementById('bulk-action').value;
    if (!action) {
        alert('الرجاء اختيار إجراء');
        return;
    }

    const selectedReviews = Array.from(document.querySelectorAll('.review-select:checked'))
        .map(checkbox => checkbox.closest('tr').dataset.id);

    if (selectedReviews.length === 0) {
        alert('الرجاء اختيار تقييم واحد على الأقل');
        return;
    }

    switch (action) {
        case 'approve':
            if (confirm('هل أنت متأكد من اعتماد التقييمات المحددة؟')) {
                // هنا يمكنك إضافة كود لاعتماد التقييمات
                console.log('اعتماد التقييمات:', selectedReviews);
            }
            break;
        case 'reject':
            if (confirm('هل أنت متأكد من رفض التقييمات المحددة؟')) {
                // هنا يمكنك إضافة كود لرفض التقييمات
                console.log('رفض التقييمات:', selectedReviews);
            }
            break;
        case 'delete':
            if (confirm('هل أنت متأكد من حذف التقييمات المحددة؟')) {
                // هنا يمكنك إضافة كود لحذف التقييمات
                console.log('حذف التقييمات:', selectedReviews);
            }
            break;
    }
}

// معالجة حالة التقييم
function handleReviewStatus(status) {
    const modal = document.getElementById('review-modal');
    const reviewId = modal.dataset.reviewId;

    if (confirm(`هل أنت متأكد من ${status === 'approved' ? 'اعتماد' : 'رفض'} هذا التقييم؟`)) {
        // هنا يمكنك إضافة كود لتحديث حالة التقييم
        console.log(`تحديث حالة التقييم ${reviewId} إلى ${status}`);
        modal.style.display = 'none';
    }
}

// حفظ التقييم
function saveReview() {
    const form = document.getElementById('edit-review-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = {
        customer: document.getElementById('review-customer-input').value,
        product: document.getElementById('review-product-input').value,
        rating: document.querySelector('input[name="rating"]:checked').value,
        comment: document.getElementById('review-comment-input').value,
        status: document.getElementById('review-status-input').value
    };

    // هنا يمكن إضافة طلب API لحفظ التقييم
    console.log('Saving review:', formData);
    hideAllModals();
    // تحديث الجدول
}

// إظهار النافذة المنبثقة
function showModal(modalId) {
    hideAllModals();
    document.getElementById(modalId).classList.add('show');
}

// إخفاء جميع النوافذ المنبثقة
function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
}



// تهيئة الأحداث
function initializeEvents() {
    // تحديد الكل في جدول التقييمات
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }

    // أزرار الإجراءات في جدول التقييمات
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionButton);
    });

    // البحث في جدول التقييمات
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // الفلاتر
    const ratingFilter = document.getElementById('rating-filter');
    const statusFilter = document.getElementById('status-filter');
    const sortFilter = document.getElementById('sort-filter');

    if (ratingFilter) {
        ratingFilter.addEventListener('change', applyFilters);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }

    // إجراءات جماعية
    const bulkActionSelect = document.getElementById('bulk-action');
    const applyBulkActionBtn = document.getElementById('apply-bulk-action');

    if (bulkActionSelect && applyBulkActionBtn) {
        applyBulkActionBtn.addEventListener('click', handleBulkAction);
    }
}

// معالجة تحديد الكل
function handleSelectAll(e) {
    const checkboxes = document.querySelectorAll('.review-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
    });
}

// معالجة أزرار الإجراءات
function handleActionButton(e) {
    const button = e.currentTarget;
    const action = button.classList.contains('view') ? 'عرض' :
        button.classList.contains('edit') ? 'تعديل' :
            button.classList.contains('delete') ? 'حذف' : '';

    const row = button.closest('tr');
    const reviewId = row.getAttribute('data-review-id');

    switch (action) {
        case 'عرض':
            viewReview(reviewId);
            break;
        case 'تعديل':
            editReview(reviewId);
            break;
        case 'حذف':
            deleteReview(reviewId);
            break;
    }
}

// عرض تفاصيل التقييم
function viewReview(reviewId) {
    // هنا يمكن إضافة كود لعرض تفاصيل التقييم في نافذة منبثقة
    alert(`عرض تفاصيل التقييم: ${reviewId}`);
}

// تعديل التقييم
function editReview(reviewId) {
    // هنا يمكن إضافة كود لتعديل التقييم
    alert(`تعديل التقييم: ${reviewId}`);
}

// حذف التقييم
function deleteReview(reviewId) {
    if (confirm(`هل أنت متأكد من حذف التقييم "${reviewId}"؟`)) {
        // هنا يمكن إضافة كود لحذف التقييم من الخادم
        alert(`تم حذف التقييم: ${reviewId}`);

        // تحديث جدول التقييمات
        // في التطبيق الحقيقي، سيتم تحديث البيانات من الخادم
        location.reload();
    }
}

// معالجة البحث
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tableRows = document.querySelectorAll('.admin-table tbody tr');

    tableRows.forEach(row => {
        const productName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const customerName = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const reviewText = row.querySelector('td:nth-child(4)').textContent.toLowerCase();

        if (productName.includes(searchTerm) ||
            customerName.includes(searchTerm) ||
            reviewText.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// تطبيق الفلاتر
function applyFilters() {
    const ratingFilter = document.getElementById('rating-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const tableRows = document.querySelectorAll('.admin-table tbody tr');

    tableRows.forEach(row => {
        const reviewRating = row.querySelector('.rating').getAttribute('data-rating');
        const reviewStatus = row.querySelector('.status').classList.contains('approved') ? 'approved' :
            row.querySelector('.status').classList.contains('pending') ? 'pending' :
                row.querySelector('.status').classList.contains('rejected') ? 'rejected' : '';

        const ratingMatch = !ratingFilter || reviewRating === ratingFilter;
        const statusMatch = !statusFilter || reviewStatus === statusFilter;

        if (ratingMatch && statusMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // تطبيق الترتيب
    applySorting();
}

// تطبيق الترتيب
function applySorting() {
    const sortFilter = document.getElementById('sort-filter').value;
    const tableBody = document.querySelector('.admin-table tbody');
    const tableRows = Array.from(tableBody.querySelectorAll('tr'));

    tableRows.sort((a, b) => {
        const dateA = new Date(a.querySelector('td:nth-child(5)').textContent);
        const dateB = new Date(b.querySelector('td:nth-child(5)').textContent);
        const ratingA = parseInt(a.querySelector('.rating').getAttribute('data-rating'));
        const ratingB = parseInt(b.querySelector('.rating').getAttribute('data-rating'));

        switch (sortFilter) {
            case 'date-new':
                return dateB - dateA;
            case 'date-old':
                return dateA - dateB;
            case 'rating-high':
                return ratingB - ratingA;
            case 'rating-low':
                return ratingA - ratingB;
            default:
                return 0;
        }
    });

    // إعادة ترتيب الصفوف في الجدول
    tableRows.forEach(row => {
        tableBody.appendChild(row);
    });
}

// معالجة الإجراءات الجماعية
function handleBulkAction() {
    const bulkAction = document.getElementById('bulk-action').value;
    const selectedReviews = document.querySelectorAll('.review-checkbox:checked');

    if (!bulkAction) {
        alert('الرجاء اختيار إجراء');
        return;
    }

    if (selectedReviews.length === 0) {
        alert('الرجاء اختيار تقييم واحد على الأقل');
        return;
    }

    switch (bulkAction) {
        case 'delete':
            if (confirm(`هل أنت متأكد من حذف ${selectedReviews.length} تقييم؟`)) {
                // هنا يمكن إضافة كود لحذف التقييمات المحددة
                alert(`تم حذف ${selectedReviews.length} تقييم`);
                location.reload();
            }
            break;
        case 'approve':
            // هنا يمكن إضافة كود لموافقة التقييمات المحددة
            alert(`تمت موافقة ${selectedReviews.length} تقييم`);
            location.reload();
            break;
        case 'reject':
            // هنا يمكن إضافة كود لرفض التقييمات المحددة
            alert(`تم رفض ${selectedReviews.length} تقييم`);
            location.reload();
            break;
    }
} 