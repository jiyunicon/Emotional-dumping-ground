export class DumpZone {
    constructor() {
        this.input = document.getElementById('emotion-input');
        this.canvas = document.getElementById('dump-canvas');
        this.colorBtns = document.querySelectorAll('.color-btn');

        this.selectedColor = 'var(--text-main)'; // Default
        this.isComposing = false; // IME 입력 중 여부 체크

        this.init();
    }

    init() {
        // Color Selection
        this.colorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectColor(e.target);
            });
        });

        // Input Handling
        this.input.addEventListener('keydown', (e) => {
            if (e.isComposing) return; // 한글 입력 중 중복 방지
            if (e.key === 'Enter') {
                this.releaseEmotion();
            }
        });

        // Canvas Click (Delegate for dynamic elements if needed, though direct binding is fine too)
    }

    selectColor(targetBtn) {
        // Reset state
        this.colorBtns.forEach(btn => btn.classList.remove('selected'));

        // Set new state
        targetBtn.classList.add('selected');
        const colorVar = targetBtn.getAttribute('data-color');

        // Set actual color value from CSS variable
        const style = getComputedStyle(document.body);
        if (colorVar === 'red') this.selectedColor = style.getPropertyValue('--accent-red');
        else if (colorVar === 'blue') this.selectedColor = style.getPropertyValue('--accent-blue');
        else if (colorVar === 'green') this.selectedColor = style.getPropertyValue('--accent-green');
        else if (colorVar === 'yellow') this.selectedColor = style.getPropertyValue('--accent-yellow');
        else this.selectedColor = 'var(--text-main)';

        // Focus input to keep flow
        this.input.focus();
        this.input.style.borderColor = this.selectedColor;
    }

    releaseEmotion() {
        const text = this.input.value.trim();
        if (!text) return;

        this.createFloatingText(text);
        this.input.value = '';
    }

    createFloatingText(text) {
        const el = document.createElement('div');
        el.textContent = text;
        el.classList.add('floating-text');

        // Random Position
        const x = Math.random() * 80 + 10; // 10% ~ 90%
        const y = Math.random() * 80 + 10; // 10% ~ 90%

        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
        el.style.color = this.selectedColor;

        // Random Animation Duration for "Float" effect (implemented via CSS later or simple transform here)
        // For now, let's just place it. We can add a subtle CSS animation for hovering.
        el.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`;

        // Click to Release
        el.addEventListener('click', () => {
            this.dissolve(el);
        });

        this.canvas.appendChild(el);

        // Optional: Auto-fade after interactions or long time? 
        // For now, adhere to specs: "Click to dissolve"
    }

    dissolve(el) {
        el.classList.add('dissolving');

        // Show "Released" feedback at the element's position
        const rect = el.getBoundingClientRect();
        this.showFeedback(rect.left, rect.top);

        // Remove after animation
        el.addEventListener('transitionend', () => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    }

    showFeedback(x, y) {
        const feedback = document.createElement('div');
        feedback.textContent = "Released.";
        feedback.style.position = 'fixed'; // Use fixed to match screen coords
        feedback.style.left = `${x}px`;
        feedback.style.top = `${y}px`;
        feedback.style.color = 'var(--text-muted)';
        feedback.style.fontSize = '0.8rem';
        feedback.style.opacity = '1';
        feedback.style.pointerEvents = 'none';
        feedback.style.transition = 'opacity 2s ease-out, transform 2s ease-out';

        document.body.appendChild(feedback);

        // Animate out
        requestAnimationFrame(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-20px)';
        });

        setTimeout(() => {
            if (feedback.parentNode) feedback.parentNode.removeChild(feedback);
        }, 2000);
    }
}
