document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
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
        
        // هنا يمكنك إضافة كود التحقق من صحة البيانات وإرسالها للخادم
        console.log('تم إرسال نموذج تسجيل الدخول');
        // window.location.href = '/home.html';
    });
}); 