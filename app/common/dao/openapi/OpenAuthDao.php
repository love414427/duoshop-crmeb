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

namespace app\common\dao\openapi;

use app\common\model\openapi\OpenAuth;
use app\common\dao\BaseDao;

class OpenAuthDao extends BaseDao
{

    protected function getModel(): string
    {
        return OpenAuth::class;
    }

    public function search(array $where)
    {
        $query = $this->getModel()::getDB()
            ->when(isset($where['type']) && $where['type'] !== '',function($query) use($where){
                $query->where('type',$where['type']);
            })
            ->when(isset($where['mer_id']) && $where['mer_id'] !== '',function($query) use($where){
                $query->where('mer_id',$where['mer_id']);
            });
        $query->order('create_time DESC');
        return $query;
    }
}
