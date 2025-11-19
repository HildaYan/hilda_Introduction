/* CoreCompetencies.js */

// 核心能力雷達圖 + 長條動畫（終極版：長條動畫 100% 超明顯！）
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#CoreCompetencies');
  let radarChart = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // === 長條動畫：關鍵三連擊 ===
        requestAnimationFrame(() => {           // 1. 等下一幀
          document.querySelectorAll('#CoreCompetencies .progress-fill').forEach(bar => {
            bar.style.width = '0%';             // 2. 先強制回到 0（觸發重繪）
          });

          requestAnimationFrame(() => {         // 3. 再下一幀才真的填滿 → 動畫才會出現！
            document.querySelectorAll('#CoreCompetencies .progress-fill').forEach(bar => {
              const targetWidth = bar.getAttribute('data-width');
              bar.style.width = targetWidth + '%';
            });
          });
        });

        // === 雷達圖（0.6 秒後出現）===
        setTimeout(() => {
          const ctx = document.getElementById('schoolSkillsRadar').getContext('2d');
          if (radarChart) radarChart.destroy();
          radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
              labels: ['數位科技應用能力','資訊管理應用能力','程式設計應用能力','經營管理知能能力','自主學習與團隊合作能力'],
              datasets: [{
                data: [95, 90.1, 92.43, 91.52, 92.55],
                backgroundColor: 'rgba(156,139,122,0.25)',
                borderColor: '#9c8b7a',
                borderWidth: 4,
                pointBackgroundColor: '#776b5d',
                pointBorderColor: '#fff',
                pointRadius: 9,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 2600, easing: 'easeOutQuart' },
              scales: {
                r: {
                  min: 0, max: 100,
                  ticks: { stepSize: 20, color: '#776b5d', font: { size: 12 } },
                  grid: { color: 'rgba(119,107,93,0.15)' },
                  angleLines: { color: 'rgba(119,107,93,0.15)' },
                  pointLabels: { color: '#444', font: { size: 14, weight: '600' } }
                }
              },
              plugins: { legend: { display: false } }
            }
          });
        }, 600);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(section);
});