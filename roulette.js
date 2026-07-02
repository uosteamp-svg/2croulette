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
        const normalized = name.replace(/\s+/g, "").toLowerCase();
        const colorMap = {
          빨강: "#ef4444",
          빨간색: "#ef4444",
          레드: "#ef4444",
          주황: "#f97316",
          주황색: "#f97316",
          오렌지: "#f97316",
          노랑: "#facc15",
          노란색: "#facc15",
          옐로우: "#facc15",
          초록: "#22c55e",
          초록색: "#22c55e",
          녹색: "#16a34a",
          그린: "#22c55e",
          민트: "#2dd4bf",
          민트색: "#2dd4bf",
          청록: "#14b8a6",
          하늘: "#38bdf8",
          하늘색: "#38bdf8",
          파랑: "#3b82f6",
          파란색: "#3b82f6",
          블루: "#3b82f6",
          남색: "#1d4ed8",
          보라: "#8b5cf6",
          보라색: "#8b5cf6",
          퍼플: "#8b5cf6",
          분홍: "#ec4899",
          분홍색: "#ec4899",
          핑크: "#ec4899",
          자주: "#be185d",
          갈색: "#92400e",
          브라운: "#92400e",
          베이지: "#d6b48c",
          검정: "#111827",
          검은색: "#111827",
          블랙: "#111827",
          회색: "#6b7280",
          그레이: "#6b7280",
          흰색: "#f8fafc",
          하양: "#f8fafc",
          화이트: "#f8fafc",
          금색: "#d4af37",
          골드: "#d4af37",
          은색: "#c0c7d1",
          실버: "#c0c7d1"
        };

        if (colorMap[normalized]) {
          return colorMap[normalized];
        }

        let hash = 0;
        for (let index = 0; index < normalized.length; index += 1) {
          hash = (hash * 31 + normalized.charCodeAt(index)) % 360;
        }

        return `hsl(${hash}, 78%, 58%)`;
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

        colors.push({ name, value: resolveColorValue(name) });
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
