<template>
  <div>
    <NavBar />
    <Suspense>
      <RouterView v-slot="{ Component }">
        <Transition name="route" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </RouterView>
    </Suspense>
    <Translate />
  </div>
</template>

<script setup>
import { Suspense } from 'vue';
if (import.meta.env.MODE === 'production') {
  console.log("Production Build URL:", import.meta.env.VITE_PRODUCTION);
} else if (import.meta.env.MODE === 'staging') {
  console.log("Staging Build URL:", import.meta.env.VITE_STAGING);
} else if (import.meta.env.MODE === 'development') {
  console.log("Development Build URL:", import.meta.env.VITE_DEVELOPMENT);
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Roboto:wght@500&display=swap');

body::before {
  content: "";
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.1;
  z-index: -1;
}

.loaderContainer {
  width: 90vw;
  height: 78vh;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #20aa37;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.4s ease;
}
</style>