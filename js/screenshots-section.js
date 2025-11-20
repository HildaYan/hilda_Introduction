document.addEventListener('DOMContentLoaded', () => {
  // === 技術架構圖：點擊放大（左圖右文 + 完美關閉）===
  document.querySelectorAll('.clickable-architecture').forEach(card => {
    card.addEventListener('click', function () {
      const imgSrc = this.getAttribute('data-img');
      const title = this.getAttribute('data-title') || '技術架構圖';

      // 建立 Lightbox（跟你的證照一模一樣的樣式）
      const lightboxHTML = `
        <div class="lightbox-overlay active" id="architectureLightbox">
          <div class="lightbox-content">
            <!-- 左邊圖片 -->
            <div class="lightbox-img">
              <img src="${imgSrc}" alt="${title}">
            </div>
            <!-- 右邊文字說明 -->
            <div class="lightbox-info">
              <h3>模組架構圖</h3>
              <div class="cert-name">系統採模組化設計，要包含四大模組，分別為影像辨識模組、AR導航模組、天室室模組與捷運資訊模組。影像辨識模組透過ORB特徵點提取與資料庫比對進行定位；AR導航模組利用Immersal SDK 與 Unity 將路徑疊加於實景畫面。整體流程包括資料蒐集、特徵建模、定位測試與導航展示。</div>
            </div>
            <!-- 關閉按鈕 -->
            <button class="lightbox-close">&times;</button>
          </div>
        </div>
      `;

      // 插入到 body
      document.body.insertAdjacentHTML('beforeend', lightboxHTML);
      document.body.style.overflow = 'hidden';

      // 關閉函數
      const closeLightbox = () => {
        const lb = document.getElementById('architectureLightbox');
        if (lb) {
          lb.remove();
          document.body.style.overflow = 'auto';
        }
      };

      // 綁定關閉事件（事件委派 + setTimeout 確保 DOM 已存在）
      setTimeout(() => {
        const overlay = document.getElementById('architectureLightbox');
        const closeBtn = overlay?.querySelector('.lightbox-close');

        // 點背景關閉
        overlay?.addEventListener('click', (e) => {
          if (e.target === overlay) closeLightbox();
        });

        // 點 X 關閉
        closeBtn?.addEventListener('click', closeLightbox);

        // ESC 鍵關閉
        const escHandler = (e) => {
          if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);
      }, 100);
    });
  });
});
