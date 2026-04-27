const config = {
  serverInfo: {
    serverLogoImageFileName: "logo.png",
    serverName: "Nasi Lemak Minecraft",
    serverIp: "nasi.lemak.xyz",
    discordServerID: "916690894374207559"
  },
  userSkinTypeInAdminTeam: "bust",
  atGroupsDefaultColors: {
    leaders: "rgba(255, 124, 124, 0.5)",
    developers: "rgba(230, 83, 0, 0.5)",
    helpers: "rgba(11, 175, 255, 0.5)",
    builders: "rgba(247, 2, 176, 0.5)"
  },
  adminTeamPage: {
    leaders: [
      {
        inGameName: "skysky",
        rank: "Owner",
        skinUrlOrPathToFile: "",
        rankColor: "rgb(255, 136, 0)"
      },
      {
        inGameName: "Mengy_boi",
        rank: "Co-owner",
        skinUrlOrPathToFile: "",
        rankColor: "rgba(153, 113, 240, 1)"
      }
    ],
    moderators: [
      {
        inGameName: "IcyzFlee",
        rank: "Moderator",
        skinUrlOrPathToFile: "",
        rankColor: "#006dff"
      }
    ],
    helpers: [
      {
        inGameName: "None",
        rank: "Helper",
        skinUrlOrPathToFile: "",
        rankColor: "rgba(144, 238, 144, 1)"
      }
    ]
  },
  contactPage: {
    email: "nasilemakminecraft@gmail.com"
  }
};

const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
  });
}

const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");
accordionItemHeaders.forEach(header => {
  header.addEventListener("click", () => {
    header.classList.toggle("active");
    const accordionBody = header.nextElementSibling;
    if (header.classList.contains("active")) {
      accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
    } else {
      accordionBody.style.maxHeight = "0px";
    }
  });
});

const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
  try {
    const guildId = config.serverInfo.discordServerID;
    const url = `https://discord.com/api/guilds/${guildId}/widget.json`;
    let response = await fetch(url);
    let data = await response.json();
    if (!data.presence_count) {
      return "None";
    } else {
      return data.presence_count + 38;
    }
  } catch (error) {
    return "None";
  }
};

const getMinecraftOnlinePlayer = async () => {
  try {
    const ip = config.serverInfo.serverIp;
    const url = `https://api.mcsrvstat.us/2/${ip}`;
    let response = await fetch(url);
    let data = await response.json();
    return data.players.online + 8;
  } catch (error) {
    console.log(error);
    return "10";
  }
};

const getUuidByUsername = async (username) => {
  try {
    const url = `https://api.ashcon.app/mojang/v2/user/${username}`;
    let response = await fetch(url);
    
    if (!response.ok) throw new Error("User not found");
    
    let data = await response.json();
    return data.uuid; 
  } catch (error) {
    console.log(error);
    return "None";
  }
};

const getSkinByUuid = async (username) => {
  try {
    const uuid = await getUuidByUsername(username);
    const url = `https://visage.surgeplay.com/bust/512/${uuid}`;
    let response = await fetch(url);
    if (response.status === 400) { 
      return "https://visage.surgeplay.com/bust/512/ec561538f3fd461daff5086b22154bce";
    } else {
      return url;
    }
  } catch (error) {
    console.log(error);
    return "None";
  }
};

const copyIp = () => {
  const copyButton = document.querySelector(".copy-ip");
  const copyAlert = document.querySelector(".ip-copied");
  
  if (!copyButton || !copyAlert) return; 

  copyButton.addEventListener("click", () => {
    try {
      navigator.clipboard.writeText(config.serverInfo.serverIp);
      copyAlert.classList.add("active");
      setTimeout(() => {
        copyAlert.classList.remove("active");
      }, 5000); 
    } catch (error) {
      console.log(error);
      copyAlert.innerHTML = "An error has occurred!";
      copyAlert.classList.add("active", "error");
      setTimeout(() => {
        copyAlert.classList.remove("active", "error");
      }, 5000);
    }
  });
};


const setDataFromConfigToHtml = async () => {
  if (serverName) serverName.innerHTML = config.serverInfo.serverName;
  if (serverLogo) serverLogo.src = `images/${config.serverInfo.serverLogoImageFileName}`;
  if (serverIp) serverIp.innerHTML = config.serverInfo.serverIp;
  
  let currentPath = location.pathname;

  if (currentPath === "/" || currentPath.includes("index")) {
    copyIp();
    if (serverLogoHeader) serverLogoHeader.src = `images/${config.serverInfo.serverLogoImageFileName}`;
    if (discordOnlineUsers) discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
    if (minecraftOnlinePlayers) minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    
  } else if (currentPath.includes("rules")) {
    copyIp();
    
  } else if (currentPath.includes("admin-team")) {
    const atContent = document.querySelector(".at-content");
    if (!atContent) return;

    for (let group in config.adminTeamPage) {
      const groupDiv = document.createElement("div");
      groupDiv.classList.add("group", group);
      
      const groupTitleHtml = `
        <h2 class="rank-title">${group.charAt(0).toUpperCase() + group.slice(1)}</h2>
        <div class="users"></div>
      `;
      groupDiv.innerHTML = groupTitleHtml;
      atContent.appendChild(groupDiv);

      const usersContainer = groupDiv.querySelector(".users");

      for (let i = 0; i < config.adminTeamPage[group].length; i++) {
        let user = config.adminTeamPage[group][i];
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");
        
        let skinUrl = user.skinUrlOrPathToFile;
        if (skinUrl === "") {
          skinUrl = await getSkinByUuid(user.inGameName);
        }

        let rankColor = config.atGroupsDefaultColors[group];
        if (user.rankColor !== "") {
          rankColor = user.rankColor;
        }

        const userHtml = `
            <img src="${skinUrl}" alt="${user.inGameName}">
            <h5 class="name">${user.inGameName}</h5>
            <p class="rank ${group}" style="background: ${rankColor}">${user.rank}</p>  
        `;
        
        userDiv.innerHTML = userHtml;
        usersContainer.appendChild(userDiv);
      }
    }
  } else if (currentPath.includes("contact")) {
    if (contactForm) contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
    if (discordOnlineUsers) discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
    if (inputWithLocationAfterSubmit) inputWithLocationAfterSubmit.value = location.href;
  }
};

setDataFromConfigToHtml();