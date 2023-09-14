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
use app\common\middleware\AllowOriginMiddleware;
use app\common\middleware\LogMiddleware;
use app\common\middleware\MerchantAuthMiddleware;
use app\common\middleware\MerchantTokenMiddleware;
use think\facade\Route;
use app\common\middleware\MerchantCheckBaseInfoMiddleware;

Route::group(function () {
    Route::group('openapi/',function(){
        Route::get('lst','OpenApi/lst')->name('merchantOpenapiLst')->option([
            '_alias' => '列表',
        ]);
        Route::get('create/form','OpenApi/createForm')->name('merchantOpenapiCreateForm')->option([
            '_alias' => '添加Form',
            '_auth' => false,
            '_form' => 'merchantOpenapiCreate',
        ]);
        Route::post('create','OpenApi/create')->name('merchantOpenapiCreate')->option([
            '_alias' => '添加',
        ]);
        Route::get('update/:id/form','OpenApi/updateForm')->name('merchantOpenapiUpdateForm')->option([
            '_alias' => '编辑Form',
            '_auth' => false,
            '_form' => 'merchantOpenapiUpdate',
        ]);
        Route::post('update/:id','OpenApi/update')->name('merchantOpenapiUpdate')->option([
            '_alias' => '编辑',
        ]);
        Route::post('status/:id','OpenApi/switchWithStatus')->name('merchantOpenapiStatus')->option([
            '_alias' => '修改状态',
        ]);
        Route::delete('delete/:id','OpenApi/delete')->name('merchantOpenapiDeleta')->option([
            '_alias' => '删除',
        ]);
        Route::get('get_secret_key/:id','OpenApi/getSecretKey')->name('merchantOpenapiGetSecretKey')->option([
            '_alias' => '查看',
        ]);
        Route::post('set_secret_key/:id','OpenApi/setSecretKey')->name('merchantOpenapiSetSecretKey')->option([
            '_alias' => '重置',
        ]);
    })->prefix('merchant.system.openapi.')->option([
        '_path' => '/systemForm/openAuth/list',
        '_auth' => true,
    ]);

})->middleware(AllowOriginMiddleware::class)
    ->middleware(MerchantTokenMiddleware::class, true)
    ->middleware(MerchantAuthMiddleware::class)
    ->middleware(MerchantCheckBaseInfoMiddleware::class)
    ->middleware(LogMiddleware::class);
