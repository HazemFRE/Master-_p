document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const faqItems = document.querySelectorAll('.faq-item');

    // معالجة تقديم النموذج
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // التحقق من صحة المدخلات
        if (!validateForm()) return;

        // إظهار حالة التحميل
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        try {
            // محاكاة إرسال البيانات
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // إظهار رسالة النجاح
            showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
            contactForm.reset();
        } catch (error) {
            showToast('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // التحقق من صحة النموذج
    function validateForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        if (name.length < 3) {
            showToast('يرجى إدخال اسم صحيح', 'error');
            return false;
        }

        if (!isValidEmail(email)) {
            showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return false;
        }

        if (!isValidPhone(phone)) {
            showToast('يرجى إدخال رقم هاتف صحيح', 'error');
            return false;
        }

        if (message.length < 10) {
            showToast('يرجى إدخال رسالة أطول', 'error');
            return false;
        }

        return true;
    }

    // التحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    // تفعيل/تعطيل الأسئلة الشائعة
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // إغلاق جميع الأسئلة المفتوحة
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // تبديل حالة السؤال الحالي
            item.classList.toggle('active');

            // تحريك الأيقونة
            const icon = question.querySelector('i');
            icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
}); 