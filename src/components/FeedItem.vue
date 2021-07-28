<template>
  <div class="message-wrpp">

    <div class="header text-base">
      <div>{{ dateText }}</div>
      <div>/</div>
      <div class="important-text">{{ message.authorName }}</div>
      <div>/</div>
      <a :href=" message.authorUrl " class="text-base">{{ message.authorUrl }}</a>
    </div>

    <message-content 
      :content=" message.content "
      :tones=" message.contentPostTones "
    />
  </div>
</template>

<script>
import MessageContent from './MessageContent.vue'

const getMonthStr = (date) => {
  switch (date.getMonth()) {
    case 0: return 'января'
    case 1: return 'февраля'
    case 2: return 'марта'
    case 3: return 'апреля'
    case 4: return 'мая'
    case 5: return 'июня'
    case 6: return 'июля'
    case 7: return 'августа'
    case 8: return 'сентября'
    case 9: return 'октября'
    case 10: return 'ноября'
    case 11: return 'декабря'
    default: return ''
  }
}

export default {
	components: { 
    MessageContent,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  computed: {
    dateText () {
      const date = new Date(this.message.date)
      return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}, 
        ${date.getDate()} ${getMonthStr(date)} ${date.getFullYear()} года`
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles.scss';

  .message-wrpp {

    .header {
      display: flex;
      padding-top: 5px;
      padding-left: 15px;

      div {
        margin-right: 6px;
      }

      a{
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
</style>