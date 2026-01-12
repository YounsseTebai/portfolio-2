// 1️⃣ تهيئة EmailJS
(function() {
    emailjs.init("kcaRHZen372OdmlbZ"); // ضع هنا Public Key من EmailJS
})();
const successMessage = document.querySelector('.success-message')
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة

        // 3️⃣ إرسال البيانات
        emailjs.sendForm(
                "service_contact", // ضع هنا Service ID من EmailJS
                "template_5zkt893", // ضع هنا Template ID من EmailJS
                form // يشير إلى الفورم الحالي
            ).then(() => {
                successMessage.classList.add("show")
                setTimeout(() => {
                    successMessage.classList.remove("show");
                }, 5000);
                form.reset();
            })
            .catch((error) => {
                console.error('emailJS error:', error)
            })
    });
} else {
    console.error("form not found! Make sure there is an element with class 'form' in the DOM.");
}
// typing animation
var typed = new Typed(".typing", {
    strings: ["", "Web Developer", "Web Designer", "Frelancer"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true,
});

// Aside
document.addEventListener("DOMContentLoaded", function() {
    // العناصر الأساسية
    const nav = document.querySelector(".nav");
    const navList = nav ? nav.querySelectorAll("li") : [];
    const allSection = document.querySelectorAll(".section");
    const totalSection = allSection.length;

    // الدالة showSection كما كانت
    function showSection(element) {
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("active");
        }
        const href = element.getAttribute("href") || "";
        const parts = href.split("#");
        if (parts.length > 1) {
            const target = parts[1];
            const targetEl = document.querySelector("#" + target);
            if (targetEl) targetEl.classList.add("active");
        }
    }

    // تعامل مع نقر روابط التنقل (نفس منطقك الأصلي مع إغلاق aside على الشاشات الصغيرة)
    if (nav && navList.length) {
        for (let i = 0; i < navList.length; i++) {
            const a = navList[i].querySelector("a");
            if (!a) continue;
            a.addEventListener("click", function(e) {
                // إزالة back-section من الكل
                for (let k = 0; k < totalSection; k++) {
                    allSection[k].classList.remove("back-section");
                }
                // تمييز القسم السابق كـ back-section
                for (let j = 0; j < navList.length; j++) {
                    if (navList[j].querySelector("a").classList.contains("active")) {
                        allSection[j].classList.add("back-section");
                    }
                    navList[j].querySelector("a").classList.remove("active");
                }
                this.classList.add("active");
                showSection(this);

                // إذا الشاشة صغيرة، أغلق الـ aside بعد النقر
                if (window.innerWidth <= 991) {
                    const aside = document.querySelector(".aside");
                    if (aside) aside.classList.remove("open");
                    if (nav) nav.classList.remove("active");
                }
                // لمنع السلوك الافتراضي لو لزم (إذا أردت السماح بالروابط، احذف السطر التالي)
                // e.preventDefault();
            });
        }
    }

    // التوجلر - تأكد أنه موجود ثم أضف المستمع
    const navTogglerBtn = document.querySelector(".nav-toggler");
    const aside = document.querySelector(".aside");
    if (navTogglerBtn && aside) {
        navTogglerBtn.addEventListener("click", function() {
            aside.classList.toggle("open");
            // نعرض/نخفي قائمة nav كذلك لتتوافق مع CSS responsive
            if (nav) nav.classList.toggle("active");
        });
    } else {
        // لمن يريد تتبع سبب عدم العمل: افتح الكونسول لترى رسالة
        // (يمكنك إزالة السطران التاليان بعد التأكد)
        if (!navTogglerBtn) console.warn(".nav-toggler not found in DOM");
        if (!aside) console.warn(".aside not found in DOM");
    }
});

emailjs.sendForm("service_contact", "template_5zkt893", document.getElementById("contact-form"));