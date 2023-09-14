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


namespace crmeb\jobs;


use app\common\repositories\user\UserHistoryRepository;
use app\common\repositories\user\UserVisitRepository;
use crmeb\interfaces\JobInterface;
use crmeb\services\SwooleTaskService;
use think\Exception;
use think\facade\Log;
use think\queue\Job;

class VisitProductJob implements JobInterface
{

    public function fire($job, $data)
    {
        try{
            $spu =  app()->make(UserHistoryRepository::class)->createOrUpdate($data);
            if ($spu) {
                $make = app()->make(UserVisitRepository::class);
                $count = $make->search(['uid' => $data['uid'], 'type' => 'product'])->where('type_id', $spu['product_id'])->whereTime('create_time', '>', date('Y-m-d H:i:s', strtotime('- 300 seconds')))->count();
                if (!$count) {
                    SwooleTaskService::visit(intval($data['uid']), $spu['product_id'], 'product');
                }
            }
        }catch (\Exception $e){

        }
        $job->delete();
    }

    public function failed($data)
    {
        // TODO: Implement failed() method.
    }
}
