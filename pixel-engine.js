// PERFECT SAMPLE BR - AVATAR IMAGER ENGINE v2.0
const IMAGER_URL = "https://www.habbo.com.br/habbo-imaging/avatarimage?figure=";

let currentLook = {
    hr: "115-42", // Cabelo
    hd: "180-1",  // Pele
    ch: "210-62", // Camisa
    lg: "270-92", // Calça
    sh: "300-62", // Sapato
    acc: "0"      // Acessório
};

export function updateAvatar() {
    // Monta a string que o Habbo entende
    const figureString = `hr-${currentLook.hr}.hd-${currentLook.hd}.ch-${currentLook.ch}.lg-${currentLook.lg}.sh-${currentLook.sh}.ha-${currentLook.acc}`;
    const fullUrl = `${IMAGER_URL}${figureString}&size=l&direction=4&head_direction=4&gesture=sml&action=std`;
    
    // Atualiza todos os previews do site simultaneamente
    const previews = ['avatar-preview', 'avatar-preview-hud', 'avatar-preview-side'];
    previews.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.src = fullUrl;
    });
}

export function setPart(type, id) {
    currentLook[type] = id;
    updateAvatar();
}

// 📦 CATALOGO EXPANDIDO (ESTILO TRAP/HABBO NEWS)
export const catalog = {
    hr: ["115-42", "155-33", "825-45", "515-33", "3012-110", "3090-42", "3185-33"], // Cabelos/Dreads
    hd: ["180-1", "180-2", "180-3", "180-4"], // Tons de Pele
    ch: ["210-62", "215-62", "3030-92", "3081-110", "3032-62", "3065-62", "665-62"], // Camisas/Buzinas/Moletons
    lg: ["270-92", "275-92", "280-92", "281-110", "285-92", "3290-92"], // Calças Cargo/Joggers
    acc: ["0", "2552-62", "2580-110", "3190-62", "210-62"] // Correntes/Mascaras/Óculos
};

// Itens que só o VIP pode usar
export const vipItems = ["3012-110", "3081-110", "2580-110", "3290-92"];