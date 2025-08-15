/**
 * 语音技能交互研究网站交互式演示组件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有演示组件
    initVoiceDemo();
});

/**
 * 初始化语音交互演示组件
 */
function initVoiceDemo() {
    const voiceDemo = document.getElementById('voice-demo');
    if (!voiceDemo) return;
    
    const voiceChat = voiceDemo.querySelector('.voice-chat');
    const voiceInput = voiceDemo.querySelector('.voice-input input');
    const voiceSendButton = voiceDemo.querySelector('.voice-send');
    const voiceMicButton = voiceDemo.querySelector('.voice-mic');
    
    // 预设的对话场景
    const dialogueScenarios = {
        'home': [
            { role: 'assistant', text: '您好！我是您的智能家居助手。有什么可以帮您的吗？' }
        ],
        'weather': [
            { role: 'assistant', text: '您好！我是您的天气助手。有什么可以帮您的吗？' }
        ],
        'music': [
            { role: 'assistant', text: '您好！我是您的音乐助手。有什么可以帮您的吗？' }
        ]
    };
    
    // 预设的回复模板
    const responseTemplates = {
        'home': {
            '灯': '好的，已为您{action}灯光。',
            '窗帘': '好的，已为您{action}窗帘。',
            '空调': '好的，已为您{action}空调，温度设置为{value}度。',
            '温度': '当前室内温度为{value}度。',
            '湿度': '当前室内湿度为{value}%。',
            '打开': '好的，已为您打开{device}。',
            '关闭': '好的，已为您关闭{device}。',
            '调高': '好的，已为您调高{device}。',
            '调低': '好的，已为您调低{device}。',
            '设置': '好的，已为您将{device}设置为{value}。',
            '查询': '{device}当前状态为{status}。',
            '帮助': '您可以尝试以下指令：\n- 打开/关闭灯光\n- 打开/关闭窗帘\n- 调高/调低空调温度\n- 查询室内温度/湿度',
            '默认': '抱歉，我没有理解您的意思。您可以尝试说"帮助"来查看可用指令。'
        },
        'weather': {
            '天气': '今天{location}天气{condition}，温度{value}度，{extra}',
            '温度': '{location}当前温度{value}度。',
            '下雨': '{location}{time}{will_rain}。',
            '穿衣': '今天气温{value}度，建议您{suggestion}',
            '默认': '抱歉，我没有理解您的问题。您可以尝试询问特定城市的天气情况。'
        },
        'music': {
            '播放': '好的，正在为您播放{song}。',
            '暂停': '已暂停播放。',
            '继续': '已继续播放。',
            '下一首': '已切换到下一首歌曲：{song}。',
            '上一首': '已切换到上一首歌曲：{song}。',
            '音量': '已将音量调整为{value}%。',
            '推荐': '根据您的喜好，推荐以下歌曲：\n{recommendations}',
            '默认': '抱歉，我没有理解您的指令。您可以尝试说"播放音乐"或"推荐歌曲"。'
        }
    };
    
    // 当前场景
    let currentScenario = 'home';
    
    // 场景切换按钮
    const scenarioButtons = voiceDemo.querySelectorAll('.scenario-button');
    scenarioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const scenario = this.dataset.scenario;
            changeScenario(scenario);
            
            // 更新按钮状态
            scenarioButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 切换场景
    function changeScenario(scenario) {
        currentScenario = scenario;
        
        // 清空聊天记录
        voiceChat.innerHTML = '';
        
        // 添加初始消息
        dialogueScenarios[scenario].forEach(message => {
            addMessage(message.role, message.text);
        });
    }
    
    // 初始化默认场景
    changeScenario(currentScenario);
    
    // 发送按钮点击事件
    voiceSendButton.addEventListener('click', sendMessage);
    
    // 输入框按键事件
    voiceInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 麦克风按钮点击事件（模拟语音输入）
    voiceMicButton.addEventListener('click', function() {
        // 显示录音动画
        this.innerHTML = '<span class="material-icons">mic</span>';
        this.classList.add('recording');
        
        // 模拟录音延迟
        setTimeout(() => {
            // 随机选择一个示例语音指令
            const exampleCommands = {
                'home': ['打开客厅的灯', '关闭卧室的空调', '窗帘拉开一半', '现在室内温度是多少'],
                'weather': ['今天北京天气怎么样', '明天会下雨吗', '今天适合穿什么衣服', '上海的气温是多少'],
                'music': ['播放周杰伦的歌', '暂停播放', '下一首', '把音量调高一点']
            };
            
            const randomIndex = Math.floor(Math.random() * exampleCommands[currentScenario].length);
            const command = exampleCommands[currentScenario][randomIndex];
            
            // 填入输入框
            voiceInput.value = command;
            
            // 恢复按钮状态
            this.innerHTML = '<span class="material-icons">mic_none</span>';
            this.classList.remove('recording');
            
            // 发送消息
            sendMessage();
        }, 1500);
    });
    
    // 发送消息
    function sendMessage() {
        const message = voiceInput.value.trim();
        if (message === '') return;
        
        // 添加用户消息
        addMessage('user', message);
        
        // 清空输入框
        voiceInput.value = '';
        
        // 显示助手正在输入
        showTyping();
        
        // 模拟助手回复延迟
        setTimeout(() => {
            // 隐藏助手正在输入
            hideTyping();
            
            // 生成助手回复
            const response = generateResponse(message);
            
            // 添加助手回复
            addMessage('assistant', response);
            
            // 滚动到底部
            scrollToBottom();
        }, 1000);
    }
    
    // 生成助手回复
    function generateResponse(message) {
        const templates = responseTemplates[currentScenario];
        let response = templates['默认'];
        
        // 根据关键词匹配回复模板
        for (const keyword in templates) {
            if (keyword === '默认') continue;
            
            if (message.includes(keyword)) {
                response = templates[keyword];
                
                // 替换占位符
                if (response.includes('{action}')) {
                    if (message.includes('打开')) {
                        response = response.replace('{action}', '打开');
                    } else if (message.includes('关闭')) {
                        response = response.replace('{action}', '关闭');
                    } else if (message.includes('调高')) {
                        response = response.replace('{action}', '调高');
                    } else if (message.includes('调低')) {
                        response = response.replace('{action}', '调低');
                    }
                }
                
                if (response.includes('{device}')) {
                    if (message.includes('灯')) {
                        response = response.replace('{device}', '灯光');
                    } else if (message.includes('窗帘')) {
                        response = response.replace('{device}', '窗帘');
                    } else if (message.includes('空调')) {
                        response = response.replace('{device}', '空调');
                    } else if (message.includes('音乐')) {
                        response = response.replace('{device}', '音乐');
                    } else {
                        response = response.replace('{device}', '设备');
                    }
                }
                
                if (response.includes('{value}')) {
                    // 随机生成一个数值
                    const randomValue = Math.floor(Math.random() * 30) + 10;
                    response = response.replace('{value}', randomValue);
                }
                
                if (response.includes('{status}')) {
                    const statuses = ['开启', '关闭', '待机', '运行中'];
                    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    response = response.replace('{status}', randomStatus);
                }
                
                if (response.includes('{location}')) {
                    let location = '北京';
                    if (message.includes('北京')) location = '北京';
                    if (message.includes('上海')) location = '上海';
                    if (message.includes('广州')) location = '广州';
                    if (message.includes('深圳')) location = '深圳';
                    response = response.replace('{location}', location);
                }
                
                if (response.includes('{condition}')) {
                    const conditions = ['晴朗', '多云', '阴天', '小雨', '大雨', '雷阵雨'];
                    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
                    response = response.replace('{condition}', randomCondition);
                }
                
                if (response.includes('{extra}')) {
                    const extras = ['适合户外活动', '建议带伞', '注意保暖', '注意防晒'];
                    const randomExtra = extras[Math.floor(Math.random() * extras.length)];
                    response = response.replace('{extra}', randomExtra);
                }
                
                if (response.includes('{time}')) {
                    const times = ['今天', '明天', '后天'];
                    const randomTime = times[Math.floor(Math.random() * times.length)];
                    response = response.replace('{time}', randomTime);
                }
                
                if (response.includes('{will_rain}')) {
                    const willRain = Math.random() > 0.5 ? '会下雨' : '不会下雨';
                    response = response.replace('{will_rain}', willRain);
                }
                
                if (response.includes('{suggestion}')) {
                    const suggestions = ['穿薄外套', '穿厚外套', '穿短袖', '穿长袖'];
                    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
                    response = response.replace('{suggestion}', randomSuggestion);
                }
                
                if (response.includes('{song}')) {
                    const songs = ['《稻香》', '《青花瓷》', '《七里香》', '《夜曲》', '《晴天》'];
                    const randomSong = songs[Math.floor(Math.random() * songs.length)];
                    response = response.replace('{song}', randomSong);
                }
                
                if (response.includes('{recommendations}')) {
                    const songs = ['1. 《稻香》 - 周杰伦', '2. 《青花瓷》 - 周杰伦', '3. 《七里香》 - 周杰伦', '4. 《夜曲》 - 周杰伦', '5. 《晴天》 - 周杰伦'];
                    const randomSongs = songs.sort(() => 0.5 - Math.random()).slice(0, 3).join('\n');
                    response = response.replace('{recommendations}', randomSongs);
                }
                
                break;
            }
        }
        
        return response;
    }
    
    // 添加消息
    function addMessage(role, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'voice-message';
        
        const avatarElement = document.createElement('div');
        avatarElement.className = `voice-message-avatar ${role}`;
        
        const icon = role === 'user' ? 'person' : 'smart_toy';
        avatarElement.innerHTML = `<span class="material-icons">${icon}</span>`;
        
        const contentElement = document.createElement('div');
        contentElement.className = `voice-message-content ${role}`;
        
        const textElement = document.createElement('p');
        textElement.className = 'voice-message-text';
        textElement.textContent = text;
        
        contentElement.appendChild(textElement);
        messageElement.appendChild(avatarElement);
        messageElement.appendChild(contentElement);
        
        voiceChat.appendChild(messageElement);
        
        // 滚动到底部
        scrollToBottom();
    }
    
    // 显示助手正在输入
    function showTyping() {
        const typingElement = document.createElement('div');
        typingElement.className = 'voice-message typing-message';
        typingElement.id = 'typing-indicator';
        
        const avatarElement = document.createElement('div');
        avatarElement.className = 'voice-message-avatar assistant';
        avatarElement.innerHTML = '<span class="material-icons">smart_toy</span>';
        
        const contentElement = document.createElement('div');
        contentElement.className = 'voice-message-content assistant';
        
        const typingDotsElement = document.createElement('div');
        typingDotsElement.className = 'voice-typing';
        typingDotsElement.innerHTML = `
            <div class="voice-typing-dot"></div>
            <div class="voice-typing-dot"></div>
            <div class="voice-typing-dot"></div>
        `;
        
        contentElement.appendChild(typingDotsElement);
        typingElement.appendChild(avatarElement);
        typingElement.appendChild(contentElement);
        
        voiceChat.appendChild(typingElement);
        
        // 滚动到底部
        scrollToBottom();
    }
    
    // 隐藏助手正在输入
    function hideTyping() {
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
    }
    
    // 滚动到底部
    function scrollToBottom() {
        voiceChat.scrollTop = voiceChat.scrollHeight;
    }
} 