<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal-wrap" ref="modalWrap">
      <label for="city-name">Enter location:</label>
      <input
        type="text"
        name="city-name"
        v-model="cityName"
        placeholder="Ex: Chicago, Dallas, ... "
      />
      <button @click="addCity">Add</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";

import { database } from "../firebase/firebase.util";

const cityName = ref("");
const modal = ref(null);
const emit = defineEmits(["close-modal"]);
const props = defineProps(["API_KEY"]);

function closeModal(event) {
  if (event.target === modal.value) emit("close-modal");
}

async function addCity() {
  if (cityName.value === "") {
    alert("Field cannot be empty");
  } else {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=${props.API_KEY}`
    );
    const data = await res.data;

    const docRef = await addDoc(collection(database, "cities"), {
      city: cityName.value,
      currentWeather: data,
    }).then(() => {
      emit("close-modal");
      console.log(docRef);
    });
  }
}
</script>

<style lang="scss" scoped>
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    color: #fff;
  }
  .modal-wrap {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    input {
      color: #fff;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
    button {
      background-color: #222325;
      color: #fff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>