<?php

// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2022 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------


namespace crmeb\listens;


use crmeb\interfaces\ListenerInterface;
use crmeb\utils\Start;
use Swoole\Lock;

class InitSwooleLockListen implements ListenerInterface
{

    public function handle($event): void
    {
        $GLOBALS['_swoole_order_lock'] = [];
        $locks = array_merge(['default'], config('swoole.locks'));
        foreach ($locks as $lock) {
            $GLOBALS['_swoole_order_lock'][$lock] = new Lock(SWOOLE_MUTEX);
        }
        app()->make(Start::class)->show();
    }
}
