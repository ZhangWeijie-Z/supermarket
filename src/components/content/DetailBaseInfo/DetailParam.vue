<template>
  <div v-if='Object.keys(goodsParam).length !== 0' class='detailParam'>
    <table v-for='(table,index) in goodsParam.rule' :key='index'>
      <tr v-for='(tr,indey) in table' :key='indey'>
        <td v-for='(td,indez) in tr' :key='indez'>
          {{ td }}
        </td>
      </tr>
    </table>
    <table>
      <tr v-for='(info,index) in goodsParam.info' :key='index'>
        <td>{{ info.key }}</td>
        <td>{{ info.value }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "DetailParam",
  props: {
    goodsParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.$emit('mountedParam')
  }
}
</script>
<style scoped>
  .detailParam table {
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    color: var(--color-tint);
    border-radius: 0 0 15px 15px;
  }


  .detailParam table:last-child {
    border-top: 1px solid var(--color-tint);
  }

  .detailParam table:last-child td:nth-child(2) {
    flex: 3;
  }

  .detailParam tr {
    display: flex;
    margin-left: 20px;
    overflow: hidden;
  }

  .detailParam tr td {
  }

  .detailParam tr td:nth-child(1) {
    color: #888;
  }

  .detailParam td {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
</style>
