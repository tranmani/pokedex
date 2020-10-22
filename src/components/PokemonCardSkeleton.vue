<template>
  <q-card flat class="card">
    <q-skeleton height="280px" square />

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
}
</style>
