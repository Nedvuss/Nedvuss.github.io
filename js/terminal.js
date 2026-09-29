window.terminalState = 'idle'; 
window.mailData = { subject: '', body: '' };
window.commandHistory = [];
window.historyIndex = -1;

function initTerminal() {
    const termInput = document.getElementById('term-input');
    const termBody = document.getElementById('term-body');
    const termPrompt = termInput ? termInput.previousElementSibling : null;

    if (termInput) {
        termInput.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (window.commandHistory.length > 0 && window.historyIndex > 0) {
                    window.historyIndex--;
                    this.value = window.commandHistory[window.historyIndex];
                }
                return;
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (window.historyIndex < window.commandHistory.length - 1) {
                    window.historyIndex++;
                    this.value = window.commandHistory[window.historyIndex];
                } else {
                    window.historyIndex = window.commandHistory.length;
                    this.value = '';
                }
                return;
            } else if (e.key === 'Enter') {
                const command = this.value.trim();

                if (command !== '' && window.terminalState === 'idle') {
                    window.commandHistory.push(command);
                    window.historyIndex = window.commandHistory.length;
                }

                const pastInputLine = document.createElement('div');
                pastInputLine.className = 'term-input-line';
                const currentPromptHTML = termPrompt.innerHTML;
                pastInputLine.innerHTML = `<span class="term-prompt">${currentPromptHTML}</span> <span style="color:var(--text);">${command}</span>`;
                termBody.insertBefore(pastInputLine, this.parentElement);

                if (window.terminalState === 'idle') {
                    if (command !== '') {
                        handleTerminalCommand(command, termBody, this.parentElement);
                    }
                } else if (window.terminalState === 'mail_subject') {
                    window.mailData.subject = command;
                    window.terminalState = 'mail_body';
                    termPrompt.innerHTML = translations[window.currentLang]['term-mail-body-prompt'];
                    termPrompt.setAttribute('data-i18n', 'term-mail-body-prompt');
                } else if (window.terminalState === 'mail_body') {
                    window.mailData.body = command;

                    // Send mail
                    window.location.href = `mailto:chamossetf74@gmail.com?subject=${encodeURIComponent(window.mailData.subject)}&body=${encodeURIComponent(window.mailData.body)}`;

                    const outputElement = document.createElement('p');
                    outputElement.className = 'term-output';
                    outputElement.innerHTML = translations[window.currentLang]['term-mail-sent'];
                    outputElement.setAttribute('data-i18n', 'term-mail-sent');
                    termBody.insertBefore(outputElement, this.parentElement);

                    window.terminalState = 'idle';
                    termPrompt.innerHTML = '<span class="user">root@FC</span><span class="at">:</span><span class="path">~</span><span class="char">#</span>';
                    termPrompt.removeAttribute('data-i18n');
                }

                this.value = '';
                termBody.scrollTop = termBody.scrollHeight;
            }
        });

        termBody.addEventListener('click', () => {
            termInput.focus();
        });
    }
}

function handleTerminalCommand(fullCmd, termBody, inputLineElement) {
    const outputElement = document.createElement('p');
    outputElement.className = 'term-output';

    const t = translations[window.currentLang];
    
    const args = fullCmd.split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
        case 'help':
        case 'aide':
            outputElement.innerHTML = t['term-help'];
            outputElement.setAttribute('data-i18n', 'term-help');
            break;
        case 'whoami':
        case 'quisuisje':
            outputElement.innerHTML = t['term-whoami'];
            outputElement.setAttribute('data-i18n', 'term-whoami');
            break;
        case 'ls':
        case 'dir':
            outputElement.innerHTML = t['term-ls'];
            outputElement.setAttribute('data-i18n', 'term-ls');
            break;
        case 'clear':
        case 'effacer':
            while (termBody.firstChild !== inputLineElement) {
                termBody.removeChild(termBody.firstChild);
            }
            return; 
        case 'contact':
            outputElement.innerHTML = t['term-contact'];
            outputElement.setAttribute('data-i18n', 'term-contact');
            break;
        case 'snake':
        case 'jeu':
            outputElement.innerHTML = "Initializing snake.sh... Check your screen.";
            window.initSnakeGame();
            break;
        case 'mail':
        case 'email':
        case 'courriel':
            outputElement.innerHTML = t['term-mail-init'];
            outputElement.setAttribute('data-i18n', 'term-mail-init');
            window.terminalState = 'mail_subject';
            inputLineElement.querySelector('.term-prompt').innerText = t['term-mail-sub-prompt'];
            inputLineElement.querySelector('.term-prompt').setAttribute('data-i18n', 'term-mail-sub-prompt');
            break;
        case 'date':
            outputElement.innerText = new Date().toString();
            break;
        case 'history':
        case 'historique':
            outputElement.innerHTML = window.commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('<br>');
            break;
        case 'sudo':
            outputElement.innerHTML = t['term-sudo'];
            outputElement.setAttribute('data-i18n', 'term-sudo');
            break;
        case 'neofetch':
            outputElement.innerHTML = `<pre style="color:#1793d1; font-weight:bold; font-size: 0.8rem; line-height: 1.2;">
       /\\        <span style="color:white; font-weight:bold;">root@FC</span>
      /  \\       -------------------
     /    \\      <span style="color:var(--primary);">OS</span>: Arch WebOS
    /      \\     <span style="color:var(--primary);">Kernel</span>: JS Engine
   /   ,,   \\    <span style="color:var(--primary);">Shell</span>: bash
  /   |  |   \\   <span style="color:var(--primary);">Uptime</span>: ${Math.floor(performance.now() / 1000)}s
 /_-''    ''-_\\  
            </pre>`;
            break;
        default:
            outputElement.innerHTML = `bash: ${cmd}: <span data-i18n="term-notfound">${t['term-notfound']}</span>`;
            break;
    }

    termBody.insertBefore(outputElement, inputLineElement);
}
