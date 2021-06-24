<script>
  import SuccessIcon from './SuccessIcon.svelte';
  const swalSuccessText = ``;
  let dialogShow = false;
  export function showDialog() {
    dialogShow = true;
  }

  export function hideDialog() {
    dialogShow = false;
  }

  export let handleOpenWechat = null;
  export let headImg = 'https://static.genebox.cn/laso/file/202012/15/163161ba-29cc-4c10-a133-b0942d89df49.gif'
  export let keyWord = '一折';
</script>

<main>
  {#if dialogShow}
    <div
      class='dialog'
      on:click={hideDialog}
    >
      <div
        class='dialog-inner'
        on:click|stopPropagation
      >
        <img src={headImg} class="inner-gif" alt="" >
        <SuccessIcon />
        <div class="dialog-desc">「基因宝Genebox」公众号 已复制</div>
        <div class="dialog-desc">立刻打开微信</div>
        <div class="dialog-desc">粘贴，关注</div>
        <div class="dialog-desc">回复口令
          <span class="main-text">
            {keyWord}
          </span>
        </div>
        <div class="dialog-desc">即可领取超值福利~</div>

        <div on:click={handleOpenWechat} class='dialog-btn'>
          打开微信
          <a class="btn-inner" href="weixin://"> </a>
        </div>
      </div>
    </div>
  {/if}
</main>

<style lang="scss">
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dialog-inner {
  padding-bottom: 10vw;
  width: 90vw;
  margin-top: -20vw;
  border-radius: 10px;
  border: 0.5px solid #fff;
  background: #4964FF;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.dialog-inner .inner-gif {
  width: 90%;
  margin-top: 6vw;
}

.dialog-desc {
  margin-bottom: 2vw;
  font-size: 3vw;
  color: #fff;
  font-weight: 300;
}

.dialog-inner .dialog-desc .main-text {
    color: #ffc517;
}

.dialog-inner .dialog-btn {
  position: relative;
  margin-top: 5vw;
  padding: 2vw 10vw;
  font-size: 3.5vw;
  color: #000;
  background: #fff;
  border-radius: 1vw;
}

.dialog .btn-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>