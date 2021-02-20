<template>
	<div class="versus-container">
		<div>
			<p>Wer hat das Wort</p>
			<p class="current-word">»{{currentWord[0]}}«</p>
			<p>am meisten benutzt?</p>
			<div class="button-container" :style="vars">
				<button class="spiegel" @click="(e) => userInput('spiegel', e)" ref="spiegelButton" @mouseenter="hoverActions">
					<div class="result spiegel" v-if="finished">
						<p>{{currentWord[1].spiegel}} mal benutzt</p>
					</div>
					<span class="spiegel"></span>
					Spiegel
				</button>
				<button class="focus" @click="(e) => userInput('focus', e)" ref="focusButton" @mouseenter="hoverActions">
					<div class="result focus" v-if="finished">
						<p>{{currentWord[1].focus}} mal benutzt</p>
					</div>
					<span class="focus"></span>
					Focus Online
				</button>
				<button class="dw" @click="(e) => userInput('dw', e)" ref="dwButton" @mouseenter="hoverActions">
					<div class="result dw" v-if="finished">
						<p>{{currentWord[1].dw}} mal benutzt</p>
					</div>
					<span class="dw"></span>
					Deutsche Welle
				</button>
			</div>
		</div>
		<p v-if="lastWord != null" class="last">
			<span class="hervorgehoben">{{highscore}}</span> in a row!			
			<br><br>
			Das letzte Wort: <span class="hervorgehoben">{{lastWord[0]}}</span>
			<br>Spiegel: <span class="hervorgehoben">{{lastWord[1]?.spiegel}}</span>
			<br>Focus: <span class="hervorgehoben">{{lastWord[1]?.focus}}</span>
			<br>Deutsche Welle: <span class="hervorgehoben">{{lastWord[1]?.dw}}</span>
		</p>
	</div>
</template>
<script>
import { ref, onBeforeUpdate, watch } from 'vue';
import useSound from 'vue-use-sound';
import buttonHover from '../../assets/button.mp3';
import buttonPress from '../../assets/pop-down.mp3';
import loseSound from '../../assets/lose.mp3';
import winSound from '../../assets/win.mp3';

import filteredHeadlines from "../../assets/filtered-headlines.json"

export default {
	name: "WordOfFame",
	props: {
		volume: Number
	},
	setup(props){
		const volume = ref(0.5);
		// this.emitter.on('volume', e => volume.value = e)

		const [hover] = useSound(buttonHover, {volume})
		const [press] = useSound(buttonPress, {volume})
		const [playWinSound] = useSound(winSound, {volume})
		const [playLoseSound] = useSound(loseSound, {volume})

		const spiegelButton = ref(null);
		const focusButton = ref(null);
		const dwButton = ref(null);

		// Width Variables für  Aufkärung
		const vars = ref({
			'--spiegel': 0+"%",
			'--focus': 0+"%",
			'--dw': 0+"%"
		})

		const list = filteredHeadlines;

		const highscore = ref(0);
		const finished = ref(false);

		function getRandomInt(max){
			return Math.floor(Math.random() * Math.floor(max));
		}

		const currentWord = ref([]);
		const lastWord = ref(null);
		function getRandomWord(){
			currentWord.value = Object.entries(list)[getRandomInt(Object.keys(list).length)];
		}
		
		let frequencies;
		function userInput(choice, e){
			frequencies = currentWord.value[1];
			(frequencies.spiegel) ? null : frequencies.spiegel = 0;
			(frequencies.focus) ? null : frequencies.focus = 0;
			(frequencies.dw) ? null : frequencies.dw = 0;
			console.log(frequencies)

			switch (choice) {
				case "focus":
					(frequencies.focus >= frequencies.spiegel && frequencies.focus >= frequencies.dw) ? win(e) : lose(e)
					break;
				case "spiegel":
					(frequencies.spiegel >= frequencies.focus && frequencies.spiegel >= frequencies.dw) ? win(e) : lose(e)
					break;
				case "dw":
					(frequencies.dw >= frequencies.focus && frequencies.dw >= frequencies.spiegel) ? win(e) : lose(e)
					break;
			}

			// getRandomWord();
		}

		function win(e){
			const clickedElement = e.target;
			clickedElement.classList.add("win");
			highscore.value++;
			playWinSound();
			updateStyle();
		}
		function lose(e){
			const clickedElement = e.target;
			clickedElement.classList.add("lose");
			highscore.value = 0;
			playLoseSound();
			updateStyle()
		}
		
		function updateStyle(){
			finished.value = true;
			spiegelButton.value.classList.add("finished");
			focusButton.value.classList.add("finished");
			dwButton.value.classList.add("finished");

			const highest = (frequencies.focus >= frequencies.spiegel && frequencies.focus >= frequencies.dw) ? frequencies.focus : (frequencies.spiegel >= frequencies.focus && frequencies.spiegel >= frequencies.dw) ? frequencies.spiegel : frequencies.dw
			console.log(highest);

			vars.value = {
				'--spiegel': (frequencies.spiegel/highest*100)+"%",
				'--focus': (frequencies.focus/highest*100)+"%",
				'--dw': (frequencies.dw/highest*100)+"%"
			}
			window.setTimeout(reload, 2000)
		}

		function reload(){
			lastWord.value = currentWord.value;

			finished.value = false;
			getRandomWord();
			spiegelButton.value.classList.remove("finished");
			focusButton.value.classList.remove("finished");
			dwButton.value.classList.remove("finished");
			spiegelButton.value.classList.remove("win");
			focusButton.value.classList.remove("win");
			dwButton.value.classList.remove("win");
			spiegelButton.value.classList.remove("lose");
			focusButton.value.classList.remove("lose");
			dwButton.value.classList.remove("lose");
		}

		function hoverActions(e){
			hover();
			
			const clickedElement = e.target;
			clickedElement.classList.add("boop");

			window.setTimeout(() => {
				clickedElement.classList.remove("boop");
			}, 300)
		}

		getRandomWord();
		return {
			currentWord, lastWord,
			finished, highscore, 
			userInput, hoverActions,
			spiegelButton, focusButton, dwButton,
			vars
		}
	},
}
</script>

<style lang="scss" scoped>
.versus-container{
	display: flex;
	align-items: end;
	gap: 2em;

	& .last{
		margin: 0;

		& .hervorgehoben{
			font-family: "Helvetica Extended";
		}
	}
}
.current-word{
	font-family: "Helvetica Extended";
	font-weight: 900;
	font-size: 18pt;
}
.button-container{
	display: flex;
	flex-direction: column;
	max-width: 250px;
	gap: .5em;

	button{
		font-family: "Helvetica Extended";
		width: auto;
		padding: 1em 2em;
		justify-content: left;
		display: inline-flex;
		align-items: center;
		position: relative;
		border: none;
		vertical-align: bottom;
		transition: .7s cubic-bezier(.2,1.84,.71,1) transform, .3s ease background;
		animation: .4s cubic-bezier(.2,1.84,.71,1) appear;
		cursor: pointer;
		background: none;
		
		&.boop::before{
			animation: boop .2s forwards;
		}

		&::before{
			content: "";
			top: 0;
			left: 0;
			box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.05);
			background: rgba(255, 255, 255, 0.5);
			position: absolute;
			width: 100%;
			height: 100%;
			display: block;
			z-index: -1;
			border-radius: 10px;
		}
		&.finished .result {
			background: rgb(200, 200, 200);
			height: 100%;
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 10px;
			animation: .1s ease-out appear;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;

			& p{
				z-index: 3;
			}

			&::after{
				content: "";
				background: rgba(0,0,0,.5);
				height: 100%;
				width: 0;
				position: absolute;
				left: 0;
				top: 0;
				animation: winbar .5s cubic-bezier(1,0,0,1);
			}
			&.spiegel::after{
				width: var(--spiegel);
			}
			&.focus::after{
				width: var(--focus);
			}
			&.dw::after{
				width: var(--dw);
			}
		}
		&.win{
			& .result{
				background: rgb(0, 255, 0)
			}
		}
		&.lose{
			& .result{
				background: rgb(255, 0, 0, 1);
			}
		}

		& span.spiegel, span.focus, span.dw{
			height: 20px;
			width: 20px;
			border-radius: 3px;
			margin-right: 8px;
		}
		& span.spiegel{
			background: #EA3D05;
		}
		& span.focus{
			background: #176B3E;
		}
		& span.dw{
			background: #002D5A;
		}
	}
}



@keyframes appear {
  0% {
    opacity: 0;
  }
}

@keyframes winbar {
  0% {
    width: 0%;
  }
}

@keyframes boop {
	0%, 100%{
		transform: scale(1)
	}
	50%{
		transform: scale(.95);
	}
}
@media only screen and (max-width: 500px){
	.versus-container{
		flex-direction: column;
	}
}
</style>