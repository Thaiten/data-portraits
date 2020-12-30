<template>
	<div>
		<div class="grid">
            <template v-for="(wort, i) in randomList" :key="wort">
              <div class="wort" :id="wort" @click="userInput" :ref="el => {if (el) buttons[i] = el}">{{list[wort].term}} {{list[wort].rawFreq}}</div>
            </template>
          </div>
	</div>
</template>
<script>
import { ref, onBeforeUpdate } from 'vue';

export default {
	name: "Random Word Selection",
	props: {
		list: Array
	},
	setup(props){
		const buttons = ref([]);
		onBeforeUpdate(() => {
			buttons.value = []
		})

		let randomList = [];
		Array(30).fill().map(() => {
			randomList.push(getRandomInt(props.list.length));
		});

		function userInput(e){
			const clickedElement = e.toElement;

			//Scale Every Element
			let highestElement = {id: 0, freq: 0};
			Array(30).fill().map((_, i) => {
				const el = buttons.value[i]
				const frequency = props.list[randomList[i]].rawFreq;
				const scale = frequency / 283 *5;

				if(frequency > highestElement.freq){
					highestElement = {
						id: randomList[i],
						freq: frequency
					}
				}
				updateScale(el, scale);
			});

			//Check if user was correct
			if(highestElement.id == clickedElement.id){
				clickedElement.classList.add("correct");
			}else{
				clickedElement.classList.add("wrong");
			}
		}
		function getRandomInt(max){
			return Math.floor(Math.random() * Math.floor(max));
		}
		function updateScale(el, scale){
			el.style = "transform: scale("+scale+")";
		}

		return {
			userInput, buttons, randomList
		}
	},
}
</script>
<style lang="css">
.grid{
  grid-template-columns: repeat(5, 1fr);
display: grid;
gap: 1em;
}

.wort{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.05);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  vertical-align: bottom;
  padding: 1em;
  transition: .7s cubic-bezier(.2,1.84,.71,1) transform, .3s ease background;
}
</style>