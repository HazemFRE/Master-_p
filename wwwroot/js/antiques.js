// بيانات المنتجات
const products = [
    {
        id: 1,
        image: "/IMG/antiques/mabkhara.jpg",
        title: "مبخرة تراثية من خشب الزيتون",
        description: "مبخرة يدوية الصنع من خشب زيتون معمر، منقوشة بزخارف عربية أصيلة",
        price: 35.00
    },
    {
        id: 2,
        image: "/IMG/antiques/ashtray.jpg",
        title: "منفضة سجائر فاخرة",
        description: "منفضة سجائر مصنوعة من خشب الزيتون المعتق، مع نقوش يدوية دقيقة",
        price: 25.00
    },
    {
        id: 3,
        image: "/IMG/antiques/mahbash.jpg",
        title: "مهباش قهوة تقليدي",
        description: "مهباش لطحن القهوة مصنوع يدوياً من خشب زيتون فلسطيني أصيل",
        price: 85.00
    },
    {
        id: 4,
        image: "/IMG/antiques/coffee-set.jpg",
        title: "طقم قهوة عربي كامل",
        description: "طقم قهوة تراثي يشمل الدلة والفناجين مع صينية، جميعها من خشب الزيتون",
        price: 150.00
    },
    {
        id: 5,
        image: "/IMG/antiques/spice-box.jpg",
        title: "علبة بهارات تقليدية",
        description: "علبة بهارات متعددة الأقسام مصنوعة من خشب الزيتون مع غطاء محكم",
        price: 45.00
    },
    {
        id: 6,
        image: "/IMG/antiques/rosary.jpg",
        title: "مسبحة من خشب الزيتون",
        description: "مسبحة يدوية الصنع من خشب الزيتون المعتق مع حفر يدوي للحبات",
        price: 20.00
    },
    {
        id: 7,
        image: "/IMG/antiques/jewelry-box.jpg",
        title: "صندوق مجوهرات مزخرف",
        description: "صندوق مجوهرات فاخر مع تطعيمات من الصدف ونقوش إسلامية",
        price: 95.00
    },
    {
        id: 8,
        image: "/IMG/antiques/serving-tray.jpg",
        title: "صينية تقديم تراثية",
        description: "صينية تقديم كبيرة مع مقابض، مزخرفة بنقوش عربية تقليدية",
        price: 70.00
    },
    {
        id: 9,
        image: "/IMG/antiques/mortar-pestle.jpg",
        title: "هاون وجرن تقليدي",
        description: "هاون مع جرن لطحن التوابل والأعشاب، مصنوع من خشب الزيتون الصلب",
        price: 40.00
    },
    {
        id: 10,
        image: "/IMG/antiques/candle-holder.jpg",
        title: "حامل شموع مزخرف",
        description: "حامل شموع تراثي مع نقوش هندسية إسلامية وتطعيمات نحاسية",
        price: 55.00
    },
    {
        id: 11,
        image: "/IMG/antiques/quran-stand.jpg",
        title: "رحلة قرآن منقوشة",
        description: "رحلة لحمل المصحف الشريف مع نقوش إسلامية دقيقة وتطعيمات خشبية",
        price: 65.00
    },
    {
        id: 12,
        image: "/IMG/antiques/chess-set.jpg",
        title: "طقم شطرنج تراثي",
        description: "طقم شطرنج كامل مصنوع من خشب الزيتون مع قطع منحوتة يدوياً",
        price: 120.00
    }
];

// عرض المنتجات
function displayProducts() {
    const container = document.getElementById('antiques-container');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'antique-item';
        
        productElement.innerHTML = `
            <div class="product-link" onclick="goToProductDetails(${product.id})">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price.toFixed(2)} د.أ</p>
            </div>
            <button class="buy-btn" onclick="addToCart(${product.id})">أضف إلى السلة</button>
        `;
        
        container.appendChild(productElement);
    });
}

// إضافة إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // يمكنك هنا إضافة المنطق الخاص بإضافة المنتج إلى السلة
        alert(`تمت إضافة ${product.title} إلى السلة`);
        updateCartTotal(product.price);
    }
}

// تحديث إجمالي السلة
function updateCartTotal(price) {
    const cartTotal = document.getElementById('cart-total');
    const currentTotal = parseFloat(cartTotal.textContent);
    cartTotal.textContent = `${(currentTotal + price).toFixed(2)} د.أ`;
}

// دالة جديدة للتوجيه إلى صفحة التفاصيل
function goToProductDetails(productId) {
    window.location.href = `/product-details.html?id=${productId}`;
}

// تحميل المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayProducts); 