class BoxShadowGenerator {

    constructor
    (
        horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spread,
        spreadRef,
        color,
        colorRef,
        opacity,
        opacityRef,
        insetInput,
        previewBox,
        rule,
        webkitRule,
        mozRule,
        copyRulesBtn
    ) 
    {
        this.horizontal = horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.color = color;
        this.colorRef = colorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.insetInput = insetInput;
        this.insetRef = insetInput.checked;
        this.previewBox = previewBox;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule = mozRule;
        this.copyRulesBtn = copyRulesBtn;
    }

    initialize() {

        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.spreadRef.value = this.spread.value;
        this.blurRef.value = this.blur.value;
        this.opacityRef.value = this.opacity.value;
        this.colorRef.value = this.color.value;

        this.applyRuleCSS();

        this.showRuleCSS();
    }

    applyRuleCSS() {

        const rgbaColor = this.hexToRgba(this.colorRef.value);
        

        this.previewBox.style.boxShadow = `
            ${this.insetRef ? "inset" : ""}
            ${this.horizontalRef.value}px
            ${this.verticalRef.value}px
            ${this.blurRef.value}px
            ${this.spreadRef.value}px
            rgba(${rgbaColor}, ${this.opacityRef.value})
        `;

        this.currentRuLeCSS = this.previewBox.style.boxShadow;
    }

    showRuleCSS() {

        this.rule.textContent = this.currentRuLeCSS;
        this.webkitRule.textContent = this.currentRuLeCSS;
        this.mozRule.textContent = this.currentRuLeCSS;
    }

    // Alternando a sombra CSS, mudando valores da regra CSS 
    // dinamicamente ia JS
    
    updateValue(type, value) {

        switch(type) {
            case "horizontal":
                this.horizontalRef.value = value;
                break;
            case "vertical":
                this.verticalRef.value = value;
                break;
            case "blur":
                this.blurRef.value = value;
                break;
            case "spread":
                this.spreadRef.value = value;
                break;
            case "color":
                this.colorRef.value = value; 
                break;
            case "opacity":
                this.opacityRef.value = value;
                break;
            case "insetInput":
                this.insetRef = value;
                break;
            default:
                break;                                  
        }

        this.applyRuleCSS();

        this.showRuleCSS();
    }

    hexToRgba(hex) {
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0},
        ${("0x" + hex[5] + hex[6]) | 0}`;
    }
}

// Seleção de elementos no HTML OBject DOM

const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");
const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");
const insetInput = document.querySelector("#inset");

const previewBox = document.querySelector("#preview");

const rule = document.querySelector("#rule");
const webkitRule = document.querySelector("#webkit-rule");
const mozRule = document.querySelector("#moz-rule");

const copyRulesBtn = document.querySelector("#copy-rules");

// Object BoxShadowGenerator

const boxShadowGenerated = new BoxShadowGenerator
(
    horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spread,
        spreadRef,
        color,
        colorRef,
        opacity,
        opacityRef,
        insetInput,
        previewBox,
        rule,
        webkitRule,
        mozRule,
        copyRulesBtn
);

boxShadowGenerated.initialize();

const ListOfInput = [
    {
        input: horizontal, type: "horizontal",
    },
    {
        input: vertical, type: "vertical",
    },
    {
        input: blur, type: "blur",
    },
    {
        input: spread, type: "spread",
    },
    {
        input: color, type: "color",
    },
    {
        input: opacity, type: "opacity",
    },
    {
        input: insetInput, type: "insetInput",
    },
]; 

// Eventos JS

ListOfInput.map((typéOfInput) => {

    const input = typéOfInput.input;

    input.addEventListener("input", (e) => {

        if(!input.checked) {
            const value = e.target.value;

            boxShadowGenerated.updateValue(typéOfInput.type, value);
        } else {
            const value = e.target.checked;

            boxShadowGenerated.updateValue(typéOfInput.type, value);
        }
    });
});

copyRulesBtn.addEventListener("click", () => {

    const rulesValue = document.querySelector("#rules").innerText.replace(/^\s*\n/gm, "");

    console.log(rulesValue);

    navigator.clipboard.writeText(
        rulesValue
    ).then(() => {

        copyRulesBtn.innerText = "Regra copiada com sucesso!";

        setTimeout(() => {
            copyRulesBtn.innerText = "Copiar Regras";
        }, 1000)
    });
    
});