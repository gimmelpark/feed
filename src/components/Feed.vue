<template>
  <div class="feed-wrapper-0">
    <div 
      class="feed-wrapper-1"
      @scroll=" onScroll "
    >
      <div>

        <div
          v-for="(message, i) in feed"
          :key="`message-${i}`"
        >
          <feed-item :message=" message " />
          <div 
            class="hr" 
            v-if=" !(i === feed.length - 1 && allLoaded ) "
          ></div>
        </div>

      </div>
      <div
        v-if=" !allLoaded "
        class="text-base loader"
      >
        Загрузка...
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FeedItem from './FeedItem.vue'

export default {
	components: { FeedItem },

  data: () => ({
    scrollDone: false,
  }),

  computed: {
    ...mapGetters ('feed', {
      feed: 'getFeed',
      allLoaded: 'isAllFeedLoaded',
    }),

  },

  methods: {
    onScroll (e) {
      this.scrollDone = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) <= 50;
    }
  },

  watch: {
    scrollDone (newScrollDone) {
      if (newScrollDone) this.$store.dispatch('feed/fetchMessages')
    }
  },

  created () {
    this.$store.dispatch('feed/fetchMessages')
  },

}
</script>

<style lang="scss" scoped>
  @import '../assets/styles.scss'; 

  .feed-wrapper-0 {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: fixed;
    
    .feed-wrapper-1 {
      max-height: 100%;
      overflow-y: auto;

      .loader {
        margin: 10px 20px;
      }
    }
  }
  
</style>