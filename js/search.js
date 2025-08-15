/**
 * 语音技能交互研究网站搜索功能
 */

// 搜索数据
const searchData = [
    {
        title: '用户体验与意图理解',
        content: '超越传统的"唤醒-理解-执行"，深入高层，使用"我"来应对前所未有的情境、场景、用户习惯',
        url: '#user-experience'
    },
    {
        title: '语音反馈设计',
        content: '设计优质的语音反馈，实现自然流畅的用户体验，构建多层次的语义词库体系',
        url: '#voice-design'
    },
    {
        title: '设备词典',
        content: '构建全面的设备名称识别体系，提升语音交互准确性',
        url: 'pages/device-vocabulary.html'
    },
    {
        title: '空间词典',
        content: '构建家居空间位置识别体系，实现精准的空间定位与控制',
        url: 'pages/space-vocabulary.html'
    },
    {
        title: '动作词库',
        content: '构建丰富的设备控制动作词汇体系，实现自然流畅的语音控制',
        url: 'pages/action-vocabulary.html'
    },
    {
        title: '状态词库',
        content: '了解如何处理设备状态的模糊表达和精确控制',
        url: 'pages/status-vocabulary.html'
    },
    {
        title: '角色设定 (Persona)',
        content: '为AI语音助手赋予鲜明的人格特征，创造情感连接',
        url: 'pages/persona.html'
    },
    {
        title: '对话模式与设计',
        content: '维持对话上下文状态，进行关键词与意图识别，组织清晰、简洁、自然的回复内容',
        url: '#dialogue'
    },
    {
        title: '对话示例',
        content: '真实场景下的对话交互案例，展示如何处理用户意图、多轮对话和异常情况',
        url: '#examples'
    },
    {
        title: '设计检查清单',
        content: '确保语音交互体验的完整性和用户友好，包含基础功能和进阶功能检查项目',
        url: '#checklist'
    },
    {
        title: '声纹识别与个性化',
        content: '通过声纹识别实现个性化的交互体验，让"我"这一概念在家庭场景中统一实体',
        url: '#voice-recognition'
    },
    {
        title: '多模态交互',
        content: '结合语音、视觉和手势，创造更丰富的交互体验，适应不同场景的需求',
        url: '#multimodal'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    // 搜索功能
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        
        const results = searchData.filter(item => {
            return item.title.toLowerCase().includes(query) || 
                   item.content.toLowerCase().includes(query);
        });
        
        displayResults(results);
    }
    
    // 显示搜索结果
    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            const noResultItem = document.createElement('div');
            noResultItem.className = 'search-result-item';
            noResultItem.innerHTML = '<div class="search-result-text">没有找到相关内容</div>';
            searchResults.appendChild(noResultItem);
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-text">${result.content}</div>
                `;
                resultItem.addEventListener('click', () => {
                    window.location.href = result.url;
                    searchResults.classList.remove('show');
                });
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.classList.add('show');
    }
    
    // 搜索按钮点击事件
    searchButton.addEventListener('click', performSearch);
    
    // 搜索输入框输入事件
    searchInput.addEventListener('input', performSearch);
    
    // 搜索输入框按键事件
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 点击页面其他区域关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchButton.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
}); 