document.addEventListener('DOMContentLoaded', () => {
    // بيانات تجريبية للسلة
    let cartItems = [
        {
            id: 1,
            name: "زيت زيتون بكر ممتاز",
            price: 50.00,
            originalPrice: 60.00,
            quantity: 1,
            image: "/IMG/product1.jpg",
            size: "5 لتر"
        },
        {
            id: 2,
            name: "صابون زيت زيتون طبيعي",
            price: 15.00,
            quantity: 1,
            image: "/IMG/product2.jpg",
            size: "عبوة 3 قطع"
        }
    ];

    // عرض محتويات السلة
    function renderCart() {
        const container = document.getElementById('cart-items-container');
        container.innerHTML = '';

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-size">${item.size}</p>
                    <div class="item-price">
                        ${item.originalPrice ? 
                          `<span class="price">${item.price.toFixed(2)} دينار</span>
                           <span class="old-price">${item.originalPrice.toFixed(2)} دينار</span>` :
                          `<span class="price">${item.price.toFixed(2)} دينار</span>`}
                    </div>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn minus" onclick="updateQuantity(${item.id}, 'decrease')">-</button>
                    <input type="number" value="${item.quantity}" min="1" 
                           onchange="updateQuantity(${item.id}, 'set', this.value)" class="qty-input">
                    <button class="qty-btn plus" onclick="updateQuantity(${item.id}, 'increase')">+</button>
                </div>
                <button class="remove-item" onclick="removeItem(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(itemElement);
        });

        updateSummary();
    }

    // تحديث ملخص السلة
    function updateSummary() {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = cartItems.reduce((sum, item) => {
            return sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0);
        }, 0);
        const shipping = 3.00;
        const total = subtotal + shipping;
        
        document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} دينار`;
        document.querySelector('.discount').textContent = `-${discount.toFixed(2)} دينار`;
        document.getElementById('total').textContent = `${total.toFixed(2)} دينار`;
        
        // تحديث عدد العناصر في أيقونة السلة
        const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-total').textContent = `${total.toFixed(2)} د.أ`;
        document.querySelector('.items-count').textContent = `${cartCount} منتجات`;
    }

    // تحديث الكمية
    window.updateQuantity = (itemId, action, value) => {
        const item = cartItems.find(i => i.id === itemId);
        if (!item) return;

        switch (action) {
            case 'increase':
                item.quantity++;
                break;
            case 'decrease':
                if (item.quantity > 1) item.quantity--;
                break;
            case 'set':
                const newValue = parseInt(value);
                if (newValue > 0) item.quantity = newValue;
                break;
        }

        renderCart();
    };

    // حذف منتج
    window.removeItem = (itemId) => {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            cartItems = cartItems.filter(item => item.id !== itemId);
            renderCart();
        }
    };

    // تطبيق كود الخصم
    document.getElementById('apply-discount').addEventListener('click', () => {
        const code = document.getElementById('discount-code').value;
        alert('جاري التحقق من كود الخصم...');
        // يمكنك إضافة منطق الخصم هنا
    });

    // الانتقال إلى صفحة الدفع
    window.proceedToCheckout = () => {
        if (cartItems.length === 0) {
            alert('السلة فارغة!');
            return;
        }
        window.location.href = '/checkout.html';
    };

    // تحميل السلة عند تحميل الصفحة
    renderCart();
});