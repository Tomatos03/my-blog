<div class="about-container">
    <header class="about-header">
        <div class="about-img-wrapper">
            <img src="/avatar.jpg" alt="个人照片" class="about-profile-img">
        </div>
        <h1 class="about-name">Tomatos</h1>
        <span class="about-tag">软件开发工程师</span>
    </header>
    <section class="about-section">
        <h2 class="about-section-title">关于我</h2>
        <p class="about-description">在校大学生，热衷于编程和技术。在学习之余，探索新技术和研究算法，提高个人能力。</p>
    </section>
    <section class="about-section">
        <h2 class="about-section-title">技能</h2>
        <div class="about-skills">
            <span class="about-skill">Java</span>
            <span class="about-skill">Vue3</span>
            <span class="about-skill">TypeScript</span>
            <span class="about-skill">Spring</span>
            <span class="about-skill">Rust</span>
            <span class="about-skill">Docker</span>
            <span class="about-skill">MySQL</span>
            <span class="about-skill">Redis</span>
        </div>
    </section>
    <section class="about-section">
        <h2 class="about-section-title">联系我</h2>
        <div class="about-socials">
            <a href="https://github.com/Tomatos03" target="_blank" class="about-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" class="about-icon">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
        </div>
    </section>
</div>

<style>
    .about-container {
        max-width: 640px;
        margin: 0 auto;
        padding: 80px 24px;
        text-align: center;
    }

    .about-header {
        margin-bottom: 60px;
        animation: about-fade-in 0.8s ease-out;
    }

    .about-img-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 24px;
    }

    .about-profile-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--vp-c-brand-1);
        transition: transform 0.3s ease;
    }

    .about-profile-img:hover {
        transform: rotate(5deg);
    }

    .about-name {
        color: var(--vp-c-text-1);
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 12px;
    }

    .about-tag {
        display: inline-block;
        padding: 4px 16px;
        border-radius: 20px;
        font-size: 0.875rem;
        background: var(--vp-c-brand-soft);
        color: var(--vp-c-brand-1);
    }

    .about-section {
        margin-bottom: 60px;
        animation: about-fade-in 0.8s ease-out both;
    }

    .about-section:nth-child(2) {
        animation-delay: 0.1s;
    }

    .about-section:nth-child(3) {
        animation-delay: 0.2s;
    }

    .about-section-title {
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--vp-c-text-1);
        margin-bottom: 16px;
        border-top: none !important;
    }

    .about-section-title::after {
        content: '';
        display: block;
        margin: 12px auto 0;
        width: 60px;
        height: 4px;
        background: var(--vp-c-brand-1);
        border-radius: 2px;
    }

    .about-description {
        color: var(--vp-c-text-2);
        line-height: 1.8;
        font-size: 1rem;
    }

    .about-skills {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .about-skill {
        padding: 6px 16px;
        border-radius: 8px;
        font-size: 0.875rem;
        background: var(--vp-c-bg-soft);
        color: var(--vp-c-text-2);
        border: 1px solid var(--vp-c-divider);
        transition: all 0.2s ease;
    }

    .about-skill:hover {
        background: var(--vp-c-brand-soft);
        color: var(--vp-c-brand-1);
        border-color: var(--vp-c-brand-1);
    }

    .about-socials {
        display: flex;
        justify-content: center;
        gap: 16px;
    }

    .about-social-link {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: 12px;
        background: var(--vp-c-bg-soft);
        color: var(--vp-c-text-2) !important;
        text-decoration: none !important;
        transition: all 0.3s ease;
    }

    .about-social-link:hover {
        background: var(--vp-c-brand-soft);
        color: var(--vp-c-brand-1) !important;
        transform: scale(1.05);
    }

    .about-icon {
        width: 20px;
        height: 20px;
    }

    @keyframes about-fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
