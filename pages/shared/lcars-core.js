// ============================================
// LCARS SHARED JAVASCRIPT - Core Functions
// ============================================

const API_BASE = window.location.origin;
let audioContext = null;

// =====================================================
// Audio System
// =====================================================
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playBeep(frequency = 800, duration = 0.1, type = 'square') {
    try {
        const ctx = initAudio();
        if (ctx.state === 'suspended') ctx.resume();
        
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
        // Audio not supported
    }
}

function playSuccessSound() {
    playBeep(880, 0.1);
    setTimeout(() => playBeep(1100, 0.15), 100);
}

function playErrorSound() {
    playBeep(300, 0.2, 'sawtooth');
    setTimeout(() => playBeep(200, 0.3, 'sawtooth'), 150);
}

// =====================================================
// Stardate Calculator
// =====================================================
function generateStardate() {
    const now = new Date();
    const year = now.getFullYear();
    const start = new Date(year, 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const stardate = ((year - 2000) * 1000) + (dayOfYear * 2.74) + (hours / 24 * 2.74);
    return stardate.toFixed(2);
}

function updateStardate() {
    const el = document.getElementById('stardate');
    if (el) {
        el.textContent = `STARDATE ${generateStardate()}`;
    }
}

// =====================================================
// API Communication
// =====================================================
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
}

async function executeTool(toolName, args = {}) {
    try {
        const result = await apiCall('/api/tools/execute', 'POST', { tool: toolName, args });
        return result;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// =====================================================
// UI Helpers
// =====================================================
function showLoading(containerId, message = 'PROCESSING...') {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="lcars-loading">
                <div class="warp-spinner"></div>
                <span class="loading-text">${message}</span>
            </div>
        `;
    }
}

function showOutput(containerId, output, isError = false) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="terminal-output ${isError ? 'error' : ''}">${escapeHtml(output)}</div>
        `;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatJson(obj) {
    try {
        return JSON.stringify(obj, null, 2);
    } catch {
        return String(obj);
    }
}

// =====================================================
// Status Check
// =====================================================
async function checkServerStatus() {
    try {
        const status = await apiCall('/api/status');
        updateStatusDisplay(status.status === 'online');
        return status;
    } catch (error) {
        updateStatusDisplay(false);
        return null;
    }
}

function updateStatusDisplay(online) {
    const dot = document.querySelector('.status-dot');
    const text = document.querySelector('.status-text');
    const badge = document.querySelector('.status-badge');
    
    if (dot) {
        dot.style.background = online ? 'var(--console-green)' : 'var(--alert-red)';
    }
    if (text) {
        text.textContent = online ? 'ONLINE' : 'OFFLINE';
        text.style.color = online ? 'var(--console-green)' : 'var(--alert-red)';
    }
    if (badge) {
        badge.style.borderColor = online ? 'var(--console-green)' : 'var(--alert-red)';
        badge.style.background = online ? 'rgba(0,255,65,0.2)' : 'rgba(255,0,0,0.2)';
    }
}

// =====================================================
// Common Tool Execution with UI
// =====================================================
async function runTool(toolName, args = {}, outputId = 'output') {
    playBeep();
    showLoading(outputId, `EXECUTING ${toolName.toUpperCase()}...`);
    
    try {
        const result = await executeTool(toolName, args);
        
        if (result.success) {
            playSuccessSound();
            showOutput(outputId, result.output);
        } else {
            playErrorSound();
            showOutput(outputId, result.error || 'Command failed', true);
        }
        
        return result;
    } catch (error) {
        playErrorSound();
        showOutput(outputId, `Error: ${error.message}`, true);
        return { success: false, error: error.message };
    }
}

// =====================================================
// Form Helpers
// =====================================================
function getFormValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function setFormValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
}

function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) form.reset();
}

// =====================================================
// Smoothness Pass: panel entrance + ripple feedback
// =====================================================
let _entranceAnimationsApplied = false;
function applyEntranceAnimations() {
    if (_entranceAnimationsApplied) return;
    _entranceAnimationsApplied = true;
    const reduce = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const panels = Array.from(document.querySelectorAll(
        '.lcars-panel, .rt-panel, .hub-card'
    ));
    if (!panels.length) return;

    // Fold-aware classification: above-the-fold panels cascade
    // immediately; below-the-fold panels reveal on scroll.
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    const aboveFold = [];
    const belowFold = [];
    panels.forEach((p) => {
        const rect = p.getBoundingClientRect();
        if (rect.top < viewportH * 0.9) aboveFold.push(p);
        else belowFold.push(p);
    });

    // Removing .lcars-enter on animationend lets the panel's :hover
    // transform take over cleanly afterward — otherwise the entrance
    // animation's forwards-held transform would mask hover lifts.
    function bindEnterCleanup(el) {
        el.addEventListener('animationend', function onEnd(ev) {
            if (ev.animationName !== 'lcarsPanelEnter') return;
            el.classList.remove('lcars-enter');
            el.removeEventListener('animationend', onEnd);
        });
    }

    aboveFold.forEach((p, i) => {
        p.style.setProperty('--enter-delay', (i * 70) + 'ms');
        bindEnterCleanup(p);
        p.classList.add('lcars-enter');
    });

    if (!('IntersectionObserver' in window) || !belowFold.length) {
        belowFold.forEach((p, i) => {
            p.style.setProperty('--enter-delay', (i * 70) + 'ms');
            bindEnterCleanup(p);
            p.classList.add('lcars-enter');
        });
        return;
    }
    let revealCount = 0;
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.style.setProperty('--enter-delay', (revealCount * 70) + 'ms');
            revealCount++;
            el.classList.remove('lcars-pre-reveal');
            bindEnterCleanup(el);
            el.classList.add('lcars-enter');
            io.unobserve(el);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    // Pre-hide below-the-fold panels so a fast scroll can't catch them
    // in their final state before the IntersectionObserver fires.
    belowFold.forEach((p) => {
        p.classList.add('lcars-pre-reveal');
        io.observe(p);
    });
}

function attachRippleFeedback() {
    const reduce = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    document.addEventListener('pointerdown', (e) => {
        const target = e.target.closest('.lcars-btn, .back-btn, .tool-card, .hub-card, .quick-link');
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 0.6;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width  = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }, { passive: true });
}

// =====================================================
// Initialization
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio on first click
    document.body.addEventListener('click', () => initAudio(), { once: true });
    
    // Start stardate
    updateStardate();
    setInterval(updateStardate, 1000);
    
    // Check server status
    checkServerStatus();
    setInterval(checkServerStatus, 30000);
    
    // Add hover sounds
    document.querySelectorAll('.lcars-btn, .tool-card, .back-btn, .hub-card, .quick-link').forEach(el => {
        el.addEventListener('mouseenter', () => playBeep(600, 0.05));
    });

    // Smoothness pass — staggered panel entrance + ripple feedback
    applyEntranceAnimations();
    attachRippleFeedback();
});

// =====================================================
// Navigation
// =====================================================
function navigateTo(page) {
    playBeep();
    window.location.href = page;
}

function goBack() {
    playBeep();
    window.history.back();
}

function goHome() {
    playBeep();
    window.location.href = '/';
}
