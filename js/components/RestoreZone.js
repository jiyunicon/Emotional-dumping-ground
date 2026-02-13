export class RestoreZone {
    constructor() {
        this.container = document.getElementById('affirmation-container');
        this.addBtn = document.getElementById('add-affirmation-btn');

        this.defaultAffirmations = [
            "You’re doing well.",
            "You are enough.",
            "No matter what, you matter.",
            "Breathe. It’s okay.",
            "This feeling will pass."
        ];

        this.init();
    }

    init() {
        this.renderAffirmations();

        this.addBtn.addEventListener('click', () => {
            this.addNewAffirmation();
        });
    }

    getStoredAffirmations() {
        const stored = localStorage.getItem('userAffirmations');
        return stored ? JSON.parse(stored) : [];
    }

    saveAffirmation(text) {
        const current = this.getStoredAffirmations();
        current.push(text);
        localStorage.setItem('userAffirmations', JSON.stringify(current));
    }

    renderAffirmations() {
        this.container.innerHTML = '';

        // Combine default and user affirmations
        const allAffirmations = [...this.defaultAffirmations, ...this.getStoredAffirmations()];

        allAffirmations.forEach(text => {
            const card = document.createElement('div');
            card.classList.add('affirmation-card');
            card.textContent = text;

            card.addEventListener('click', () => {
                this.activateAffirmation(card);
            });

            this.container.appendChild(card);
        });
    }

    addNewAffirmation() {
        // Simple prompt for MVP privacy-first approach (no complex modal yet)
        const text = prompt("Enter a supportive phrase for yourself:");
        if (text && text.trim()) {
            this.saveAffirmation(text.trim());
            this.renderAffirmations();
        }
    }

    activateAffirmation(card) {
        // Toggle active class for Glow effect
        // Remove active from others to focus on one? Or allow multiple? 
        // Let's toggle for now.

        if (card.classList.contains('active')) {
            card.classList.remove('active');
        } else {
            // Optional: Warm background change could go here via document.body.style
            card.classList.add('active');

            // Play gentle sound if we had one.

            // Auto remove glow after some time for "pulse" feel
            setTimeout(() => {
                card.classList.remove('active');
            }, 3000);
        }
    }
}
