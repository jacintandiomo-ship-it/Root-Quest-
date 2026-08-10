/* ============================================
   ROOT QUEST - MOTEUR DE JEU (MONDE 1 + 2)
   ============================================ */

class VirtualFS {
  constructor(root) {
    this.root = JSON.parse(JSON.stringify(root));
    this.cwd = '/home/agent';
  }

  resolvePath(path) {
    if (!path || path === '~') return '/home/agent';
    if (path.startsWith('/')) return this.normalize(path);
    return this.normalize(this.cwd + '/' + path);
  }

  normalize(path) {
    const parts = path.split('/').filter(p => p.length > 0);
    const stack = [];
    for (const p of parts) {
      if (p === '..') { if (stack.length) stack.pop(); }
      else if (p !== '.') { stack.push(p); }
    }
    return '/' + stack.join('/');
  }

  getNode(path, followSymlink = true) {
    const parts = this.resolvePath(path).split('/').filter(p => p);
    let node = this.root;
    for (const p of parts) {
      if (!node.children || !node.children[p]) return null;
      node = node.children[p];
      if (followSymlink && node.type === 'symlink') {
        node = this.getNode(node.target, true);
        if (!node) return null;
      }
    }
    return node;
  }

  getParent(path) {
    const resolved = this.resolvePath(path);
    const parts = resolved.split('/').filter(p => p);
    const name = parts.pop();
    let node = this.root;
    for (const p of parts) {
      if (!node.children || !node.children[p]) return null;
      node = node.children[p];
    }
    return { parent: node, name: name, path: resolved };
  }

  formatSize(node) {
    if (node.type === 'dir') return '4096';
    if (node.content) return String(node.content.length);
    return '0';
  }

  formatPerms(node) {
    return node.perms || (node.type === 'dir' ? 'rwxr-xr-x' : 'rw-r--r--');
  }

  ls(path, options = {}) {
    const targetPath = path && !path.startsWith('-') ? path : null;
    const target = targetPath ? this.getNode(targetPath) : this.getNode(this.cwd);
    if (!target) return { error: 'ls: aucun fichier ou dossier de ce type' };
    if (target.type === 'file') return { output: path };

    let names = Object.keys(target.children).sort();
    if (!options.all) {
      names = names.filter(n => !n.startsWith('.'));
    }

    if (options.long) {
      const lines = names.map(n => {
        const child = target.children[n];
        const perms = (child.type === 'dir' ? 'd' : (child.type === 'symlink' ? 'l' : '-')) + this.formatPerms(child);
        const owner = child.owner || 'root';
        const group = child.group || 'root';
        const size = this.formatSize(child);
        const date = 'Aug 21 03:14';
        const nameOut = child.type === 'symlink' ? n + ' -> ' + (child.target || '?') : n + (child.type === 'dir' ? '/' : '');
        return `${perms} 1 ${owner} ${group} ${size.padStart(6)} ${date} ${nameOut}`;
      });
      return { output: lines.join('\n') || 'total 0' };
    }

    const colored = names.map(n => {
      const child = target.children[n];
      return child.type === 'dir' ? n + '/' : (child.type === 'symlink' ? n + '@' : n);
    });
    return { output: colored.join('  ') || '(dossier vide)' };
  }

  cd(path) {
    if (!path || path === '~') { this.cwd = '/home/agent'; return { output: '' }; }
    const target = this.getNode(path, false);
    if (!target) return { error: 'cd: ' + path + ': aucun fichier ou dossier de ce type' };
    if (target.type === 'symlink') {
      const real = this.getNode(path, true);
      if (!real || real.type !== 'dir') return { error: 'cd: ' + path + ": n'est pas un dossier" };
      this.cwd = this.resolvePath(target.target || path);
      return { output: '' };
    }
    if (target.type !== 'dir') return { error: 'cd: ' + path + ": n'est pas un dossier" };
    this.cwd = this.resolvePath(path);
    return { output: '' };
  }

  pwd() {
    return { output: this.cwd };
  }

  cat(path) {
    if (!path) return { error: 'cat: manque un argument' };
    const target = this.getNode(path);
    if (!target) return { error: 'cat: ' + path + ': aucun fichier ou dossier de ce type' };
    if (target.type === 'dir') return { error: 'cat: ' + path + ": est un dossier" };
    return { output: target.content || '' };
  }

  mkdir(path) {
    if (!path) return { error: 'mkdir: manque un argument' };
    const info = this.getParent(path);
    if (!info || !info.parent) return { error: 'mkdir: chemin invalide' };
    if (info.parent.type !== 'dir') return { error: 'mkdir: chemin invalide' };
    if (info.parent.children[info.name]) return { error: 'mkdir: ' + info.name + ': le fichier existe déjà' };
    info.parent.children[info.name] = { type: 'dir', owner: 'agent', group: 'agent', perms: 'rwxr-xr-x', children: {} };
    return { output: '' };
  }

  rmdir(path) {
    if (!path) return { error: 'rmdir: manque un argument' };
    const info = this.getParent(path);
    if (!info || !info.parent) return { error: 'rmdir: chemin invalide' };
    const target = info.parent.children[info.name];
    if (!target) return { error: 'rmdir: ' + info.name + ': aucun fichier ou dossier de ce type' };
    if (target.type !== 'dir') return { error: 'rmdir: ' + info.name + ": n'est pas un dossier" };
    if (Object.keys(target.children).length > 0) return { error: 'rmdir: ' + info.name + ': le dossier est vide' };
    delete info.parent.children[info.name];
    return { output: '' };
  }

  rm(path) {
    if (!path) return { error: 'rm: manque un argument' };
    const info = this.getParent(path);
    if (!info || !info.parent) return { error: 'rm: chemin invalide' };
    const target = info.parent.children[info.name];
    if (!target) return { error: 'rm: ' + info.name + ': aucun fichier ou dossier de ce type' };
    if (target.type === 'dir') return { error: 'rm: ' + info.name + ': est un dossier (utilisez rmdir ou rm -r)' };
    delete info.parent.children[info.name];
    return { output: '' };
  }

  rmrf(path) {
    if (!path) return { error: 'rm: manque un argument' };
    const info = this.getParent(path);
    if (!info || !info.parent) return { error: 'rm: chemin invalide' };
    const target = info.parent.children[info.name];
    if (!target) return { error: 'rm: ' + info.name + ': aucun fichier ou dossier de ce type' };
    delete info.parent.children[info.name];
    return { output: '' };
  }

  cp(src, dst) {
    if (!src || !dst) return { error: 'cp: manque un argument' };
    const srcNode = this.getNode(src);
    if (!srcNode) return { error: 'cp: ' + src + ': aucun fichier ou dossier de ce type' };
    if (srcNode.type === 'dir') return { error: 'cp: ' + src + ': est un dossier' };

    const dstNode = this.getNode(dst);
    let dstInfo;
    if (dstNode && dstNode.type === 'dir') {
      const srcInfo = this.getParent(src);
      dstInfo = { parent: dstNode, name: srcInfo.name };
    } else {
      dstInfo = this.getParent(dst);
    }

    if (!dstInfo || !dstInfo.parent) return { error: 'cp: chemin de destination invalide' };
    dstInfo.parent.children[dstInfo.name] = {
      type: 'file', owner: srcNode.owner || 'agent', group: srcNode.group || 'agent',
      perms: srcNode.perms || 'rw-r--r--', content: srcNode.content
    };
    return { output: '' };
  }

  mv(src, dst) {
    if (!src || !dst) return { error: 'mv: manque un argument' };
    const srcInfo = this.getParent(src);
    if (!srcInfo || !srcInfo.parent) return { error: 'mv: chemin source invalide' };
    const srcNode = srcInfo.parent.children[srcInfo.name];
    if (!srcNode) return { error: 'mv: ' + src + ': aucun fichier ou dossier de ce type' };

    const dstNode = this.getNode(dst);
    let dstInfo;
    if (dstNode && dstNode.type === 'dir') {
      dstInfo = { parent: dstNode, name: srcInfo.name };
    } else {
      dstInfo = this.getParent(dst);
    }

    if (!dstInfo || !dstInfo.parent) return { error: 'mv: chemin de destination invalide' };
    dstInfo.parent.children[dstInfo.name] = JSON.parse(JSON.stringify(srcNode));
    delete srcInfo.parent.children[srcInfo.name];
    return { output: '' };
  }

  touch(path) {
    if (!path) return { error: 'touch: manque un argument' };
    const info = this.getParent(path);
    if (!info || !info.parent) return { error: 'touch: chemin invalide' };
    if (!info.parent.children[info.name]) {
      info.parent.children[info.name] = { type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r--r--', content: '' };
    }
    return { output: '' };
  }

  // ===== MONDE 2 : PERMISSIONS =====

  chmod(mode, path) {
    if (!mode || !path) return { error: 'chmod: manque un argument' };
    const info = this.getParent(path);
    if (!info || !info.parent) return { error: 'chmod: chemin invalide' };
    const target = info.parent.children[info.name];
    if (!target) return { error: 'chmod: ' + info.name + ': aucun fichier ou dossier de ce type' };

    // Mode numérique
    if (/^[0-7]{3,4}$/.test(mode)) {
      const map = { '0': '---', '1': '--x', '2': '-w-', '3': '-wx', '4': 'r--', '5': 'r-x', '6': 'rw-', '7': 'rwx' };
      const digits = mode.split('');
      if (digits.length === 3) {
        target.perms = map[digits[0]] + map[digits[1]] + map[digits[2]];
      } else {
        // 4 digits : special bits
        target.perms = map[digits[1]] + map[digits[2]] + map[digits[3]];
        // On pourrait gérer SUID/SGID/sticky ici mais on garde simple
      }
      return { output: '' };
    }

    // Mode symbolique
    let perms = target.perms || 'rw-r--r--';
    const match = mode.match(/^([ugoa]*)([+-=])([rwxXst]+)$/);
    if (!match) return { error: 'chmod: mode invalide: ' + mode };

    const who = match[1] || 'a';
    const op = match[2];
    const what = match[3];

    const apply = (section, chars) => {
      let p = section;
      for (const c of chars) {
        if (op === '+') { if (!p.includes(c)) p += c; }
        else if (op === '-') { p = p.replace(c, '-'); }
        else if (op === '=') { p = chars.padEnd(3, '-').substring(0, 3); break; }
      }
      return p;
    };

    let newPerms = perms;
    if (who.includes('u') || who.includes('a')) newPerms = apply(newPerms.substring(0, 3), what) + newPerms.substring(3);
    if (who.includes('g') || who.includes('a')) {
      newPerms = newPerms.substring(0, 3) + apply(newPerms.substring(3, 6), what) + newPerms.substring(6);
    }
    if (who.includes('o') || who.includes('a')) {
      newPerms = newPerms.substring(0, 6) + apply(newPerms.substring(6, 9), what);
    }

    target.perms = newPerms;
    return { output: '' };
  }

  chown(ownerSpec, path) {
    if (!ownerSpec || !path) return { error: 'chown: manque un argument' };
    const info = this.getParent(path);
    if (!info || !info.parent) return { error: 'chown: chemin invalide' };
    const target = info.parent.children[info.name];
    if (!target) return { error: 'chown: ' + info.name + ': aucun fichier ou dossier de ce type' };

    if (ownerSpec.includes(':')) {
      const [owner, group] = ownerSpec.split(':');
      if (owner) target.owner = owner;
      if (group) target.group = group;
    } else {
      target.owner = ownerSpec;
    }
    return { output: '' };
  }

  chgrp(group, path) {
    if (!group || !path) return { error: 'chgrp: manque un argument' };
    const info = this.getParent(path);
    if (!info || !info.parent) return { error: 'chgrp: chemin invalide' };
    const target = info.parent.children[info.name];
    if (!target) return { error: 'chgrp: ' + info.name + ': aucun fichier ou dossier de ce type' };
    target.group = group;
    return { output: '' };
  }

  ln(src, dst, symlink = false) {
    if (!src || !dst) return { error: 'ln: manque un argument' };
    const dstInfo = this.getParent(dst);
    if (!dstInfo || !dstInfo.parent) return { error: 'ln: chemin de destination invalide' };

    if (symlink) {
      dstInfo.parent.children[dstInfo.name] = {
        type: 'symlink', owner: 'agent', group: 'agent', perms: 'rwxrwxrwx',
        target: src
      };
    } else {
      const srcNode = this.getNode(src);
      if (!srcNode) return { error: 'ln: ' + src + ': aucun fichier ou dossier de ce type' };
      dstInfo.parent.children[dstInfo.name] = JSON.parse(JSON.stringify(srcNode));
    }
    return { output: '' };
  }

  df() {
    return {
      output: `Système de fichiers    Taille  Utilisé  Dispo  U%  Monté sur
/dev/sda1               50G     12G    35G  26%  /
tmpfs                  2,0G    512M   1,5G  26%  /dev/shm
/dev/sdb1              100G     45G    50G  48%  /data`
    };
  }

  du(path) {
    const target = path ? this.getNode(path) : this.getNode(this.cwd);
    if (!target) return { error: 'du: ' + path + ': aucun fichier ou dossier de ce type' };

    const calcSize = (node) => {
      if (node.type === 'file') return (node.content || '').length;
      if (node.type === 'symlink') return 0;
      let total = 4096;
      if (node.children) {
        for (const child of Object.values(node.children)) {
          total += calcSize(child);
        }
      }
      return total;
    };

    const size = calcSize(target);
    const kb = Math.ceil(size / 1024);
    const mb = (size / (1024 * 1024)).toFixed(1);

    let display;
    if (kb < 1024) display = kb + 'K';
    else display = mb + 'M';

    const name = path || '.';
    return { output: display + '\t' + name };
  }
}

// ============================================
// MOTEUR DE JEU
// ============================================
class GameEngine {
  constructor() {
    this.fs = null;
    this.levelIndex = 0;
    this.levelState = {};
    this.commandHistory = [];
    this.historyIndex = -1;
    this.agentName = localStorage.getItem('rootquest-name') || 'Agent';
    this.agentGender = localStorage.getItem('rootquest-gender') || 'N';
    this.theme = localStorage.getItem('rootquest-theme') || 'cyberpunk';
    this.totalXP = parseInt(localStorage.getItem('rootquest-xp') || '0');

    this.historyEl = document.getElementById('terminal-history');
    this.inputEl = document.getElementById('terminal-input');
    this.promptEl = document.getElementById('terminal-prompt');

    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.theme);

    const genderIcon = this.agentGender === 'F' ? '👩' : this.agentGender === 'M' ? '👨' : '👤';
    document.getElementById('sidebar-agent').innerHTML = `
      <div class="agent-avatar">${genderIcon}</div>
      <div class="agent-name">${this.agentName}</div>
    `;
    this.updateXPDisplay();

    const savedLevel = localStorage.getItem('rootquest-level');
    this.levelIndex = savedLevel ? parseInt(savedLevel) : 0;
    if (this.levelIndex >= LEVELS.length) this.levelIndex = 0;

    this.renderWorldsSidebar();
    this.loadLevel(this.levelIndex);

    this.inputEl.addEventListener('keydown', (e) => this.handleKey(e));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.hint-box') && !e.target.closest('.hint-bar-btn') && !e.target.closest('.quick-btn')) {
        this.inputEl.focus();
      }
    });
    this.inputEl.focus();
  }

  renderWorldsSidebar() {
    const worlds = [
      { num: 1, name: "Les Fondations", desc: "Navigation, fichiers", unlocked: true },
      { num: 2, name: "Le Gardien", desc: "Permissions, liens", unlocked: true },
      { num: 3, name: "L'Arsenal", desc: "Paquets, processus", unlocked: false },
      { num: 4, name: "Les Réseaux", desc: "Services, SSH", unlocked: false },
      { num: 5, name: "L'Architecte", desc: "Bash, scripts", unlocked: false },
      { num: 6, name: "La Forteresse", desc: "Sécurité, SELinux", unlocked: false },
      { num: 7, name: "Le Maître", desc: "Docker, monitoring", unlocked: false },
    ];

    const container = document.getElementById('worlds-list');
    container.innerHTML = '';
    worlds.forEach(w => {
      const div = document.createElement('div');
      const isActive = w.num === LEVELS[this.levelIndex].world;
      div.className = 'world-item' + (w.unlocked ? '' : ' locked') + (isActive ? ' active' : '');
      div.innerHTML = `
        <div class="world-num">${w.num}</div>
        <div class="world-info">
          <span class="world-name">${w.name}</span>
          <span class="world-desc">${w.desc}</span>
        </div>
        <span class="world-status">${w.unlocked ? '✅' : '🔒'}</span>
      `;
      container.appendChild(div);
    });
  }

  updateProgress() {
    const pct = Math.round((this.levelIndex / LEVELS.length) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-text').textContent = pct + '% complété';
  }

  updateXPDisplay() {
    const xpText = `⭐ ${this.totalXP} XP`;
    const el = document.getElementById('sidebar-xp');
    if (el) el.textContent = xpText;
  }

  loadLevel(index) {
    if (index >= LEVELS.length) {
      this.print('🎉 Félicitations ! Vous avez terminé tous les mondes disponibles !', 'success');
      this.updateProgress();
      return;
    }
    this.levelIndex = index;
    this.levelState = { flags: {}, commands: [] };

    const lvl = LEVELS[index];

    const baseFS = getDefaultFS();
    if (lvl.fsModifier) lvl.fsModifier(baseFS);
    this.fs = new VirtualFS(baseFS);
    if (lvl.startCwd) this.fs.cwd = lvl.startCwd;

    document.getElementById('mission-badge').textContent = `MONDE ${lvl.world} — NIVEAU ${lvl.id}`;
    document.getElementById('mission-xp-badge').textContent = `+${lvl.xp} XP`;
    document.getElementById('mission-card-title').textContent = lvl.title;
    document.getElementById('mission-card-story').textContent = lvl.story;
    document.getElementById('mission-card-objective').innerHTML = lvl.objective.replace(/\n/g, '<br>');

    this.updateHints(lvl);
    this.renderWorldsSidebar();
    this.updateProgress();

    this.historyEl.innerHTML = '';
    this.print(`=== ROOT QUEST — Niveau ${lvl.id} : ${lvl.title} ===`, 'info');
    this.print(lvl.story, 'info');
    this.print('Objectif : ' + lvl.objective.replace(/\n/g, ' | '), 'info');
    this.print('Tapez help pour la liste. Tapez hint pour un indice.', 'hint');
    this.print('');
    this.updatePrompt();
  }

  updateHints(lvl) {
    const list = document.getElementById('hint-list');
    list.innerHTML = '';
    lvl.hints.forEach((hint, i) => {
      const div = document.createElement('div');
      div.className = 'hint-item';
      div.innerHTML = `<span class="hint-label">Indice ${i + 1}</span>${hint}`;
      list.appendChild(div);
    });
  }

  updatePrompt() {
    const shortCwd = this.fs.cwd.replace('/home/agent', '~');
    this.promptEl.textContent = `${this.agentName.toLowerCase()}@osiris:${shortCwd}$`;
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      const raw = this.inputEl.value.trim();
      this.inputEl.value = '';
      if (raw) this.execute(raw);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.inputEl.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputEl.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
      } else {
        this.historyIndex = -1;
        this.inputEl.value = '';
      }
    }
  }

  execute(raw) {
    try {
      this.commandHistory.push(raw);
      this.historyIndex = -1;
      this.levelState.commands.push(raw);

      this.printCmd(this.promptEl.textContent, raw);

      const parts = raw.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      let result = { output: '', error: null };

      switch (cmd) {
        case 'ls': {
          const opts = { long: false, all: false };
          const pathArg = args.find(a => !a.startsWith('-'));
          const optStr = args.filter(a => a.startsWith('-')).join('');
          if (optStr.includes('l')) opts.long = true;
          if (optStr.includes('a')) opts.all = true;
          result = this.fs.ls(pathArg, opts);
          break;
        }
        case 'cd': result = this.fs.cd(args[0]); break;
        case 'pwd': result = this.fs.pwd(); break;
        case 'cat': result = this.fs.cat(args[0]); break;
        case 'mkdir': result = this.fs.mkdir(args[0]); break;
        case 'rmdir': result = this.fs.rmdir(args[0]); break;
        case 'rm':
          if (args[0] === '-r' || args[0] === '-rf') {
            result = this.fs.rmrf(args[1]);
          } else {
            result = this.fs.rm(args[0]);
          }
          break;
        case 'cp': result = this.fs.cp(args[0], args[1]); break;
        case 'mv': result = this.fs.mv(args[0], args[1]); break;
        case 'touch': result = this.fs.touch(args[0]); break;
        case 'chmod': result = this.fs.chmod(args[0], args[1]); break;
        case 'chown': result = this.fs.chown(args[0], args[1]); break;
        case 'chgrp': result = this.fs.chgrp(args[0], args[1]); break;
        case 'ln':
          if (args[0] === '-s') {
            result = this.fs.ln(args[1], args[2], true);
          } else {
            result = this.fs.ln(args[0], args[1], false);
          }
          break;
        case 'df': result = this.fs.df(); break;
        case 'du': result = this.fs.du(args.find(a => !a.startsWith('-'))); break;
        case 'clear': this.historyEl.innerHTML = ''; result = { output: '' }; break;
        case 'help':
          result = {
            output: `Commandes disponibles :
  ls [options] [chemin]   - Lister (options: -l, -a, -la)
  cd [chemin]             - Changer de dossier
  pwd                     - Afficher le dossier courant
  cat <fichier>           - Lire un fichier
  mkdir <dossier>         - Créer un dossier
  rmdir <dossier>         - Supprimer un dossier vide
  rm <fichier>            - Supprimer un fichier
  rm -r <dossier>         - Supprimer un dossier et son contenu
  cp <src> <dst>          - Copier
  mv <src> <dst>          - Déplacer
  touch <fichier>         - Créer un fichier vide
  chmod <mode> <fichier>  - Changer permissions (ex: 755, u+x)
  chown <user> <fichier>  - Changer propriétaire
  chgrp <group> <fichier> - Changer groupe
  ln <src> <dst>          - Lien dur
  ln -s <src> <dst>       - Lien symbolique
  df -h                   - Espace disque
  du -sh <chemin>         - Taille d'un dossier
  man <commande>          - Lire le manuel
  hint                    - Afficher un indice
  clear                   - Effacer le terminal
  help                    - Cette aide`
          };
          break;
        case 'man':
          if (!args[0]) {
            result = { error: 'man: manque un argument. Essayez : man ls' };
          } else {
            const page = MAN_PAGES[args[0]];
            if (page) result = { output: page };
            else result = { error: 'man: aucune page de manuel pour ' + args[0] };
          }
          break;
        case 'hint':
        case 'h':
          showHintOverlay();
          result = { output: '' };
          break;
        default:
          result = { error: `${cmd}: commande inconnue. Tapez help pour la liste.` };
      }

      if (result.error) this.print(result.error, 'error');
      if (result.output) this.print(result.output, 'output');

      this.updatePrompt();
      this.checkObjective(cmd, args);
    } catch (err) {
      this.print('Erreur interne: ' + err.message, 'error');
      console.error(err);
    }
  }

  checkObjective(cmd, args) {
    const lvl = LEVELS[this.levelIndex];
    const check = lvl.check(this.levelState, this.fs.root, cmd, args, this.fs.cwd);
    if (check && check.success) {
      this.print(check.message, 'success');
      this.showVictory(lvl, check.message);
    }
  }

  showVictory(lvl, msg) {
    this.totalXP += lvl.xp;
    localStorage.setItem('rootquest-xp', this.totalXP);
    localStorage.setItem('rootquest-level', this.levelIndex + 1);

    this.updateXPDisplay();

    const learned = JSON.parse(localStorage.getItem('rootquest-cmdhistory') || '[]');
    this.levelState.commands.forEach(c => {
      const base = c.split(' ')[0];
      if (!learned.includes(base)) learned.push(base);
    });
    localStorage.setItem('rootquest-cmdhistory', JSON.stringify(learned));

    document.getElementById('victory-title').textContent = `Niveau ${lvl.id} terminé !`;
    document.getElementById('victory-message').textContent = msg || 'Mission accomplie !';
    document.getElementById('victory-xp').textContent = `+${lvl.xp} XP  |  Total: ${this.totalXP} XP`;

    const nextBtn = document.getElementById('victory-next');
    if (this.levelIndex + 1 >= LEVELS.length) {
      nextBtn.textContent = '🏆 Tous les mondes terminés !';
    } else {
      nextBtn.textContent = 'Niveau suivant ➜';
    }

    document.getElementById('victory-overlay').classList.add('active');
  }

  print(text, type = 'output') {
    const div = document.createElement('div');
    div.className = 'hist-line hist-' + type;
    div.textContent = text;
    this.historyEl.appendChild(div);
    this.historyEl.scrollTop = this.historyEl.scrollHeight;
  }

  printCmd(prompt, cmd) {
    const div = document.createElement('div');
    div.className = 'hist-line';
    div.innerHTML = `<span class="hist-prompt">${prompt}</span><span class="hist-cmd">${cmd}</span>`;
    this.historyEl.appendChild(div);
    this.historyEl.scrollTop = this.historyEl.scrollHeight;
  }
}

// Fonctions globales
function showHintOverlay() {
  document.getElementById('hint-overlay').classList.add('active');
}
function hideHintOverlay(e) {
  if (!e || e.target.id === 'hint-overlay') {
    document.getElementById('hint-overlay').classList.remove('active');
    setTimeout(() => document.getElementById('terminal-input').focus(), 100);
  }
}
function nextLevel() {
  document.getElementById('victory-overlay').classList.remove('active');
  if (window.game) window.game.loadLevel(window.game.levelIndex + 1);
}
function injectCmd(cmd) {
  const input = document.getElementById('terminal-input');
  input.value = cmd + ' ';
  input.focus();
}

// Démarrer
document.addEventListener('DOMContentLoaded', () => {
  window.game = new GameEngine();
});
