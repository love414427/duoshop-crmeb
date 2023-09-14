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

namespace app\controller\merchant\system\openapi;

use app\common\repositories\openapi\OpenAuthRepository;
use app\validate\merchant\OpenAuthValidate;
use crmeb\basic\BaseController;
use think\App;

class OpenApi extends BaseController
{
    protected $repository;

    public function __construct(App $app, OpenAuthRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    public function lst()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['title','access_key']);
        $where['mer_id'] = $this->request->merId();
        $data = $this->repository->getList($where, $page, $limit);
        return app('json')->success($data);
    }

    public function createForm()
    {
        return app('json')->success(formToData($this->repository->form($this->request->merId())));
    }

    public function create()
    {
        $data = $this->checkParams();
        $this->repository->create($this->request->merId(),$data);
        return app('json')->success('添加成功');
    }

    public function updateForm($id)
    {
        return app('json')->success(formToData($this->repository->form($this->request->merId(),$id)));
    }

    public function update($id)
    {
        $data = $this->checkParams($id);
        $data['update_time'] = date('Y-m-d H:i:s',time());
        $this->repository->update($id,$data);
        return app('json')->success('编辑成功');
    }

    public function switchWithStatus($id)
    {
        $status = $this->request->param('status',0) == 1 ?: 0;
        $this->repository->update($id,['status' => $status]);
        return app('json')->success('修改成功');
    }

    public function delete($id)
    {
        $this->repository->update($id,['is_del' => 1, 'delete_time' => date('Y-m-d H:i:s',time())]);
        return app('json')->success('删除成功');
    }

    public function getSecretKey($id)
    {
        $data = $this->repository->getSecretKey($id);
        return app('json')->success($data);
    }

    public function setSecretKey($id)
    {
        $data = $this->repository->setSecretKey($id, $this->request->merId());
        return app('json')->success('重置成功',$data);
    }

    public function checkParams($id = 0)
    {
        $data = $this->request->params(['title','access_key','status','mark','auth','sort']);
        $make = app()->make(OpenAuthValidate::class);
        if ($id) {
            unset($data['access_key']);
            $make->scene('edit')->check($data);
        } else {
            $make->check($data);
        }
        return $data;
    }
}
