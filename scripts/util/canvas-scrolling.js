  document.addEventListener('DOMContentLoaded', function () {
    
    
    // welcome-video 初始化
    document.querySelectorAll('.welcome-video').forEach((video) => {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const videoSrc = isSafari ? video.dataset.srcMov : video.dataset.srcWebm;

      const loadVideo = () => {
        if (!videoSrc) return;
        video.src = videoSrc;
        video.load();
        video.play().catch((err) => {
          console.warn('Autoplay may be blocked:', err);
        });
      };
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadVideo();
              observer.disconnect();
            }
          });
        },
        { rootMargin: '0px 0px 200px 0px' }
      ).observe(video);
      setTimeout(() => video.classList.add('visible'), 2000);
    });

    // canvas_scroll 初始化
    const configEl = document.getElementById('block-configs-template--16981198340205__air75v3_block_composition_rPyUy8');
    if (!configEl) return;
    let configs = [];
    try {
      configs = JSON.parse(configEl.textContent);
    } catch (e) {
      console.error('Invalid JSON in canvas_scroll config:', e);
      return;
    }
    configs.forEach((cfg) => {
      if (cfg.type === 'canvas_scroll') {
        const canvas = document.getElementById(cfg.canvasId);
        const trigger = document.getElementById(cfg.triggerId);
        if (canvas && trigger && typeof setupScrollCanvas === 'function') {
          setupScrollCanvas(
            canvas,
            trigger,
            cfg.basePath,
            cfg.ext,
            cfg.frameCount,
            cfg.frameDuration,
            cfg.fadeTextId,
            cfg.contentPosition
          );
        }
      }
    });

    // title_video 模块 Safari 视频适配
    document.querySelectorAll('[id^="title-video-"]').forEach((video) => {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const safariUrl = video.getAttribute('data-safari-url');
      if (isSafari && safariUrl) {
        video.src = safariUrl;
        video.load();
      }
    });

    // electricity_comparison模块逻辑处理
    document.querySelectorAll('[data-electricity-config]').forEach((container) => {
      const config = JSON.parse(container.getAttribute('data-electricity-config'));
      const section = document.getElementById(`battery-progress-${config.id}`);
      const buttons = container.querySelectorAll('.button');
      const speedPerPercent = 15;

      function animateBars(mode) {
        const bars = section.querySelectorAll('.bar');
        const baseValue = parseFloat(config[mode].v3);

        bars.forEach((bar) => {
          const item = bar.dataset.item;
          const valueSpan = bar.querySelector('.value');
          const fill = bar.querySelector('.progress-fill');
          const raw = config[mode][item];
          const value = parseFloat(raw);
          const width = Math.round((value / baseValue) * 100);

          valueSpan.style.opacity = 0;
          fill.style.transition = 'none';
          fill.style.width = '0%';
          fill.offsetHeight;

          setTimeout(() => {
            const duration = width * speedPerPercent;
            fill.style.transition = `width ${duration}ms ease-out`;
            fill.style.width = `${width}%`;
            valueSpan.textContent = raw;
            valueSpan.style.opacity = 1;
          }, 50);
        });
      }

      // Intersection Observer
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateBars('off');
              observer.unobserve(section);
            }
          });
        },
        { threshold: 0.8 }
      ).observe(section);

      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          animateBars(btn.dataset.mode);
        });
      });
    });

    // angle_show 模块逻辑处理
    document.querySelectorAll('[data-angle-show]').forEach((el) => {
      const config = JSON.parse(el.getAttribute('data-angle-show'));
      const imgEl = document.getElementById(`angle-image-${config.id}`);
      const buttons = el.querySelectorAll('.button');

      function updateAngleImage(index) {
        const newImg = config.images[index];
        imgEl.classList.remove('fade-in');
        void imgEl.offsetWidth;
        imgEl.classList.add('fade-in');
        imgEl.src = newImg;
        buttons.forEach((b) => b.classList.remove('active'));
        buttons[index].classList.add('active');
      }

      updateAngleImage(config.defaultIndex);

      buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => updateAngleImage(index));
      });
    });
  });