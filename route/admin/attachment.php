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

use think\facade\Route;
use app\common\middleware\AdminAuthMiddleware;
use app\common\middleware\AdminTokenMiddleware;
use app\common\middleware\AllowOriginMiddleware;
use app\common\middleware\LogMiddleware;

Route::group(function () {

    //附件分类管理
    Route::group('system/attachment/category', function () {
        Route::get('formatLst', '/getFormatList')->name('systemAttachmentCategoryGetFormatList')->option([
            '_alias' => '素材分类列表',
        ]);
        Route::get('create/form', '/createForm')->name('systemAttachmentCategoryCreateForm')->option([
            '_alias' => '素材分类添加表单',
            '_auth' => false,
            '_form' => 'systemAttachmentCategoryCreate',
        ]);
        Route::get('update/form/:id', '/updateForm')->name('systemAttachmentCategoryUpdateForm')->option([
            '_alias' => '素材分类编辑表单',
            '_auth' => false,
            '_form' => 'systemAttachmentCategoryUpdate',
        ]);
        Route::post('create', '/create')->name('systemAttachmentCategoryCreate')->option([
            '_alias' => '素材分类添加',
        ]);
        Route::post('update/:id', '/update')->name('systemAttachmentCategoryUpdate')->option([
            '_alias' => '素材编辑',
        ]);
        Route::delete('delete/:id', '/delete')->name('systemAttachmentCategoryDelete')->option([
            '_alias' => '素材删除',
        ]);
    })->prefix('admin.system.attachment.AttachmentCategory')->option([
        '_path' => '/config/picture',
        '_auth' => true,
    ]);

    Route::group('system/attachment', function () {
        Route::get('scan_upload/qrcode/:pid', '/scanUploadQrcode')->name('systemAttachmentScanQrcode')->option([
            '_alias' => '上传二维码',
        ]);
        Route::get('scan_upload/image/:token', '/scanUploadImage')->name('systemAttachmentScanImage')->option([
            '_alias' => '扫码上传图片',
        ]);
        Route::post('scan_upload/image/:token', '/scanUploadSave')->name('systemAttachmentScanImageSave')->option([
            '_alias' => '扫码上传保存',
        ]);
        Route::post('online_upload', '/onlineUpload')->name('systemAttachmentOnline')->option([
            '_alias' => '在线图片',
        ]);
        Route::get('lst', '/getList')->name('systemAttachmentLst')->option([
            '_alias' => '素材列表',
        ]);
        Route::delete('delete', '/delete')->name('systemAttachmentDelete')->option([
            '_alias' => '素材删除',
        ]);
        Route::post('category', '/batchChangeCategory')->name('systemAttachmentBatchChangeCategory')->option([
            '_alias' => '批量移动',
        ]);
        Route::get('update/:id/form', '/updateForm')->name('systemAttachmentUpdateForm')->option([
            '_alias' => '素材编辑表单',
            '_auth' => false,
            '_form' => 'systemAttachmentUpdate',
        ]);
        Route::post('update/:id', '/update')->name('systemAttachmentUpdate')->option([
            '_alias' => '素材编辑',
        ]);
    })->prefix('admin.system.attachment.Attachment')->option([
        '_path' => '/config/picture',
        '_auth' => true,
    ]);

    Route::post('upload/image/:id/:field', 'admin.system.attachment.Attachment/image')->name('uploadImage')->option([
        '_alias' => '上传图片',
        '_path' => '/config/picture',
    ]);

})->middleware(AllowOriginMiddleware::class)
    ->middleware(AdminTokenMiddleware::class, true)
    ->middleware(AdminAuthMiddleware::class)
    ->middleware(LogMiddleware::class);
