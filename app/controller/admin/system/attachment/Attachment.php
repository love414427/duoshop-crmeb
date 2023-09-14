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


namespace app\controller\admin\system\attachment;


use app\common\repositories\system\attachment\AttachmentCategoryRepository;
use app\common\repositories\system\attachment\AttachmentRepository;
use crmeb\basic\BaseController;
use crmeb\services\DownloadImageService;
use crmeb\services\UploadService;
use Exception;
use think\App;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Cache;
use think\response\Json;

/**
 * Class Attachment
 * @package app\controller\admin\system\attachment
 * @author xaboy
 * @day 2020-04-16
 */
class Attachment extends BaseController
{
    /**
     * @var AttachmentRepository
     */
    protected $repository;

    /**
     * @var int
     */
    protected $merId;

    /**
     * Attachment constructor.
     * @param App $app
     * @param AttachmentRepository $repository
     */
    public function __construct(App $app, AttachmentRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
        $this->merId = $this->request->merId();
    }

    /**
     * @param int $id
     * @param string $field
     * @param AttachmentCategoryRepository $repository
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     * @author xaboy
     * @day 2020-04-15
     */
    public function image($id, $field, AttachmentCategoryRepository $repository)
    {
        $file = $this->request->file($field);

        $ueditor = $this->request->param('ueditor');
        if (!$file)
            return app('json')->fail('请上传图片');
        $file = is_array($file) ? $file[0] : $file;
        if ($id) {
            if (!$category = $repository->get($id, $this->merId))
                return app('json')->fail('目录不存在');
            $info = [
                'enname' => $category->attachment_category_enname,
                'id' => $category->attachment_category_id
            ];
        } else {
            $info = [
                'enname' => 'def',
                'id' => 0
            ];
        }
        validate(["$field|图片" => [
            'fileSize' => config('upload.filesize'),
            'fileExt' => config('upload.iamge_fileExt'),
            'fileMime' => config('upload.image_fileMime'),
        ]])->check([$field => $file]);

        $type = (int)systemConfig('upload_type') ?: 1;
        $upload = UploadService::create($type);
        $data = $upload->to($info['enname'])->move($field);
        if ($data === false) {
            return app('json')->fail($upload->getError());
        }
        $res = $upload->getUploadInfo();
        $res['dir'] = tidy_url($res['dir']);
        $_name = '.' . $file->getOriginalExtension();
        $data = [
            'attachment_category_id' => $info['id'],
            'attachment_name' => str_replace($_name, '', $file->getOriginalName()),
            'attachment_src' => $res['dir']
        ];
        $image = $this->repository->create($type, $this->merId, $this->request->adminId(), $data);
        if ($ueditor)
            return response([
                'state' => 'SUCCESS',
                'url' => $data['attachment_src'],
                'title' => $data['attachment_src'],
                'original' => $data['attachment_src'],
            ], 200, [], 'json');
        return app('json')->success(['src' => $data['attachment_src'],'attachment_id' => $image->attachment_id]);
    }



    /**
     * 获取列表
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     * @author 张先生
     * @date 2020-03-27
     */
    public function getList()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params([['attachment_category_id', 0],'order','attachment_name']);
        $where['user_type'] = $this->merId;
        return app('json')->success($this->repository->getList($where, $page, $limit));
    }

    /**
     * @param AttachmentCategoryRepository $attachmentCategoryRepository
     * @return mixed
     * @throws DbException
     * @author xaboy
     * @day 2020-04-16
     */
    public function batchChangeCategory(AttachmentCategoryRepository $attachmentCategoryRepository)
    {
        [$ids, $attachment_category_id] = $this->request->params([['ids', []], 'attachment_category_id'], true);
        if ($attachment_category_id && !$attachmentCategoryRepository->merExists($this->merId, $attachment_category_id))
            return app('json')->fail('分类不存在');
        if (!is_array($ids) || !count($ids))
            return app('json')->fail('请选择要修改分类的附件');
        $this->repository->batchChangeCategory(array_map('intval', $ids), intval($attachment_category_id), $this->merId);
        return app('json')->success('图片移动成功');
    }

    /**
     * 批量删除
     *
     * @return Json
     * @throws Exception
     * @author 张先生
     * @date 2020-03-30
     */
    public function delete()
    {
        $ids = (array)$this->request->param('ids', []);
        if (!count($ids))
            return app('json')->fail('数据不存在');
        $this->repository->batchDelete($ids, $this->merId);
        return app('json')->success('删除成功');
    }

    public function updateForm($id)
    {
        if(!$this->repository->getWhereCount(['attachment_id' => $id,'user_type' => $this->request->merId()]))
            return app('json')->fail('数据不存在');
        return app('json')->success(formToData($this->repository->form($id,$this->request->merId())));
    }

    public function update($id)
    {
        $data= $this->request->params(['attachment_name']);
        if(!$this->repository->getWhereCount(['attachment_id' => $id,'user_type' => $this->request->merId()]))
            return app('json')->fail('数据不存在');
        $this->repository->update($id,$data);
        return app('json')->success('修改成功');
    }

    /**
     * TODO 扫码上传图片，生成二维码
     * @param $pid
     * @return Json
     * @author Qinii
     * @day 2023/7/18
     */
    public function scanUploadQrcode($pid)
    {
        $merId = $this->request->merId();
        $token = $merId.md5(time());
        $url = rtrim(systemConfig('site_url'),'/') .'/pages/admin/scan/index?pid='.$pid.'&mer_id='.$merId.'&token='.$token;
        Cache::set('scan_mer_'.$token, $merId);
        return app('json')->success(compact('token','pid','url'));
    }

    /**
     * TODO 获取通过二维码上传的图片
     * @param $token
     * @return Json
     * @author Qinii
     * @day 2023/7/18
     */
    public function scanUploadImage($token)
    {
        $res = Cache::smembers ('scan_'.$token);
        $data = [];
        if ($res) {
            $data = $this->repository->getSearch(['ids' => $res])->field('attachment_id,attachment_src')->select();
        }
        return app('json')->success($data);
    }

    /**
     * TODO 提交通过扫码上传的图片信息，可修改分类
     * @param $token
     * @param AttachmentCategoryRepository $attachmentCategoryRepository
     * @return Json
     * @author Qinii
     * @day 2023/7/18
     */
    public function scanUploadSave($token, AttachmentCategoryRepository $attachmentCategoryRepository)
    {
        $id = $this->request->param('pid');
        $ids = $this->request->param('ids');
        if ($id && !$attachmentCategoryRepository->get($id, $this->merId))
            return app('json')->fail('目录不存在');
        $this->repository->updates($ids,['attachment_category_id' => $id]);
        Cache::del('scan_'.$token);
        Cache::del('scan_mer_'.$token);
        return app('json')->success('操作成功');
    }

    /**
     * TODO 线上图片上传
     * @param AttachmentCategoryRepository $attachmentCategoryRepository
     * @return Json
     * @author Qinii
     * @day 2023/7/19
     */
    public function onlineUpload(AttachmentCategoryRepository $attachmentCategoryRepository)
    {
        $id = $this->request->param('id',0);
        $images = $this->request->param('images',[]);

        if (!$images) return app('json')->fail('请上传图片地址');
        if ($id) {
            if (!$category = $attachmentCategoryRepository->get($id, $this->merId))
                return app('json')->fail('目录不存在');
            $info = [
                'enname' => $category->attachment_category_enname,
                'id' => $category->attachment_category_id
            ];
        } else {
            $info = [
                'enname' => 'def',
                'id' => 0
            ];
        }
        $type = (int)systemConfig('upload_type') ?: 1;
        $upload = app()->make(DownloadImageService::class)->downloadImages($images,$info['enname']);
        $data = [];
        foreach ($upload as $item ) {
            $data[] = [
                'attachment_category_id' => $info['id'],
                'attachment_name' => $item['name'],
                'attachment_src' => $item['path'],
                'upload_type' => $type,
                'user_type' => $this->merId,
                'user_id' => $this->request->adminId()
            ];
        }
        if ($data) $this->repository->insertAll($data);
        return app('json')->success('操作成功');
    }
}
