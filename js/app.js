
// DOM Elements
const views = {
    home: document.getElementById('home-view'),
    dump: document.getElementById('dump-view'),
    restore: document.getElementById('restore-view')
};

// Simple Router
function navigateTo(route) {
    // Hide all views
    Object.values(views).forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('active');
    });

    // Show target view
    const targetView = views[route];
    if (targetView) {
        targetView.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        requestAnimationFrame(() => {
            targetView.classList.add('active');
        });
    }
}

// Event Listeners for Navigation
document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
        const route = e.target.getAttribute('data-route');
        navigateTo(route);
    });
});

import { DumpZone } from './components/DumpZone.js';
import { RestoreZone } from './components/RestoreZone.js';

// Initialize
function init() {
    console.log("Emotional Dumping Ground Initialized");
    new DumpZone();
    new RestoreZone();
    navigateTo('home');
}

// Start
document.addEventListener('DOMContentLoaded', init);
