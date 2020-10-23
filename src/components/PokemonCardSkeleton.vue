<template>
  <q-card flat class="card">
    <q-skeleton class="img-skeleton" square />

    <q-card-section>
      <div class="row justify-between items-center">
        <q-skeleton type="rect" width="40%" class="float-left" />
        <q-skeleton
          type="circle"
          class="text-subtitle1 float-right"
          size="35px"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "PokemonCardSkeleton",
};
</script>

<style scoped>
.card {
  width: 280px;
  margin: 25px;
}
.img-skeleton {
  height: 280px;
}

@media only screen and (max-width: 1200px) {
  .card {
    width: 200px;
    margin: 15px;
  }
  .img-skeleton {
    height: 210px;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    width: 120px;
    margin: 10px;
  }
  .img-skeleton {
    height: 130px;
  }
}
</style>
