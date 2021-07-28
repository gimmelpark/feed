<template>
  <div class="content-wrpp text-base">
    <span
      v-for="(tone, i) in allTones"
      :key="`tone-${i}`"
      :style=" getColor (i) "
    >{{ tone.text }}<br v-if=" tone.hasBr "></span>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    tones: {
      type: Array,
      default () {
        return []
      },
    },
  },

  data: () => ({
    allTones: [],
  }),

  methods: {
    getColor (i) {
      const tone = this.allTones[i].tone;
      // если null не меняем стили
      if ( tone === null || Math.abs(tone) > 1 ) return ''
      // исходные стили градиента
      const red = [255, 127, 127]
      const yellow = [255, 255, 127]
      const green = [127, 255, 127]
      // вес каждого из цветов
      let w1
      let w2
      // результирующий цвет
      let color
      // от красного до желтого
      if ( tone < 0 ) {
        w1 = - tone
        w2 = 1 + tone
        color = red.map( (r, i) => Math.round(r * w1 + yellow[i] * w2) )
      } 
      // от желтого до зеленого
      else {
        w1 = tone
        w2 = 1 - tone
        color = green.map( (g, i) => Math.round(g * w1 + yellow[i] * w2) )
      }
      return `background-color: rgb(${color.join()});`
    }
  },

  created () {
    const text = this.content

    // создаем tones, которая содержит не только выделенные отрезки текста
    const tones = []
    let pos = 0
    this.tones.forEach( el => {
      if ( el.position > pos ) {
        tones.push({
          text: text.slice( pos, el.position ),
          tone: null,
        })
      }
      tones.push({
        text: text.slice( el.position, el.position + el.length ),
        tone: el.tone,
      })
      pos = el.position + el.length
    })
    tones.push({
      text: text.slice( pos ),
      tone: null,
    })

    // разбиваем tones по абзацам (hasBr - значит после части текста надо поставить <br>)
    let tonesBr = []
    let tonesPrg
    tones.forEach ( el => {
      // разбиваем по абзацам
      tonesPrg = el.text.split(/\n/)

      tonesPrg.forEach ( (tonePrgText, i) => {
        // пустые отрезки - \n в начале или конце отрезка (или несколько \n подряд)
        if ( tonePrgText.length === 0 ) {
          tonesBr.push({
            text: "",
            tone: null,
            hasBr: true,
          })
        } 
        // не пустые отрезки
        else {
          tonesBr.push({
            text: tonePrgText,
            tone: el.tone,
            hasBr: i < tonesPrg.length - 1 && tonesPrg[i + 1].length !== 0,
          })
        }
      })
    })

    this.allTones = tonesBr
  },
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles.scss';

  .content-wrpp {
    padding: 10px 15px 15px 25px;
  }
</style>