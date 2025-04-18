document.addEventListener('DOMContentLoaded', function() {
    // تفعيل شريط التبويبات
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // إخفاء كل المحتويات
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // إلغاء تنشيط كل الأزرار
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // عرض المحتوى المحدد وتنشيط الزر
            document.getElementById(tabId).classList.add('active');
            button.classList.add('active');
        });
    });
    
    // تبديل الصور المصغرة
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });
    
    // اختيار الخيارات
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // زيادة/تقليل الكمية
    const decreaseBtn = document.querySelector('.decrease-qty');
    const increaseBtn = document.querySelector('.increase-qty');
    const qtyInput = document.querySelector('.qty-input');
    
    decreaseBtn.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        qtyInput.value = value + 1;
    });
    
    // تفعيل أشرطة التقييم
    const ratingBars = document.querySelectorAll('.bar');
    
    ratingBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage + '%';
    });
    
    // إضافة إلى السلة
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartBtn.addEventListener('click', function() {
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;
        cartCount.classList.add('animate');
        
        setTimeout(() => {
            cartCount.classList.remove('animate');
        }, 300);
        
        // هنا يمكنك إضافة منطق إضافة المنتج إلى السلة
    });
    
    // تحميل المزيد من التقييمات
    const loadMoreBtn = document.querySelector('.load-more-reviews');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // هنا يمكنك إضافة منطق لتحميل المزيد من التقييمات
            this.textContent = 'جاري التحميل...';
            
            setTimeout(() => {
                this.textContent = 'لا يوجد المزيد من التقييمات';
                this.disabled = true;
            }, 1500);
        });
    }
});