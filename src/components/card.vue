<template>
    <div class="playField__halfListItem">
        <transition name="clear">
            <img class="playField__halfListItemImg openCard" v-if="$props.card !== null"
                 :src="'/src/assets/img/cards/' +  $props.card" :alt="$props.card">
        </transition>
    </div>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
    props: {
        card: String,

    },
})
</script>

<style scoped>
.playField__halfListItem {
    width: 150px;
    height: 216px;
    box-sizing: border-box;
    margin: 6px;
}

.playField__halfListItemImg {
    width: 150px;
    border-radius: 12px;
}

@media (hover: hover) {
    .playField__halfListItemImg:hover {
        opacity: 0.8;
    }
}

@media (hover: none) {
    .playField__halfListItemImg:active {
        opacity: 0.5;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .playField__halfListItem {
        width: 110px;
        height: 158px;
        margin: 5px;
    }

    .playField__halfListItemImg {
        width: 110px;
        border-radius: 9px;
    }
}

@media (min-width: 426px) and (max-width: 768px) {
    .playField__halfListItem {
        width: 60px;
        height: 86px;
        margin: 3px;
    }

    .playField__halfListItemImg {
        width: 60px;
        border-radius: 5px;
    }
}

@media (max-width: 425px) {
    .playField__halfListItem {
        width: 80px;
        height: 115px;
        box-sizing: border-box;
        margin: 6px;
    }

    .playField__halfListItemImg {
        width: 80px;
        border-radius: 7px;
    }
}

.openCard {
    animation-duration: 0.5s;
    animation-name: appeared;
}

@keyframes appeared {
    from {
        opacity: 0;
        width: 0;
        height: 0;
        margin-left: 50%;
        margin-top: 50%;
    }

    to {
        opacity: 1;
        width: 100%;
        height: 100%;
        margin-left: 0;
        margin-top: 0;
    }
}

.clear-leave-active {
    transition: all 0.5s linear;
}

.clear-leave-to {
    opacity: 0;
}


</style>