// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
export default function modalUpload() {
  const h = this.$createElement
  return new Promise((resolve, reject) => {
    this.$msgbox({
      title: '上传图片',
      customClass: 'upload-form',
      message: h('div', { class: 'common-form-upload' }, [
        h('', {
          // props: {
          //   rule: data.rule,
          //   option: data.config
          // },
          // on: {
          //   mounted: ($f) => {
          //     fApi = $f
          //   }
          // }
        })
      ]),
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      resolve()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    })
  })
}
