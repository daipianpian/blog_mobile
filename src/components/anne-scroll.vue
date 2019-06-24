<template lang="html">
  
    <div class="anne-scroll"
    :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
    ref="wrapper"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
      <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
        <header class="pull-refresh">
          <slot name="pull-refresh">
             <span class="down-tip">下拉更新</span>
             <span class="up-tip">松开更新</span>
             <span class="refresh-tip">更新中</span>
          </slot>
        </header>
        <slot></slot>
        <footer class="load-more">
          <slot name="load-more">
            <span>{{onPullUpText}}</span>
          </slot>
        </footer>
      </section>
      <div v-show="scrollTop > 60" class="return-top" @click="returnTop">↑</div>
    </div>
  
</template>

<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 40
    },
    enableInfinite: {
      type: Boolean,
      default: true
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data() {
    return {
      top: 0,
      state: 0,
      startY: 0,
      touching: false,
      infiniteLoading: false,
      onPullUpText: '加载中……',
      scrollLoadmore: null,
      scrollTop: 0
    }
  },
  created() {
    console.log('created');
  },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY
      this.startScroll = this.$el.scrollTop || 0
      this.touching = true
    },
    touchMove(e) {
      if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
        return
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
      if (diff > 0) e.preventDefault()
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

      if (this.state === 2) { // in refreshing
        return
      }
      if (this.top >= this.offset) {
        this.state = 1
      } else {
        this.state = 0
      }
    },
    touchEnd(e) {
      if (!this.enableRefresh) return
      this.touching = false
      if (this.state === 2) { // in refreshing
        this.state = 2
        this.top = this.offset
        return
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else { // cancel refresh
        this.state = 0
        this.top = 0
      }
    },
    refresh() {
      this.state = 2
      this.top = this.offset
      this.infiniteLoading = false
      this.onPullUpText='加载中……'
      this.onRefresh(this.refreshDone)
    },
    refreshDone() {
      this.state = 0
      this.top = 0
      this.onPullUpText='加载完成'
    },

    infinite() {
      this.infiniteLoading = true
      this.onPullUpText='加载中……'
      this.onInfinite(this.infiniteDone)
    },

    infiniteDone() {
      this.infiniteLoading = false
      this.onPullUpText='加载完成'
    },

    onLoaded() {
      this.onPullUpText='没有更多';
    },

    onScroll(e) {
      if (!this.enableInfinite || this.infiniteLoading) {
        return false;
      }
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$el.scrollTop
      this.scrollTop = scrollTop
      let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
      let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
      let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
      if (bottom < infiniteHeight) this.infinite()
    },
    // 返回顶部
    returnTop() {
      let that = this
      this.scrollLoadmore = this.$refs.wrapper;
      let timer = null

      if (!this.enableInfinite || this.infiniteLoading) {
        this.scrollLoadmore.scrollTop = 0;
        if(timer){
          clearInterval(timer)
        }
        return false;
      }else{
        timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          this.scrollLoadmore.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      }

    }
  },
  activated(){
    this.scrollLoadmore = this.$refs.wrapper;
    if(this.scrollLoadmore){
      this.scrollLoadmore.scrollTop = this.scrollTop;
    }
  },
  destroyed(){
  }
}
</script>
<style>
.anne-scroll { position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: auto; -webkit-overflow-scrolling: touch; }
.anne-scroll .inner { position: absolute; top: -2rem; width: 100%; transition-duration: 300ms; }
.anne-scroll .pull-refresh { position: relative; left: 0; top: 0; width: 100%; height: 2rem; display: flex; align-items: center; justify-content: center; }
.anne-scroll.touch .inner { transition-duration: 0ms; }
.anne-scroll.down .down-tip { display: block; }
.anne-scroll.up .up-tip { display: block; }
.anne-scroll.refresh .refresh-tip { display: block; }
.anne-scroll .down-tip,
.anne-scroll .refresh-tip,
.anne-scroll .up-tip { display: none; }
.anne-scroll .load-more { height: 3rem; display: flex; align-items: center; justify-content: center; font-size: 0.3rem;} 
.return-top{position: fixed; width:100px;height: 100px; bottom: 5%; right: 5%; text-align: center; line-height: 100px; background: #EDF0F0;border-radius: 8%;} 
</style>