// تهيئة المتغيرات
let currentCategory = '';
let currentPrice = '';
let currentSort = 'newest';
let currentPage = 1;
const productsPerPage = 9;

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializePagination();
});

// تهيئة الفلاتر
function initializeFilters() {
    const categorySelect = document.getElementById('category');
    const priceSelect = document.getElementById('price');
    const sortSelect = document.getElementById('sort');

    categorySelect.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        currentPage = 1;
        filterAndSortProducts();
    });

    priceSelect.addEventListener('change', (e) => {
        currentPrice = e.target.value;
        currentPage = 1;
        filterAndSortProducts();
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        filterAndSortProducts();
    });
}

// تصفية وترتيب المنتجات
function filterAndSortProducts() {
    const products = document.querySelectorAll('.product-card');
    const filteredProducts = Array.from(products).filter(product => {
        const category = product.dataset.category;
        const price = parseFloat(product.dataset.price);

        const categoryMatch = !currentCategory || category === currentCategory;
        const priceMatch = !currentPrice || isInPriceRange(price, currentPrice);

        return categoryMatch && priceMatch;
    });

    // ترتيب المنتجات
    filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);

        switch (currentSort) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'rating':
                return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
            default:
                return parseInt(b.dataset.id) - parseInt(a.dataset.id);
        }
    });

    // إخفاء/إظهار المنتجات
    products.forEach(product => product.style.display = 'none');
    filteredProducts.forEach(product => product.style.display = 'block');

    updatePagination(filteredProducts.length);
}

// التحقق من نطاق السعر
function isInPriceRange(price, range) {
    switch (range) {
        case '0-50':
            return price <= 50;
        case '50-100':
            return price > 50 && price <= 100;
        case '100+':
            return price > 100;
        default:
            return true;
    }
}

// تهيئة الترقيم
function initializePagination() {
    const totalProducts = document.querySelectorAll('.product-card').length;
    updatePagination(totalProducts);

    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.disabled) return;

            if (button.querySelector('i')) {
                if (button.querySelector('.fa-chevron-right')) {
                    currentPage = Math.max(1, currentPage - 1);
                } else {
                    const totalPages = Math.ceil(document.querySelectorAll('.product-card:not([style*="display: none"])').length / productsPerPage);
                    currentPage = Math.min(totalPages, currentPage + 1);
                }
            } else {
                currentPage = parseInt(button.textContent);
            }

            updatePaginationButtons();
            showCurrentPage();
        });
    });
}

// تحديث أزرار الترقيم
function updatePaginationButtons() {
    const totalPages = Math.ceil(document.querySelectorAll('.product-card:not([style*="display: none"])').length / productsPerPage);
    const buttons = document.querySelectorAll('.page-btn');

    buttons.forEach(button => {
        if (button.querySelector('i')) {
            if (button.querySelector('.fa-chevron-right')) {
                button.disabled = currentPage === 1;
            } else {
                button.disabled = currentPage === totalPages;
            }
        } else {
            const pageNum = parseInt(button.textContent);
            button.classList.toggle('active', pageNum === currentPage);
        }
    });
}

// عرض الصفحة الحالية
function showCurrentPage() {
    const visibleProducts = document.querySelectorAll('.product-card:not([style*="display: none"])');
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    visibleProducts.forEach((product, index) => {
        product.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
    });
}

// تحديث الترقيم
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pagination = document.querySelector('.pagination');

    // تحديث أزرار الأرقام
    const numberButtons = pagination.querySelectorAll('.page-btn:not(:first-child):not(:last-child)');
    numberButtons.forEach(button => {
        const pageNum = parseInt(button.textContent);
        if (pageNum > totalPages) {
            button.style.display = 'none';
        } else {
            button.style.display = 'block';
        }
    });

    updatePaginationButtons();
    showCurrentPage();
} 