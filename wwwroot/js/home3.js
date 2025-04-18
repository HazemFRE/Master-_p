document.addEventListener('DOMContentLoaded', () => {
    // تغيير الصورة الرئيسية
    window.changeImage = function(element) {
        document.querySelector('.main-image img').src = element.src;
    };

    // زيادة ونقصان الكمية
    window.incrementQuantity = function() {
        const input = document.getElementById('quantity');
        input.value = parseInt(input.value) + 1;
    };

    window.decrementQuantity = function() {
        const input = document.getElementById('quantity');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    };

    // تحديد النكهة المختارة
    document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.variant-btn.active').classList.remove('active');
            btn.classList.add('active');
        });
    });

    // إضافة إلى السلة
    document.querySelector('.add-to-cart').addEventListener('click', () => {
        const quantity = document.getElementById('quantity').value;
        const variant = document.querySelector('.variant-btn.active').textContent;
        
        showToast(`تمت إضافة ${quantity} ${variant} إلى السلة`, 'success');
        updateCartCount(quantity);
    });

    // الشراء الآن
    document.querySelector('.buy-now').addEventListener('click', () => {
        window.location.href = '/checkout.html';
    });

    // إظهار رسائل التنبيه
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }

    // تحديث عدد العناصر في السلة
    function updateCartCount(count) {
        const currentCount = parseInt(document.querySelector('.cart-count').textContent);
        document.querySelector('.cart-count').textContent = currentCount + parseInt(count);
    }
}); 