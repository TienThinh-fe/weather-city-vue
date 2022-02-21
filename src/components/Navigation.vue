<template>
  <div>
    <header class="container add-city">
      <nav>
        <span>Weather City</span>
        <div class="right">
          <i class="far fa-edit"></i>
          <i class="fas fa-sync"></i>
          <i class="far fa-plus" @click="$emit('add-city')"></i>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
}
header {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  nav {
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 30px 0;
    span {
      font-weight: 600;
      font-size: 20px;
    }
  }
  .right {
    i {
      font-size: 20px;
    }
    i:nth-child(2),
    i:nth-child(3) {
      margin-left: 16px;
    }
    i:nth-child(3) {
      font-weight: 600;
    }
  }
}
</style>