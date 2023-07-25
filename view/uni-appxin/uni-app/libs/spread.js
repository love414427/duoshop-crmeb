// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import { spread } from '@/api/user.js'
import Cache from '@/utils/cache'

const shareScence = function(spid,islogin) {
    if(spid)Cache.set("spread", spid || 0);
	if(spid && islogin){
		spread(spid).then(res=>{
		}) 
	} 
}
export default shareScence

