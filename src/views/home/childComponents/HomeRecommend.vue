<template>
  <div id='recommend'>
    <div v-for='item in recommend' class='recommend-item'>
      <a :href='item.link'>
        <img :src='item.image' alt=''>
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style scoped>
  #recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin: 10px auto;
  }
</style>
