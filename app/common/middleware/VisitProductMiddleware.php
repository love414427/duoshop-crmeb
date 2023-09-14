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


namespace app\common\middleware;

use app\common\repositories\user\UserHistoryRepository;
use app\common\repositories\user\UserVisitRepository;
use app\Request;
use crmeb\jobs\VisitProductJob;
use crmeb\services\SwooleTaskService;
use think\facade\Queue;
use think\Response;

class VisitProductMiddleware extends BaseMiddleware
{

    public function before(Request $request)
    {
        // TODO: Implement before() method.
    }

    public function after(Response $response)
    {
        $id = intval($this->request->param('id'));
        $type = $this->getArg(0);
        if ($this->request->isLogin() && $id) {
           Queue::push(VisitProductJob::class, [
               'uid' => $this->request->uid(),
               'res_type' => 1,
               'id' => $id,
               'product_type' => $type
           ]);
        }
    }
}
