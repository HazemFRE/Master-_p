function requestService(serviceType) {
    const serviceNames = {
        'soil-analysis': 'تحليل التربة',
        'tree-care': 'رعاية الأشجار',
        'pest-control': 'مكافحة الآفات',
        'basic': 'الباقة الأساسية',
        'premium': 'الباقة المتقدمة'
    };
    
    document.getElementById('message').value = `أرغب في الاستفسار عن خدمة ${serviceNames[serviceType]}`;
    document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
}

function submitConsultation(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        farmSize: document.getElementById('farmSize').value,
        message: document.getElementById('message').value
    };

    // حساب نسبة الخصم بناءً على حجم المزرعة
    let discount = 0;
    if (formData.farmSize >= 10) {
        discount = 25;
    } else if (formData.farmSize >= 5) {
        discount = 15;
    }

    // يمكن هنا إرسال البيانات إلى الخادم
    alert(`شكراً لك ${formData.name}! سنتواصل معك قريباً.
    ${discount > 0 ? `أنت مؤهل للحصول على خصم ${discount}%` : ''}`);

    // إعادة تعيين النموذج
    event.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const consultationForm = document.getElementById('consultationForm');

    // معالجة تقديم نموذج الاستشارة
    consultationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const submitBtn = consultationForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        try {
            // محاكاة إرسال البيانات
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showToast('تم إرسال طلب الاستشارة بنجاح! سنتواصل معك قريباً', 'success');
            consultationForm.reset();
        } catch (error) {
            showToast('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // التحقق من صحة النموذج
    function validateForm() {
        const farmerName = document.getElementById('farmerName').value;
        const phone = document.getElementById('phone').value;
        const farmSize = document.getElementById('farmSize').value;
        const message = document.getElementById('message').value;

        if (farmerName.length < 3) {
            showToast('يرجى إدخال اسم صحيح', 'error');
            return false;
        }

        if (!isValidPhone(phone)) {
            showToast('يرجى إدخال رقم هاتف صحيح', 'error');
            return false;
        }

        if (farmSize < 1) {
            showToast('يرجى إدخال مساحة صحيحة للمزرعة', 'error');
            return false;
        }

        if (message.length < 10) {
            showToast('يرجى إدخال تفاصيل أكثر في الرسالة', 'error');
            return false;
        }

        return true;
    }

    // التحقق من صحة رقم الهاتف
    function isValidPhone(phone) {
        return /^[0-9]{10}$/.test(phone);
    }

    // إظهار رسائل التنبيه
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // تأثيرات حركية للبطاقات
    const cards = document.querySelectorAll('.service-card, .offer-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : 'none';
        });
    });
}); 