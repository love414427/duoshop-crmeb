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


namespace app\common\repositories\store\coupon;


use app\common\dao\store\coupon\StoreCouponIssueUserDao;
use app\common\repositories\BaseRepository;

/**
 * Class StoreCouponIssueUserRepository
 * @package app\common\repositories\store\coupon
 * @author xaboy
 * @day 2020/6/1
 * @mixin StoreCouponIssueUserDao
 */
class StoreCouponIssueUserRepository extends BaseRepository
{
    /**
     * StoreCouponIssueUserRepository constructor.
     * @param StoreCouponIssueUserDao $dao
     */
    public function __construct(StoreCouponIssueUserDao $dao)
    {
        $this->dao = $dao;
    }

    public function issue($couponId, $uid)
    {
        return $this->dao->create([
            'coupon_id' => $couponId,
            'uid' => $uid,
        ]);
    }

    public function getList(array $where, $page, $limit)
    {
        $query = $this->dao->search($where);
        $count = $query->count();
        $list = $query->with(['coupon', 'user'])->page($page, $limit)->select();
        return compact('count', 'list');
    }
}
