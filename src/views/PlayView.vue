<template>
    <div class="play">
        <div class="play__count">
            <p class="play__countText">Баллов: {{ this.countPoints }}</p>
        </div>
        <div class="play__field">
            <div class="playField__half__left">
                <template v-for="(items, row) in this.viewCardsLeftProps" :key="row">
                    <div class="playField__halfList">
                        <template v-for="(card, column) in items" :key="column">
                            <Card :card="card" :row="row" :column="column"
                                  @click="clickCard(card, row, column, 'left')"/>
                        </template>
                    </div>
                </template>
            </div>
            <div class="playField__half__right">
                <template v-for="(items, row) in this.viewCardsRightProps" :key="row">
                    <div class="playField__halfList">
                        <template v-for="(card, column) in items" :key="column">
                            <Card :card="card" :row="row" :column="column"
                                  @click="clickCard(card, row, column, 'right')"/>
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <button class="play__button" @click="goStart">Завершить игру!</button>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import Card from '@/components/card.vue';

export default defineComponent({
    components: {Card},
    data() {
        return {
            // scores: 0,
            cards: [
                "hearts_2.jpg", "diamonds_2.jpg", "crosses_2.jpg", "spades_2.jpg", "hearts_3.jpg", "diamonds_3.jpg", "crosses_3.jpg", "spades_3.jpg",
                "hearts_4.jpg", "diamonds_4.jpg", "crosses_4.jpg", "spades_4.jpg", "hearts_5.jpg", "diamonds_5.jpg", "crosses_5.jpg", "spades_5.jpg",
                "hearts_6.jpg", "diamonds_6.jpg", "crosses_6.jpg", "spades_6.jpg", "hearts_7.jpg", "diamonds_7.jpg", "crosses_7.jpg", "spades_7.jpg",
                "hearts_8.jpg", "diamonds_8.jpg", "crosses_8.jpg", "spades_8.jpg", "hearts_9.jpg", "diamonds_9.jpg", "crosses_9.jpg", "spades_9.jpg",
                "hearts_10.jpg", "diamonds_10.jpg", "crosses_10.jpg", "spades_10.jpg", "hearts_j.jpg", "diamonds_j.jpg", "crosses_j.jpg", "spades_j.jpg",
                "hearts_q.jpg", "diamonds_q.jpg", "crosses_q.jpg", "spades_q.jpg", "hearts_k.jpg", "diamonds_k.jpg", "crosses_k.jpg", "spades_k.jpg",
                "hearts_a.jpg", "diamonds_a.jpg", "crosses_a.jpg", "spades_a.jpg",
            ],
            viewDefaultLeft: [['shirt1.jpg', 'shirt1.jpg', 'shirt1.jpg'], ['shirt1.jpg', 'shirt1.jpg', 'shirt1.jpg'], ['shirt1.jpg', 'shirt1.jpg', 'shirt1.jpg'],],
            viewDefaultRight: [['shirt2.jpg', 'shirt2.jpg', 'shirt2.jpg'], ['shirt2.jpg', 'shirt2.jpg', 'shirt2.jpg'], ['shirt2.jpg', 'shirt2.jpg', 'shirt2.jpg'],],
            viewCardsLeft: [],
            viewCardsRight: [],
            viewCardsLeftProps: [],
            viewCardsRightProps: [],
            leftClick: null,
            rightClick: null,

            leftRow: null,
            leftColumn: null,
            rightRow: null,
            rightColumn: null,

            countOpenCard: 0,
            countPoints: 0,
        }
    },
    created() {
        let arrKeysCards = this.cards;
        let arrayLeft = [];
        let arrayRight = [];

        for (let i = 0; i < 9; i++) {
            let length = arrKeysCards.length - 1;
            let x = Math.floor(Math.random() * (length));

            arrayLeft.push(arrKeysCards[x]);
            arrKeysCards.splice(x, 1);
        }

        arrayRight = arrayLeft.slice(0, 9)

        for (let i = arrayLeft.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arrayLeft[i];
            arrayLeft[i] = arrayLeft[j];
            arrayLeft[j] = temp;
        }

        this.viewCardsLeft = this.formatArray(arrayLeft)
        this.viewCardsRight = this.formatArray(arrayRight)

        this.viewCardsLeftProps = this.viewCardsLeft.slice(0, 9)
        this.viewCardsRightProps = this.viewCardsRight.slice(0, 9)

        this.hide()
    },
    methods: {
        goStart: function () {
            this.$router.push({path: '/'})
        },
        /**
         * Из одномерного массива карт собирает массив с тремя влеженными массивами по три карты
         * @param array
         * @returns {[*,*,*]}
         */
        formatArray: function (array) {
            let arr1 = array.slice(0, 3)
            let arr2 = array.slice(3, 6)
            let arr3 = array.slice(6)

            return [arr1, arr2, arr3]
        },

        /**
         * Проверяет, по какой карте был клик, если разрешено, то открывает карту, обрабатывает парную карту
         * @param card - имя карты
         * @param row - строка в которой находится карта
         * @param column - столбец в котором находится карта
         * @param field - полона поля ('left' или 'right')
         * @returns {number}
         */
        clickCard: function (card, row, column, field) {

            if (field === 'left' && (card === null || this.leftClick !== null || card !== 'shirt1.jpg')) {
                return -1
            }
            if (field === 'right' && (card === null || this.rightClick !== null || card !== 'shirt2.jpg')) {
                return -1
            }
            if (field === 'left') {
                this.leftClick = this.viewCardsLeft[row][column]
                this.leftRow = row
                this.leftColumn = column
                this.viewCardsLeftProps[row].splice(column, 1, this.viewCardsLeft[row][column])
            } else {
                this.rightClick = this.viewCardsRight[row][column];
                this.rightRow = row
                this.rightColumn = column
                this.viewCardsRightProps[row].splice(column, 1, this.viewCardsRight[row][column])
            }

            if ((this.rightClick === null && field === 'left') || (this.leftClick === null && field === 'right')) {
                return -1
            }

            if ((this.viewCardsRight[this.rightRow][this.rightColumn] === this.leftClick && field === 'left') ||
                (this.viewCardsLeft[this.leftRow][this.leftColumn] === this.rightClick && field === 'right')) {

                this.clearCard()
                this.clearChoice()
                this.countPoints = this.countPoints + (9 - this.countOpenCard)
                this.countOpenCard++

                if (this.countOpenCard >= 9) {
                    localStorage.setItem('Points', this.countPoints)
                    setTimeout(() => {
                        this.$router.push({path: '/replay'})
                    }, 1000)
                }
            } else if ((this.viewCardsRight[this.rightRow][this.rightColumn] !== this.leftClick && field === 'left') ||
                (this.viewCardsLeft[this.leftRow][this.leftColumn] !== this.rightClick && field === 'right')) {
                this.hideCards()
                this.clearChoice()
                this.countPoints = this.countPoints - (this.countOpenCard + 1)
                if (this.countPoints < 0) {
                    this.countPoints = 0
                }
            }
        },

        // clickLeftCard: function (card, row, column) {
        //
        //     if (card === null || this.leftClick !== null || (card !== 'shirt1.jpg' && card !== 'shirt2.jpg')) {
        //         return -1
        //     }
        //
        //     this.leftClick = this.viewCardsLeft[row][column]
        //     this.leftRow = row
        //     this.leftColumn = column
        //
        //     this.viewCardsLeftProps[row].splice(column, 1, this.viewCardsLeft[row][column])
        //
        //     if (this.rightClick === null) {
        //         return -1
        //     }
        //
        //     if (this.viewCardsRight[this.rightRow][this.rightColumn] === this.leftClick) {
        //         this.clearCard()
        //         this.clearChoice()
        //         this.countPoints = this.countPoints + (9 - this.countOpenCard)
        //         this.countOpenCard++
        //
        //         if (this.countOpenCard >= 9) {
        //             localStorage.setItem('Points', this.countPoints)
        //             setTimeout(() => {
        //                 this.$router.push({path: '/replay'})
        //             }, 1000)
        //         }
        //     } else if (this.viewCardsRight[this.rightRow][this.rightColumn] !== this.leftClick) {
        //         this.hideCards()
        //         this.clearChoice()
        //         this.countPoints = this.countPoints - (this.countOpenCard + 1)
        //         if (this.countPoints < 0) {
        //             this.countPoints = 0
        //         }
        //     }
        // },
        // clickRightCard: function (card, row, column) {
        //
        //     if (card === null || this.rightClick !== null || (card !== 'shirt1.jpg' && card !== 'shirt2.jpg')) {
        //         return -1
        //     }
        //
        //     this.rightClick = this.viewCardsRight[row][column];
        //     this.rightRow = row
        //     this.rightColumn = column
        //
        //     this.viewCardsRightProps[row].splice(column, 1, this.viewCardsRight[row][column])
        //
        //     if (this.leftClick === null) {
        //         return -1
        //     }
        //
        //     if (this.viewCardsLeft[this.leftRow][this.leftColumn] === this.rightClick) {
        //         this.clearCard()
        //         this.clearChoice()
        //         this.countPoints = this.countPoints + (9 - this.countOpenCard)
        //         this.countOpenCard++
        //
        //         if (this.countOpenCard >= 9) {
        //             localStorage.setItem('Points', this.countPoints)
        //             setTimeout(() => {
        //                 this.$router.push({path: '/replay'})
        //             }, 1000)
        //         }
        //     } else if (this.viewCardsLeft[this.leftRow][this.leftColumn] !== this.rightClick) {
        //         this.hideCards()
        //         this.clearChoice()
        //         this.countPoints = this.countPoints - (this.countOpenCard + 1)
        //         if (this.countPoints < 0) {
        //             this.countPoints = 0
        //         }
        //     }
        // },

        /**
         * Очищает параметры выбраных парных карт
         */
        clearChoice: function () {
            this.leftClick = null
            this.rightClick = null

            this.leftRow = null
            this.leftColumn = null
            this.rightRow = null
            this.rightColumn = null
        },

        /**
         * Убирает парные карты с поля
         */
        clearCard: function () {
            let lRow = this.leftRow
            let lColumn = this.leftColumn
            let rRow = this.rightRow
            let rColumn = this.rightColumn
            setTimeout(() => {
                this.viewCardsLeftProps[lRow].splice(lColumn, 1, null)
                this.viewCardsRightProps[rRow].splice(rColumn, 1, null)
            }, 500)
        },
        /**
         * Переворачивает карту рубашкой вверх
         */
        hideCards: function () {
            let lRow = this.leftRow
            let lColumn = this.leftColumn
            let rRow = this.rightRow
            let rColumn = this.rightColumn

            setTimeout(() => {
                this.viewCardsLeftProps[lRow].splice(lColumn, 1, 'shirt1.jpg')
                this.viewCardsRightProps[rRow].splice(rColumn, 1, 'shirt2.jpg')
            }, 1000)
        },

        /**
         * Переворачивает все карты рубашкой вверх
         */
        hide: function () {
            setTimeout(() => {
                this.viewCardsLeftProps.splice(0, this.viewCardsLeftProps.length)
                this.viewCardsRightProps.splice(0, this.viewCardsRightProps.length)
                this.viewCardsLeftProps = this.viewDefaultLeft.slice(0)
                this.viewCardsRightProps = this.viewDefaultRight.slice(0)
            }, 5000);
        },
    },
})
</script>

<style scoped>
.play {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
}

.play__count {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.play__countText {
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 24px;
}

.play__field {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.playField__half__left {
    width: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end
}

.playField__half__right {
    width: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start
}

.playField__halfList {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.play__button {
    height: 30px;
    padding: 0 36px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background-color: rgb(33 25 17);
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    opacity: 0.5;
    cursor: pointer;
}

.play__button:hover {
    background-color: rgb(93, 153, 255);
    color: rgb(153, 255, 153);
    opacity: 1;
}

.play__button:active {
    background-color: rgb(255, 60, 0);
    color: rgb(0, 47, 255);
    opacity: 1;
}

@media (min-width: 769px) and (max-width: 1024px) {

}

@media (min-width: 426px) and (max-width: 768px) {

}

@media (max-width: 425px) {
    .play__countText {
        margin: 6px 18px;
    }

    .play__field {
        flex-direction: column;
    }

    .playField__half__left {
        width: 100%;
        justify-content: center
    }

    .playField__half__right {
        width: 100%;
        justify-content: center
    }
}
</style>