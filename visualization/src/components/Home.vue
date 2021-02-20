<template>
	<div class="wrapper">
		<h1>Schlag&shy;zeilen Ana&shy;lyse</h1>
		<p>Eine Interaktive Reise durch die Schlagzeilen vom Dezember 2020</p>

		<p>von Milan Wulf, Hamed Shahsavari, <strong>Eric Wätke</strong>
		<br>für Data-Portraits - Prof. Myriel Milicevic - WiSe 20/21</p>

		<!-- <div class="volumeButton" @click="changeVolume" @mouseenter="hover">
			<svg v-if="volume == 1" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<path d="M15 8a5 5 0 0 1 0 8" />
				<path d="M17.7 5a9 9 0 0 1 0 14" />
				<path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
			</svg>
			<svg v-else-if="volume == 0.5" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<path d="M15 8a5 5 0 0 1 0 8" />
				<path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
			</svg>
			<svg v-else-if="volume == 0" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
				<path d="M16 10l4 4m0 -4l-4 4" />
			</svg>
			<span v-else>Vol: </span>
			{{volume*100}} %
		</div> -->

		<h2>wait, what?</h2>
		<p>Wir haben vom 21.12.2020 bis zum 28.12.2020 <strong>198 Nachrichtenartikel</strong> vom <em>Spiegel, Focus Online </em>und <em>Deutsche Welle</em> gesammelt.</p>

		<img src="../assets/struktur.svg" alt="">

		<p>Diese Liste haben wir dann gefiltert, um oft genutzte Füllwörter zu entfernen. Diese sind nicht in den Visualisierungen vorhanden.</p>
		<p>Mit diesem, für uns drei, identischem Datensatz, haben wir nun unterschiedliche Visualisierungsformen erstellt.</p>
		<p>Ich wollte den interaktiven Weg gehen, da wir ja auch mit p5.js in dieses Thema viel Zeit gesteckt haben.</p>
		<p>Es war wirklich interessant, die Liste der Wörter zu überfliegen und zu schauen, welche Wörter oft genutzt wurden und dann festzustellen, wie erwartet und wie unerwartet manche auf der Liste sind.</p>
		<p>Mit Word Count hast du ungefähr die gleiche Erfahrung wie ich, als ich die Liste zum ersten mal sah.</p>
	
		<div class="full-bleed">
			<div class="text right">
				<div class="text-wrapper">
					<h2>#word count</h2>
					<p><strong>Gib’ eine Zahl ein und finde ein Wort, welches so oft benutzt wurde!</strong></p>
					<p>Zur Erinnerung: wir haben 198 Artikel analysiert und das meistgenutzte Wort kam 283 mal vor!
					<br><br>Einige Wörter wurden gleich oft genutzt. Manche Wortmengen traten nicht auf. In dem Fall wird das dichteste Wort angezeigt.</p>
				</div>
			</div>
			<div class="interactive left">
				<WordCount/>
			</div>
		</div>

		<p>Cool!
		<br>Vielleicht haben dich auch einige Worte überrascht. Trotzdem hat man noch nicht wirklich ein Gefühl über die Verhältnisse einzelner Worte.</p>

		<p>Und weil jeder schon mal ‘ne Wordcloud gesehen hat, habe ich <strong>keine</strong> gemacht. Also, mehr oder weniger.</p>
		
		<div class="full-bleed">
			<div class="interactive right">
				<WordOfFame :volume="volume"/>
			</div>
			<dv class="text left">
				<div class="text-wrapper">
					<h2><span>#</span>#word of fame</h2>
					<p>Es ist schon bisschen wie eine Wordcloud. Aber nur etwas!</p>
					<p>Suche aus diesen 9 Worten jenes aus, welches deiner Ansicht nach am öftesten benutzt wurde. Du kannst es gerne öfter versuchen, die Wörter werden zufällig ausgesucht.</p>
					<p>Bedenke, der Zeitraum der Artikel liegt zwischen dem 21.12. und dem 28.12.2020</p>
				</div>
			</dv>
		</div>

		<p>Eyeopening 😮</p>
		<p>Übrigens: nur 10% aller Antworten die hier jemals gegeben worden, sind richtig.</p>
		
		<video src="../assets/clarkson.mp4" autoplay muted loop poster="../assets/clarkson_thumb.png"></video>

		<p>Alles was wir bis jetzt ausprobiert haben hat sich ausschließlich mit der Wortanzahl von allen Artikeln beschäftigt.</p>
		<p>Deshalb nutze ich die Gelegenheit, und mache als letzte Interaktion etwas anders.</p>

		<div class="full-bleed">
			<div class="text right">
				<div class="text-wrapper">
					<h2><span>##</span>#versus</h2>
					<p>
						Es gibt 74 Wörter welche jeweils von mindestens zwei Zeitungen benutzt wurden.
					</p>
					<p>
						Versuche herauszufinden, welche Zeitung das jeweilige Wort am meisten benutzt!
					</p>
				</div>
			</div>
			<div class="interactive left">
				<versus />
			</div>
		</div>

		<p>So, das war alles! 
		<br>Hoffentlich hattest du beim ausprobieren genau so viel Spaß wie ich beim Erstellen der interaktiven Demos!</p>

		<p>Die Visualisierungen von Milan und Hamed findest du in unserer <a href="https://fhp.incom.org/workspace/9028" target="_blank" rel="nofollow">Incom Dokumentation.</a></p>

		<p>Falls du dir die gesammelten Daten anschauen möchtest, findest du diese in unserem <a href="https://github.com/ericwaetke/data-portraits" target="_blank" rel="nofollow">GitHub Repository.</a></p>

		<p>Bye Bye und bis bald! 🎉</p>

		<div class="spacer"></div>
	</div>
</template>

<script>
import {ref} from "vue"
import useSound from 'vue-use-sound';
import buttonPress from '../assets/pop-down.mp3';
import buttonHover from '../assets/button.mp3';


import WordCount from "./wordcount/WordCount.vue"
import WordOfFame from "./wordoffame/WordOfFame.vue"
import versus from "./versus/versus.vue"

export default {
	name: "Home",
	components: {
		WordCount,
		WordOfFame,
		versus
	},
	props: {
		mobile: Boolean
	},
	computed: {
		strength(){
			return (mobile) ? 0 : 15;
		},
	},
	setup(props, {emit}){
		const volume = ref(0.5);
		// const volume = ref(0.5);
		const [hover] = useSound(buttonHover, {volume})
		const [press] = useSound(buttonPress, {volume})
		
		function changeVolume(){
			switch (volume.value) {
				case 0:
					volume.value = 0.5
					emitter.emit('volume', .5)
					break;
				case 0.5:
					volume.value = 1
					emitter.emit('volume', 1)
					break;
				case 1:
					volume.value = 0
					emitter.emit('volume', 0)

					break;
				default:
					volume.value = 0.5
					emitter.emit('volume', .5)
					break;
			}
			console.log(volume.value);
			press();
		}
		return{
			changeVolume, hover, volume
		}
	}
}
</script>

<style lang="scss">
.wrapper {
	display: grid;
	grid-template-columns: 1fr min(65ch, 100%) 1fr;
	padding: 0 2em;
}
.wrapper > * {
	grid-column: 2;
}
.full-bleed {
	margin: 15% 0;
	width: 100%;
	grid-column: 1 / 4;
	display: grid;
	column-gap: 5em;
	grid-template-columns: 1fr 1fr;

	.right{
		justify-content: flex-end;
	}
	.left{
		justify-content: flex-start;
	}

	.text, .interactive{
		display: flex;
		align-items: center;
	}
	.text{
		.text-wrapper{
			width: min(65ch, 100%);
		}
	}
	.interactive{
		.buttons{
			margin-top: 1em;
		}
	}
}

h1{
	font-weight: 900;
	font-size: 72pt;
}
h2{
	font-weight: 900;
	font-size: 48pt;
	
	span{
		letter-spacing: -20px;
	}
}

img{
	width: 100%;
}

video {
    width: 100%;
    margin: 5em 0;
	border-radius: 15px;
}

a{
	position: relative;
	box-shadow: inset 0 -.4rem 0 0 var(--elements);
	transition:box-shadow .4s cubic-bezier(.18,.89,.32,1.28);
	color: #000;
	text-decoration: none;
	&:hover{
		box-shadow:inset 0 -.75rem 0 0 var(--elements)
	}
}
.volumeButton {
    display: inline-flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    height: 48px;
    width: 125px;
    border: none;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.05);
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    cursor: pointer;

	&::selection{
		background: none;
		color: #000;
	}
}
.spacer{
	height: 25vh;
}

@media only screen and (max-width: 870px){
	.wrapper{
		.text{
			grid-row: 1;
		}
		.interactive{
			margin-top: 2em;
			grid-row: 2;
		}
		.text, .interactive{
			grid-column: 1/3;
		}
		.full-bleed {
			.left, .right {
				justify-content: center;
			}
		}
		
	}
}
@media only screen and (max-width: 500px){
	.wrapper{
		h1{
			font-size: 48pt;
		}
		h2{
			font-size: 32pt;
		}
	}
}
@media only screen and (max-width: 350px){
	.wrapper{
		h1{
			font-size: 32pt;
		}
		h2{
			font-size: 24pt;
		}
	}
}
</style>