// 图片存储
let uploadedPhotos = [];
const MAX_PHOTOS = 5;

// DOM 元素
const uploadArea = document.getElementById('uploadArea');
const uploadBox = document.querySelector('.upload-box');
const fileInput = document.getElementById('fileInput');
const previewArea = document.getElementById('previewArea');
const generateBtn = document.getElementById('generateBtn');

// 点击上传区域
uploadBox.addEventListener('click', () => {
    fileInput.click();
});

// 文件选择
fileInput.addEventListener('change', handleFileSelect);

// 拖拽上传
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#764ba2';
    uploadBox.style.background = '#f0f2ff';
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.style.borderColor = '#667eea';
    uploadBox.style.background = '#f8f9ff';
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#667eea';
    uploadBox.style.background = '#f8f9ff';
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// 处理文件选择
function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
    fileInput.value = ''; // 重置 input
}

// 处理文件
function handleFiles(files) {
    if (uploadedPhotos.length + files.length > MAX_PHOTOS) {
        alert(`最多只能上传 ${MAX_PHOTOS} 张照片！`);
        return;
    }

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            alert('请上传图片文件！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const photoData = e.target.result;
            uploadedPhotos.push(photoData);
            renderPreview();
            updateGenerateButton();
        };
        reader.readAsDataURL(file);
    });
}

// 渲染预览
function renderPreview() {
    previewArea.innerHTML = '';
    uploadedPhotos.forEach((photo, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
            <img src="${photo}" alt="预览图片">
            <button class="delete-btn" onclick="deletePhoto(${index})">×</button>
        `;
        previewArea.appendChild(previewItem);
    });
}

// 删除照片
function deletePhoto(index) {
    uploadedPhotos.splice(index, 1);
    renderPreview();
    updateGenerateButton();
}

// 更新生成按钮状态
function updateGenerateButton() {
    generateBtn.disabled = uploadedPhotos.length === 0;
    if (uploadedPhotos.length > 0) {
        generateBtn.textContent = `🎉 立即生成 (${uploadedPhotos.length}/${MAX_PHOTOS})`;
    } else {
        generateBtn.textContent = '🎉 立即生成';
    }
}

// 生成生日网站
generateBtn.addEventListener('click', () => {
    if (uploadedPhotos.length === 0) {
        alert('请至少上传一张照片！');
        return;
    }

    // 保存照片到 localStorage
    localStorage.setItem('birthdayPhotos', JSON.stringify(uploadedPhotos));

    // 跳转到结果页面
    window.location.href = 'result.html';
});