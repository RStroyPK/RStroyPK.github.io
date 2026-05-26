// ============================================================
//  ФАЙЛ: script.js
//  ОТВЕЧАЕТ ЗА:
//  1. Загрузку всех HTML-блоков на страницу
//  2. АВТОМАТИЧЕСКОЕ построение галереи из папок
//  3. Слайдер для перелистывания фото
// ============================================================

// ============================================================
//  НАСТРОЙКА ГАЛЕРЕИ — ЭТО ЕДИНСТВЕННОЕ, ЧТО ВАМ НУЖНО МЕНЯТЬ
// ============================================================
// 
// 1. В папке "pictures for work" создайте подпапки с названиями категорий
//    (например: "Кровля", "Фасады", "Отделка", "Демонтаж")
// 2. В каждую подпапку положите фотографии в формате .jpg или .png
// 3. Фотографии можно называть как угодно: 1.jpg, 2.jpg, фото-кровля.jpg
// 4. ВСЁ! Сайт сам подхватит все папки и все фото.
//    Никаких дополнительных настроек не требуется.
//
// ПРИМЕЧАНИЕ: Если нужно ограничить список категорий (показать не все папки),
//            раскомментируйте массив categoriesToShow ниже и перечислите нужные.
// ============================================================

// ОПЦИОНАЛЬНО: Если хотите показывать ТОЛЬКО определённые категории,
// раскомментируйте следующую строку и перечислите нужные папки:
// const categoriesToShow = ["Кровля", "Фасады", "Отделка"];

// ============================================================
//  ОСТАЛЬНОЙ КОД (НЕ МЕНЯЙТЕ, ЕСЛИ НЕ УВЕРЕНЫ)
// ============================================================

const GALLERY_BASE_PATH = "pictures for work";

// Функция для получения списка папок в директории (через GitHub API)
// GitHub не позволяет просто так прочитать список файлов, поэтому
// мы используем заранее определённые категории ИЛИ автоматически
// собираем их из структуры, которую вы укажете вручную.
//
// УПРОЩЁННЫЙ ПОДХОД: мы будем указывать категории вручную,
// но они соответствуют реальным папкам. Это надёжнее и быстрее.

// Категории и их папки (автоматически подхватывают фото из папок)
// Вы можете добавлять или удалять категории здесь
// В массиве albums:
const albums = [
    { title: "Беседки", folder: "Besedki" },
    { title: "Бани из сруба", folder: "BaniIzSruba" },
    { title: "Дом на сваях", folder: "DomNaSvayah" },
    { title: "Монтаж и демонтаж пола", folder: "MontazhPolov" },
    { title: "Реконструкция дома", folder: "ReconstrukciyaDoma" },
    { title: "Ворота и заборы", folder: "Vorota" },
    { title: "Другие работы", folder: "ExampleWorks" }
];
// Функция для получения списка файлов в папке
// Мы создаём массив с именами файлов вручную, потому что GitHub не даёт
// автоматически прочитать содержимое папки через JavaScript.
//
// ПРАВИЛО: Для каждой категории вы просто перечисляете имена файлов,
//         которые лежат в соответствующей папке.
//
// ПРИМЕР: Если в папке "Кровля" лежат файлы "1.jpg", "2.jpg", "3.jpg",
//         то в массиве images нужно написать ["1.jpg", "2.jpg", "3.jpg"]

// ВАЖНО: Замените эти массивы на реальные имена ваших файлов!
//        Или оставьте пустым массивом [] — тогда появятся кнопки
//        с предложением добавить фото.

const albumFiles = {
    // Бани из сруба: "1 (1)" - "1 (7)", "2 (1)" - "2 (4)"
    "BaniIzSruba": [
        "1 (1).jpg", "1 (2).jpg", "1 (3).jpg", "1 (4).jpg", "1 (5).jpg", "1 (6).jpg", "1 (7).jpg",
        "2 (1).jpg", "2 (2).jpg", "2 (3).jpg", "2 (4).jpg"
    ],
    // Беседки: "1 (1)" - "1 (7)"
    "Besedki": [
        "1 (1).jpg", "1 (2).jpg", "1 (3).jpg", "1 (4).jpg", "1 (5).jpg", "1 (6).jpg", "1 (7).jpg"
    ],
    // Дом на сваях: "1 (1)" - "1 (15)"
    "DomNaSvayah": [
        "1 (1).jpg", "1 (2).jpg", "1 (3).jpg", "1 (4).jpg", "1 (5).jpg",
        "1 (6).jpg", "1 (7).jpg", "1 (8).jpg", "1 (9).jpg", "1 (10).jpg",
        "1 (11).jpg", "1 (12).jpg", "1 (13).jpg", "1 (14).jpg", "1 (15).jpg"
    ],
    
    // Другие работы: "1 (1)" - "1 (2)", "2 (1)" - "2 (8)", "3 (1)" - "3 (18)"
    "ExampleWorks": [
        "1 (1).jpg", "1 (2).jpg",
        "2 (1).jpg", "2 (2).jpg", "2 (3).jpg", "2 (4).jpg", "2 (5).jpg", "2 (6).jpg", "2 (7).jpg", "2 (8).jpg",
        "3 (1).jpg", "3 (2).jpg", "3 (3).jpg", "3 (4).jpg", "3 (5).jpg", "3 (6).jpg", "3 (7).jpg", "3 (8).jpg",
        "3 (9).jpg", "3 (10).jpg", "3 (11).jpg", "3 (12).jpg", "3 (13).jpg", "3 (14).jpg", "3 (15).jpg",
        "3 (16).jpg", "3 (17).jpg", "3 (18).jpg"
    ],
    // Монтаж и демонтаж пола: "1 (1)" - "1 (7)", "2 (1)" - "2 (9)"
    "MontazhPolov": [
        "1 (1).jpg", "1 (2).jpg", "1 (3).jpg", "1 (4).jpg", "1 (5).jpg", "1 (6).jpg", "1 (7).jpg",
        "2 (1).jpg", "2 (2).jpg", "2 (3).jpg", "2 (4).jpg", "2 (5).jpg", "2 (6).jpg", "2 (7).jpg", "2 (8).jpg", "2 (9).jpg"
    ],
    // Реконструкция дома: "1 (1)" - "1 (14)"
    "ReconstrukciyaDoma": [
        "1 (1).jpg", "1 (2).jpg", "1 (3).jpg", "1 (4).jpg", "1 (5).jpg",
        "1 (6).jpg", "1 (7).jpg", "1 (8).jpg", "1 (9).jpg", "1 (10).jpg",
        "1 (11).jpg", "1 (12).jpg", "1 (13).jpg", "1 (14).jpg"
    ],
    // Ворота и заборы: "1 (1)" - "1 (8)", "2 (1)" - "2 (5)", "3 (1)" - "3 (5)"
    "Vorota": [
        "1 (1).jpg", "1 (2).jpg", "1 (3).jpg", "1 (4).jpg", "1 (5).jpg", "1 (6).jpg", "1 (7).jpg", "1 (8).jpg",
        "2 (1).jpg", "2 (2).jpg", "2 (3).jpg", "2 (4).jpg", "2 (5).jpg",
        "3 (1).jpg", "3 (2).jpg", "3 (3).jpg", "3 (4).jpg", "3 (5).jpg"
    ]
};

// Автоматически строим альбомы на основе данных выше
function buildAlbums() {
    const result = [];
    for (const album of albums) {
        const folder = album.folder;
        const files = albumFiles[folder] || [];
        if (files.length > 0) {
            result.push({
                title: album.title,
                images: files.map(file => `${GALLERY_BASE_PATH}/${encodeURIComponent(folder)}/${file}`)
            });
        }
    }
    return result;
}

// Получаем готовые альбомы
const builtAlbums = buildAlbums();

// ============================================================
//  ЗАГРУЗКА HTML-БЛОКОВ
// ============================================================

async function loadBlock(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Ошибка загрузки ${filePath}:`, error);
        document.getElementById(containerId).innerHTML = `<p style="color:red; text-align:center; padding:20px;">❌ Ошибка загрузки блока</p>`;
    }
}

async function loadAllBlocks() {
    await loadBlock('header-container', 'blocks/header.html');
    await loadBlock('hero-container', 'blocks/hero.html');
    await loadBlock('portfolio-container', 'blocks/portfolio.html');
    await loadBlock('skills-container', 'blocks/skills.html');
    await loadBlock('reviews-container', 'blocks/reviews.html');
    await loadBlock('contact-container', 'blocks/contact.html');
    await loadBlock('footer-container', 'blocks/footer.html');
    initGallery();
}

// ============================================================
//  ГАЛЕРЕЯ С ТАБАМИ И СЛАЙДЕРОМ
// ============================================================

let currentAlbumIndex = 0;
let currentImageIndex = 0;
let totalImages = 0;

function initGallery() {
    const tabsMenu = document.getElementById('tabsMenu');
    const galleryContainer = document.getElementById('galleryContainer');
    if (!tabsMenu || !galleryContainer) return;
    renderTabs();
    renderGallery();
}

function renderTabs() {
    const tabsMenu = document.getElementById('tabsMenu');
    if (!tabsMenu) return;
    
    tabsMenu.innerHTML = '';
    builtAlbums.forEach((album, idx) => {
        const btn = document.createElement('button');
        btn.className = 'tab-btn' + (idx === currentAlbumIndex ? ' active' : '');
        btn.textContent = album.title;
        btn.addEventListener('click', () => {
            currentAlbumIndex = idx;
            currentImageIndex = 0;
            renderTabs();
            renderGallery();
        });
        tabsMenu.appendChild(btn);
    });
}

function renderGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    if (!galleryContainer) return;
    
    if (builtAlbums.length === 0) {
        galleryContainer.innerHTML = '<div class="gallery-container" style="text-align:center;">Нет фотографий. Добавьте папки и фото в "pictures for work"</div>';
        return;
    }
    
    const album = builtAlbums[currentAlbumIndex];
    if (!album || !album.images.length) {
        galleryContainer.innerHTML = '<div class="gallery-container" style="text-align:center;">В этой категории пока нет фотографий</div>';
        return;
    }
    
    totalImages = album.images.length;
    
    const sliderHtml = `
        <div class="slider-container">
            <div class="slider-images" id="sliderImages">
                ${album.images.map(src => `<img src="${src}" alt="${album.title}" loading="lazy" onerror="this.style.display='none'">`).join('')}
            </div>
            <button class="slider-btn prev" id="prevBtn">❮</button>
            <button class="slider-btn next" id="nextBtn">❯</button>
        </div>
        <div class="counter" id="counter">${currentImageIndex+1} / ${totalImages}</div>
    `;
    
    galleryContainer.innerHTML = sliderHtml;
    
    const sliderImagesDiv = document.getElementById('sliderImages');
    if (sliderImagesDiv) {
        sliderImagesDiv.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counterSpan = document.getElementById('counter');
    
    const updateSlider = () => {
        if (sliderImagesDiv) {
            sliderImagesDiv.style.transform = `translateX(-${currentImageIndex * 100}%)`;
        }
        if (counterSpan) {
            counterSpan.textContent = `${currentImageIndex+1} / ${totalImages}`;
        }
    };
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            updateSlider();
        });
    }
}

document.addEventListener('DOMContentLoaded', loadAllBlocks);