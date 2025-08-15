/**
 * 语音技能交互研究网站主要JavaScript文件
 * 实现导航栏滚动效果、平滑滚动、滚动动画等功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopButton.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTopButton.classList.remove('visible');
        }
        
        // 添加滚动动画
        animateOnScroll();
    });
    
    // 返回顶部按钮点击事件
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 导航链接平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 更新活动链接
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // 初始化滚动动画元素
    initScrollAnimations();
    
    // 初始化语音波浪动画
    initVoiceWaveAnimation();
    
    // 初始化折叠卡片
    initCollapsibleCards();
    
    // 导航菜单在移动端点击后自动折叠
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });
    
    // 更新活动导航链接
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
});

/**
 * 初始化滚动动画元素
 */
function initScrollAnimations() {
    // 添加滚动动画类到所有需要动画的元素
    document.querySelectorAll('.feature-card, .content-card, .example-card, .checklist-card, .section-header, .featured-card, .overview-card').forEach(element => {
        element.classList.add('scroll-animation');
    });
    
    // 初始运行一次动画检查
    animateOnScroll();
}

/**
 * 根据滚动位置触发元素动画
 */
function animateOnScroll() {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('.scroll-animation').forEach(element => {
        const elementPosition = element.getBoundingClientRect().top + scrollPosition;
        const elementVisible = 150;
        
        if (scrollPosition + windowHeight > elementPosition + elementVisible) {
            element.classList.add('visible');
        }
    });
}

/**
 * 初始化语音波浪动画
 */
function initVoiceWaveAnimation() {
    // 使用GSAP动画库增强波浪动画效果
    if (typeof gsap !== 'undefined') {
        gsap.to('.wave1', {
            duration: 2,
            attr: { d: 'M0,50 Q25,70 50,50 T100,50 T150,30 T200,50' },
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
        
        gsap.to('.wave2', {
            duration: 2.5,
            attr: { d: 'M0,50 Q25,30 50,50 T100,70 T150,50 T200,50' },
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 0.3
        });
        
        gsap.to('.wave3', {
            duration: 3,
            attr: { d: 'M0,50 Q25,50 50,30 T100,50 T150,70 T200,50' },
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 0.6
        });
    }
}

/**
 * 初始化折叠卡片
 */
function initCollapsibleCards() {
    // 为所有折叠卡片添加点击事件
    document.querySelectorAll('.overview-card').forEach(card => {
        card.addEventListener('click', function() {
            // 获取目标折叠元素ID
            const targetId = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);
            
            // 获取当前展开状态
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // 使用Bootstrap的折叠API
            const collapse = bootstrap.Collapse.getInstance(targetElement) || 
                             new bootstrap.Collapse(targetElement, {toggle: false});
            
            if (isExpanded) {
                // 如果已经展开，则收起
                collapse.hide();
                this.setAttribute('aria-expanded', 'false');
            } else {
                // 如果已经收起，则展开
                collapse.show();
                this.setAttribute('aria-expanded', 'true');
            }
            
            // 阻止冒泡，防止点击内部链接时触发折叠
            targetElement.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    });
    
    // 阻止折叠内容区域的点击事件冒泡
    document.querySelectorAll('.card-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

/**
 * 更新当前活动的导航链接
 */
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
} 