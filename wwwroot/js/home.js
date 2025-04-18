document.addEventListener('DOMContentLoaded', () => {
    // تحريك الصفحة بسلاسة عند النقر على روابط التنقل
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // تحديث عدد العناصر في السلة
    function updateCartCount(count) {
        document.querySelector('.cart-count').textContent = count;
    }

    // محاكاة إضافة منتج إلى السلة
    document.querySelectorAll('.product-btn').forEach(button => {
        button.addEventListener('click', () => {
            const currentCount = parseInt(document.querySelector('.cart-count').textContent);
            updateCartCount(currentCount + 1);
            
            // إظهار رسالة نجاح
            showToast('تمت إضافة المنتج إلى السلة بنجاح!', 'success');
        });
    });

    // إظهار رسائل التنبيه
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // إزالة التنبيه بعد 3 ثواني
        setTimeout(() => toast.remove(), 3000);
    }

    // تفعيل البحث
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchBox.value.trim();
        if (searchTerm) {
            // يمكن إضافة منطق البحث هنا
            showToast('جاري البحث...', 'info');
        }
    });

    // البحث عند الضغط على Enter
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}); 