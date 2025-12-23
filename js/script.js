/**
 * ==========================================
 * 🚀 RevoFun Main Navigation & Page Handler
 * ==========================================
 */
window.onload = function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const allPages = document.querySelectorAll('.page-section');

    function showPage(targetId) {
        if (!targetId.startsWith('#')) return;
        allPages.forEach(page => page.classList.add('hidden'));
        const targetPage = document.querySelector(targetId);
        if (targetPage) targetPage.classList.remove('hidden');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            if (target.startsWith('#')) {
                e.preventDefault();
                showPage(target);
            }
        });
    });
};