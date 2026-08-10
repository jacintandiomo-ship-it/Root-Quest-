/* ============================================
   ROOT QUEST - DONNÉES DES NIVEAUX (Monde 1)
   Pédagogie : répétition espacée
   ============================================ */

function getDefaultFS() {
  return {
    type: 'dir',
    children: {
      'home': {
        type: 'dir',
        children: {
          'agent': {
            type: 'dir',
            children: {
              'missions': { type: 'dir', children: {} },
              'preuves': { type: 'dir', children: {} },
              'bureau': { type: 'dir', children: {
                'note.txt': { type: 'file', content: 'Note du bureau: N\'oubliez pas de scanner régulièrement.' }
              }},
              'virus.log': { type: 'file', content: 'ALERTE: Virus "Glitch Éternel" détecté.\nSignature: 0xDEADBEEF\nPropagation: RAPIDE' },
              'bienvenue.txt': { type: 'file', content: 'Bienvenue agent. Votre mission commence ici.\nUtilisez ls pour scanner votre environnement.' }
            }
          }
        }
      },
      'tmp': {
        type: 'dir',
        children: {
          'trace.txt': { type: 'file', content: 'TRACE: IP source 192.168.666.0\nPort: 31337\nPayload: shell_reverse_tcp' }
        }
      },
      'etc': {
        type: 'dir',
        children: {
          'passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nagent:x:1000:1000:Agent O.S.I.R.I.S.:/home/agent:/bin/bash' },
          'hosts': { type: 'file', content: '127.0.0.1 localhost\n192.168.1.1 gateway.osiris.gov' }
        }
      },
      'var': {
        type: 'dir',
        children: {
          'log': {
            type: 'dir',
            children: {
              'syslog': { type: 'file', content: 'Aug 21 03:14:01 kernel: INTRUSION DETECTED' }
            }
          }
        }
      },
      'bin': {
        type: 'dir',
        children: {
          'ls': { type: 'file', content: '[binaire]' },
          'cat': { type: 'file', content: '[binaire]' },
          'pwd': { type: 'file', content: '[binaire]' }
        }
      },
      'usr': { type: 'dir', children: { 'share': { type: 'dir', children: {} } } },
      'boot': { type: 'dir', children: { 'vmlinuz': { type: 'file', content: '[noyau]' } } },
      'dev': { type: 'dir', children: { 'null': { type: 'file', content: '[dev]' } } },
      'proc': { type: 'dir', children: { 'cpuinfo': { type: 'file', content: 'processor: 0' } } },
      'root': { type: 'dir', children: { '.top_secret': { type: 'file', content: 'Accès interdit.' } } },
      'sbin': { type: 'dir', children: { 'reboot': { type: 'file', content: '[binaire]' } } },
      'lib': { type: 'dir', children: {} },
      'opt': { type: 'dir', children: {} },
      'media': { type: 'dir', children: {} },
      'mnt': { type: 'dir', children: {} },
      'srv': { type: 'dir', children: {} },
      'sys': { type: 'dir', children: {} },
      'run': { type: 'dir', children: {} }
    }
  };
}

// Pages de manuel simulées
const MAN_PAGES = {
  'ls': `LS(1)                        Manuel de l'agent                        LS(1)

NOM
       ls - lister le contenu d'un répertoire

SYNOPSIS
       ls [OPTION]... [FICHIER]...

DESCRIPTION
       Affiche les informations sur les FICHIERs (du répertoire courant
       par défaut).

OPTIONS
       -a, --all       ne pas ignorer les entrées commençant par .
       -l              utiliser le format de liste long
       -h              avec -l, tailles lisibles par l'homme

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
       Si aucun argument, va dans le répertoire personnel (~).

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
       Affiche le chemin absolu du répertoire où vous vous trouvez.

EXEMPLES
       pwd             affiche /home/agent`,

  'cat': `CAT(1)                       Manuel de l'agent                       CAT(1)

NOM
       cat - concaténer des fichiers et les afficher

SYNOPSIS
       cat [FICHIER]...

DESCRIPTION
       Affiche le contenu des FICHIERs sur la sortie standard.

EXEMPLES
       cat fichier.txt     affiche le contenu
       cat /etc/passwd     affiche le fichier passwd`,

  'mkdir': `MKDIR(1)                     Manuel de l'agent                     MKDIR(1)

NOM
       mkdir - créer des répertoires

SYNOPSIS
       mkdir [OPTION]... RÉPERTOIRE...

DESCRIPTION
       Crée les répertoires s'ils n'existent pas déjà.

EXEMPLES
       mkdir dossier       crée 'dossier' dans le répertoire courant
       mkdir -p a/b/c      crée toute l'arborescence`,

  'rm': `RM(1)                        Manuel de l'agent                        RM(1)

NOM
       rm - supprimer des fichiers ou répertoires

SYNOPSIS
       rm [OPTION]... FICHIER...

DESCRIPTION
       Supprime les FICHIERs.

OPTIONS
       -r, -R    supprimer récursivement les répertoires
       -f        forcer, ne pas demander de confirmation

EXEMPLES
       rm fichier.txt      supprime un fichier
       rm -r dossier       supprime un dossier et son contenu`,

  'cp': `CP(1)                        Manuel de l'agent                        CP(1)

NOM
       cp - copier des fichiers et répertoires

SYNOPSIS
       cp [OPTION]... SOURCE... DEST

DESCRIPTION
       Copie SOURCE vers DEST.

EXEMPLES
       cp a.txt b.txt      copie a.txt en b.txt
       cp -r dir1 dir2     copie récursivement un dossier`,

  'mv': `MV(1)                        Manuel de l'agent                        MV(1)

NOM
       mv - déplacer (renommer) des fichiers

SYNOPSIS
       mv [OPTION]... SOURCE... DEST

DESCRIPTION
       Déplace SOURCE vers DEST.

EXEMPLES
       mv a.txt b.txt      renomme a.txt en b.txt
       mv file.txt /tmp/   déplace file.txt vers /tmp/`,

  'rmdir': `RMDIR(1)                     Manuel de l'agent                     RMDIR(1)

NOM
       rmdir - supprimer des répertoires vides

SYNOPSIS
       rmdir [OPTION]... RÉPERTOIRE...

DESCRIPTION
       Supprime les répertoires VIDES.

EXEMPLES
       rmdir dossier       supprime 'dossier' s'il est vide`,

  'man': `MAN(1)                       Manuel de l'agent                       MAN(1)

NOM
       man - interface de consultation des manuels

SYNOPSIS
       man [OPTION]... PAGE...

DESCRIPTION
       Affiche le manuel de la commande demandée.

EXEMPLES
       man ls              manuel de la commande ls
       man pwd             manuel de la commande pwd`
};

const LEVELS = [
  {
    id: '1-1',
    world: 1,
    title: "L'Éveil",
    story: "Votre terminal vient de s'activer. Vous êtes dans votre bureau à l'O.S.I.R.I.S. Avant toute chose, vous devez savoir ce qui vous entoure. Scanner la pièce pour trouver un indice.",
    objective: "Tapez la commande ls pour lister les éléments de votre bureau.",
    xp: 100,
    hints: [
      "La commande ls liste le contenu du répertoire courant.",
      "Tapez simplement : ls",
      "Vous êtes dans /home/agent. Faites ls pour voir vos fichiers."
    ],
    fsModifier: null,
    check: (state, fs, cmd, args, cwd) => {
      if (cmd === 'ls') {
        return { success: true, message: "✅ Mission accomplie ! Vous voyez les fichiers de votre bureau." };
      }
      return { success: false };
    }
  },

  {
    id: '1-2',
    world: 1,
    title: "Premiers pas",
    story: "Un dossier 'missions' a été créé pour vous. Entrez-y pour découvrir ce qui vous attend. Puis revenez en arrière pour confirmer que vous maîtrisez les déplacements.",
    objective: "1. Entrez dans le dossier 'missions' avec cd.\n2. Revenez en arrière avec cd ..",
    xp: 150,
    hints: [
      "cd = Change Directory. cd missions entre dans le dossier.",
      "cd .. remonte d'un niveau (retour au parent).",
      "Vérifiez avec pwd à chaque étape si vous êtes perdu."
    ],
    fsModifier: null,
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
    id: '1-3',
    world: 1,
    title: "Où suis-je ?",
    story: "Vous avez été téléporté dans un répertoire inconnu par le système de sécurité. Vous êtes perdu. Utilisez vos compétences pour vous repérer.",
    objective: "1. Utilisez pwd pour connaître votre position.\n2. Utilisez ls pour voir ce qui vous entoure (révision de la leçon 1-1).",
    xp: 150,
    hints: [
      "pwd = Print Working Directory. Affiche le chemin complet.",
      "ls liste le contenu (vous l'avez appris au niveau 1-1).",
      "Faites pwd, puis ls. L'ordre n'a pas d'importance."
    ],
    fsModifier: (fs) => {
      // Téléporter l'agent dans /tmp pour le désorienter
      // Le moteur changera le cwd au chargement
    },
    startCwd: '/tmp',
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
    id: '1-4',
    world: 1,
    title: "Le Coffre",
    story: "Un fichier secret a été déposé dans votre bureau. Il contient un code d'accès crucial. Vous devez l'ouvrir.",
    objective: "Lisez le fichier secret.txt dans /home/agent avec la commande cat.",
    xp: 200,
    hints: [
      "cat affiche le contenu d'un fichier.",
      "Allez d'abord dans /home/agent (cd /home/agent ou cd ~).",
      "Puis : cat secret.txt"
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['secret.txt'] = {
        type: 'file',
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
    id: '1-5',
    world: 1,
    title: "L'Archiviste",
    story: "Les preuves s'accumulent. Vous devez créer une structure de dossiers pour classer les éléments de l'enquête. L'organisation est la clé de la victoire.",
    objective: "Créez le dossier 'rapport' dans /home/agent, puis entrez-y avec cd (révision de cd et ls).",
    xp: 250,
    hints: [
      "mkdir crée un dossier. mkdir rapport crée 'rapport'.",
      "Puis cd rapport pour entrer dedans.",
      "Vérifiez avec ls que vous êtes bien dedans."
    ],
    fsModifier: null,
    startCwd: '/home/agent',
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
    id: '1-6',
    world: 1,
    title: "L'Effaceur",
    story: "Le virus 'Glitch Éternel' a laissé des fichiers corrompus dans votre bureau. Ils risquent de se propager. Nettoyez immédiatement !",
    objective: "Supprimez les fichiers corrompus : virus1.tmp, virus2.tmp\nSupprimez le dossier vide : quarantine_old",
    xp: 250,
    hints: [
      "rm supprime un fichier. rm virus1.tmp virus2.tmp",
      "rmdir supprime un dossier VIDE.",
      "Listez d'abord avec ls pour voir ce qui existe."
    ],
    fsModifier: (fs) => {
      const agent = fs.children['home'].children['agent'].children;
      agent['virus1.tmp'] = { type: 'file', content: 'CORROMPU' };
      agent['virus2.tmp'] = { type: 'file', content: 'CORROMPU' };
      agent['quarantine_old'] = { type: 'dir', children: {} };
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
    id: '1-7',
    world: 1,
    title: "Le Duplicata",
    story: "Une preuve cruciale doit être sauvegardée avant analyse. Vous devez la copier dans un endroit sûr avant qu'elle ne disparaisse.",
    objective: "Copiez le fichier preuve.txt vers preuve_backup.txt (tous deux dans /home/agent).",
    xp: 300,
    hints: [
      "cp source destination copie un fichier.",
      "cp preuve.txt preuve_backup.txt",
      "Vérifiez avec ls que les deux fichiers existent."
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['preuve.txt'] = {
        type: 'file',
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
    id: '1-8',
    world: 1,
    title: "Le Déménagement",
    story: "Un fichier sensible a été trouvé dans votre bureau. Il doit être déplacé vers la zone sécurisée /tmp pour quarantaine temporaire.",
    objective: "Déplacez /home/agent/sensible.txt vers /tmp/sensible.txt.",
    xp: 350,
    hints: [
      "mv source destination déplace un fichier.",
      "mv sensible.txt /tmp/ (depuis /home/agent)",
      "Ou : mv /home/agent/sensible.txt /tmp/sensible.txt"
    ],
    fsModifier: (fs) => {
      fs.children['home'].children['agent'].children['sensible.txt'] = {
        type: 'file',
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
    id: '1-9',
    world: 1,
    title: "Le Manuel",
    story: "L'O.S.I.R.I.S. utilise des outils complexes. Un bon agent sait lire la documentation. On vous demande de trouver dans le manuel de 'ls' l'option qui affiche les fichiers cachés.",
    objective: "1. Lisez le manuel de ls avec : man ls\n2. Puis utilisez ls avec la bonne option pour voir les fichiers cachés.",
    xp: 300,
    hints: [
      "Tapez : man ls pour lire le manuel.",
      "Cherchez l'option pour les fichiers cachés.",
      "Puis utilisez ls -a pour les voir."
    ],
    fsModifier: (fs) => {
      // Créer des fichiers cachés dans /home/agent
      fs.children['home'].children['agent'].children['.config_secret'] = {
        type: 'file',
        content: 'CONFIG: mode=stealth\nCaché par le pirate.'
      };
      fs.children['home'].children['agent'].children['.hidden_key'] = {
        type: 'file',
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
    id: '1-10',
    world: 1,
    title: "BOSS : L'Infiltration",
    story: "MISSION FINALE DU MONDE 1. Le serveur principal est verrouillé. Pour prouver que vous maîtrisez Linux, accomplissez cette série d'actions.",
    objective: "1. Allez à la racine (cd /) et listez (ls).\n2. Lisez /etc/passwd (cat).\n3. Créez /home/agent/rapport_final.\n4. Copiez /etc/passwd dedans.\n5. Déplacez /home/agent/secret.txt dans rapport_final.",
    xp: 1000,
    hints: [
      "Faites les étapes une par une.",
      "mkdir -p /home/agent/rapport_final crée le dossier.",
      "cp /etc/passwd /home/agent/rapport_final/"
    ],
    fsModifier: (fs) => {
      // S'assurer que secret.txt existe
      if (!fs.children['home'].children['agent'].children['secret.txt']) {
        fs.children['home'].children['agent'].children['secret.txt'] = {
          type: 'file',
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
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LEVELS, MAN_PAGES, getDefaultFS };
}
