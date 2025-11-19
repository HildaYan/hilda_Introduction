/* certificates.js */

/* === 滾動動畫 === */
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
sections.forEach(sec => {
const rect = sec.getBoundingClientRect();
if (rect.top < window.innerHeight - 100) {
  sec.classList.add("visible");
}
});
});
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const slideWidth = slides[0].getBoundingClientRect().width + 16; // 包含 margin

let currentIndex = 0;
let autoPlay;

// 排列幻燈片
const arrangeSlides = () => {
slides.forEach((slide, index) => {
  slide.style.left = `${index * slideWidth}px`;
});
};

// 移動
const moveToSlide = (index) => {
track.style.transform = `translateX(-${index * slideWidth}px)`;
currentIndex = index;
};

// 下一張
const nextSlide = () => {
if (currentIndex >= slides.length - 1) {
  currentIndex = 0;
} else {
  currentIndex++;
}
moveToSlide(currentIndex);
};

// 上一張
const prevSlide = () => {
if (currentIndex <= 0) {
  currentIndex = slides.length - 1;
} else {
  currentIndex--;
}
moveToSlide(currentIndex);
};

// 自動播放
const startAutoPlay = () => {
autoPlay = setInterval(nextSlide, 3000); // 每 3 秒
};

const stopAutoPlay = () => {
clearInterval(autoPlay);
};

// 事件
nextButton.addEventListener('click', () => {
nextSlide();
stopAutoPlay();
startAutoPlay(); // 重啟計時
});

prevButton.addEventListener('click', () => {
prevSlide();
stopAutoPlay();
startAutoPlay();
});

// 滑鼠移入整個區塊 → 暫停
document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoPlay);

// 初始化
arrangeSlides();
startAutoPlay();

document.querySelectorAll('.contact-item[data-copy]').forEach(item => {
    item.addEventListener('click', () => {
      const text = item.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        item.classList.add('copied');
        setTimeout(() => item.classList.remove('copied'), 2000);
      });
    });
  });
  
 
// 證照燈箱功能
document.querySelectorAll('.carousel-slide').forEach(slide => {
  slide.style.cursor = 'pointer';
  slide.addEventListener('click', () => {
    const img = slide.querySelector('img');
    const p = slide.querySelector('p');
    const lines = p.innerHTML.split('<br>');
    
    // 提取資料
    const issuer = lines[0].trim();
    const certName = p.querySelector('strong')?.innerText || '';
    const date = lines[lines.length - 1].trim();

    // 填入燈箱
    document.getElementById('lightboxImage').src = img.src;
    document.getElementById('lightboxIssuer').textContent = issuer;
    document.getElementById('lightboxName').textContent = certName;
    document.getElementById('lightboxDate').textContent = date;

    // 開啟燈箱
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滾動
  });
});

// 關閉燈箱

document.getElementById('closeLightbox').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = 'auto';
});

// 點擊遮罩也關閉
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});