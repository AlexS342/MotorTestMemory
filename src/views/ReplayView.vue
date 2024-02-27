<template>
    <div class="replay">
        <div class="replay__logo">
            <img class="replay__logoImg" src="@/assets/img/flag.png" alt="flag">
        </div>
        <h1 class="replay__header">
            Игра завершена!
        </h1>
        <p class="replay__message">Вы набрали {{this.points}} {{this.items}}</p>
        <button class="replay__button" @click="goPlay">Повторить игру!</button>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    data() {
        return {
            points: 0,
            items: 'балл',
        }
    },
    created() {
        this.points = localStorage.getItem('Points');

        let module = Number( this.points)
        let remains = Number( this.points) % 10

        if(module >= 11 && module <= 14){
            this.items = 'баллов'
        }else if(remains === 1){
            this.items = 'балл'
        }else if(remains > 1 && remains < 5){
            this.items = 'балла'
        }else if(remains >= 5 && remains <= 9 || remains === 0){
            this.items = 'баллов'
        }
    },
    methods: {
        goPlay: function (){
            this.$router.push({path:'/play'})
        }
    }
})
</script>

<style scoped>

.replay{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
.replay__logo{
    width: 300px;
    height: 150px;
    box-sizing: border-box;
    margin-bottom: 30px;
}
.replay__logoImg{
    width: 300px;
    height: 150px;
    border-radius: 10px;
    box-sizing: border-box;
}
.replay__header{
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 4em;
    font-weight: 700;
    margin-bottom: 30px;
}
.replay__message{
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom: 30px;
}
.replay__button{
    height: 30px;
    padding: 0 36px;
    margin-top: 30px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background-color: rgb(122 170 255);
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    cursor: pointer;
}
.replay__button:hover{
    background-color: rgb(93, 153, 255);
    color: rgb(153, 255, 153);
}
.replay__button:active{
    background-color: rgb(255, 60, 0);
    color: rgb(0, 47, 255);
}

@media (min-width: 769px) and (max-width: 1024px) {
    .replay__header{
        font-size: 3em;
        margin-bottom: 25px;
    }
    .replay__message{
        margin-bottom: 25px;
    }
    .replay__button{
        padding: 0 24px;
        margin-top: 25px;
    }
}
@media (min-width: 426px) and (max-width: 768px) {
    .replay__logo{
        width: 200px;
        height: 100px;
        margin-bottom: 20px;
    }
    .replay__logoImg{
        width: 200px;
        height: 100px;
        border-radius: 5px;
    }
    .replay__header{
        font-size: 2em;
        margin-bottom: 20px;
    }
    .replay__message{
        margin-bottom: 20px;
    }
    .replay__button{
        padding: 0 20px;
        margin-top: 20px;
    }
}
@media (max-width: 425px) {
    .replay__logo{
        width: 150px;
        height: 75px;
        margin-bottom: 16px;
    }
    .replay__logoImg{
        width: 150px;
        height: 75px;
        border-radius: 5px;
    }
    .replay__header{
        font-size: 1.5em;
        margin-bottom: 24px;
    }
    .replay__button{
        padding: 0 16px;
        margin-top: 16px;
    }
}
</style>