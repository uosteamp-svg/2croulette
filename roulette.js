const defaultColors = [
        { name: "레드", value: "#ef4444" },
        { name: "옐로우", value: "#f59e0b" },
        { name: "그린", value: "#22c55e" },
        { name: "블루", value: "#3b82f6" }
      ];

      let colors = [...defaultColors];
      let currentRotation = 0;
      let isSpinning = false;

      const wheel = document.getElementById("wheel");
      const resultBox = document.getElementById("resultBox");
      const startButton = document.getElementById("startButton");
      const startImage = document.getElementById("startImage");
      const colorForm = document.getElementById("colorForm");
      const colorName = document.getElementById("colorName");
      const inputMessage = document.getElementById("inputMessage");
      const colorList = document.getElementById("colorList");
      const roulettePage = document.getElementById("roulettePage");
      const inputPage = document.getElementById("inputPage");
      const app = document.getElementById("app");
      const rouletteTab = document.getElementById("rouletteTab");
      const inputTab = document.getElementById("inputTab");
      const settingsButton = document.getElementById("settingsButton");
      const phone = document.querySelector(".phone");

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#39;");
      }

      function showPage(pageName) {
        const isRoulette = pageName === "roulette";
        roulettePage.classList.toggle("active", isRoulette);
        inputPage.classList.toggle("active", !isRoulette);
        app.classList.toggle("roulette-mode", isRoulette);
        rouletteTab.classList.toggle("active", isRoulette);
        inputTab.classList.toggle("active", !isRoulette);
        phone.scrollTop = 0;
      }

      function resetFrameScroll() {
        window.scrollTo(0, 0);
        phone.scrollTop = 0;
      }

      function resolveColorValue(name) {
        const normalized = name.replace(/[\s_-]+/g, "").toLowerCase();
        const hexMatch = normalized.match(/^#?([0-9a-f]{6})$/i);
        if (hexMatch) {
          return `#${hexMatch[1]}`;
        }

        const colorMap = {
          빨강: "#ef4444",
          빨간색: "#ef4444",
          레드: "#ef4444",
          붉은색: "#ef4444",
          다홍: "#f43f5e",
          다홍색: "#f43f5e",
          진홍: "#dc2626",
          진홍색: "#dc2626",
          버건디: "#7f1d1d",
          와인: "#7f1d1d",
          와인색: "#7f1d1d",
          코랄: "#fb7185",
          코랄색: "#fb7185",
          살구: "#fdba74",
          살구색: "#fdba74",
          복숭아: "#fecaca",
          복숭아색: "#fecaca",
          주황: "#f97316",
          주황색: "#f97316",
          오렌지: "#f97316",
          오렌지색: "#f97316",
          노랑: "#facc15",
          노란색: "#facc15",
          옐로우: "#facc15",
          레몬: "#fde047",
          레몬색: "#fde047",
          겨자: "#ca8a04",
          겨자색: "#ca8a04",
          머스타드: "#ca8a04",
          연두: "#84cc16",
          연두색: "#84cc16",
          라임: "#a3e635",
          라임색: "#a3e635",
          초록: "#22c55e",
          초록색: "#22c55e",
          녹색: "#16a34a",
          그린: "#22c55e",
          풀색: "#22c55e",
          숲색: "#15803d",
          에메랄드: "#10b981",
          에메랄드색: "#10b981",
          올리브: "#708238",
          올리브색: "#708238",
          카키: "#6b7280",
          카키색: "#6b7280",
          민트: "#2dd4bf",
          민트색: "#2dd4bf",
          청록: "#14b8a6",
          청록색: "#14b8a6",
          터키석: "#06b6d4",
          터쿼이즈: "#06b6d4",
          하늘: "#38bdf8",
          하늘색: "#38bdf8",
          스카이: "#38bdf8",
          스카이블루: "#38bdf8",
          물색: "#7dd3fc",
          바다색: "#0284c7",
          파랑: "#3b82f6",
          파란색: "#3b82f6",
          블루: "#3b82f6",
          남색: "#1d4ed8",
          네이비: "#1e3a8a",
          네이비색: "#1e3a8a",
          감청: "#1e40af",
          감청색: "#1e40af",
          인디고: "#4f46e5",
          군청: "#1e3a8a",
          군청색: "#1e3a8a",
          보라: "#8b5cf6",
          보라색: "#8b5cf6",
          퍼플: "#8b5cf6",
          바이올렛: "#7c3aed",
          라벤더: "#c4b5fd",
          라벤더색: "#c4b5fd",
          라일락: "#d8b4fe",
          연보라: "#c4b5fd",
          연보라색: "#c4b5fd",
          자주: "#be185d",
          자주색: "#be185d",
          마젠타: "#d946ef",
          마젠타색: "#d946ef",
          분홍: "#ec4899",
          분홍색: "#ec4899",
          핑크: "#ec4899",
          핑크색: "#ec4899",
          장미색: "#f43f5e",
          로즈: "#f43f5e",
          갈색: "#92400e",
          브라운: "#92400e",
          밤색: "#78350f",
          고동색: "#78350f",
          초코: "#7c2d12",
          초콜릿: "#7c2d12",
          카멜: "#b45309",
          카멜색: "#b45309",
          베이지: "#d6b48c",
          베이지색: "#d6b48c",
          크림: "#f5e6c8",
          크림색: "#f5e6c8",
          아이보리: "#fff7ed",
          아이보리색: "#fff7ed",
          검정: "#111827",
          검은색: "#111827",
          블랙: "#111827",
          회색: "#6b7280",
          그레이: "#6b7280",
          회색빛: "#6b7280",
          차콜: "#374151",
          차콜색: "#374151",
          먹색: "#1f2937",
          흰색: "#f8fafc",
          하양: "#f8fafc",
          하얀색: "#f8fafc",
          화이트: "#f8fafc",
          금색: "#d4af37",
          골드: "#d4af37",
          황금색: "#d4af37",
          은색: "#c0c7d1",
          실버: "#c0c7d1",
          red: "#ef4444",
          orange: "#f97316",
          yellow: "#facc15",
          green: "#22c55e",
          mint: "#2dd4bf",
          blue: "#3b82f6",
          navy: "#1e3a8a",
          purple: "#8b5cf6",
          violet: "#7c3aed",
          pink: "#ec4899",
          brown: "#92400e",
          beige: "#d6b48c",
          gray: "#6b7280",
          grey: "#6b7280",
          black: "#111827",
          white: "#f8fafc",
          gold: "#d4af37",
          silver: "#c0c7d1"
        };

        if (colorMap[normalized]) {
          return adjustColorByModifier(colorMap[normalized], normalized);
        }

        const matchedKey = Object.keys(colorMap)
          .sort((a, b) => b.length - a.length)
          .find((key) => normalized.includes(key));

        if (matchedKey) {
          return adjustColorByModifier(colorMap[matchedKey], normalized);
        }

        return "";
      }

      function adjustColorByModifier(hex, normalizedName) {
        if (/파스텔|pastel/.test(normalizedName)) {
          return mixHex(hex, "#ffffff", 0.48);
        }

        if (/연한|연|밝은|밝|라이트|light/.test(normalizedName)) {
          return mixHex(hex, "#ffffff", 0.34);
        }

        if (/진한|진|어두운|어둡|다크|딥|dark|deep/.test(normalizedName)) {
          return mixHex(hex, "#000000", 0.28);
        }

        return hex;
      }

      function mixHex(hex, targetHex, amount) {
        const from = hexToRgb(hex);
        const target = hexToRgb(targetHex);
        const mixed = {
          r: Math.round(from.r + (target.r - from.r) * amount),
          g: Math.round(from.g + (target.g - from.g) * amount),
          b: Math.round(from.b + (target.b - from.b) * amount)
        };

        return rgbToHex(mixed);
      }

      function hexToRgb(hex) {
        const value = hex.replace("#", "");
        return {
          r: parseInt(value.slice(0, 2), 16),
          g: parseInt(value.slice(2, 4), 16),
          b: parseInt(value.slice(4, 6), 16)
        };
      }

      function rgbToHex({ r, g, b }) {
        return `#${[r, g, b]
          .map((value) => value.toString(16).padStart(2, "0"))
          .join("")}`;
      }

      function renderWheel() {
        const slice = 360 / colors.length;
        const gradient = colors
          .map((color, index) => {
            const start = index * slice;
            const end = (index + 1) * slice;
            return `${color.value} ${start}deg ${end}deg`;
          })
          .join(", ");

        wheel.style.background = `conic-gradient(${gradient})`;
      }

      function renderList() {
        colorList.innerHTML = colors
          .map((color, index) => {
            return `
              <div class="color-item">
                <div class="color-name">
                  <span class="swatch" style="background:${color.value}"></span>${escapeHtml(color.name)}
                </div>
                <button class="delete-button" type="button" data-index="${index}" aria-label="${escapeHtml(color.name)} 삭제">×</button>
              </div>
            `;
          })
          .join("");
      }

      function renderResult(color) {
        resultBox.innerHTML = "";
        resultBox.classList.remove("visible");

        if (color) {
          flashSelectedColor(color.value);
        }
      }

      function flashSelectedColor(colorValue) {
        document.body.classList.remove("color-flashing");
        document.body.style.setProperty("--flash-color", colorValue);
        window.requestAnimationFrame(() => {
          document.body.classList.add("color-flashing");
        });

        window.setTimeout(() => {
          document.body.classList.remove("color-flashing");
          startImage.src = "./JH.png";
        }, 3000);
      }

      function spinWheel() {
        if (isSpinning || colors.length === 0) {
          return;
        }

        startButton.blur();
        resetFrameScroll();
        isSpinning = true;
        startButton.disabled = true;
        renderResult(null);

        const selectedIndex = Math.floor(Math.random() * colors.length);
        const slice = 360 / colors.length;
        const selectedCenter = selectedIndex * slice + slice / 2;
        const fullSpins = 5 * 360;
        const currentAngle = ((currentRotation % 360) + 360) % 360;
        const targetAngle = 360 - selectedCenter;
        const extraRotation = (targetAngle - currentAngle + 360) % 360;
        currentRotation += fullSpins + extraRotation;

        wheel.style.transform = `rotate(${currentRotation}deg)`;

        window.setTimeout(() => {
          renderResult(colors[selectedIndex]);
          isSpinning = false;
          startButton.disabled = false;
          resetFrameScroll();
        }, 3000);
      }

      function showPressedState() {
        if (!startButton.disabled) {
          startButton.classList.add("is-pressing");
        }
      }

      function releasePressedState() {
        startButton.classList.remove("is-pressing");
        startImage.src = "./LG.png";
      }

      colorForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = colorName.value.trim();

        if (!name) {
          inputMessage.textContent = "추가할 색상명을 입력해주세요.";
          colorName.focus();
          return;
        }

        const colorValue = resolveColorValue(name);
        if (!colorValue) {
          inputMessage.textContent = "아직 인식하지 못한 색상명입니다. 예: 연보라색, 진파랑, 민트색, 베이지";
          colorName.focus();
          return;
        }

        colors.push({ name, value: colorValue });
        colorName.value = "";
        inputMessage.textContent = "";
        renderWheel();
        renderList();
        showPage("roulette");
      });

      colorList.addEventListener("click", (event) => {
        const button = event.target.closest(".delete-button");
        if (!button || colors.length <= 2) {
          return;
        }

        colors.splice(Number(button.dataset.index), 1);
        renderWheel();
        renderList();
      });

      startButton.addEventListener("pointerdown", showPressedState);
      startButton.addEventListener("pointerup", releasePressedState);
      startButton.addEventListener("pointerleave", () => startButton.classList.remove("is-pressing"));
      startButton.addEventListener("pointercancel", () => startButton.classList.remove("is-pressing"));
      startButton.addEventListener("click", spinWheel);
      rouletteTab.addEventListener("click", () => showPage("roulette"));
      inputTab.addEventListener("click", () => showPage("input"));
      settingsButton.addEventListener("click", () => showPage("input"));

      renderWheel();
      renderList();
