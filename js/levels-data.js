/* ============================================
   ROOT QUEST - DONNÉES DES NIVEAUX
   Monde 1 : Les Fondations
   Monde 2 : Le Gardien des Secrets
   ============================================ */

function getDefaultFS() {
  return {
    type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x',
    children: {
      'home': {
        type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x',
        children: {
          'agent': {
            type: 'dir', owner: 'agent', group: 'agent', perms: 'rwxr-xr-x',
            children: {
              'missions': { type: 'dir', owner: 'agent', group: 'agent', perms: 'rwxr-xr-x', children: {} },
              'preuves': { type: 'dir', owner: 'agent', group: 'agent', perms: 'rwxr-xr-x', children: {} },
              'bureau': { type: 'dir', owner: 'agent', group: 'agent', perms: 'rwxr-xr-x', children: {
                'note.txt': { type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r--r--', content: 'Note du bureau: N\'oubliez pas de scanner régulièrement.' }
              }},
              'virus.log': { type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r--r--', content: 'ALERTE: Virus "Glitch Éternel" détecté.\nSignature: 0xDEADBEEF\nPropagation: RAPIDE' },
              'bienvenue.txt': { type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r--r--', content: 'Bienvenue agent. Votre mission commence ici.\nUtilisez la commande apprise au Monde 1 pour scanner votre environnement.' }
            }
          }
        }
      },
      'tmp': {
        type: 'dir', owner: 'root', group: 'root', perms: 'rwxrwxrwt',
        children: {
          'trace.txt': { type: 'file', owner: 'root', group: 'root', perms: 'rw-r--r--', content: 'TRACE: IP source 192.168.666.0\nPort: 31337\nPayload: shell_reverse_tcp' }
        }
      },
      'etc': {
        type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x',
        children: {
          'passwd': { type: 'file', owner: 'root', group: 'root', perms: 'rw-r--r--', content: 'root:x:0:0:root:/root:/bin/bash\nagent:x:1000:1000:Agent O.S.I.R.I.S.:/home/agent:/bin/bash' },
          'hosts': { type: 'file', owner: 'root', group: 'root', perms: 'rw-r--r--', content: '127.0.0.1 localhost\n192.168.1.1 gateway.osiris.gov' }
        }
      },
      'var': {
        type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x',
        children: {
          'log': {
            type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x',
            children: {
              'syslog': { type: 'file', owner: 'root', group: 'root', perms: 'rw-r-----', content: 'Aug 21 03:14:01 kernel: INTRUSION DETECTED' }
            }
          }
        }
      },
      'bin': {
        type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x',
        children: {
          'ls': { type: 'file', owner: 'root', group: 'root', perms: 'rwxr-xr-x', content: '[binaire]' },
          'cat': { type: 'file', owner: 'root', group: 'root', perms: 'rwxr-xr-x', content: '[binaire]' },
          'pwd': { type: 'file', owner: 'root', group: 'root', perms: 'rwxr-xr-x', content: '[binaire]' }
        }
      },
      'usr': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: { 'share': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: {} } } },
      'boot': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: { 'vmlinuz': { type: 'file', owner: 'root', group: 'root', perms: 'rwxr-xr-x', content: '[noyau]' } } },
      'dev': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: { 'null': { type: 'file', owner: 'root', group: 'root', perms: 'rw-rw-rw-', content: '[dev]' } } },
      'proc': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: { 'cpuinfo': { type: 'file', owner: 'root', group: 'root', perms: 'r--r--r--', content: 'processor: 0' } } },
      'root': { type: 'dir', owner: 'root', group: 'root', perms: 'rwx------', children: { '.top_secret': { type: 'file', owner: 'root', group: 'root', perms: 'rw-------', content: 'Accès interdit. Niveau root requis.' } } },
      'sbin': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: { 'reboot': { type: 'file', owner: 'root', group: 'root', perms: 'rwxr-xr-x', content: '[binaire]' } } },
      'lib': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: {} },
      'opt': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: {} },
      'media': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: {} },
      'mnt': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: {} },
      'srv': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: {} },
      'sys': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: {} },
      'run': { type: 'dir', owner: 'root', group: 'root', perms: 'rwxr-xr-x', children: {} }
    }
  };
}

const MAN_PAGES = {
  'ls': `LS(1)                        Manuel de l'agent                        LS(1)

NOM
       ls - lister le contenu d'un répertoire

SYNOPSIS
       ls [OPTION]... [FICHIER]...

DESCRIPTION
       Affiche les informations sur les FICHIERs.

OPTIONS
       -a, --all       ne pas ignorer les entrées commençant par .
       -l              utiliser le format de liste long
       -h              avec -l, tailles lisibles

EXEMPLES
       ls              liste le répertoire courant
       ls /etc         liste le dossier /etc
       ls -la          liste détaillée avec fichiers cachés`,

  'cd': `CD(1)                        Manuel de l'agent                        CD(1)

NOM
       cd - changer le répertoire de travail courant

SYNOPSIS
       cd [RÉPERTOIRE]

DESCRIPTION
       Change le répertoire courant vers RÉPERTOIRE.

EXEMPLES
       cd /tmp         va dans /tmp
       cd ..           remonte d'un niveau
       cd ~            va dans le home`,

  'pwd': `PWD(1)                       Manuel de l'agent                       PWD(1)

NOM
       pwd - afficher le nom du répertoire de travail courant

SYNOPSIS
       pwd

DESCRIPTION
       Affiche le chemin absolu du répertoire où vous vous trouvez.`,

  'cat': `CAT(1)                       Manuel de l'agent                       CAT(1)

NOM
       cat - concaténer des fichiers et les afficher

SYNOPSIS
       cat [FICHIER]...

DESCRIPTION
       Affiche le contenu des FICHIERs sur la sortie standard.`,

  'mkdir': `MKDIR(1)                     Manuel de l'agent                     MKDIR(1)

NOM
       mkdir - créer des répertoires

SYNOPSIS
       mkdir [OPTION]... RÉPERTOIRE...

DESCRIPTION
       Crée les répertoires s'ils n'existent pas déjà.`,

  'rm': `RM(1)                        Manuel de l'agent                        RM(1)

NOM
       rm - supprimer des fichiers ou répertoires

SYNOPSIS
       rm [OPTION]... FICHIER...

OPTIONS
       -r, -R    supprimer récursivement les répertoires
       -f        forcer`,

  'cp': `CP(1)                        Manuel de l'agent                        CP(1)

NOM
       cp - copier des fichiers et répertoires

SYNOPSIS
       cp [OPTION]... SOURCE... DEST`,

  'mv': `MV(1)                        Manuel de l'agent                        MV(1)

NOM
       mv - déplacer (renommer) des fichiers

SYNOPSIS
       mv [OPTION]... SOURCE... DEST`,

  'rmdir': `RMDIR(1)                     Manuel de l'agent                     RMDIR(1)

NOM
       rmdir - supprimer des répertoires vides

SYNOPSIS
       rmdir [OPTION]... RÉPERTOIRE...`,

  'chmod': `CHMOD(1)                     Manuel de l'agent                     CHMOD(1)

NOM
       chmod - changer les permissions d'un fichier

SYNOPSIS
       chmod [OPTION]... MODE[,MODE]... FICHIER...
       chmod [OPTION]... OCTAL-MODE FICHIER...

DESCRIPTION
       Change les permissions de FICHIER.

MODE symbolique : [ugoa...][+-=][rwxXst]
  u = user, g = group, o = other, a = all
  + = ajouter, - = retirer, = = définir
  r = read, w = write, x = execute

MODE numérique : 3 chiffres (0-7)
  4 = read, 2 = write, 1 = execute
  Ex: 755 = rwxr-xr-x, 644 = rw-r--r--

EXEMPLES
       chmod u+x script.sh      ajoute exécution au propriétaire
       chmod 755 dossier        rwxr-xr-x
       chmod 644 fichier.txt    rw-r--r--`,

  'chown': `CHOWN(1)                     Manuel de l'agent                     CHOWN(1)

NOM
       chown - changer le propriétaire et le groupe d'un fichier

SYNOPSIS
       chown [OPTION]... [PROPRIÉTAIRE][:[GROUPE]] FICHIER...

DESCRIPTION
       Change le propriétaire et/ou le groupe de FICHIER.

EXEMPLES
       chown root fichier.txt      change le propriétaire en root
       chown agent:agent fichier   change propriétaire et groupe`,

  'chgrp': `CHGRP(1)                     Manuel de l'agent                     CHGRP(1)

NOM
       chgrp - changer le groupe d'un fichier

SYNOPSIS
       chgrp [OPTION]... GROUPE FICHIER...

EXEMPLES
       chgrp sudo fichier.txt      change le groupe en sudo`,

  'ln': `LN(1)                        Manuel de l'agent                        LN(1)

NOM
       ln - créer des liens entre fichiers

SYNOPSIS
       ln [OPTION]... [-T] CIBLE LIEN
       ln [OPTION]... CIBLE... RÉPERTOIRE

DESCRIPTION
       Par défaut, crée un lien DUR.
       Avec -s, crée un lien SYMBOLIQUE (raccourci).

EXEMPLES
       ln original.txt copie_dure.txt     lien dur
       ln -s /etc/hosts mon_lien          lien symbolique`,

  'df': `DF(1)                        Manuel de l'agent                        DF(1)

NOM
       df - rapport sur l'espace disque

SYNOPSIS
       df [OPTION]... [FICHIER]...

OPTIONS
       -h    tailles lisibles par l'homme (K, M, G)

EXEMPLES
       df -h    affiche l'espace disque de tous les systèmes`,

  'du': `DU(1)                        Manuel de l'agent                        DU(1)

NOM
       du - estimer l'utilisation de l'espace disque

SYNOPSIS
       du [OPTION]... [FICHIER]...

OPTIONS
       -s    n'afficher que le total pour chaque argument
       -h    tailles lisibles par l'homme

EXEMPLES
       du -sh /var/log    taille totale du dossier /var/log`,

  'man': `MAN(1)                       Manuel de l'agent                       MAN(1)

NOM
       man - interface de consultation des manuels

SYNOPSIS
       man [OPTION]... PAGE...`
};

/* ============================================
   MONDE 1 : Les Fondations
   ============================================ */
const LEVELS = [
  {
    id: '1-1', world: 1, title: "L'Éveil",
    story: "Votre terminal vient de s'activer. Vous êtes dans votre bureau à l'O.S.I.R.I.S. Avant toute chose, vous devez savoir ce qui vous entoure. Scanner la pièce pour trouver un indice.",
    objective: "Tapez la commande ls pour lister les éléments de votre bureau.",
    xp: 100, hints: [
      "La commande ls liste le contenu du répertoire courant.",
      "Tapez simplement : ls",
      "Vous êtes dans /home/agent. Faites ls pour voir vos fichiers."
    ],
    fsModifier: null, startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (cmd === 'ls') return { success: true, message: "✅ Mission accomplie ! Vous voyez les fichiers de votre bureau." };
      return { success: false };
    }
  },
  {
    id: '1-2', world: 1, title: "Premiers pas",
    story: "Un dossier 'missions' a été créé pour vous. Entrez-y pour découvrir ce qui vous attend. Puis revenez en arrière pour confirmer que vous maîtrisez les déplacements.",
    objective: "1. Entrez dans le dossier 'missions' avec cd.\n2. Revenez en arrière avec cd ..",
    xp: 150, hints: [
      "cd = Change Directory. cd missions entre dans le dossier.",
      "cd .. remonte d'un niveau (retour au parent).",
      "Vérifiez avec pwd à chaque étape si vous êtes perdu."
    ],
    fsModifier: null, startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      if (cmd === 'cd' && cwd === '/home/agent/missions') state.flags.inMissions = true;
      if (cmd === 'cd' && state.flags.inMissions && cwd === '/home/agent') state.flags.backHome = true;
      if (state.flags.inMissions && state.flags.backHome) {
        return { success: true, message: "✅ Vous savez avancer et reculer dans l'arborescence !" };
      }
      return { success: false };
    }
  },
  {
    id: '1-3', world: 1, title: "Où suis-je ?",
    story: "Vous avez été téléporté dans un répertoire inconnu par le système de sécurité. Vous êtes perdu. Utilisez vos compétences pour vous repérer.",
    objective: "1. Utilisez pwd pour connaître votre position.\n2. Utilisez ls pour voir ce qui vous entoure (révision de la leçon 1-1).",
    xp: 150, hints: [
      "pwd = Print Working Directory. Affiche le chemin complet.",
      "ls liste le contenu (vous l'avez appris au niveau 1-1).",
      "Faites pwd, puis ls. L'ordre n'a pas d'importance."
    ],
    fsModifier: null, startCwd: '/tmp',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      if (cmd === 'pwd') state.flags.didPwd = true;
      if (cmd === 'ls') state.flags.didLs = true;
      if (state.flags.didPwd && state.flags.didLs) {
        return { success: true, message: "✅ Vous êtes dans /tmp — la zone éphémère. Vous savez vous repérer !" };
      }
      return { success: false };
    }
  },
  {
    id: '1-4', world: 1, title: "Le Coffre",
    story: "Un fichier secret a été déposé dans votre bureau. Il contient un code d'accès crucial. Vous devez l'ouvrir.",
    objective: "Lisez le fichier secret.txt dans /home/agent avec la commande cat.",
    xp: 200, hints: [
      "cat affiche le contenu d'un fichier.",
      "Allez d'abord dans /home/agent (cd /home/agent ou cd ~).",
      "Puis : cat secret.txt"
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['secret.txt'] = {
        type: 'file', owner: 'agent', group: 'agent', perms: 'rw-------',
        content: 'CODE D\'ACCÈS: 7X-K9-ALPHA\n\nCe code ouvre la salle des serveurs.\nNe le perdez pas, agent.'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (cmd === 'cat') {
        const target = args[0];
        if (target === 'secret.txt' || target === '/home/agent/secret.txt') {
          return { success: true, message: "✅ Code déchiffré : 7X-K9-ALPHA. Le coffre est ouvert !" };
        }
      }
      return { success: false };
    }
  },
  {
    id: '1-5', world: 1, title: "L'Archiviste",
    story: "Les preuves s'accumulent. Vous devez créer une structure de dossiers pour classer les éléments de l'enquête. L'organisation est la clé de la victoire.",
    objective: "Créez le dossier 'rapport' dans /home/agent, puis entrez-y avec cd (révision de cd et ls).",
    xp: 250, hints: [
      "mkdir crée un dossier. mkdir rapport crée 'rapport'.",
      "Puis cd rapport pour entrer dedans.",
      "Vérifiez avec ls que vous êtes bien dedans."
    ],
    fsModifier: null, startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      const rapport = fs.children['home'].children['agent'].children['rapport'];
      if (rapport && rapport.type === 'dir') state.flags.created = true;
      if (cwd === '/home/agent/rapport') state.flags.entered = true;
      if (state.flags.created && state.flags.entered) {
        return { success: true, message: "✅ Structure créée ! Vous êtes un archiviste né." };
      }
      return { success: false };
    }
  },
  {
    id: '1-6', world: 1, title: "L'Effaceur",
    story: "Le virus 'Glitch Éternel' a laissé des fichiers corrompus dans votre bureau. Ils risquent de se propager. Nettoyez immédiatement !",
    objective: "Supprimez les fichiers corrompus : virus1.tmp, virus2.tmp\nSupprimez le dossier vide : quarantine_old",
    xp: 250, hints: [
      "rm supprime un fichier. rm virus1.tmp virus2.tmp",
      "rmdir supprime un dossier VIDE.",
      "Listez d'abord avec ls pour voir ce qui existe."
    ],
    fsModifier: (fs) => {
      const agent = fs.children['home'].children['agent'].children;
      agent['virus1.tmp'] = { type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r--r--', content: 'CORROMPU' };
      agent['virus2.tmp'] = { type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r--r--', content: 'CORROMPU' };
      agent['quarantine_old'] = { type: 'dir', owner: 'agent', group: 'agent', perms: 'rwxr-xr-x', children: {} };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      const agent = fs.children['home'].children['agent'].children;
      const filesGone = !agent['virus1.tmp'] && !agent['virus2.tmp'];
      const dirGone = !agent['quarantine_old'];
      if (filesGone) state.flags.rmDone = true;
      if (dirGone) state.flags.rmdirDone = true;
      if (state.flags.rmDone && state.flags.rmdirDone) {
        return { success: true, message: "✅ Zone nettoyée ! Les fragments viraux sont éliminés." };
      }
      return { success: false };
    }
  },
  {
    id: '1-7', world: 1, title: "Le Duplicata",
    story: "Une preuve cruciale doit être sauvegardée avant analyse. Vous devez la copier dans un endroit sûr avant qu'elle ne disparaisse.",
    objective: "Copiez le fichier preuve.txt vers preuve_backup.txt (tous deux dans /home/agent).",
    xp: 300, hints: [
      "cp source destination copie un fichier.",
      "cp preuve.txt preuve_backup.txt",
      "Vérifiez avec ls que les deux fichiers existent."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['preuve.txt'] = {
        type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r--r--',
        content: 'PREUVE CRUCIALE:\nHash: a3f5c8d2\nDescription: Fichier de configuration altéré.'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      const agent = fs.children['home'].children['agent'].children;
      if (agent['preuve_backup.txt']) {
        return { success: true, message: "✅ Preuve dupliquée ! L'original est en sécurité." };
      }
      return { success: false };
    }
  },
  {
    id: '1-8', world: 1, title: "Le Déménagement",
    story: "Un fichier sensible a été trouvé dans votre bureau. Il doit être déplacé vers la zone sécurisée /tmp pour quarantaine temporaire.",
    objective: "Déplacez /home/agent/sensible.txt vers /tmp/sensible.txt.",
    xp: 350, hints: [
      "mv source destination déplace un fichier.",
      "mv sensible.txt /tmp/ (depuis /home/agent)",
      "Ou : mv /home/agent/sensible.txt /tmp/sensible.txt"
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['sensible.txt'] = {
        type: 'file', owner: 'agent', group: 'agent', perms: 'rw-------',
        content: '[DONNÉES CLASSIFIÉES]'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      const hasInTmp = fs.children['tmp'].children['sensible.txt'];
      const hasInHome = fs.children['home'].children['agent'].children['sensible.txt'];
      if (hasInTmp && !hasInHome) {
        return { success: true, message: "✅ Fichier mis en quarantaine dans /tmp." };
      }
      return { success: false };
    }
  },
  {
    id: '1-9', world: 1, title: "Le Manuel",
    story: "L'O.S.I.R.I.S. utilise des outils complexes. Un bon agent sait lire la documentation. On vous demande de trouver dans le manuel de 'ls' l'option qui affiche les fichiers cachés.",
    objective: "1. Lisez le manuel de ls avec : man ls\n2. Puis utilisez ls avec la bonne option pour voir les fichiers cachés.",
    xp: 300, hints: [
      "Tapez : man ls pour lire le manuel.",
      "Cherchez l'option pour les fichiers cachés.",
      "Puis utilisez ls -a pour les voir."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['.config_secret'] = {
        type: 'file', owner: 'agent', group: 'agent', perms: 'rw-------',
        content: 'CONFIG: mode=stealth\nCaché par le pirate.'
      };
      fs.children['home'].children['agent'].children['.hidden_key'] = {
        type: 'file', owner: 'agent', group: 'agent', perms: 'rw-------',
        content: 'CLÉ: 0xFAKE123'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      if (cmd === 'man' && args[0] === 'ls') state.flags.didMan = true;
      if (cmd === 'ls' && (args[0] === '-a' || args[0] === '-la' || args[0] === '-al')) state.flags.didLsA = true;
      if (state.flags.didMan && state.flags.didLsA) {
        return { success: true, message: "✅ Vous savez lire la documentation ! La clé était .hidden_key." };
      }
      return { success: false };
    }
  },
  {
    id: '1-10', world: 1, title: "BOSS : L'Infiltration",
    story: "MISSION FINALE DU MONDE 1. Le serveur principal est verrouillé. Pour prouver que vous maîtrisez Linux, accomplissez cette série d'actions.",
    objective: "1. Allez à la racine (cd /) et listez (ls).\n2. Lisez /etc/passwd (cat).\n3. Créez /home/agent/rapport_final.\n4. Copiez /etc/passwd dedans.\n5. Déplacez /home/agent/secret.txt dans rapport_final.",
    xp: 1000, hints: [
      "Faites les étapes une par une.",
      "mkdir -p /home/agent/rapport_final crée le dossier.",
      "cp /etc/passwd /home/agent/rapport_final/"
    ],
    fsModifier: (fs) => {
      if (!fs.children['home'].children['agent'].children['secret.txt']) {
        fs.children['home'].children['agent'].children['secret.txt'] = {
          type: 'file', owner: 'agent', group: 'agent', perms: 'rw-------',
          content: 'CODE: 7X-K9-ALPHA'
        };
      }
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      if (cmd === 'cd' && args[0] === '/') state.flags.boss1 = true;
      if (cmd === 'ls' && cwd === '/') state.flags.boss2 = true;
      if (cmd === 'cat' && (args[0] === '/etc/passwd' || (args[0] === 'passwd' && cwd === '/etc'))) state.flags.boss3 = true;
      const rapport = fs.children['home'].children['agent'].children['rapport_final'];
      if (rapport && rapport.type === 'dir') state.flags.boss4 = true;
      if (rapport && rapport.children && rapport.children['passwd']) state.flags.boss5 = true;
      if (rapport && rapport.children && rapport.children['secret.txt']) state.flags.boss6 = true;

      const done = state.flags.boss1 && state.flags.boss2 && state.flags.boss3 && state.flags.boss4 && state.flags.boss5 && state.flags.boss6;
      if (done) {
        return { success: true, message: "🎉 BOSS VAINCU ! Vous maîtrisez les bases de Linux. Le Monde 2 vous attend !" };
      }
      return { success: false };
    }
  },

  /* ============================================
     MONDE 2 : Le Gardien des Secrets
     ============================================ */
  {
    id: '2-1', world: 2, title: "Les Sceaux",
    story: "Vous découvrez que les fichiers ont des 'sceaux de sécurité' (permissions). Le pirate a caché des informations dans un fichier verrouillé. Vous devez apprendre à lire ces sceaux.",
    objective: "Utilisez la commande avancée pour voir les permissions cachées des fichiers dans /home/agent.",
    xp: 200, hints: [
      "Vous avez besoin de voir les détails des fichiers, pas juste leurs noms.",
      "La commande ls a une option pour afficher le format long avec permissions.",
      "Essayez ls avec l'option -la pour tout voir d'un coup."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['sceau.txt'] = {
        type: 'file', owner: 'root', group: 'root', perms: 'rw-------',
        content: 'SCEAU: Le fichier est protégé par root. Seul root peut le lire.'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (cmd === 'ls' && (args[0] === '-la' || args[0] === '-al' || args[0] === '-l')) {
        return { success: true, message: "✅ Vous voyez les sceaux ! Notez que sceau.txt appartient à root avec rw-------." };
      }
      return { success: false };
    }
  },
  {
    id: '2-2', world: 2, title: "Le Code Numérique",
    story: "Un fichier critique est verrouillé. Vous devez modifier ses permissions pour pouvoir le lire. Utilisez le mode symbolique.",
    objective: "Rendez le fichier verrouille.txt lisible par tout le monde (ajoutez la permission de lecture pour les autres).",
    xp: 250, hints: [
      "chmod modifie les permissions.",
      "En mode symbolique : o+r ajoute la lecture (r) pour others (o).",
      "Essayez : chmod o+r verrouille.txt"
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['verrouille.txt'] = {
        type: 'file', owner: 'agent', group: 'agent', perms: 'rw-------',
        content: 'MESSAGE DÉCHIFFRÉ: Le pirate a laissé une porte dérobée dans /etc.'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      const f = fs.children['home'].children['agent'].children['verrouille.txt'];
      if (f && (f.perms === 'rw-r--r--' || f.perms === 'rw----r--' || f.perms.indexOf('r--') > 0)) {
        return { success: true, message: "✅ Le fichier est déverrouillé ! Vous pouvez maintenant le lire avec la commande apprise au Monde 1." };
      }
      return { success: false };
    }
  },
  {
    id: '2-3', world: 2, title: "Le Code Numérique II",
    story: "L'O.S.I.R.I.S. utilise un système de codes numériques pour verrouiller les salles. Vous devez maîtriser ce langage pour progresser.",
    objective: "1. Créez un dossier 'salle_secrete' dans /home/agent.\n2. Définissez ses permissions en numérique à 755 (rwxr-xr-x).",
    xp: 300, hints: [
      "Créez d'abord le dossier avec la commande apprise au Monde 1 pour créer des répertoires.",
      "Puis chmod avec le code numérique 755.",
      "755 = propriétaire peut tout faire (7), groupe et autres peuvent lire/exécuter (5)."
    ],
    fsModifier: null, startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      const salle = fs.children['home'].children['agent'].children['salle_secrete'];
      if (salle && salle.type === 'dir') state.flags.created = true;
      if (salle && salle.perms === 'rwxr-xr-x') state.flags.permsOk = true;
      if (state.flags.created && state.flags.permsOk) {
        return { success: true, message: "✅ Salle sécurisée avec le code 755 ! Vous maîtrisez les permissions numériques." };
      }
      return { success: false };
    }
  },
  {
    id: '2-4', world: 2, title: "Le Propriétaire",
    story: "Un fichier volé par le pirate appartient à 'hacker'. Vous devez le récupérer pour l'O.S.I.R.I.S. en changeant son propriétaire.",
    objective: "Changez le propriétaire de fichier_vole.txt pour qu'il appartienne à l'agent.",
    xp: 300, hints: [
      "chown change le propriétaire d'un fichier.",
      "chown agent fichier_vole.txt",
      "Vérifiez avec ls -la que le propriétaire a bien changé."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['fichier_vole.txt'] = {
        type: 'file', owner: 'hacker', group: 'hacker', perms: 'rw-r--r--',
        content: 'DONNÉES VOLÉES: Plans du serveur central.'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      const f = fs.children['home'].children['agent'].children['fichier_vole.txt'];
      if (f && f.owner === 'agent') {
        return { success: true, message: "✅ Fichier récupéré ! Il appartient maintenant à l'agent." };
      }
      return { success: false };
    }
  },
  {
    id: '2-5', world: 2, title: "Le Groupe",
    story: "L'accès à certains dossiers est contrôlé par groupe. Vous devez ajouter un fichier au groupe 'sudo' pour qu'il soit accessible par l'équipe d'élite.",
    objective: "Changez le groupe de acces_elite.txt pour 'sudo'.",
    xp: 250, hints: [
      "chgrp change le groupe d'un fichier.",
      "chgrp sudo acces_elite.txt",
      "Vous pouvez aussi utiliser chown agent:sudo acces_elite.txt"
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['acces_elite.txt'] = {
        type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r-----',
        content: 'ACCES ÉLITE: Niveau 5 requis.'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      const f = fs.children['home'].children['agent'].children['acces_elite.txt'];
      if (f && f.group === 'sudo') {
        return { success: true, message: "✅ Accès élité accordé au groupe sudo !" };
      }
      return { success: false };
    }
  },
  {
    id: '2-6', world: 2, title: "Le Double",
    story: "Une preuve doit être dupliquée sans prendre d'espace disque supplémentaire. Un lien dur est la solution parfaite.",
    objective: "Créez un lien dur nommé 'preuve_dure' pointant vers preuve_originale.txt dans /home/agent.",
    xp: 300, hints: [
      "ln crée un lien dur par défaut.",
      "ln preuve_originale.txt preuve_dure",
      "Vérifiez avec ls -la que les deux fichiers ont le même inode (même taille/permissions)."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['preuve_originale.txt'] = {
        type: 'file', owner: 'agent', group: 'agent', perms: 'rw-r--r--',
        content: 'PREUVE ORIGINALE: Hash 0xABC123'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      const f = fs.children['home'].children['agent'].children['preuve_dure'];
      if (f && f.type === 'file') {
        return { success: true, message: "✅ Lien dur créé ! Les deux fichiers partagent les mêmes données sur disque." };
      }
      return { success: false };
    }
  },
  {
    id: '2-7', world: 2, title: "Le Raccourci",
    story: "Un dossier secret est enfoui profondément dans l'arborescence. Créez un raccourci pour y accéder rapidement.",
    objective: "Créez un lien symbolique 'shortcut' dans /home/agent pointant vers /var/log.",
    xp: 300, hints: [
      "ln -s crée un lien symbolique (raccourci).",
      "ln -s /var/log shortcut",
      "Vérifiez avec ls -la que shortcut pointe bien vers /var/log."
    ],
    fsModifier: null, startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      const f = fs.children['home'].children['agent'].children['shortcut'];
      if (f && f.type === 'symlink') {
        return { success: true, message: "✅ Raccourci créé ! Vous pouvez maintenant accéder aux logs rapidement." };
      }
      return { success: false };
    }
  },
  {
    id: '2-8', world: 2, title: "L'Analyse",
    story: "Le serveur commence à manquer d'espace. Vous devez vérifier l'espace disponible avant d'installer de nouveaux outils de sécurité.",
    objective: "Vérifiez l'espace disque disponible avec l'option lisible par l'homme.",
    xp: 200, hints: [
      "df affiche l'espace disque.",
      "L'option -h rend les tailles lisibles (K, M, G).",
      "Essayez : df -h"
    ],
    fsModifier: null, startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (cmd === 'df' && (args[0] === '-h' || args.includes('-h'))) {
        return { success: true, message: "✅ Analyse complète ! Le système a encore de la marge." };
      }
      return { success: false };
    }
  },
  {
    id: '2-9', world: 2, title: "Le Fouilleur",
    story: "Un dossier occupe une place anormale. Vous devez le trouver pour libérer de l'espace.",
    objective: "Trouvez la taille totale du dossier /var/log.",
    xp: 250, hints: [
      "du estime l'espace utilisé par un dossier.",
      "-s donne le total, -h rend lisible.",
      "Essayez : du -sh /var/log"
    ],
    fsModifier: null, startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (cmd === 'du') {
        const target = args.find(a => a && !a.startsWith('-'));
        if (target === '/var/log' || target === 'var/log') {
          return { success: true, message: "✅ Dossier identifié ! /var/log consomme de l'espace." };
        }
      }
      return { success: false };
    }
  },
  {
    id: '2-10', world: 2, title: "Les Permissions Spéciales",
    story: "Vous découvrez des permissions spéciales utilisées par le pirate : SUID, SGID et le sticky bit. Apprenez à les manipuler.",
    objective: "1. Activez le sticky bit sur /tmp (chmod +t).\n2. Activez SUID sur un fichier script_suid.sh (chmod u+s).",
    xp: 400, hints: [
      "chmod +t active le sticky bit (t).",
      "chmod u+s active SUID (s).",
      "Vérifiez avec ls -la que les flags spéciaux apparaissent."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['script_suid.sh'] = {
        type: 'file', owner: 'root', group: 'root', perms: 'rwxr-xr-x',
        content: '#!/bin/bash\necho "Script privilégié"'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      const tmp = fs.children['tmp'];
      if (tmp && tmp.perms.indexOf('t') >= 0) state.flags.sticky = true;
      const script = fs.children['home'].children['agent'].children['script_suid.sh'];
      if (script && script.perms.indexOf('s') >= 0) state.flags.suid = true;
      if (state.flags.sticky && state.flags.suid) {
        return { success: true, message: "✅ Permissions spéciales maîtrisées ! Vous comprenez SUID et sticky bit." };
      }
      return { success: false };
    }
  },
  {
    id: '2-11', world: 2, title: "L'Audit",
    story: "Un dossier entier a été corrompu. Vous devez auditer toutes les permissions pour trouver la faille.",
    objective: "Listez en détail le contenu de /home/agent et identifiez le fichier avec les permissions les plus dangereuses (777).",
    xp: 350, hints: [
      "Utilisez la commande avancée de listing pour voir toutes les permissions.",
      "Cherchez un fichier avec rwxrwxrwx (777) — c'est une faille de sécurité.",
      "Puis corrigez-le avec chmod 644."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['dangerous.exe'] = {
        type: 'file', owner: 'root', group: 'root', perms: 'rwxrwxrwx',
        content: '[FICHIER MALVEILLANT]'
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      if (cmd === 'ls' && (args[0] === '-la' || args[0] === '-al' || args[0] === '-l')) state.flags.didAudit = true;
      const danger = fs.children['home'].children['agent'].children['dangerous.exe'];
      if (danger && danger.perms !== 'rwxrwxrwx') state.flags.fixed = true;
      if (state.flags.didAudit && state.flags.fixed) {
        return { success: true, message: "✅ Audit terminé ! La faille 777 a été corrigée." };
      }
      return { success: false };
    }
  },
  {
    id: '2-12', world: 2, title: "BOSS : La Chambre Forte",
    story: "MISSION FINALE DU MONDE 2. Un serveur entier a été corrompu par le virus. Vous devez réparer toutes les permissions, propriétaires et liens pour sécuriser la chambre forte.",
    objective: "1. Allez dans /home/agent/chambre_forte.\n2. Listez en détail (ls -la).\n3. Changez le propriétaire de tous les fichiers en agent.\n4. Mettez les permissions du dossier à 700.\n5. Créez un lien symbolique 'acces_rapide' vers chambre_forte depuis /home/agent.",
    xp: 1200, hints: [
      "Utilisez cd pour entrer dans chambre_forte.",
      "chown agent * change le propriétaire de tous les fichiers.",
      "chmod 700 chambre_forte sécurise le dossier.",
      "ln -s chambre_forte acces_rapide crée le raccourci."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['chambre_forte'] = {
        type: 'dir', owner: 'hacker', group: 'hacker', perms: 'rwxrwxrwx',
        children: {
          'secret1.txt': { type: 'file', owner: 'hacker', group: 'hacker', perms: 'rw-------', content: 'SECRET 1' },
          'secret2.txt': { type: 'file', owner: 'hacker', group: 'hacker', perms: 'rw-------', content: 'SECRET 2' }
        }
      };
    },
    startCwd: '/home/agent',
    check: (state, fs, cmd, args, cwd) => {
      if (!state.flags) state.flags = {};
      if (cwd === '/home/agent/chambre_forte') state.flags.inRoom = true;
      if (cmd === 'ls' && cwd === '/home/agent/chambre_forte' && (args[0] === '-la' || args[0] === '-al' || args[0] === '-l')) state.flags.didLs = true;
      const room = fs.children['home'].children['agent'].children['chambre_forte'];
      if (room) {
        const allAgent = Object.values(room.children).every(c => c.owner === 'agent');
        if (allAgent) state.flags.chownDone = true;
        if (room.perms === 'rwx------') state.flags.chmodDone = true;
      }
      const link = fs.children['home'].children['agent'].children['acces_rapide'];
      if (link && link.type === 'symlink') state.flags.linkDone = true;

      const done = state.flags.inRoom && state.flags.didLs && state.flags.chownDone && state.flags.chmodDone && state.flags.linkDone;
      if (done) {
        return { success: true, message: "🎉 BOSS VAINCU ! La Chambre Forte est sécurisée. Vous maîtrisez les permissions Linux !" };
      }
      return { success: false };
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LEVELS, MAN_PAGES, getDefaultFS };
}
