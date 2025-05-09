// القائمة المتنقلة
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
document.querySelector('.nav-links').classList.toggle('active');
});

// تأثير سلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
 e.preventDefault();
 
 const targetId = this.getAttribute('href');
 const targetElement = document.querySelector(targetId);
 
 if (targetElement) {
     window.scrollTo({
         top: targetElement.offsetTop - 80,
         behavior: 'smooth'
     });
     
     // إغلاق القائمة المتنقلة إذا كانت مفتوحة
     if (document.querySelector('.nav-links').classList.contains('active')) {
         document.querySelector('.nav-links').classList.remove('active');
     }
 }
});
});


// تغيير لون الهيدر عند التمرير
window.addEventListener('scroll', function() {
const header = document.querySelector('.navbar');
if (window.scrollY > 100) {
 header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
 header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
} else {
 header.style.backgroundColor = 'white';
}
});

// إرسال النموذج
document.querySelector('.contact-form').addEventListener('submit', function(e) {
e.preventDefault();

const submitBtn = this.querySelector('button[type="submit"]');
const originalText = submitBtn.innerHTML;

// تأثير التحميل
submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
submitBtn.disabled = true;

// هنا يمكنك إضافة كود الإرسال الفعلي
setTimeout(() => {
 // رسالة النجاح
 this.innerHTML = `
     <div class="success-message">
         <i class="fas fa-check-circle"></i>
         <h3>تم إرسال رسالتك بنجاح!</h3>
         <p>سنقوم بالرد عليك في أقرب وقت</p>
     </div>
 `;
}, 1500);
});
// الأكواد البرمجية ستأتي هنا
document.addEventListener('DOMContentLoaded', function() {
const contactForm = document.getElementById('contactForm');

if (contactForm) {
// التحقق من صحة النموذج قبل الإرسال
contactForm.addEventListener('submit', function(e) {
e.preventDefault();

// التحقق من الحقول المطلوبة
const name = document.getElementById('name');
const email = document.getElementById('email');
const service = document.getElementById('service');
const message = document.getElementById('message');

let isValid = true;

// إعادة تعيين أنماط الخطأ
resetErrorStyles();

// التحقق من الحقول الفارغة
if (!name.value.trim()) {
 showError(name, 'الرجاء إدخال الاسم الكامل');
 isValid = false;
}

if (!email.value.trim()) {
 showError(email, 'الرجاء إدخال البريد الإلكتروني');
 isValid = false;
} else if (!validateEmail(email.value)) {
 showError(email, 'البريد الإلكتروني غير صالح');
 isValid = false;
}

if (service.value === '' || service.value === null) {
 showError(service, 'الرجاء اختيار الخدمة');
 isValid = false;
}

if (!message.value.trim()) {
 showError(message, 'الرجاء إدخال الرسالة');
 isValid = false;
}

// إذا كان النموذج صالحاً، قم بالإرسال
if (isValid) {
 submitForm();
}
});

// دالة لعرض رسالة الخطأ
function showError(input, message) {
const formGroup = input.closest('.form-group');
const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');

errorElement.className = 'error-message';
errorElement.style.color = '#ff4757';
errorElement.style.fontSize = '0.8rem';
errorElement.style.marginTop = '5px';
errorElement.textContent = message;

if (!formGroup.querySelector('.error-message')) {
 formGroup.appendChild(errorElement);
}

input.style.borderColor = '#ff4757';
}

// دالة لإعادة تعيين أنماط الخطأ
function resetErrorStyles() {
const errorMessages = document.querySelectorAll('.error-message');
const inputs = document.querySelectorAll('input, textarea, select');

errorMessages.forEach(msg => msg.remove());
inputs.forEach(input => {
 input.style.borderColor = '#ddd';
});
}

// دالة للتحقق من صحة البريد الإلكتروني
function validateEmail(email) {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(email);
}

// دالة لإرسال النموذج
function submitForm() {
const submitBtn = contactForm.querySelector('.submit-btn');
const originalText = submitBtn.querySelector('.btn-text').textContent;

// تغيير نص الزر أثناء الإرسال
submitBtn.querySelector('.btn-text').textContent = 'جاري الإرسال...';
submitBtn.disabled = true;

// هنا يمكنك استخدام AJAX لإرسال النموذج
fetch(contactForm.action, {
 method: 'POST',
 body: new FormData(contactForm),
 headers: {
   'Accept': 'application/json'
 }
})
.then(response => {
 if (response.ok) {
   // عرض رسالة النجاح
   showSuccessMessage();
   contactForm.reset();
 } else {
   throw new Error('فشل في إرسال النموذج');
 }
})
.catch(error => {
 alert('حدث خطأ أثناء إرسال النموذج: ' + error.message);
})
.finally(() => {
 // إعادة تعيين الزر إلى حالته الأصلية
 submitBtn.querySelector('.btn-text').textContent = originalText;
 submitBtn.disabled = false;
});
}

// دالة لعرض رسالة النجاح
function showSuccessMessage() {
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.style.backgroundColor = '#4BB543';
successMessage.style.color = 'white';
successMessage.style.padding = '15px';
successMessage.style.borderRadius = '5px';
successMessage.style.marginTop = '20px';
successMessage.style.textAlign = 'center';
successMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';

const formFooter = contactForm.querySelector('.form-footer');
formFooter.parentNode.insertBefore(successMessage, formFooter.nextSibling);

// إخفاء الرسالة بعد 5 ثوان
setTimeout(() => {
 successMessage.style.opacity = '0';
 setTimeout(() => successMessage.remove(), 300);
}, 5000);
}
}

// تأثيرات الـ 3D للأزرار
const buttons = document.querySelectorAll('.hover-3d');
buttons.forEach(button => {
button.addEventListener('mousemove', function(e) {
const x = e.offsetX;
const y = e.offsetY;
const btnWidth = this.clientWidth;
const btnHeight = this.clientHeight;
const moveX = (x - btnWidth / 2) / 10;
const moveY = (y - btnHeight / 2) / 10;

this.style.transform = `translateY(-5px) perspective(500px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
});

button.addEventListener('mouseout', function() {
this.style.transform = 'translateY(-5px) perspective(500px) rotateX(0) rotateY(0)';
});
});
});
fetch(contactForm.action, {
method: 'POST',
body: new FormData(contactForm),
headers: {
'Accept': 'application/json'
}
})
console.log("جاري الإرسال إلى:", contactForm.action); // للتأكد من الرابط
fetch.then(response => console.log(response)) // لرؤية الرد
