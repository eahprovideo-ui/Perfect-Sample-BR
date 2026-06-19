// PERFECT SAMPLE BR - AVATAR IMAGER ENGINE
const IMAGER_URL = "https://www.habbo.com.br/habbo-imaging/avatarimage?figure=";

let currentLook = {
    hr: "115-42", // Cabelo
    hd: "180-1",  // Cabeça/Pele
    ch: "210-62", // Camisa
    lg: "270-92", // Calça
    sh: "300-62", // Sapato
    ha: "0"       // Acessório
};

export function updateAvatar() {
    const figureString = `hr-${currentLook.hr}.hd-${currentLook.hd}.ch-${currentLook.ch}.lg-${currentLook.lg}.sh-${currentLook.sh}.ha-${currentLook.ha}`;
    const fullUrl = `${IMAGER_URL}${figureString}&size=l&direction=4&head_direction=4&gesture=sml&action=std`;
    
    document.getElementById('avatar-preview').src = fullUrl;
    document.getElementById('avatar-preview-hud').src = fullUrl;
}

export function setPart(type, id) {
    currentLook[type] = id;
    updateAvatar();
}

// CATALOGO DE ROUPAS (IDs extraídos da HabboNews)
export const catalog = {
    hr: ["115-42", "155-33", "825-45", "515-33"], // Cabelos Trap
    ch: ["210-62", "215-62", "3030-92", "3081-110"], // Camisas/Moletons
    lg: ["270-92", "275-92", "280-92", "285-92"], // Calças
    acc: ["0", "2552-62", "2580-110"] // Correntes/Mascaras
};