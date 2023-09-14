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


namespace app\common\dao\system\diy;

use app\common\dao\BaseDao;
use app\common\model\system\diy\Diy;
use app\common\model\system\Relevance;
use app\common\repositories\system\RelevanceRepository;
use think\facade\Db;

class DiyDao extends BaseDao
{

    protected function getModel(): string
    {
        return Diy::class;
    }

    public function setUsed($id, $merId)
    {
        $res  = $this->getModel()::getDb()->find($id);
        $this->getModel()::getDb()->where('mer_id', $merId)->where('is_default' ,0)->update(['status'=>0]);
        if (!$res['is_default']) {
            $this->getModel()::getDb()->where('mer_id', $merId)->where('id',$id)->update(['status'=> 1]);
        }
    }
    public function merExists(int $merId, int $id)
    {
        return ($this->getModel()::getDb()->where('mer_id', $merId)->where($this->getPk(), $id)->count() > 0 );
    }

    public function search($where)
    {
        $query = $this->getModel()::getDb()
            ->when(isset($where['mer_id']) && $where['mer_id'] !== '' ,function($query) use($where) {
                $query->where('mer_id',$where['mer_id']);
            })
            ->when(isset($where['ids']) && $where['ids'] !== '', function($query) use($where){
                $query->whereIn('id',$where['ids']);
            })
            ->when(isset($where['type']) && $where['type'] !== '', function($query) use($where){
                $query->where('type',$where['type']);
            })
            ->when(isset($where['status']) && $where['status'] !== '', function($query) use($where){
                $query->where('status',$where['status']);
            })
            ->when(isset($where['is_diy']) && $where['is_diy'] !== '', function($query) use($where){
                $query->where('is_diy',$where['is_diy']);
            })
            ->when(isset($where['is_default']) && $where['is_default'] !== '', function($query) use($where){
                $query->where('is_default',$where['is_default']);
            })
            ->when(isset($where['name']) && $where['name'] !== '', function($query) use($where){
                $query->whereLike('name',"{$where['name']}");
            })
            ->when(isset($where['default_ids']), function($query) use($where){
                $query->whereOr(function($query) use($where) {
                    $query->whereIn('id', $where['default_ids']);
                });
            })
        ;
        return $query;
    }


    /**
     * TODO 符合条件的默认模板ID
     * @param array $where
     * @return string
     * @author Qinii
     * @day 2023/7/14
     */
    public function withMerSearch(array $where)
    {
        $ids =Diy::hasWhere('relevance',function($query) use($where){
             $query->where(function($query) use($where) {
                 $query->where(function($query) use($where) {
                     $query->where('Relevance.type',RelevanceRepository::MER_DIY_SCOPE[0])->where('right_id',$where['mer_id']);
                 })->whereOr(function($query) use($where){
                     $query->where('Relevance.type',RelevanceRepository::MER_DIY_SCOPE[1])->where('right_id',$where['category_id']);
                 })->whereOr(function($query) use($where){
                     $query->where('Relevance.type',RelevanceRepository::MER_DIY_SCOPE[2])->where('right_id',$where['type_id']);
                 })->whereOr(function($query) use($where){
                     $query->where('Relevance.type',RelevanceRepository::MER_DIY_SCOPE[3])->where('right_id',$where['is_trader']);
                 });
             });
        })->where('Diy.type',2)->where('is_default',1)->column('id');
        $_ids = Diy::where(function($query){
            $query->where(function($query){
                $query->where('type',2)->where('is_default',1);
            })->whereOr(function($query){
                $query->where('type',1)->where('is_default',2);
            });
        })->where('is_diy',1)->where('scope_type',4)->column('id');
        return array_merge($ids,$_ids);
    }
}
