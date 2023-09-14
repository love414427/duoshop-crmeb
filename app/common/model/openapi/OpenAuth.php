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


namespace app\common\model\openapi;

use app\common\model\BaseModel;

class OpenAuth extends BaseModel
{

    public static function tablePk(): ?string
    {
        return 'id';
    }

    public static function tableName(): string
    {
        return 'open_auth';
    }


    public function setAuthAttr($value)
    {
        return implode(',',$value);
    }

    public function getAuthAttr($value)
    {
        return explode(',',$value);
    }

    public function searchTitleAttr($query,$value)
    {
        $query->whereLike('title',"%{$value}%");
    }

    public function searchAccessKeyAttr($query,$value)
    {
        $query->where('access_key',$value);
    }

    public function searchIsDelAttr($query,$value)
    {
        $query->where('is_del',$value);
    }

    public function searchStatusAttr($query,$value)
    {
        $query->where('status',$value);
    }

    public function searchMerIdAttr($query,$value)
    {
        $query->where('mer_id',$value);
    }

}
