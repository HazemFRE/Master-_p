document.addEventListener('DOMContentLoaded', () => {
    // تغيير الصورة الرئيسية
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnails img');

    window.changeImage = function(element) {
        // إزالة الفئة النشطة من جميع الصور المصغرة
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        // إضافة الفئة النشطة للصورة المحددة
        element.classList.add('active');
        // تحديث الصورة الرئيسية
        mainImage.src = element.src;
        // تأثير حركي بسيط
        mainImage.style.opacity = '0';
        setTimeout(() => mainImage.style.opacity = '1', 50);
    };

    // التحكم في الكمية
    window.incrementQuantity = function() {
        const input = document.getElementById('quantity');
        const currentValue = parseInt(input.value);
        if (currentValue < 10) {
            input.value = currentValue + 1;
        }
    };

    window.decrementQuantity = function() {
        const input = document.getElementById('quantity');
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    };

    // اختيار الحجم
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // إضافة إلى السلة
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + quantity;
        
        // إظهار رسالة نجاح
        showToast('تمت إضافة المنتج إلى السلة بنجاح!');
    });

    // إظهار رسائل التنبيه
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // إزالة التنبيه بعد 3 ثواني
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // المفضلة
    const wishlistBtn = document.querySelector('.wishlist');
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
        const isActive = wishlistBtn.classList.contains('active');
        const message = isActive ? 'تمت إضافة المنتج إلى المفضلة' : 'تمت إزالة المنتج من المفضلة';
        showToast(message);
    });
}); 

