const config = {
  'serverInfo': {
    'serverLogoImageFileName': "logo.png",
    'serverName': "Nasi Lemak Minecraft",
    'serverIp': "nasi.lemak.xyz",
    'discordServerID': '916690894374207559'
  },
  'userSKinTypeInAdminTeam': "bust",
  'atGroupsDefaultColors': {
    'leaders': "rgba(255, 124, 124, 0.5)",
    'developers': "rgba(230, 83, 0, 0.5)",
    'helpers': "rgba(11, 175, 255, 0.5)",
    'builders': "rgba(247, 2, 176, 0.5)"
  },
  'adminTeamPage': {
    'leaders': [{
      'inGameName': "skysky",
      'rank': "Owner",
      'skinUrlOrPathToFile': '',
      'rankColor': "rgb(255, 136, 0)"
    }, {
      'inGameName': "Mengyboi",
      'rank': "Co-owner",
      'skinUrlOrPathToFile': '',
      'rankColor': "rgba(153, 113, 240, 1)"
    }, {
      'inGameName': "Rinkimika_",
      'rank': 'Admin',
      'skinUrlOrPathToFile': '',
      'rankColor': "rgba(255, 3, 3, 1)"
    }],
    'moderators': [{
      'inGameName': "-",
      'rank': "Moderator",
      'skinUrlOrPathToFile': '',
      'rankColor': "#006dff"
    }],
    'helpers': [{
      'inGameName': "Icyzflee",
      'rank': 'Helper',
      'skinUrlOrPathToFile': '',
      'rankColor': "rgba(144, 238, 144, 1)"
    }, {
      'inGameName': 'Legendyboi',
      'rank': "Helper",
      'skinUrlOrPathToFile': '',
      'rankColor': "rgba(144, 238, 144, 1)"
    }]
  },
  'contactPage': {
    'email': 'nasilemakminecraft@gmail.com'
  }
};
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
  navbarLinks.classList.toggle("active");
});
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");
accordionItemHeaders.forEach(_0x3a5006 => {
  _0x3a5006.addEventListener("click", () => {
    _0x3a5006.classList.toggle("active");
    const _0x2dbab4 = _0x3a5006.nextElementSibling;
    if (_0x3a5006.classList.contains("active")) {
      _0x2dbab4.style.maxHeight = _0x2dbab4.scrollHeight + 'px';
    } else {
      _0x2dbab4.style.maxHeight = "0px";
    }
  });
});
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
const contactForm = document.querySelector('.contact-form');
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");
const getDiscordOnlineUsers = async () => {
  try {
    const _0x1f9736 = config.serverInfo.discordServerID;
    const _0x3c539b = "https://discord.com/api/guilds/" + _0x1f9736 + "/widget.json";
    let _0x1229dd = await fetch(_0x3c539b);
    let _0x23f67e = await _0x1229dd.json();
    if (!_0x23f67e.presence_count) {
      return 'None';
    } else {
      return await _0x23f67e.presence_count + 38;
    }
  } catch (_0x3c201a) {
    return "None";
  }
};
const getMinecraftOnlinePlayer = async () => {
  try {
    const _0x5ac4cd = config.serverInfo.serverIp;
    const _0x32a6d5 = 'https://api.mcsrvstat.us/2/' + _0x5ac4cd;
    let _0x4a38cb = await fetch(_0x32a6d5);
    let _0x2bf6a2 = await _0x4a38cb.json();
    return  _0x2bf6a2.players.online + 10;
  } catch (_0x4bba0d) {
    console.log(_0x4bba0d);
    return "10";
  }
};
const getUuidByUsername = async _0x2611e2 => {
  try {
    const _0x1f9380 = "https://api.minetools.eu/uuid/" + _0x2611e2;
    let _0x3df7fc = await fetch(_0x1f9380);
    let _0x128737 = await _0x3df7fc.json();
    return _0x128737.id;
  } catch (_0x41bda4) {
    console.log(_0x41bda4);
    return 'None';
  }
};
const getSkinByUuid = async _0x3c9ca3 => {
  try {
    const _0x57a831 = "https://visage.surgeplay.com/bust/512/" + (await getUuidByUsername(_0x3c9ca3));
    let _0x43015b = await fetch(_0x57a831);
    if (_0x43015b.status === 0x190) {
      return "https://visage.surgeplay.com/bust/512/ec561538f3fd461daff5086b22154bce";
    } else {
      return _0x57a831;
    }
  } catch (_0x5b7df4) {
    console.log(_0x5b7df4);
    return "None";
  }
};
const copyIp = () => {
  const _0x18ac01 = document.querySelector(".copy-ip");
  const _0x34cdbf = document.querySelector('.ip-copied');
  _0x18ac01.addEventListener('click', () => {
    try {
      navigator.clipboard.writeText(config.serverInfo.serverIp);
      _0x34cdbf.classList.add("active");
      setTimeout(() => {
        _0x34cdbf.classList.remove('active');
      }, 0x1388);
    } catch (_0x5cd5ad) {
      console.log(_0x5cd5ad);
      _0x34cdbf.innerHTML = "An error has occurred!";
      _0x34cdbf.classList.add("active");
      _0x34cdbf.classList.add("error");
      setTimeout(() => {
        _0x34cdbf.classList.remove('active');
        _0x34cdbf.classList.remove("error");
      }, 0x1388);
    }
  });
};
const setDataFromConfigToHtml = async () => {
  serverName.innerHTML = config.serverInfo.serverName;
  serverLogo.src = "images/" + config.serverInfo.serverLogoImageFileName;
  serverIp.innerHTML = config.serverInfo.serverIp;
  let _0x4370eb = location.pathname;
  if (_0x4370eb == '/' || _0x4370eb.includes("index")) {
    copyIp();
    serverLogoHeader.src = 'images/' + config.serverInfo.serverLogoImageFileName;
    discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
    minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
  } else {
    if (_0x4370eb.includes("rules")) {
      copyIp();
    } else {
      if (_0x4370eb.includes("admin-team")) {
        for (let _0x56370b in config.adminTeamPage) {
          const _0x1313b2 = document.querySelector(".at-content");
          const _0xd59844 = document.createElement('div');
          _0xd59844.classList.add("group");
          _0xd59844.classList.add(_0x56370b);
          const _0x309601 = "\n                <h2 class=\"rank-title\">" + (_0x56370b.charAt(0x0).toUpperCase() + _0x56370b.slice(0x1)) + "</h2>\n                <div class=\"users\">\n                </div>\n            ";
          _0xd59844.innerHTML = _0x309601;
          _0x1313b2.appendChild(_0xd59844);
          for (let _0x41eb53 = 0x0; _0x41eb53 < config.adminTeamPage[_0x56370b].length; _0x41eb53++) {
            let _0x3e878a = config.adminTeamPage[_0x56370b][_0x41eb53];
            const _0xa24c8a = document.querySelector('.' + _0x56370b + " .users");
            const _0x18804e = document.createElement("div");
            _0x18804e.classList.add("user");
            let _0x28a5e7 = config.adminTeamPage[_0x56370b][_0x41eb53].skinUrlOrPathToFile;
            if (_0x28a5e7 == '') {
              _0x28a5e7 = await getSkinByUuid(_0x3e878a.inGameName);
            }
            let _0x4d65c2 = config.atGroupsDefaultColors[_0x56370b];
            if (_0x3e878a.rankColor != '') {
              _0x4d65c2 = _0x3e878a.rankColor;
            }
            const _0x2558b8 = "\n                    <img src=\"" + (await _0x28a5e7) + "\" alt=\"" + _0x3e878a.inGameName + "\">\n                    <h5 class=\"name\">" + _0x3e878a.inGameName + "</h5>\n                    <p class=\"rank " + _0x56370b + "\" style=\"background: " + _0x4d65c2 + "\">" + _0x3e878a.rank + "</p>  \n                ";
            _0x18804e.innerHTML = _0x2558b8;
            _0xa24c8a.appendChild(_0x18804e);
          }
        }
      } else if (_0x4370eb.includes("contact")) {
        contactForm.action = "https://formsubmit.co/" + config.contactPage.email;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        inputWithLocationAfterSubmit.value = location.href;
      }
    }
  }
};
setDataFromConfigToHtml();
