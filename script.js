class LotterySystem {
    constructor() {
        this.participants = [];
        this.winners = [];
        this.isRolling = false;
        this.rollInterval = null;
        
        // DOM 元素
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.nameList = document.getElementById('nameList');
        this.rollingName = document.getElementById('rolling-name');
        this.winnersList = document.getElementById('winnersList');
        
        // 绑定事件
        this.startBtn.addEventListener('click', () => this.startRolling());
        this.stopBtn.addEventListener('click', () => this.stopRolling());
    }
    
    startRolling() {
        // 获取参与者名单
        this.participants = this.nameList.value.split('\n').filter(name => name.trim());
        
        if (this.participants.length === 0) {
            alert('请先输入参与者名单！');
            return;
        }
        
        this.isRolling = true;
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        
        // 开始滚动效���
        this.rollInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * this.participants.length);
            this.rollingName.textContent = this.participants[randomIndex];
        }, 50);
    }
    
    stopRolling() {
        this.isRolling = false;
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        
        clearInterval(this.rollInterval);
        
        // 选出中奖者
        const winnerIndex = Math.floor(Math.random() * this.participants.length);
        const winner = this.participants[winnerIndex];
        
        // 从参与者名单中移除中奖者
        this.participants.splice(winnerIndex, 1);
        this.nameList.value = this.participants.join('\n');
        
        // 添加到中奖名单
        this.winners.push(winner);
        this.updateWinnersList(winner);
    }
    
    updateWinnersList(winner) {
        const li = document.createElement('li');
        li.textContent = `🎉 ${winner}`;
        this.winnersList.insertBefore(li, this.winnersList.firstChild);
    }
}

// 初始化抽奖系统
const lottery = new LotterySystem(); 