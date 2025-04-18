document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    // تبديل عرض كلمة المرور
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // التحقق من صحة النموذج عند الإرسال
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('كلمات المرور غير متطابقة');
            return;
        }
        
        // هنا يمكنك إضافة كود إرسال البيانات إلى الخادم
        console.log('تم إرسال النموذج بنجاح');
        // يمكنك إضافة التوجيه إلى صفحة تسجيل الدخول
        // window.location.href = '/login.html';
    });
}); 