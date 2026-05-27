import React, { useState } from 'react';
import './styles.css';

const MAX_PHOTOS = 5;

function App() {
    const [name, setName] = useState('');
    const [section1Name, setSection1Name] = useState('家人');
    const [section2Name, setSection2Name] = useState('朋友');
    const [photos1, setPhotos1] = useState([]);
    const [photos2, setPhotos2] = useState([]);
    const [showResult, setShowResult] = useState(false);

    // 处理文件选择
    const handleFileSelect = (e, section) => {
        const files = Array.from(e.target.files);
        const currentPhotos = section === 1 ? photos1 : photos2;
        const setPhotos = section === 1 ? setPhotos1 : setPhotos2;

        if (currentPhotos.length + files.length > MAX_PHOTOS) {
            alert(`${section === 1 ? section1Name : section2Name} 最多只能上传 ${MAX_PHOTOS} 张照片！`);
            return;
        }

        files.forEach(file => {
            if (!file.type.startsWith('image/')) {
                alert('请上传图片文件！');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotos(prev => [...prev, e.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    // 删除照片
    const deletePhoto = (index, section) => {
        if (section === 1) {
            setPhotos1(prev => prev.filter((_, i) => i !== index));
        } else {
            setPhotos2(prev => prev.filter((_, i) => i !== index));
        }
    };

    // 生成生日网站
    const handleGenerate = () => {
        if (photos1.length === 0 && photos2.length === 0) {
            alert('请至少上传一张照片！');
            return;
        }
        if (!name.trim()) {
            alert('请填写姓名！');
            return;
        }
        setShowResult(true);
    };

    // 返回上传页
    const handleBack = () => {
        setShowResult(false);
    };

    if (showResult) {
        return (
            <ResultPage
                name={name}
                section1Name={section1Name}
                section2Name={section2Name}
                photos1={photos1}
                photos2={photos2}
                onBack={handleBack}
            />
        );
    }

    return (
        <div className="container">
            <div className="header">
                <h1>🌸 生日网站生成器</h1>
                <p>上传照片，生成专属生日网页</p>
            </div>

            {/* 姓名输入 */}
            <div className="input-group">
                <label>寿星姓名：</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入姓名"
                    className="name-input"
                />
            </div>

            {/* 第一部分 */}
            <div className="upload-section">
                <div className="section-header">
                    <input
                        type="text"
                        value={section1Name}
                        onChange={(e) => setSection1Name(e.target.value)}
                        className="section-name-input"
                    />
                    <span className="photo-count">{photos1.length}/{MAX_PHOTOS}</span>
                </div>
                <div className="upload-area">
                    <label className="upload-box">
                        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p>点击上传图片</p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileSelect(e, 1)}
                            hidden
                        />
                    </label>
                </div>
                <div className="preview-area">
                    {photos1.map((photo, index) => (
                        <div key={index} className="preview-item">
                            <img src={photo} alt="预览图片" />
                            <button className="delete-btn" onClick={() => deletePhoto(index, 1)}>×</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 第二部分 */}
            <div className="upload-section">
                <div className="section-header">
                    <input
                        type="text"
                        value={section2Name}
                        onChange={(e) => setSection2Name(e.target.value)}
                        className="section-name-input"
                    />
                    <span className="photo-count">{photos2.length}/{MAX_PHOTOS}</span>
                </div>
                <div className="upload-area">
                    <label className="upload-box">
                        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p>点击上传图片</p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileSelect(e, 2)}
                            hidden
                        />
                    </label>
                </div>
                <div className="preview-area">
                    {photos2.map((photo, index) => (
                        <div key={index} className="preview-item">
                            <img src={photo} alt="预览图片" />
                            <button className="delete-btn" onClick={() => deletePhoto(index, 2)}>×</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="actions">
                <button
                    className={`btn-generate ${(photos1.length === 0 && photos2.length === 0) || !name.trim() ? 'disabled' : ''}`}
                    onClick={handleGenerate}
                    disabled={(photos1.length === 0 && photos2.length === 0) || !name.trim()}
                >
                    🎉 立即生成
                </button>
            </div>
        </div>
    );
}

// 结果页面组件
function ResultPage({ name, section1Name, section2Name, photos1, photos2, onBack }) {
    const [isSaving, setIsSaving] = useState(false);

    const savePage = () => {
        setIsSaving(true);
        // 创建一个干净的HTML用于保存
        const cleanHTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生日快乐 - ${name}</title>
    <style>
        ${document.getElementById('miyazaki-styles')?.textContent || ''}
    </style>
</head>
<body class="result-page">
    ${document.querySelector('.miyazaki-container')?.outerHTML || ''}
    <script>
        ${document.getElementById('miyazaki-script')?.textContent || ''}
    </script>
</body>
</html>`;

        const blob = new Blob([cleanHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '生日快乐.html';
        a.click();
        URL.revokeObjectURL(url);
        setIsSaving(false);
    };

    return (
        <>
            <style id="miyazaki-styles">
                {`
                    body.result-page {
                        margin: 0;
                        padding: 0;
                        font-family: 'Comic Sans MS', '幼圆', sans-serif;
                        background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 30%, #98D4BB 70%, #7BC47F 100%);
                        min-height: 100vh;
                        overflow-x: hidden;
                    }

                    .miyazaki-container {
                        position: relative;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 40px 20px;
                    }

                    /* 云朵 */
                    .cloud {
                        position: absolute;
                        background: white;
                        border-radius: 50px;
                        opacity: 0.9;
                        animation: floatCloud 20s linear infinite;
                    }

                    .cloud::before, .cloud::after {
                        content: '';
                        position: absolute;
                        background: white;
                        border-radius: 50%;
                    }

                    .cloud-1 {
                        width: 100px;
                        height: 40px;
                        top: 50px;
                        left: 10%;
                        animation-delay: 0s;
                    }

                    .cloud-1::before { width: 50px; height: 50px; top: -25px; left: 15px; }
                    .cloud-1::after { width: 60px; height: 60px; top: -35px; left: 40px; }

                    .cloud-2 {
                        width: 80px;
                        height: 30px;
                        top: 100px;
                        right: 15%;
                        animation-delay: -5s;
                    }

                    .cloud-2::before { width: 40px; height: 40px; top: -20px; left: 10px; }
                    .cloud-2::after { width: 50px; height: 50px; top: -30px; left: 35px; }

                    .cloud-3 {
                        width: 120px;
                        height: 50px;
                        top: 150px;
                        left: 60%;
                        animation-delay: -10s;
                    }

                    .cloud-3::before { width: 60px; height: 60px; top: -30px; left: 20px; }
                    .cloud-3::after { width: 70px; height: 70px; top: -40px; left: 50px; }

                    @keyframes floatCloud {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(calc(100vw + 100%)); }
                    }

                    /* 标题区域 */
                    .title-section {
                        text-align: center;
                        margin: 60px 0 40px;
                        position: relative;
                    }

                    .birthday-title {
                        font-size: 64px;
                        color: #5D8A66;
                        text-shadow: 3px 3px 0 #E8F5E9, -2px -2px 0 #C8E6C9;
                        margin-bottom: 20px;
                        animation: titleBounce 2s ease-in-out infinite;
                    }

                    @keyframes titleBounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }

                    .subtitle {
                        font-size: 24px;
                        color: #FFB347;
                        margin-bottom: 30px;
                    }

                    /* 花朵装饰 */
                    .flower-decoration {
                        display: flex;
                        justify-content: center;
                        gap: 40px;
                        margin: 30px 0;
                    }

                    .flower {
                        width: 50px;
                        height: 50px;
                        position: relative;
                        animation: flowerSway 3s ease-in-out infinite;
                    }

                    .flower::before {
                        content: '';
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        background: #FFB6C1;
                        border-radius: 50%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        box-shadow:
                            -25px 0 0 #FFB6C1,
                            25px 0 0 #FFB6C1,
                            0 -25px 0 #FFB6C1,
                            0 25px 0 #FFB6C1;
                    }

                    .flower::after {
                        content: '';
                        position: absolute;
                        width: 12px;
                        height: 12px;
                        background: #FFD700;
                        border-radius: 50%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 1;
                    }

                    @keyframes flowerSway {
                        0%, 100% { transform: rotate(-5deg); }
                        50% { transform: rotate(5deg); }
                    }

                    /* 照片区域 */
                    .photo-section {
                        background: rgba(255, 255, 255, 0.85);
                        border-radius: 30px;
                        padding: 30px;
                        margin: 30px 0;
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                        border: 4px solid #98D4BB;
                    }

                    .section-title {
                        font-size: 28px;
                        color: #5D8A66;
                        text-align: center;
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 3px dashed #98D4BB;
                    }

                    .photos-gallery {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        justify-items: center;
                    }

                    .photo-item {
                        width: 200px;
                        height: 200px;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
                        border: 5px solid #FFF;
                        transition: all 0.3s ease;
                    }

                    .photo-item:hover {
                        transform: scale(1.05) rotate(2deg);
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    }

                    .photo-item img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    /* 小鸟 */
                    .bird {
                        position: absolute;
                        font-size: 24px;
                        animation: birdFly 15s linear infinite;
                    }

                    .bird-1 { top: 80px; animation-delay: 0s; }
                    .bird-2 { top: 120px; animation-delay: -7s; }

                    @keyframes birdFly {
                        from { left: -50px; }
                        to { left: calc(100vw + 50px); }
                    }

                    /* 草地装饰 */
                    .grass-decoration {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 60px;
                        background: linear-gradient(to top, #7BC47F 0%, transparent 100%);
                        pointer-events: none;
                    }

                    .grass-blade {
                        position: absolute;
                        bottom: 0;
                        width: 4px;
                        background: #7BC47F;
                        border-radius: 50% 50% 0 0;
                        animation: grassWave 2s ease-in-out infinite;
                    }

                    @keyframes grassWave {
                        0%, 100% { transform: rotate(-5deg); }
                        50% { transform: rotate(5deg); }
                    }

                    /* 操作按钮 */
                    .action-buttons {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin: 40px 0;
                        padding: 20px;
                        background: rgba(255, 255, 255, 0.7);
                        border-radius: 20px;
                    }

                    .btn-back, .btn-save {
                        padding: 12px 30px;
                        font-size: 16px;
                        font-family: inherit;
                        border: none;
                        border-radius: 25px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-weight: bold;
                    }

                    .btn-back {
                        background: #98D4BB;
                        color: #5D8A66;
                    }

                    .btn-back:hover {
                        background: #7BC47F;
                        transform: translateY(-2px);
                    }

                    .btn-save {
                        background: #FFB347;
                        color: white;
                    }

                    .btn-save:hover {
                        background: #FFA500;
                        transform: translateY(-2px);
                    }

                    @media (max-width: 768px) {
                        .birthday-title { font-size: 42px; }
                        .photo-item { width: 150px; height: 150px; }
                        .photos-gallery { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
                    }
                `}
            </style>

            <script id="miyazaki-script">
                {`
                    // 创建草地
                    function createGrass() {
                        const container = document.querySelector('.miyazaki-container');
                        const grassCount = 50;
                        for (let i = 0; i < grassCount; i++) {
                            const grass = document.createElement('div');
                            grass.className = 'grass-blade';
                            grass.style.left = \`\${(i / grassCount) * 100}%\`;
                            grass.style.height = \`\${20 + Math.random() * 30}px\`;
                            grass.style.animationDelay = \`\${Math.random() * 2}s\`;
                            container.appendChild(grass);
                        }
                    }
                    createGrass();
                `}
            </script>

            <div className="miyazaki-container">
                {/* 云朵 */}
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="cloud cloud-3"></div>

                {/* 小鸟 */}
                <div className="bird bird-1">🐦</div>
                <div className="bird bird-2">🐦</div>

                {/* 标题 */}
                <div className="title-section">
                    <h1 className="birthday-title">{name} 生日快乐</h1>
                    <div className="flower-decoration">
                        <div className="flower"></div>
                        <div className="flower"></div>
                        <div className="flower"></div>
                    </div>
                    <p className="subtitle">🌸 愿你的每一天都充满阳光和快乐 🌸</p>
                </div>

                {/* 第一部分照片 */}
                {photos1.length > 0 && (
                    <div className="photo-section">
                        <h2 className="section-title">🌼 {section1Name}</h2>
                        <div className="photos-gallery">
                            {photos1.map((photo, index) => (
                                <div key={index} className="photo-item">
                                    <img src={photo} alt={section1Name} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 第二部分照片 */}
                {photos2.length > 0 && (
                    <div className="photo-section">
                        <h2 className="section-title">🌻 {section2Name}</h2>
                        <div className="photos-gallery">
                            {photos2.map((photo, index) => (
                                <div key={index} className="photo-item">
                                    <img src={photo} alt={section2Name} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 草地装饰 */}
                <div className="grass-decoration"></div>

                {/* 操作按钮 */}
                <div className="action-buttons">
                    <button className="btn-back" onClick={onBack}>
                        ← 返回修改
                    </button>
                    <button className="btn-save" onClick={savePage} disabled={isSaving}>
                        {isSaving ? '保存中...' : '💾 保存网页'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;