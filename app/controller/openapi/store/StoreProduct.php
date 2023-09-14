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


namespace app\controller\openapi\store;

use app\common\repositories\system\merchant\MerchantRepository;
use crmeb\exceptions\AuthException;
use think\App;
use crmeb\basic\BaseController;
use app\common\repositories\store\product\ProductRepository as repository;


class StoreProduct extends BaseController
{
    /**
     * @var repository
     */
    protected $repository;

    /**
     * StoreProduct constructor.
     * @param App $app
     * @param repository $repository
     */
    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
        $this->merId = $this->request->openMerId();
        if (!in_array(2,$this->request->openRoule())) throw new AuthException('无此权限');
    }

    /**
     * @Author:Qinii
     * @Date: 2020/5/18
     * @return mixed
     */
    public function lst()
    {
        /**
         * type 商品状态  1 出售中 2 仓库中 3 已售罄 4 警戒库存 5 回收站 6 待审核 7 审核未通过
         * temp_id 运费模板ID
         * cate_id 平台商品分类ID
         * mer_cate_id 商户商品分类
         * product_id 商品ID
         * status 审核状态 0 待审核 1 审核通过 -1 审核未通过/强制下架
         * us_status 上架状态 1 上架 0 下架 -1 平台关闭/未审核通过
         * is_ficti 是否未虚拟商品 0 实体  1 虚拟 2 卡密
         * svip_price_type 付费会员价类型 0不参加，1默认比例，2自定义
         */
        [$page, $limit] = $this->getPage();
        $type = $this->request->param('type',1);
        $where = $this->request->params(['temp_id','cate_id','keyword','mer_cate_id','is_gift_bag','status','us_status','product_id','mer_labels',['order','sort'],'is_ficti','svip_price_type','filters_type','is_action']);
        $where = array_merge($where,$this->repository->switchType($type,$this->merId,0));
        return app('json')->success($this->repository->getList($this->merId,$where, $page, $limit));
    }

    /**
     * @Author:Qinii
     * @Date: 2020/5/18
     * @param $id
     * @return mixed
     */
    public function detail($id)
    {
        if(!$this->repository->merExists($this->merId,$id))
            return app('json')->fail('数据不存在');
        return app('json')->success($this->repository->getAdminOneProduct($id,null));
    }


    /**
     * TODO 添加商品
     * @return \think\response\Json
     * @author Qinii
     * @day 2023/8/14
     * @attr: 规格参数[];
     * @attrValue: SkU数据[];
     * @brand_id?: number 品牌的ID;
     * @cate_id: number 平台商品分类，平台的商品分类ID，单选 ;
     * @content: string  详情;
     * @delivery_free: number 是否包邮，0.否，1.是;
     * @delivery_way: string[] 商品支持的配送类型，1.仅到店自提2快递计价配送;
     * @extension_type?: string 佣金比例 0.系统，1.自定义，佣金比例 ：0.系统，即根据商户统一设置的比例计算； 1.自定义，手动在每个sku价格后面填写佣金金额;
     * @image: string 封面图，列表展示图;
     * @keyword: string 商品关键字，在分享海报或者微信分享好友等，会使用到;
     * @mer_cate_id?: string[] 商户商品分类，商户商品分类ID，多选;
     * @once_max_count?: number 订单单次购买数量最大限制，例如 5，单次购买不得超过5件/ 或者此商品每个商户只能购买5件，根据 pay_limit 类型决定;
     * @once_min_count?: number 单次购买最低限购，例如 5，则是5件起购;
     * @pay_limit?: number 是否限购，购买总数限制 0:不限购，1单次限购 2 长期限购;
     * @refund_switch?: number 商品是否支持退款，1.支持 0.不支持;
     * @slider_image: string[] 轮播图，详情页展示;
     * @spec_type: number 规格类型，0单规格 ，1 多规格;
     * @store_info: string 商品简介;
     * @store_name: string 商品名称;
     * @svip_price_type?: number 会员价类型，0不参加，1默认比例，2自定义;
     * @unit_name: string 单位，计量单位，例如：个、kg等;
     * @video_link?: string 视频链接地址;
     * @attr.value: string 规格名，例如尺码;
     * @attr.detail: string[] 规格值，["S (适合36-37)", "M (适合38-39)", "L (适合40-41)"];
     * @attrValue.cost: number 成本价;
     * @attrValue.detail: { [key: string]: any } 当前SKU信息，当前sku组合的信息，例如："detail": {"颜色": "粉红色","尺码": "S (适合36-37)"}，则表示当前的规格是颜色为粉红色，尺码为S的组合;
     * @attrValue.extension_one?: number 一级佣金，如果 extension_type 值为1 ，此项必填，但金额不得超过单价，即：price参数;
     * @attrValue.extension_two?: number 二级佣金，如果 extension_type 值为1 ，此项必填，但金额不得超过单价，即：price参数;
     * @attrValue.image: string sku封面图，选中当前规格会在移动端详情中显示的图片;
     * @attrValue.ot_price: number 原价;
     * @attrValue.price: number 售价;
     * @attrValue.stock: number 库存;
     * @attrValue.svip_price: string会员价，如果 svip_price_type 值为 1 此项必填；当svip_price_type值为1此项值为0时；即：付费会员免费获取;
     * @attrValue.volume: number 体积;
     * @attrValue.weight: number 重量;
     */
    public function create()
    {

        $params = $this->request->params($this->repository::CREATE_PARAMS);
        $data = $this->repository->checkParams($params,$this->merId);
        $data['mer_id'] = $this->merId;
        $data['is_gift_bag'] = 0;
        $merchant = app()->make(MerchantRepository::class)->get($this->merId);
        $data['status'] = $merchant->is_audit ? 0 : 1;
        $data['mer_status'] = (!$merchant->mer_state || !$merchant->status) ? 0 : 1;
        $data['rate'] = 3;
        $this->repository->create($data,0);
        return app('json')->success('添加成功');
    }

}
