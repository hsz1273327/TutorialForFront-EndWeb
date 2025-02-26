<template>
    <div class="clock-container">
      <svg class="clock" :width="size" :height="size">
        <!-- 表盘 -->
        <circle class="clock-face" cx="50%" cy="50%" :r="radius" />
        
        <!-- 小时刻度 -->
        <line
          v-for="hour in 12"
          :key="hour"
          class="hour-mark"
          :x1="centerX"
          y1="5%"
          :x2="centerX"
          y2="10%"
          :transform="`rotate(${hour * 30} ${centerX} ${centerY})`"
        />
  
        <!-- 时针 -->
        <line
          class="hour-hand"
          :x1="centerX"
          :y1="centerY + 10"
          :x2="centerX"
          :y2="centerY - 60"
          :transform="`rotate(${hourRotation} ${centerX} ${centerY})`"
        />
  
        <!-- 分针 -->
        <line
          class="minute-hand"
          :x1="centerX"
          :y1="centerY + 10"
          :x2="centerX"
          :y2="centerY - 80"
          :transform="`rotate(${minuteRotation} ${centerX} ${centerY})`"
        />
  
        <!-- 秒针 -->
        <line
          class="second-hand"
          :x1="centerX"
          :y1="centerY + 20"
          :x2="centerX"
          :y2="centerY - 90"
          :transform="`rotate(${secondRotation} ${centerX} ${centerY})`"
        />
  
        <!-- 中心点 -->
        <circle class="center" cx="50%" cy="50%" r="3" />
      </svg>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  
  const props = defineProps({
    size: {
      type: Number,
      default: 300
    }
  })
  
  const now = ref(new Date())
  const radius = computed(() => props.size / 2)
  const centerX = computed(() => props.size / 2)
  const centerY = computed(() => props.size / 2)
  
  // 计算指针角度
  const hourRotation = computed(() => {
    return (now.value.getHours() % 12) * 30 + now.value.getMinutes() * 0.5
  })
  
  const minuteRotation = computed(() => {
    return now.value.getMinutes() * 6 + now.value.getSeconds() * 0.1
  })
  
  const secondRotation = computed(() => {
    return now.value.getSeconds() * 6 + now.value.getMilliseconds() * 0.006
  })
  
  // 更新时间
  const updateTime = () => {
    now.value = new Date()
  }
  
  // 动画循环
  let animationFrame
  const animate = () => {
    updateTime()
    animationFrame = requestAnimationFrame(animate)
  }
  
  onMounted(() => {
    animate()
  })
  
  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame)
  })
  </script>
  
  <style scoped>
  .clock-container {
    display: inline-block;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .clock {
    background: #fff;
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .clock-face {
    fill: none;
    stroke: #333;
    stroke-width: 2;
  }
  
  .hour-mark {
    stroke: #666;
    stroke-width: 2;
    stroke-linecap: round;
  }
  
  .hour-hand {
    stroke: #333;
    stroke-width: 6;
    stroke-linecap: round;
    transition: transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1);
  }
  
  .minute-hand {
    stroke: #666;
    stroke-width: 4;
    stroke-linecap: round;
    transition: transform 0.5s cubic-bezier(0.4, 2.3, 0.3, 1);
  }
  
  .second-hand {
    stroke: #e74c3c;
    stroke-width: 2;
    stroke-linecap: round;
    transition: transform 0.2s cubic-bezier(0.4, 2.3, 0.3, 1);
  }
  
  .center {
    fill: #e74c3c;
  }
  </style>