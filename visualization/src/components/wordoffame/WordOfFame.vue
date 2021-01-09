<template>
	<div>
		<p v-if="highscore != 0">Deine Win-Streak: <span class="bold">{{highscore}}</span></p>
		<div class="grid">
			<template v-for="(wort, i) in randomList" :key="wort">
				<div class="wort" :id="wort" @click="userInput(i)" @mouseenter="(!finished) ? hoverActions(i) : null" :ref="el => {if (el) buttons[i] = el}">{{list[wort].term}}<span v-show="finished">{{list[wort].rawFreq}}</span></div>
			</template>
		</div>
		<button v-if="finished" @click="reload" @mouseenter="hover">
			<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
				<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
			</svg>
		</button>
	</div>
</template>
<script>
import { ref, onBeforeUpdate } from 'vue';
import useSound from 'vue-use-sound';
import buttonHover from '../../assets/button.mp3';
import buttonPress from '../../assets/pop-down.mp3';
import loseSound from '../../assets/lose.mp3';
import winSound from '../../assets/win.mp3';

import filteredList from "../../assets/filteredList.json"

export default {
	name: "WordOfFame",
	setup(props){
		const [hover] = useSound(buttonHover)
		const [press] = useSound(buttonPress)
		const [lose] = useSound(loseSound)
		const [win] = useSound(winSound)

		const list = filteredList;

		const amountOfWords = 9;
		const buttons = ref([]);
		onBeforeUpdate(() => {
			buttons.value = []
		})

		const randomList = ref([]);
		function getRandomList(){
			Array(amountOfWords).fill().map(() => {
				randomList.value.push(getRandomInt(list.length));
			});
		}
		getRandomList();

		const highscore = ref(0);

		function userInput(e){
			if(!finished.value){
				finished.value = true;
				const clickedElement = buttons.value[e];

				//Scale Every Element
				let highestElement = {id: 0, freq: 0};
				Array(amountOfWords).fill().map((_, i) => {
					const el = buttons.value[i];
					const frequency = list[randomList.value[i]].rawFreq;
					const scale = Math.log(frequency) / 283 * 75;

					if(frequency > highestElement.freq){
						highestElement = {
							id: randomList.value[i],
							freq: frequency
						}
					}
					updateScale(el, scale);
				});

				console.log(list[clickedElement.id].rawFreq);
				//Check if user was correct
				if(highestElement.freq == list[clickedElement.id].rawFreq){
					clickedElement.classList.add("correct");
					highscore.value++;
					win();
				}else{
					clickedElement.classList.add("wrong");
					highscore.value = 0;
					lose();
				}
			}
		}
		function getRandomInt(max){
			return Math.floor(Math.random() * Math.floor(max));
		}
		function updateScale(el, scale){
			el.style = "transform: scale("+scale+")";
		}

		// const router = useRouter()
		const finished = ref(false);
		function reload(){
			press();
			//Reset scale
			Array(amountOfWords).fill().map((_, i) => {
				const el = buttons.value[i];
				updateScale(el, 0);
			});
			finished.value = false;

			//Wait for animation to finish
			window.setTimeout(() => {
				// Reset random List
				randomList.value = new Array;
				//Generate a new random list
				getRandomList();
				Array(amountOfWords).fill().map((_, i) => {
					const el = buttons.value[i];
					updateScale(el, 1);
					el.classList.remove("correct");
					el.classList.remove("wrong");
				});
			}, 700)
		}


		function hoverActions(e){
			hover();
			
			const clickedElement = buttons.value[e];
			clickedElement.classList.add("boop");

			window.setTimeout(() => {
				clickedElement.classList.remove("boop");
			}, 300)
		}

		return {
			userInput, buttons, randomList, reload, finished, hover, hoverActions, highscore, list
		}
	},
}
</script>
<style lang="css" scoped>
.grid{
	grid-template-columns: repeat(3, 1fr);
	display: grid;
	gap: 1em;
}

.wort{
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  vertical-align: bottom;
  padding: 1em;
  transition: .7s cubic-bezier(.2,1.84,.71,1) transform, .3s ease background;
  animation: .4s cubic-bezier(.2,1.84,.71,1) appear;
  cursor: pointer;
}
.wort::before{
	content: "";
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.05);
	background: rgba(255, 255, 255, 0.5);
	position: absolute;
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 10px;
	z-index: -1;
}
.wort.wrong::before{
	background: rgba(255, 0, 0, 0.5);
}
.wort.correct::before{
	background: rgba(0, 255, 0, 0.5)
}
.wort.boop::before{
	animation: boop .2s forwards;
}

@keyframes boop {
	0%, 100%{
		transform: scale(1)
	}
	50%{
		transform: scale(.95);
	}
}

.wort span {
    display: block;
    font-size: 9pt;
    font-weight: 900;
}

@keyframes appear {
  0% {
    transform: scale(0);
    opacity: 0;
  }
}

button{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 48px;
  width: 48px;
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.05);
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  cursor: pointer;
}
button svg{
  height: 32px;
  width: 32px;
  stroke: #1B2D91;
}

@media (max-width: 500px) {
	.grid{
		grid-template-columns: repeat(2, 1fr);
	}
}
@media (max-width: 300px) {
	.grid{
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>