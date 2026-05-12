/* ================================================
   OSAMA(IT) — app.js
   ميزات JavaScript احترافية
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     0. نظام الترجمة (i18n)
  -------------------------------------------------- */
  const translations = {
    ar: {
      'الرئيسية': 'الرئيسية',
      'الدورات': 'الدورات',
      'المميزات': 'المميزات',
      'تواصل معنا': 'تواصل معنا',
      'المفضلة': 'المفضلة',
      'السلة': 'السلة',
      'الملف الشخصي': 'الملف الشخصي',
      'الأسئلة الشائعة': 'الأسئلة الشائعة',
      'المدونة': 'المدونة',
      'المدرسون': 'المدرسون',
      'شهاداتي': 'شهاداتي',
      'مدونتنا': 'مدونتنا',
      'نصائح وموضوعات حصرية في عالم البرمجة والتقنية.': 'نصائح وموضوعات حصرية في عالم البرمجة والتقنية.',
      'ابحث عن مقال أو فئة أو مؤلف...': 'ابحث عن مقال أو فئة أو مؤلف...',
      'الكل': 'الكل'
    },
    en: {
      'الرئيسية': 'Home',
      'الدورات': 'Courses',
      'المميزات': 'Features',
      'تواصل معنا': 'Contact Us',
      'المفضلة': 'Favorites',
      'السلة': 'Cart',
      'الملف الشخصي': 'Profile',
      'الأسئلة الشائعة': 'FAQ',
      'المدونة': 'Blog',
      'المدرسون': 'Instructors',
      'شهاداتي': 'My Certificates',
      'مدونتنا': 'Our Blog',
      'نصائح وموضوعات حصرية في عالم البرمجة والتقنية.': 'Exclusive tips and topics in programming and technology.',
      'ابحث عن مقال أو فئة أو مؤلف...': 'Search for an article, category, or author...',
      'الكل': 'All'
    }
  };

  function changeLanguage(lang) {
    const currentLang = lang || document.documentElement.getAttribute('lang') || 'ar';
    
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // ترجمة جميع النصوص
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[currentLang] && translations[currentLang][key]) {
        if (el.tagName === 'INPUT') {
          el.placeholder = translations[currentLang][key];
        } else {
          el.textContent = translations[currentLang][key];
        }
      }
    });

    localStorage.setItem('osamait-lang', currentLang);
  }

  /* --------------------------------------------------
     1. صور حقيقية للكروت (Unsplash)
  -------------------------------------------------- */
  const courseImages = [
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8b08f?w=600&q=80',
      alt: 'Python programming'
    },
    {
      url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
      alt: 'React development'
    },
    {
      url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
      alt: 'Artificial Intelligence'
    },
    {
      url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
      alt: 'Cybersecurity'
    },
    {
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
      alt: 'Web Design'
    },
    {
      url: 'https://images.unsplash.com/photo-1518622808298-2713592f42f2?w=600&q=80',
      alt: 'Mobile Development'
    },
    {
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
      alt: 'Data Science'
    },
    {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      alt: 'Cloud Computing'
    }
  ];

  const cardImgs = document.querySelectorAll('.card-img');
  cardImgs.forEach((el, i) => {
    const img = courseImages[i];
    if (!img) return;
    el.style.backgroundImage = `url('${img.url}')`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.position = 'relative';

    // overlay داكن فوق الصورة
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:absolute; inset:0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%);
      border-radius: inherit;
    `;
    el.insertBefore(overlay, el.firstChild);

    // الإيموجي يبقى فوق الـ overlay
    const emoji = el.querySelector('.card-emoji');
    if (emoji) emoji.style.position = 'relative';
  });


  /* --------------------------------------------------
     2. Dark Mode مع حفظ في localStorage
  -------------------------------------------------- */
  const iconMoon = `
    <svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3c0 .33.02.65.06.97A7 7 0 0021 12.79z" />
    </svg>
  `;

  const iconSun = `
    <svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
      <path d="M12 2.75v2.5M12 18.75v2.5M4.75 12h2.5M16.75 12h2.5M6.22 6.22l1.77 1.77M15.01 15.01l1.77 1.77M6.22 17.78l1.77-1.77M15.01 8.99l1.77-1.77" />
    </svg>
  `;

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('osamait-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = iconSun;
  } else if (themeToggle) {
    themeToggle.innerHTML = iconMoon;
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = isDark ? iconSun : iconMoon;
    localStorage.setItem('osamait-theme', isDark ? 'dark' : 'light');
  });


  /* --------------------------------------------------
     2.5. Language Toggle
  -------------------------------------------------- */
  const langToggle = document.getElementById('langToggle');
  const savedLang = localStorage.getItem('osamait-lang') || 'ar';
  
  // تطبيق اللغة المحفوظة عند التحميل
  changeLanguage(savedLang);

  langToggle?.addEventListener('click', () => {
    const currentLang = document.documentElement.getAttribute('lang') || 'ar';
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    changeLanguage(newLang);
    showToast(newLang === 'en' ? 'Language changed to English ✨' : 'تم تغيير اللغة إلى العربية ✨');
  });


  /* --------------------------------------------------
     3. Navbar scroll effect
  -------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });


  /* --------------------------------------------------
     4. Scroll Reveal للكروت والميزات
  -------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .feat-item').forEach(el => revealObserver.observe(el));


  /* --------------------------------------------------
     5. Counter Animation للإحصائيات في Hero
  -------------------------------------------------- */
  function animateCounter(el, target, suffix = '', duration = 1800) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + suffix;
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      statsObserver.unobserve(entry.target);
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(el => {
        const raw = el.textContent.trim();
        if (raw.includes('200')) animateCounter(el, 200, '+');
        else if (raw.includes('50K')) {
          let n = 0;
          const t = setInterval(() => {
            n += 1;
            el.textContent = '+' + n + 'K';
            if (n >= 50) clearInterval(t);
          }, 36);
        } else if (raw.includes('٩٨')) {
          el.textContent = '0٪';
          let v = 0;
          const t2 = setInterval(() => {
            v++;
            el.textContent = v + '٪';
            if (v >= 98) clearInterval(t2);
          }, 18);
        }
      });
    });
  }, { threshold: 0.5 });

  const statsRow = document.querySelector('.hero-stats');
  if (statsRow) statsObserver.observe(statsRow);


  /* --------------------------------------------------
     6. Typewriter effect للعنوان الرئيسي
  -------------------------------------------------- */
  const highlight = document.querySelector('.hero-highlight');
  if (highlight) {
    const text = highlight.textContent;
    highlight.textContent = '';
    highlight.style.borderLeft = '2px solid currentColor';
    let idx = 0;
    const type = setInterval(() => {
      highlight.textContent += text[idx];
      idx++;
      if (idx >= text.length) {
        clearInterval(type);
        highlight.style.borderLeft = 'none';
      }
    }, 70);
  }


  /* --------------------------------------------------
     7. Toast Notification عند الضغط على "سجّل الآن"
  -------------------------------------------------- */
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed; bottom: 24px; left: 24px;
        z-index: 9999; display: flex; flex-direction: column; gap: 10px;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: ${type === 'success' ? 'linear-gradient(135deg,#00d4aa,#6c63ff)' : '#ef4444'};
      color: white; padding: 14px 20px; border-radius: 12px;
      font-family: 'Cairo', sans-serif; font-size: 0.9rem; font-weight: 700;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      transform: translateY(20px); opacity: 0;
      transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
      max-width: 300px; line-height: 1.5;
      display: flex; align-items: center; gap: 10px;
    `;
    toast.innerHTML = `<span style="font-size:1.2rem">🎉</span> ${message}`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  }

  /* --------------------------------------------------
     Registration Modal
  -------------------------------------------------- */
  function createRegistrationModal() {
    let modal = document.getElementById('registration-modal');
    if (modal) return;

    modal = document.createElement('div');
    modal.id = 'registration-modal';
    modal.style.cssText = `
      display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center;
      justify-content: center; flex-direction: column;
    `;

    modal.innerHTML = `
      <div style="
        background: var(--bg-card); border-radius: var(--radius);
        padding: 32px; max-width: 500px; width: 90%;
        box-shadow: var(--shadow-lg); position: relative;
      ">
        <button style="
          position: absolute; top: 16px; left: 16px; background: none;
          border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-primary);
        " onclick="document.getElementById('registration-modal').style.display='none'">✕</button>

        <h2 style="
          font-size: 1.6rem; font-weight: 900; color: var(--text-primary);
          margin-bottom: 8px; text-align: right;
        ">تسجيل في الدورة</h2>
        
        <p style="
          color: var(--text-secondary); margin-bottom: 24px; text-align: right;
          font-size: 0.95rem;
        ">يرجى ملء بيانات التسجيل</p>

        <form id="registration-form" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="
              display: block; font-weight: 600; color: var(--text-primary);
              margin-bottom: 6px; font-size: 0.9rem;
            ">الاسم الكامل</label>
            <input type="text" name="fullname" placeholder="أحمد محمد" required style="
              width: 100%; padding: 12px 14px; border: 1px solid var(--border);
              border-radius: var(--radius-sm); background: var(--bg);
              color: var(--text-primary); font-family: var(--font-main);
              font-size: 0.95rem;
            ">
          </div>

          <div>
            <label style="
              display: block; font-weight: 600; color: var(--text-primary);
              margin-bottom: 6px; font-size: 0.9rem;
            ">البريد الإلكتروني</label>
            <input type="email" name="email" placeholder="example@email.com" required style="
              width: 100%; padding: 12px 14px; border: 1px solid var(--border);
              border-radius: var(--radius-sm); background: var(--bg);
              color: var(--text-primary); font-family: var(--font-main);
              font-size: 0.95rem;
            ">
          </div>

          <div>
            <label style="
              display: block; font-weight: 600; color: var(--text-primary);
              margin-bottom: 6px; font-size: 0.9rem;
            ">رقم الهاتف</label>
            <input type="tel" name="phone" placeholder="+966 50 123 4567" required style="
              width: 100%; padding: 12px 14px; border: 1px solid var(--border);
              border-radius: var(--radius-sm); background: var(--bg);
              color: var(--text-primary); font-family: var(--font-main);
              font-size: 0.95rem;
            ">
          </div>

          <div>
            <label style="
              display: block; font-weight: 600; color: var(--text-primary);
              margin-bottom: 6px; font-size: 0.9rem;
            ">المستوى التعليمي</label>
            <select name="level" required style="
              width: 100%; padding: 12px 14px; border: 1px solid var(--border);
              border-radius: var(--radius-sm); background: var(--bg);
              color: var(--text-primary); font-family: var(--font-main);
              font-size: 0.95rem;
            ">
              <option value="">اختر المستوى</option>
              <option value="مبتدئ">مبتدئ</option>
              <option value="متوسط">متوسط</option>
              <option value="متقدم">متقدم</option>
            </select>
          </div>

          <button type="submit" style="
            width: 100%; padding: 12px; background: linear-gradient(135deg, var(--accent), var(--accent-2));
            color: white; border: none; border-radius: 50px; font-family: var(--font-main);
            font-size: 1rem; font-weight: 700; cursor: pointer;
            box-shadow: 0 6px 24px var(--accent-glow); transition: all var(--transition);
          " onmouseover="this.style.transform='translateY(-3px); this.style.boxShadow='0 12px 36px var(--accent-glow)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 24px var(--accent-glow)'">
            تأكيد التسجيل
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('registration-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(document.getElementById('registration-form'));
      const courseName = modal.dataset.courseName || 'الدورة';
      
      const message = `تم تسجيلك بنجاح في دورة "${courseName}"! سيتم إرسال تفاصيل الدورة إلى ${formData.get('email')}`;
      showToast(message);
      
      modal.style.display = 'none';
      document.getElementById('registration-form').reset();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  const courseNames = [
    'Python من الصفر',
    'React & Full Stack',
    'AI & Machine Learning',
    'أمن المعلومات',
    'تصميم الويب (UI/UX)',
    'تطوير تطبيقات الموبايل',
    'علم البيانات والتحليل',
    'الحوسبة السحابية AWS'
  ];
  document.querySelectorAll('.card-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      createRegistrationModal();
      const modal = document.getElementById('registration-modal');
      modal.dataset.courseName = courseNames[i] || 'الدورة';
      modal.style.display = 'flex';
    });
  });

  document.querySelector('.nav-cta')?.addEventListener('click', () => {
    showToast('أهلاً بك! حسابك قيد الإنشاء...');
  });

  const formatPrice = value => `$${value.toFixed(2).replace(/\.00$/, '')}`;
  const parsePrice = text => Number((text || '').replace(/[^0-9.-]+/g, '')) || 0;
  const storageKey = 'osamait-cart';
  let currentCartDiscount = 0;

  const saveCart = items => localStorage.setItem(storageKey, JSON.stringify(items));
  const loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  };

  const updateCartSummary = (cartItems, discount = 0) => {
    const cartSummary = document.querySelector('.cart-summary');
    if (!cartSummary) return;
    const rows = cartSummary.querySelectorAll('.summary-row');
    const baseEl = rows[0]?.querySelector('span:nth-child(2)');
    const discountEl = rows[1]?.querySelector('span:nth-child(2)');
    const totalEl = rows[2]?.querySelector('span:nth-child(2)');
    const baseTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const discountValue = Math.round((baseTotal * discount) / 100);

    if (baseEl) baseEl.textContent = formatPrice(baseTotal);
    if (discountEl) discountEl.textContent = `-${formatPrice(discountValue)}`;
    if (totalEl) totalEl.textContent = formatPrice(baseTotal - discountValue);
  };

  const rebuildCartItems = items => {
    const container = document.querySelector('.cart-items');
    if (!container) return;
    container.innerHTML = '';

    if (!items.length) {
      container.innerHTML = `
        <div style="padding: 32px; text-align: center; color: var(--text-secondary);">
          السلة فارغة حالياً، أضف بعض الدورات من صفحة الدورات أو المفضلة.
        </div>
      `;
      updateCartSummary([], 0);
      return;
    }

    items.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div class="item-info">
          <div class="item-title">${item.title}</div>
          <div class="item-desc">${item.desc || 'تفاصيل الدورة'}</div>
        </div>
        <div class="item-price">${formatPrice(item.price)}</div>
        <button class="remove-item-btn">إزالة</button>
      `;
      row.querySelector('.remove-item-btn')?.addEventListener('click', () => {
        const currentCart = loadCart();
        const removedIndex = currentCart.findIndex((cartItem, i) => cartItem.title === item.title && cartItem.price === item.price && i === index);
        if (removedIndex > -1) currentCart.splice(removedIndex, 1);
        saveCart(currentCart);
        rebuildCartItems(currentCart);
        updateCartSummary(currentCart, currentCart.length ? currentCartDiscount : 0);
        showToast(`تمت إزالة ${item.title} من السلة`);
      });
      container.appendChild(row);
    });

    updateCartSummary(items, currentCartDiscount);
  };

  const initializeCartPage = () => {
    const cartSummary = document.querySelector('.cart-summary');
    if (!cartSummary) return;

    const initialItems = Array.from(document.querySelectorAll('.cart-item')).map(item => ({
      title: item.querySelector('.item-title')?.textContent.trim() || 'دورة',
      desc: item.querySelector('.item-desc')?.textContent.trim() || '',
      price: parsePrice(item.querySelector('.item-price')?.textContent || '0')
    }));

    const storedCart = loadCart();
    const cartItems = storedCart.length ? storedCart : initialItems;
    saveCart(cartItems);
    rebuildCartItems(cartItems);

    const couponButton = document.querySelector('.coupon-input button');
    couponButton?.addEventListener('click', event => {
      event.preventDefault();
      window.applyCoupon();
    });

    document.querySelector('.checkout-btn')?.addEventListener('click', () => {
      const cartItemsNow = loadCart();
      if (!cartItemsNow.length) {
        showToast('السلة فارغة، أضف دورات أولاً.');
        return;
      }
      const total = cartItemsNow.reduce((sum, item) => sum + item.price, 0);
      saveCart([]);
      currentCartDiscount = 0;
      rebuildCartItems([]);
      showToast(`تم الدفع بنجاح! الإجمالي ${formatPrice(total)}`);
    });
  };

  const attachWishlistPageActions = () => {
    const wishlistGrid = document.getElementById('wishlistGrid');
    if (!wishlistGrid) return;

    const cartButtonHandler = (title, price) => {
      const cart = loadCart();
      cart.push({ title, price, desc: 'تمت الإضافة من المفضلة' });
      saveCart(cart);
      showToast(`تمت إضافة ${title} إلى السلة`);
    };

    wishlistGrid.querySelectorAll('.wishlist-card').forEach(card => {
      const title = card.querySelector('.wishlist-title')?.textContent.trim() || 'دورة';
      const price = parsePrice(card.querySelector('.wishlist-price')?.textContent || '0');

      card.querySelector('.remove-btn')?.addEventListener('click', () => {
        card.remove();
        showToast(`تمت إزالة ${title} من المفضلة`);
      });

      card.querySelector('.add-to-cart')?.addEventListener('click', () => {
        card.remove();
        cartButtonHandler(title, price);
      });
    });
  };

  const attachProfileButtons = () => {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('يمكنك تعديل بيانات الحساب قريباً.');
      });
    });

    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'تحميل الشهادة') {
        btn.addEventListener('click', () => {
          showToast('جاري تجهيز الشهادة للتحميل...');
        });
      }
    });
  };

  attachWishlistPageActions();
  initializeCartPage();
  attachProfileButtons();


  /* --------------------------------------------------
     8. Mobile Hamburger Menu
  -------------------------------------------------- */
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');

  // إضافة زر الهامبرغر
  const hamburger = document.createElement('button');
  hamburger.id = 'hamburger';
  hamburger.setAttribute('aria-label', 'القائمة');
  hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  hamburger.style.cssText = `
    display: none; flex-direction: column; gap: 5px; background: none;
    border: 1px solid var(--border); border-radius: 8px; padding: 8px 10px;
    cursor: pointer; margin-right: auto;
  `;
  hamburger.querySelectorAll('span').forEach(s => {
    s.style.cssText = 'display:block; width:20px; height:2px; background:var(--text-primary); border-radius:2px; transition:all 0.3s;';
  });
  navContainer.insertBefore(hamburger, navContainer.querySelector('.nav-actions'));

  // Mobile menu overlay
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.style.cssText = `
    display: none; position: fixed; top: 68px; left: 0; right: 0;
    background: var(--bg-card); border-bottom: 1px solid var(--border);
    padding: 20px 24px; z-index: 999; flex-direction: column; gap: 4px;
    box-shadow: var(--shadow-md);
  `;
  ['الرئيسية','الدورات','المميزات','تواصل معنا'].forEach((text, i) => {
    const hrefs = ['#hero','#courses','#features','#footer'];
    const a = document.createElement('a');
    a.href = hrefs[i]; a.textContent = text;
    a.style.cssText = `
      text-decoration: none; color: var(--text-primary); font-family: 'Cairo', sans-serif;
      font-size: 1rem; font-weight: 700; padding: 12px 16px; border-radius: 8px;
      transition: background 0.2s; display: block;
    `;
    a.addEventListener('mouseover', () => a.style.background = 'var(--accent-glow)');
    a.addEventListener('mouseleave', () => a.style.background = '');
    a.addEventListener('click', () => closeMobileMenu());
    mobileMenu.appendChild(a);
  });
  document.body.appendChild(mobileMenu);

  let menuOpen = false;
  function openMobileMenu() {
    menuOpen = true;
    mobileMenu.style.display = 'flex';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }
  function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.style.display = 'none';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = ''; spans[1].style.opacity = '1'; spans[2].style.transform = '';
  }

  hamburger.addEventListener('click', () => menuOpen ? closeMobileMenu() : openMobileMenu());

  // إظهار/إخفاء الهامبرغر حسب حجم الشاشة
  const mq = window.matchMedia('(max-width: 900px)');
  function handleMQ(e) {
    hamburger.style.display = e.matches ? 'flex' : 'none';
    if (!e.matches) closeMobileMenu();
  }
  mq.addEventListener('change', handleMQ);
  handleMQ(mq);


  /* --------------------------------------------------
     9. Smooth Active Link Highlight أثناء التمرير
  -------------------------------------------------- */
  // Removed for multi-page setup


  /* --------------------------------------------------
     10. Particle effect خلف Hero (نقاط متحركة)
  -------------------------------------------------- */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute; inset: 0; pointer-events: none;
      z-index: 0; opacity: 0.35;
    `;
    heroSection.style.position = 'relative';
    heroSection.insertBefore(canvas, heroSection.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H, particles;

    function resize() {
      W = canvas.width = heroSection.offsetWidth;
      H = canvas.height = heroSection.offsetHeight;
    }

    function initParticles() {
      particles = Array.from({ length: 55 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,170,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }


  /* --------------------------------------------------
     11. Back To Top Button
  -------------------------------------------------- */
  const backBtn = document.createElement('button');
  backBtn.id = 'back-to-top';
  backBtn.textContent = '↑';
  backBtn.setAttribute('aria-label', 'العودة للأعلى');
  backBtn.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 999;
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: white; border: none; font-size: 1.2rem; font-weight: 900;
    cursor: pointer; box-shadow: 0 4px 16px rgba(0,212,170,0.4);
    opacity: 0; transform: scale(0); transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    display: flex; align-items: center; justify-content: center;
    font-family: monospace;
  `;
  document.body.appendChild(backBtn);

  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    backBtn.style.opacity = show ? '1' : '0';
    backBtn.style.transform = show ? 'scale(1)' : 'scale(0)';
  });

  backBtn.addEventListener('mouseover', () => backBtn.style.transform = 'scale(1.15)');
  backBtn.addEventListener('mouseleave', () => backBtn.style.transform = 'scale(1)');

  /* --------------------------------------------------
     12. Coupon & Promo System
  -------------------------------------------------- */
  window.applyCoupon = function() {
    const couponInput = document.querySelector('.coupon-input input');
    if (!couponInput) return;
    const couponCode = couponInput.value.toUpperCase().trim();
    
    const coupons = {
      'WELCOME': { discount: 20, desc: 'ترحيب' },
      'SUMMER': { discount: 30, desc: 'صيفي' },
      'REFER5': { discount: 15, desc: 'إحالة' },
      'NEWYEAR': { discount: 25, desc: 'رأس السنة' }
    };

    if (coupons[couponCode]) {
      const { discount, desc } = coupons[couponCode];
      showToast(`✨ تم تطبيق الكود "${couponCode}" (${desc}) - خصم ${discount}%`);
      couponInput.style.borderColor = 'var(--accent)';
      couponInput.value = '';
    } else if (couponCode) {
      showToast('❌ الكود غير صحيح أو منتهي الصلاحية');
      couponInput.style.borderColor = '#c33';
    }
  };

  /* --------------------------------------------------
     13. Seasonal Offers
  -------------------------------------------------- */
  const currentMonth = new Date().getMonth();
  const seasonalOffers = {
    summer: { months: [6, 7, 8], discount: 30, title: 'عرض الصيف' },
    newyear: { months: [0], discount: 25, title: 'عرض رأس السنة' },
    fallback: { months: [], discount: 15, title: 'عرض خاص' }
  };

  /* --------------------------------------------------
     14. Referral Program
  -------------------------------------------------- */
  window.getReferralLink = function() {
    const refCode = Math.random().toString(36).substr(2, 9).toUpperCase();
    const refLink = `${window.location.origin}?ref=${refCode}`;
    showToast(`تم نسخ رابط الإحالة! 🔗`);
    navigator.clipboard.writeText(refLink).catch(() => {
      alert('رابطك: ' + refLink);
    });
  };

});

