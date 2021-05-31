<template>
  <div>
    <div v-for="item in outputs" :key="item">
      <p class="item" v-html="item"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["outputs"],
};
</script>

<style>
.item {
  width: 100%;
  color: white;
  text-align: left;
}

.total-main {
  display: flex;
  flex-wrap: wrap;
}

.total-text {
  margin-left: 20px;
}

.small-text {
  margin-left: 40px;
}

/* SMARTPHONES PORTRAIT */
@media only screen and (min-width: 300px) {
  .total-main {
    flex-direction: column;
    align-items: flex-start;
  }

  .small-text {
    margin-top: 40px;
    font-size: 12px;
    margin-left: 0;
  }

  .total-text {
    font-size: 5.5px;
    margin-left: 0;
    align-self: flex-start;
  }

  .item {
    font-size: 18px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

/* SMARTPHONES LANDSCAPE */
@media only screen and (min-width: 480px) {
  .total-main {
    flex-direction: column;
  }

  .small-text {
    margin-top: 40px;
    font-size: 12px;
  }

  .total-text {
    font-size: 8px;
  }
  .item {
    font-size: 18px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

/* TABLETS PORTRAIT */
@media only screen and (min-width: 768px) {
  .total-main {
    flex-direction: column;
  }

  .small-text {
    margin-top: 40px;
  }

  .item {
    font-size: 18px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

/* TABLET LANDSCAPE / DESKTOP */
@media only screen and (min-width: 1080px) {
  .total-main {
    flex-direction: row;
  }

  .total-text {
    font-size: 12px;
  }

  .small-text {
    margin-left: 40px;
    margin-top: 0;
    font-size: 14px;
    align-self: center;
  }

  .item {
    font-size: 18px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>