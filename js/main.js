// ================================================
// ポートフォリオサイト - メインJavaScript
// ================================================

// DOM要素
const galleryGrid = document.getElementById('gallery-grid');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

// ================================================
// 作品データの読み込み
// ================================================
async function loadWorks() {
  try {
    const response = await fetch('data/works.json');

    if (!response.ok) {
      throw new Error('作品データの読み込みに失敗しました');
    }

    const works = await response.json();
    renderGallery(works);

  } catch (error) {
    console.error('Error loading works:', error);

    // ローカル環境でfetchが失敗する場合のフォールバック
    // works.jsonと同じ内容を使用
    const fallbackWorks = [
      {
        id: 1,
        title: "珀楽るい様収益化サムネイル",
        image: "images/works/thumbnail-1.png",
        description: "活動終了又は休止中",
        category: "thumbnail",
        clientName: "珀楽るい",
        clientTwitter: ""
      },
      {
        id: 2,
        title: "飴白なび様初配信サムネイル",
        image: "images/works/thumbnail-2.png",
        description: "",
        category: "thumbnail",
        clientName: "飴白なび",
        clientTwitter: "Iam_Nabi_VT"
      },
      {
        id: 3,
        title: "月影ほたる様初配信サムネイル",
        image: "images/works/thumbnail-3.png",
        description: "",
        category: "thumbnail",
        clientName: "月影ほたる",
        clientTwitter: "TsukikageH0taru"
      }
    ];

    renderGallery(fallbackWorks);
  }
}

// ================================================
// ギャラリーの描画
// ================================================
function renderGallery(works) {
  // ローディング表示をクリア
  galleryGrid.innerHTML = '';

  works.forEach((work, index) => {
    const card = createWorkCard(work, index);
    galleryGrid.appendChild(card);
  });
}

// ================================================
// 作品カードの作成
// ================================================
function createWorkCard(work, index) {
  const card = document.createElement('div');
  card.className = 'work-card fade-in';
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
    <div class="work-image-wrapper">
      <img src="${work.image}" alt="${work.title}" class="work-image" loading="lazy">
    </div>
    <div class="work-info">
      <h3 class="work-title">${work.title}</h3>
    </div>
  `;

  // クリックイベント
  card.addEventListener('click', () => openModal(work));

  return card;
}

// ================================================
// モーダルを開く
// ================================================
function openModal(work) {
  modalImage.src = work.image;
  modalImage.alt = work.title;
  modalTitle.textContent = work.title;

  // 説明文とクライアント情報を組み合わせて表示
  let descriptionHTML = '';

  // 通常の説明文がある場合
  if (work.description) {
    descriptionHTML += `<p>${work.description}</p>`;
  }

  // クライアント情報を表示
  if (work.clientName) {
    descriptionHTML += '<p class="client-info">';
    descriptionHTML += `<span class="client-label">Client:</span> ${work.clientName}様`;

    // Xアカウントがある場合はリンクを追加
    if (work.clientTwitter) {
      descriptionHTML += ` <a href="https://x.com/${work.clientTwitter}" target="_blank" rel="noopener noreferrer" class="client-twitter-link">@${work.clientTwitter}</a>`;
    }

    descriptionHTML += '</p>';
  }

  modalDescription.innerHTML = descriptionHTML;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // スクロール防止
}

// ================================================
// モーダルを閉じる
// ================================================
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = ''; // スクロール復元
}

// ================================================
// イベントリスナー
// ================================================

// 閉じるボタン
modalClose.addEventListener('click', closeModal);

// 背景クリックで閉じる
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// ESCキーで閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ================================================
// 初期化
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  loadWorks();

  // 画像保護のグローバル設定
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  }, false);

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  }, false);
});
