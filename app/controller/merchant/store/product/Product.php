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

namespace app\controller\merchant\store\product;

use app\common\repositories\store\order\StoreCartRepository;
use app\common\repositories\store\product\ProductAttrValueRepository;
use app\common\repositories\store\product\SpuRepository;
use app\common\repositories\store\shipping\ShippingTemplateRepository;
use app\common\repositories\store\StoreCategoryRepository;
use crmeb\services\UploadService;
use think\App;
use crmeb\basic\BaseController;
use app\validate\merchant\StoreProductValidate as validate;
use app\common\repositories\store\product\ProductRepository as repository;
use think\exception\ValidateException;

class Product extends BaseController
{
    protected  $repository ;

    /**
     * Product constructor.
     * @param App $app
     * @param repository $repository
     */
    public function __construct(App $app ,repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    /**
     * @Author:Qinii
     * @Date: 2020/5/18
     * @return mixed
     */
    public function lst()
    {
        [$page, $limit] = $this->getPage();
        $type = $this->request->param('type',1);
        $where = $this->request->params(['temp_id','cate_id','keyword','mer_cate_id','is_gift_bag','status','us_status','product_id','mer_labels',['order','sort'],'is_ficti','svip_price_type','filters_type','is_action']);
        $where = array_merge($where,$this->repository->switchType($type,$this->request->merId(),0));
        return app('json')->success($this->repository->getList($this->request->merId(),$where, $page, $limit));
    }

    /**
     * @Author:Qinii
     * @Date: 2020/5/18
     * @param $id
     * @return mixed
     */
    public function detail($id)
    {
        if(!$this->repository->merExists($this->request->merId(),$id))
            return app('json')->fail('数据不存在');
        return app('json')->success($this->repository->getAdminOneProduct($id,null));
    }

    /**
     * @Author:Qinii
     * @Date: 2020/5/18
     * @param validate $validate
     * @return mixed
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
        $data = $this->repository->checkParams($params,$this->request->merId());
        $data['mer_id'] = $this->request->merId();
        $data['admin_id'] = $this->request->merAdminId();
        if ($data['is_gift_bag'] && !$this->repository->checkMerchantBagNumber($data['mer_id']))
            return app('json')->fail('礼包数量超过数量限制');
        $data['status'] = $this->request->merchant()->is_audit ? 0 : 1;
        $data['mer_status'] = ($this->request->merchant()->is_del || !$this->request->merchant()->mer_state || !$this->request->merchant()->status) ? 0 : 1;
        $data['rate'] = 3;
        $this->repository->create($data,0);
        return app('json')->success('添加成功');
    }

    /**
     * @Author:Qinii
     * @Date: 2020/5/18
     * @param $id
     * @param validate $validate
     * @return mixed
     */
    public function update($id)
    {
        $params = $this->request->params($this->repository::CREATE_PARAMS);
        $data = $this->repository->checkParams($params,$this->request->merId(), $id);
        if (!$this->repository->merExists($this->request->merId(), $id))
            return app('json')->fail('数据不存在');
        $pro = $this->repository->getWhere(['product_id' => $id]);
        if ($pro->status == -2) {
            $data['status'] = 0;
        } else {
            $data['status'] = $this->request->merchant()->is_audit ? 0 : 1;
        }
        $data['mer_status'] = ($this->request->merchant()->is_del || !$this->request->merchant()->mer_state || !$this->request->merchant()->status) ? 0 : 1;
        $data['mer_id'] = $this->request->merId();
        $this->repository->edit($id, $data, $this->request->merId(), 0);
        return app('json')->success('编辑成功');
    }

    /**
     * @Author:Qinii
     * @Date: 2020/5/18
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        if(!$this->repository->merExists($this->request->merId(),$id))
            return app('json')->fail('数据不存在');
        if($this->repository->getWhereCount(['product_id' => $id,'is_show' => 1,'status' => 1]))
            return app('json')->fail('商品上架中');
        $this->repository->delete($id);
        //queue(ChangeSpuStatusJob::class,['product_type' => 0,'id' => $id]);
        return app('json')->success('转入回收站');
    }


    public function destory($id)
    {
        if(!$this->repository->merDeleteExists($this->request->merId(),$id))
            return app('json')->fail('只能删除回收站的商品');
//        if(app()->make(StoreCartRepository::class)->getProductById($id))
//            return app('json')->fail('商品有被加入购物车不可删除');
        $this->repository->destory($id);
        return app('json')->success('删除成功');
    }



    /**
     * @Author:Qinii
     * @Date: 2020/5/18
     * @return mixed
     */
    public function getStatusFilter()
    {
        return app('json')->success($this->repository->getFilter($this->request->merId(),'商品',0));
    }

    /**
     * TODO
     * @return mixed
     * @author Qinii
     * @day 2020-06-24
     */
    public function config()
    {
        $data = systemConfig(['extension_status','svip_switch_status','integral_status']);
        $merData= merchantConfig($this->request->merId(),['mer_integral_status','mer_integral_rate','mer_svip_status','svip_store_rate']);
        $svip_store_rate = $merData['svip_store_rate'] > 0 ? bcdiv($merData['svip_store_rate'],100,2) : 0;
        $data['mer_svip_status'] = ($data['svip_switch_status']  && $merData['mer_svip_status'] != 0 ) ? 1 : 0;
        $data['svip_store_rate'] = $svip_store_rate;
        $data['integral_status'] = $data['integral_status'] && $merData['mer_integral_status'] ? 1 : 0;
        $data['integral_rate'] = $merData['mer_integral_rate'] ?: 0;
        $data['delivery_way'] = $this->request->merchant()->delivery_way ? $this->request->merchant()->delivery_way : [2];
        $data['is_audit'] = $this->request->merchant()->is_audit;
        return app('json')->success($data);
    }

    /**
     * TODO
     * @param $id
     * @return mixed
     * @author Qinii
     * @day 2020-07-03
     */
    public function restore($id)
    {
        if(!$this->repository->merDeleteExists($this->request->merId(),$id))
            return app('json')->fail('只能恢复回收站的商品');
        $this->repository->restore($id);
        return app('json')->success('商品已恢复');
    }

    /**
     * @return \think\response\Json
     * @throws \think\Exception
     * @author xaboy
     * @day 2020/11/16
     */
    public function temp_key()
    {
        $upload = UploadService::create();
        $re = $upload->getTempKeys();
        return app('json')->success($re);
    }

    public function updateSort($id)
    {
        $sort = $this->request->param('sort');
        $this->repository->updateSort($id,$this->request->merId(),['sort' => $sort]);
        return app('json')->success('修改成功');
    }

    public function preview()
    {
        $data = $this->request->param();
        $data['merchant'] = [
            'mer_name' => $this->request->merchant()->mer_name,
            'is_trader' => $this->request->merchant()->is_trader,
            'mer_avatar' => $this->request->merchant()->mer_avatar,
            'product_score' => $this->request->merchant()->product_score,
            'service_score' => $this->request->merchant()->service_score,
            'postage_score' => $this->request->merchant()->postage_score,
            'service_phone' => $this->request->merchant()->service_phone,
            'care_count' => $this->request->merchant()->care_count,
            'type_name' => $this->request->merchant()->type_name->type_name ?? '',
            'care' => true,
            'recommend' => $this->request->merchant()->recommend,
        ];
        $data['mer_id'] = $this->request->merId();
        $data['status'] =  1;
        $data['mer_status'] = 1;
        $data['rate'] = 3;
        return app('json')->success($this->repository->preview($data));
    }

    public function setLabels($id)
    {
        $data = $this->request->params(['mer_labels']);
        app()->make(SpuRepository::class)->setLabels($id,0,$data,$this->request->merId());
        return app('json')->success('修改成功');
    }

    public function getAttrValue($id)
    {
        $data = $this->repository->getAttrValue($id, $this->request->merId());
        return app('json')->success($data);
    }

    public function  freeTrial($id)
    {
        $params = [
            "mer_cate_id",
            "sort" ,
            "is_show",
            "is_good",
            "attr",
            "attrValue",
            'spec_type'
        ];
        $data = $this->request->params($params);
        if(!empty($data['mer_cate_id'])){
            $count = app()->make(StoreCategoryRepository::class)->getWhereCount(['store_category_id' => $data['mer_cate_id'],'is_show' => 1,'mer_id' => $this->request->merId()]);
            if (!$count) throw new ValidateException('商户分类不存在或不可用');
        }
        $data['status'] = 1;
        $this->repository->freeTrial($id, $data,$this->request->merId());
        return app('json')->success('编辑成功');
    }

    /**
     * TODO 上下架
     * @Author:Qinii
     * @Date: 2020/5/18
     * @param int $id
     * @return mixed
     */
    public function switchStatus($id)
    {
        $status = $this->request->param('status', 0) == 1 ? 1 : 0;
        $this->repository->switchShow($id, $status,'is_show',$this->request->merId());
        return app('json')->success('修改成功');
    }


    /**
     * TODO 批量上下架
     * @return \think\response\Json
     * @author Qinii
     * @day 2022/9/6
     */
    public function batchShow()
    {
        $ids = $this->request->param('ids');
        if (empty($ids)) return app('json')->fail('请选择商品');
        $status = $this->request->param('status') == 1 ? 1 : 0;
        $this->repository->batchSwitchShow($ids,$status,'is_show',$this->request->merId());
        return app('json')->success('修改成功');
    }

    /**
     * TODO 批量设置模板
     * @return \think\response\Json
     * @author Qinii
     * @day 2022/9/6
     */
    public function batchTemplate()
    {
        $ids = $this->request->param('ids');
        $ids = is_array($ids) ? $ids : explode(',',$ids);
        $data = $this->request->params(['temp_id']);
        if (empty($ids)) return app('json')->fail('请选择商品');
        if (empty($data['temp_id'])) return app('json')->fail('请选择运费模板');
        if (!$this->repository->merInExists($this->request->merId(), $ids)) return app('json')->fail('请选择您自己商品');
        $make = app()->make(ShippingTemplateRepository::class);
        if (!$make->merInExists($this->request->merId(), [$data['temp_id']]))
            return app('json')->fail('请选择您自己的运费模板');
        $data['delivery_free'] = 0;
        $this->repository->updates($ids,$data);
        return app('json')->success('修改成功');
    }

    /**
     * TODO 批量标签
     * @return \think\response\Json
     * @author Qinii
     * @day 2022/9/6
     */
    public function batchLabels()
    {
        $ids = $this->request->param('ids');
        $data = $this->request->params(['mer_labels']);
        if (empty($ids)) return app('json')->fail('请选择商品');
        if (!$this->repository->merInExists($this->request->merId(), $ids))
            return app('json')->fail('请选择您自己商品');
        app()->make(SpuRepository::class)->batchLabels($ids, $data,$this->request->merId());
        return app('json')->success('修改成功');
    }

    /**
     * TODO 批量设置推荐类型
     * @return \think\response\Json
     * @author Qinii
     * @day 2022/9/6
     */
    public function batchHot()
    {
        $ids = $this->request->param('ids');
        $data['is_good'] = 1;
        if (empty($ids)) return app('json')->fail('请选择商品');
        if (!$this->repository->merInExists($this->request->merId(), $ids))
            return app('json')->fail('请选择您自己商品');
        $this->repository->updates($ids,$data);
        return app('json')->success('修改成功');
    }

    /**
     * TODO 批量设置佣金
     * @param ProductAttrValueRepository $repository
     * @return \think\response\Json
     * @author Qinii
     * @day 2022/12/26
     */
    public function batchExtension(ProductAttrValueRepository $repository)
    {
        $ids = $this->request->param('ids');
        $data = $this->request->params(['extension_one','extension_two']);
        if ($data['extension_one'] > 1 || $data['extension_one'] < 0 || $data['extension_two'] < 0 || $data['extension_two'] > 1) {
            return app('json')->fail('比例0～1之间');
        }
        if (empty($ids)) return app('json')->fail('请选择商品');
        if (!$this->repository->merInExists($this->request->merId(), $ids))
            return app('json')->fail('请选择您自己商品');
        $repository->updatesExtension($ids,$data);
        return app('json')->success('修改成功');
    }

    public function batchSvipType()
    {
        $ids = $this->request->param('ids');
        $data = $this->request->params([['svip_price_type',0]]);

        if (empty($ids)) return app('json')->fail('请选择商品');
        if (!$this->repository->merInExists($this->request->merId(), $ids))
            return app('json')->fail('请选择您自己商品');
        $this->repository->updates($ids,$data);
        return app('json')->success('修改成功');
    }

    public function isFormatAttr($id)
    {
        $data = $this->request->params([
            ['attrs', []],
            ['items', []],
            ['product_type', 0]
        ]);
        $data = $this->repository->isFormatAttr($data['attrs'],$id,$data['product_type']);
        return app('json')->success($data);
    }
}
