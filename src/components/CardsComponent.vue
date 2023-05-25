<template>
    <div class="card-container">
        <div class="card">
            <div class="card-icon">
                <span class="material-icons">person</span>
            </div>
            <div class="card-info">
                <div class="card-title">Users</div>
                <div class="card-value">{{ userCount }}</div>
                <div class="card-progress">
                    <div class="progress-bar" :style="{ width: userProgress }"></div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-icon">
                <span class="material-icons">add_circle</span>
            </div>
            <div class="card-info">
                <div class="card-title">TP Generate Total</div>
                <div class="card-value">{{ tpTotal }}</div>
                <div class="card-progress">
                    <div class="progress-bar" :style="{ width: tpProgress }"></div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-icon">
                <span class="material-icons">credit_score</span>
            </div>
            <div class="card-info">
                <div class="card-title">Loan Sanction Amount</div>
                <div class="card-value">{{ loanAmount }}</div>
                <div class="card-progress">
                    <div class="progress-bar" :style="{ width: loanProgress }"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
const userCount = 100;
const tpTotal = 100;
const loanAmount = "$1,000,000";

const userProgress = `${userCount}%`;
const tpProgress = `${tpTotal}%`;
const loanProgress = `${loanAmount}%`;
</script>
  
<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
    margin-top: 15px;
}

.card {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-icon {
    font-size: 24px;
    margin-right: 20px;
}

.card-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
}

.card-value {
    font-size: 24px;
    font-weight: bold;
}

.card-progress {
    width: 100%;
    height: 10px;
    background-color: #eee;
    border-radius: 5px;
    margin-top: 8px;
}

.progress-bar {
    height: 100%;
    border-radius: 5px;
    background-color: #4caf50;
}

.material-icons {
    font-size: 2rem;
    color: var(--primary);
    transition: 0.2s ease-out;
}
</style>
  