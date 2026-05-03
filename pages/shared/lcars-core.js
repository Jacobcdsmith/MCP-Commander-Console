// ============================================
// Command Center SHARED JAVASCRIPT - Core Functions
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
// Mission Time Calculator
// =====================================================
function generateMissionTime() {
    const now = new Date();
    const year = now.getFullYear();
    const start = new Date(year, 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const missionTime = ((year - 2000) * 1000) + (dayOfYear * 2.74) + (hours / 24 * 2.74);
    return missionTime.toFixed(2);
}

function updateMissionTime() {
    const el = document.getElementById('mission-time');
    if (el) {
        el.textContent = `MISSION TIME ${generateMissionTime()}`;
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
// AI-Assisted Findings Triage
// =====================================================
let _triageStatusCache = null;
async function getTriageStatus() {
    if (_triageStatusCache) return _triageStatusCache;
    try {
        _triageStatusCache = await apiCall('/api/triage/status');
    } catch (e) {
        _triageStatusCache = { configured: false };
    }
    return _triageStatusCache;
}

function _triageEsc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;');
}

function _triageRenderItems(triage) {
    const items = (triage.items || []).map((it) => `
        <div class="triage-item">
            <div class="triage-item-head">
                <span class="severity-pill severity-${_triageEsc(it.severity)}">${_triageEsc(it.severity)}</span>
                <span class="triage-item-title">${_triageEsc(it.title)}</span>
            </div>
            <div class="triage-section"><span class="triage-section-label">What</span>${_triageEsc(it.what)}</div>
            <div class="triage-section"><span class="triage-section-label">Why</span>${_triageEsc(it.why)}</div>
            <div class="triage-section"><span class="triage-section-label">Next step</span>${_triageEsc(it.next_step)}</div>
        </div>
    `).join('');
    return `<div class="triage-items">${items || '<div class="triage-section">No items returned.</div>'}</div>`;
}

function _triageToMarkdown(triage, kind) {
    const lines = [
        `# AI Triage — ${String(kind || '').toUpperCase()}`,
        ``,
        `**Overall severity:** ${triage.overall_severity}`,
        ``,
        triage.summary ? `> ${triage.summary}` : '',
        ``,
    ];
    (triage.items || []).forEach((it, i) => {
        lines.push(`## ${i + 1}. [${(it.severity || '').toUpperCase()}] ${it.title}`);
        lines.push(`**What:** ${it.what}`);
        lines.push(`**Why:** ${it.why}`);
        lines.push(`**Next step:** ${it.next_step}`);
        lines.push(``);
    });
    return lines.join('\n');
}

/**
 * Mount a "Triage with AI" affordance for a finding.
 *
 * @param {Object} opts
 * @param {string} opts.containerId   - id of the result container we live below
 * @param {string} opts.kind          - 'inject'|'subdomain'|'portscan'|'auth'|'audit'
 * @param {Function} opts.getPayload  - returns the raw scan JSON to triage (or null when nothing to triage)
 * @param {string} [opts.label]       - button label override
 */
async function mountTriage(opts) {
    const container = document.getElementById(opts.containerId);
    if (!container) return;
    const status = await getTriageStatus();

    // Wrapper: launcher + result panel, both reused per-click.
    let host = container.querySelector('.triage-host');
    if (!host) {
        host = document.createElement('div');
        host.className = 'triage-host';
        container.appendChild(host);
    }
    host.innerHTML = '';

    const launcher = document.createElement('div');
    launcher.className = 'triage-launcher';
    const btn = document.createElement('button');
    btn.className = 'triage-btn';
    btn.type = 'button';
    btn.innerHTML = `🤖 ${opts.label || 'Triage with AI'}`;
    if (!status.configured) {
        btn.disabled = true;
        btn.title = 'Configure an LLM key to enable AI triage';
    }
    launcher.appendChild(btn);

    const hint = document.createElement('span');
    hint.className = 'triage-hint';
    if (status.configured) {
        hint.textContent = `via ${status.provider || 'anthropic'} · ${status.model || ''}`;
    } else {
        hint.innerHTML = `AI triage unavailable — <a href="https://docs.replit.com/replit-workspace/integrations" target="_blank" rel="noopener" style="color:#cc99ff;text-decoration:underline;">configure the Anthropic integration</a> (or set <code>ANTHROPIC_API_KEY</code>) to enable.`;
    }
    launcher.appendChild(hint);
    host.appendChild(launcher);

    const result = document.createElement('div');
    result.className = 'triage-result-slot';
    host.appendChild(result);

    btn.addEventListener('click', async () => {
        if (btn.disabled) return;
        const payload = (typeof opts.getPayload === 'function') ? opts.getPayload() : null;
        if (payload == null) {
            result.innerHTML = `<div class="triage-error">Run a scan first — there's nothing to triage yet.</div>`;
            return;
        }
        playBeep(660, 0.06);
        btn.disabled = true;
        result.innerHTML = `
            <div class="triage-result">
                <div class="triage-loading">
                    <span class="triage-loading-dot"></span>
                    <span class="triage-loading-dot"></span>
                    <span class="triage-loading-dot"></span>
                    <span>Triaging finding with AI…</span>
                </div>
            </div>`;
        try {
            const resp = await fetch('/api/triage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kind: opts.kind, payload })
            });
            const data = await resp.json().catch(() => ({}));
            if (!resp.ok || !data.success) {
                if (resp.status === 502 && data && data.raw) {
                    result.innerHTML = `
                        <div class="triage-result">
                            <div class="triage-error">⚠ The model returned malformed JSON. Showing raw output below — please retry.</div>
                            <pre class="triage-section" style="white-space:pre-wrap;max-height:320px;overflow:auto;margin-top:10px;">${_triageEsc(data.raw)}</pre>
                        </div>`;
                    playErrorSound();
                    return;
                }
                throw new Error((data && data.error) || `HTTP ${resp.status}: ${resp.statusText}`);
            }
            const t = data.triage;
            result.innerHTML = `
                <div class="triage-result">
                    <div class="triage-header">
                        <span class="severity-pill severity-${_triageEsc(t.overall_severity)}">${_triageEsc(t.overall_severity)}</span>
                        <span class="triage-header-title">AI Triage</span>
                        <span class="triage-header-meta">${_triageEsc(data.model || '')} · ${data.durationMs || 0} ms</span>
                    </div>
                    ${t.summary ? `<div class="triage-summary">${_triageEsc(t.summary)}</div>` : ''}
                    ${_triageRenderItems(t)}
                    <div class="triage-actions">
                        <button class="triage-copy-btn" type="button">Copy summary</button>
                    </div>
                </div>`;
            const copyBtn = result.querySelector('.triage-copy-btn');
            const md = _triageToMarkdown(t, opts.kind);
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(md);
                    copyBtn.textContent = 'Copied ✓';
                    setTimeout(() => { copyBtn.textContent = 'Copy summary'; }, 1500);
                } catch {
                    copyBtn.textContent = 'Copy failed';
                }
            });
            playSuccessSound();
        } catch (e) {
            result.innerHTML = `<div class="triage-error">${_triageEsc(e.message || 'Triage failed')}</div>`;
            playErrorSound();
        } finally {
            btn.disabled = !status.configured ? true : false;
        }
    });
}

// =====================================================
// Initialization
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio on first click
    document.body.addEventListener('click', () => initAudio(), { once: true });
    
    // Start mission-time clock
    updateMissionTime();
    setInterval(updateMissionTime, 1000);
    
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
