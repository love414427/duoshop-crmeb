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


namespace app\common\model\system\diy;

use app\common\model\BaseModel;
use app\common\model\system\Relevance;
use app\common\repositories\system\RelevanceRepository;

class Diy extends BaseModel
{

    public static function tablePk(): string
    {
        return 'id';
    }

    public static function tableName(): string
    {
        return 'diy';
    }

    public function relevance()
    {
        return  $this->hasMany(Relevance::class,'left_id','id')->whereIn('type',RelevanceRepository::MER_DIY_SCOPE);
    }


    public function getScopeValueAttr()
    {
        $value = [];
        if ($this->scope_type){
            $value = Relevance::where('left_id',$this->id)->whereIn('type',RelevanceRepository::MER_DIY_SCOPE)->column('right_id');
        }
        return $value;
    }

    public function searchTypeAttr($query,$value)
    {
        if (is_array($value)) {
            $query->whereIn('type',$value);
        } else {
            $query->where('type',$value);
        }
    }

    public function searchMerIdAttr($query, $value)
    {
        $query->where('mer_id', $value);
    }

    public function searchIsDefaultAttr($query, $value)
    {
        $query->where('is_default', $value);
    }

    public function searchMerDefaultAttr($query, $value)
    {
        $query->whereIn('is_default',[1,2]);
    }
}
