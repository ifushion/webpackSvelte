<script>
  import { onMount } from 'svelte'
  import ClipboardJS from 'clipboard'
  import {
    queryParams,
  } from '@/common/js/utils';
  import sensors from '@/common/js/sensors'
  import { WECHAT_NAME } from '@/common/constant'
  import WechatDialog from '@/component/WechatDialog'
  import '@/common/js/zhihu'
  import '@/common/css/animat.scss'

  const {
    source = 'zhihu',
    imgType = 'chaoren',
    modificationTime = '2021/06/23',
    stopLoop = location.href.includes('127.0.0.1'),
  } = queryParams();
  sensors.init();
  sensors.setParams({
    source,
    imgType,
    modificationTime,
  });
  sensors.track('browsePage_1');
  !stopLoop && sensors.startLoopTime();

  const imgs = [
    'https://static.genebox.cn/laso/file/202106/23/c68bd7e7d41411eb9558ae340e7831a1.jpg',
    'https://static.genebox.cn/laso/file/202106/23/c706ad16d41411ebbd089a7248c330d8.jpg',
    'https://static.genebox.cn/laso/file/202106/23/c71468d8d41411eb9558ae340e7831a1.jpg',
    'https://static.genebox.cn/laso/file/202106/23/c7b2cb97d41411ebbd089a7248c330d8.jpg',
    'https://static.genebox.cn/laso/file/202106/23/c774d859d41411eb9558ae340e7831a1.jpg',
    'https://static.genebox.cn/laso/file/202106/23/c6c7cf55d41411ebbd089a7248c330d8.jpg',
    'https://static.genebox.cn/laso/file/202106/23/caee4789d41411ebbd089a7248c330d8.jpg',
    'https://static.genebox.cn/laso/file/202106/23/ca921dc8d41411ebbd089a7248c330d8.jpg',
    'https://static.genebox.cn/laso/file/202106/23/cab906dbd41411eb9558ae340e7831a1.jpg',
    'https://static.genebox.cn/laso/file/202106/23/ca1b674ad41411eb9558ae340e7831a1.jpg',
  ];
  const btnImg = 'https://static.genebox.cn/laso/file/202106/23/ab9a744ed41511eb9558ae340e7831a1.png';
  let dialogRef = null;
  const keyWord = '开始测试'

  // 底部按钮点击
  const handleBtnClick = () => {
    sensors.track('browseButtons_1', {
      buttonName: '抢',
    })
    dialogRef.showDialog();
  }

  // 打开微信
  const handleOpenWechat = () => {
    sensors.track('browseButtons_1', {
      buttonName: '打开微信'
    })
    source.includes('zhihu') && window.zhad.push({ eventtype: 'js_submit' });
  }

  onMount(() => {
    document.querySelectorAll('[data-clipboard-text]')
      .forEach(dom => {
        new ClipboardJS(dom)
      })
  })
</script>

<main>
  <div class="img_list">
    {#each imgs as img}
      <img class="full_img" src={img} alt="">
    {/each}

    <div class="fixed_btn" on:click={handleBtnClick} data-clipboard-text={WECHAT_NAME}>
      <img class="full_img" src={btnImg} alt="">
      <div class="btn_content">
        <p>
          关注公众号 回复「
          <span class="main_text" data-key-word>
            {keyWord}
          </span>
          」
        </p>
        <p>领取粉丝超值大额优惠</p>
        <div class="circle_btn heartAnimate"></div>
      </div>
    </div>
  </div>
  <WechatDialog
    bind:this={dialogRef}
    keyWord={keyWord}
    handleOpenWechat={handleOpenWechat}
  />
</main>

<style lang="scss">
  .full_img {
    width: 100%;
  }
  .img_list {
    display: flex;
    flex-direction: column;
    .fixed_btn {
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .btn_content {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          color: #fff;
          font-size: 4.8vw;
          font-weight: 500;
          margin: 0;
          padding: 0;
        }
        .main_text {
          color: #ffe032;
        }
        .circle_btn {
          position: absolute;
          right: 4vw;
          width: 13vw;
          height: 13vw;
          border-radius: 13vw;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          &::after {
            content: '抢';
            font-weight: 900;
            font-size: 7vw;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10.5vw;
            height: 10.5vw;
            border-radius: 10.5vw;
            background: #cb1f4c;
          }
        }
      }
    }
  }
</style>